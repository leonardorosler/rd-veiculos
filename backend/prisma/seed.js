require('dotenv').config()

const { Pool } = require('pg')
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const bcrypt = require('bcryptjs')

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = process.env.ADMIN_EMAIL
  const senha = process.env.ADMIN_SENHA

  if (!email || !senha) {
    throw new Error('ADMIN_EMAIL e ADMIN_SENHA precisam estar no .env')
  }

  const senhaHash = await bcrypt.hash(senha, 12)

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { senha: senhaHash },
    create: { email, senha: senhaHash }
  })

  console.log('Admin configurado:', admin.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())