const prisma = require('../utils/prisma')
const supabase = require('../utils/supabase')

// Lista veículos com filtros opcionais
async function listar(filtros = {}) {
  const { marca, modelo, anoMin, anoMax, precoMin, precoMax, tipo, quilometragemMax } = filtros

  const veiculos = await prisma.veiculo.findMany({
    where: {
      vendido: false,
      ...(marca && {
        marca: { contains: marca, mode: 'insensitive' }
      }),
      ...(modelo && {
        modelo: { contains: modelo, mode: 'insensitive' }
      }),
      ...(tipo && { tipo }),
      ...(anoMin || anoMax ? {
        ano: {
          ...(anoMin && { gte: Number(anoMin) }),
          ...(anoMax && { lte: Number(anoMax) })
        }
      } : {}),
      ...(precoMin || precoMax ? {
        preco: {
          ...(precoMin && { gte: Number(precoMin) }),
          ...(precoMax && { lte: Number(precoMax) })
        }
      } : {}),
      ...(quilometragemMax && {
        quilometragem: { lte: Number(quilometragemMax) }
      })
    },
    include: {
      imagens: {
        where: { ehPrimaria: true },
        take: 1
      }
    },
    orderBy: { criadoEm: 'desc' }
  })

  return veiculos
}

// Busca um veículo pelo id com todas as imagens
async function buscarPorId(id) {
  const veiculo = await prisma.veiculo.findUnique({
    where: { id },
    include: { imagens: true }
  })

  if (!veiculo) throw new Error('Veículo não encontrado')

  return veiculo
}

// Cria veículo e faz upload das imagens
async function criar(dados, arquivos) {
  const { titulo, marca, modelo, ano, preco, quilometragem,
          combustivel, tipo, cor, descricao } = dados

  // Cria o veículo primeiro
  const veiculo = await prisma.veiculo.create({
    data: {
      titulo,
      marca,
      modelo,
      ano: Number(ano),
      preco: Number(preco),
      quilometragem: Number(quilometragem),
      combustivel,
      tipo,
      cor,
      descricao: descricao || null
    }
  })

  // Faz upload das imagens se existirem
  if (arquivos && arquivos.length > 0) {
    await uploadImagens(veiculo.id, arquivos)
  }

  return buscarPorId(veiculo.id)
}

// Atualiza dados do veículo
async function atualizar(id, dados) {
  await buscarPorId(id) // garante que existe

  const { titulo, marca, modelo, ano, preco, quilometragem,
          combustivel, tipo, cor, descricao } = dados

  const veiculo = await prisma.veiculo.update({
    where: { id },
    data: {
      ...(titulo && { titulo }),
      ...(marca && { marca }),
      ...(modelo && { modelo }),
      ...(ano && { ano: Number(ano) }),
      ...(preco && { preco: Number(preco) }),
      ...(quilometragem && { quilometragem: Number(quilometragem) }),
      ...(combustivel && { combustivel }),
      ...(tipo && { tipo }),
      ...(cor && { cor }),
      ...(descricao !== undefined && { descricao })
    },
    include: { imagens: true }
  })

  return veiculo
}

// Marca como vendido
async function marcarVendido(id) {
  await buscarPorId(id)

  return prisma.veiculo.update({
    where: { id },
    data: { vendido: true }
  })
}

// Deleta veículo e suas imagens do Storage
async function deletar(id) {
  const veiculo = await buscarPorId(id)

  // Remove imagens do Supabase Storage
  if (veiculo.imagens.length > 0) {
    const caminhos = veiculo.imagens.map(img => {
      // A URL é algo como: https://xxx.supabase.co/storage/v1/object/public/vehicles/id/nome.jpg
      // Precisamos só do caminho após o bucket: id/nome.jpg
      const partes = img.url.split('/vehicles/')
      return partes[1]
    })

    await supabase.storage.from('vehicles').remove(caminhos)
  }

  // O Prisma deleta as imagens automaticamente (onDelete: Cascade)
  await prisma.veiculo.delete({ where: { id } })
}

// Adiciona imagens a um veículo existente
async function adicionarImagens(id, arquivos) {
  await buscarPorId(id)
  await uploadImagens(id, arquivos)
  return buscarPorId(id)
}

// Remove uma imagem específica
async function removerImagem(imagemId) {
  const imagem = await prisma.imagem.findUnique({ where: { id: imagemId } })
  if (!imagem) throw new Error('Imagem não encontrada')

  const partes = imagem.url.split('/vehicles/')
  await supabase.storage.from('vehicles').remove([partes[1]])

  await prisma.imagem.delete({ where: { id: imagemId } })
}

// Função interna — faz o upload pro Supabase e salva no banco
async function uploadImagens(veiculoId, arquivos) {
  const uploads = arquivos.map(async (arquivo, index) => {
    const extensao = arquivo.originalname.split('.').pop()
    const nomeArquivo = `${veiculoId}/${Date.now()}-${index}.${extensao}`

    const { data, error } = await supabase.storage
      .from('vehicles')
      .upload(nomeArquivo, arquivo.buffer, {
        contentType: arquivo.mimetype,
        upsert: false
      })

    if (error) throw new Error(`Erro no upload: ${error.message}`)

    const { data: urlData } = supabase.storage
      .from('vehicles')
      .getPublicUrl(nomeArquivo)

    await prisma.imagem.create({
      data: {
        url: urlData.publicUrl,
        ehPrimaria: index === 0, // primeira imagem é a principal
        veiculoId
      }
    })
  })

  await Promise.all(uploads)
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