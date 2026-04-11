const { Router } = require('express')
const authRoutes = require('./auth.routes')

const router = Router()

router.use('/auth', authRoutes)

module.exports = router

const { autenticar } = require('../middlewares/auth.middleware')

// Rota temporária de teste — apague depois
router.get('/admin/teste', autenticar, (req, res) => {
  res.json({ mensagem: 'Acesso autorizado', adminId: req.adminId })
})