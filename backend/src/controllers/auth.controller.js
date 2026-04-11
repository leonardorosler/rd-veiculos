const authService = require('../services/auth.service')

async function login(req, res) {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' })
  }

  try {
    const resultado = await authService.login(email, senha)
    return res.status(200).json(resultado)
  } catch (error) {
    return res.status(401).json({ erro: error.message })
  }
}

module.exports = { login }