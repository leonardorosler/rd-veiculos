const { Router } = require('express')
const multer = require('multer')
const vehicleController = require('../controllers/vehicle.controller')
const { autenticar } = require('../middlewares/auth.middleware')

const router = Router()

// Multer em memória — o buffer vai direto pro Supabase
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB por arquivo
  fileFilter: (req, file, cb) => {
    const permitidos = ['image/jpeg', 'image/png', 'image/webp']
    if (permitidos.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Formato não permitido. Use JPG, PNG ou WEBP'))
    }
  }
})

// ---- Rotas públicas ----
router.get('/', vehicleController.listar)
router.get('/:id', vehicleController.buscarPorId)

// ---- Rotas protegidas (admin) ----
router.post('/', autenticar, upload.array('imagens', 20), vehicleController.criar)
router.put('/:id', autenticar, vehicleController.atualizar)
router.patch('/:id/vendido', autenticar, vehicleController.marcarVendido)
router.delete('/:id', autenticar, vehicleController.deletar)
router.post('/:id/imagens', autenticar, upload.array('imagens', 20), vehicleController.adicionarImagens)
router.delete('/:id/imagens/:imagemId', autenticar, vehicleController.removerImagem)

module.exports = router