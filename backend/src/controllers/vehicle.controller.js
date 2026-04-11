const vehicleService = require('../services/vehicle.service')

async function listar(req, res) {
  try {
    const veiculos = await vehicleService.listar(req.query)
    return res.json(veiculos)
  } catch (error) {
    return res.status(500).json({ erro: error.message })
  }
}

async function buscarPorId(req, res) {
  try {
    const veiculo = await vehicleService.buscarPorId(req.params.id)
    return res.json(veiculo)
  } catch (error) {
    return res.status(404).json({ erro: error.message })
  }
}

async function criar(req, res) {
  try {
    console.log('BODY:', req.body)
    console.log('FILES:', req.files)
    const veiculo = await vehicleService.criar(req.body, req.files)
    return res.status(201).json(veiculo)
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
}

async function atualizar(req, res) {
  try {
    const veiculo = await vehicleService.atualizar(req.params.id, req.body)
    return res.json(veiculo)
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
}

async function marcarVendido(req, res) {
  try {
    const veiculo = await vehicleService.marcarVendido(req.params.id)
    return res.json(veiculo)
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
}

async function deletar(req, res) {
  try {
    await vehicleService.deletar(req.params.id)
    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
}

async function adicionarImagens(req, res) {
  try {
    const veiculo = await vehicleService.adicionarImagens(req.params.id, req.files)
    return res.json(veiculo)
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
}

async function removerImagem(req, res) {
  try {
    await vehicleService.removerImagem(req.params.imagemId)
    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  marcarVendido,
  deletar,
  adicionarImagens,
  removerImagem
}