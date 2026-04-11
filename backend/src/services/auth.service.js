const prisma = require('../utils/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function login(email, senha) {
  // 1. Busca o admin pelo email
  const admin = await prisma.admin.findUnique({
    where: { email }
  })

  if (!admin) {
    throw new Error('Credenciais inválidas')
  }

  // 2. Compara a senha com o hash salvo
  const senhaCorreta = await bcrypt.compare(senha, admin.senha)

  if (!senhaCorreta) {
    throw new Error('Credenciais inválidas')
  }

  // 3. Gera o token JWT
  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email
    }
  }
}

module.exports = { login }