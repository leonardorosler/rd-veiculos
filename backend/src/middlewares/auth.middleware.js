const jwt = require('jsonwebtoken')

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' })
  }

  // O header vem assim: "Bearer eyJhbGci..."
  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.adminId = decoded.id
    return next()
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado' })
  }
}

module.exports = { autenticar }