require('dotenv').config()

const { Pool } = require('pg')
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const bcrypt = require('bcryptjs')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const senhaHash = await bcrypt.hash('admin123', 10)

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@autorevenda.com' },
    update: {},
    create: {
      email: 'admin@autorevenda.com',
      senha: senhaHash
    }
  })

  console.log('Admin criado:', admin.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())