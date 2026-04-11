import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import api from '../../../services/api'
import './VehicleForm.css'

const VAZIO = {
  titulo: '', marca: '', modelo: '', ano: '',
  preco: '', quilometragem: '', combustivel: 'flex',
  tipo: 'carro', cor: '', descricao: ''
}

export default function VehicleForm() {
  const { id } = useParams()
  const editando = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(VAZIO)
  const [arquivos, setArquivos] = useState([])
  const [previews, setPreviews] = useState([])
  const [imagensExistentes, setImagensExistentes] = useState([])
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (editando) {
      api.get(`/veiculos/${id}`).then(({ data }) => {
        setForm({
          titulo: data.titulo, marca: data.marca, modelo: data.modelo,
          ano: data.ano, preco: data.preco, quilometragem: data.quilometragem,
          combustivel: data.combustivel, tipo: data.tipo,
          cor: data.cor, descricao: data.descricao || ''
        })
        setImagensExistentes(data.imagens)
      })
    }
  }, [id])

  function atualizar(campo, valor) {
    setForm(p => ({ ...p, [campo]: valor }))
  }

  function selecionarArquivos(e) {
    const novos = Array.from(e.target.files)
    setArquivos(novos)
    setPreviews(novos.map(f => URL.createObjectURL(f)))
  }

  async function removerImagemExistente(imagemId) {
    await api.delete(`/veiculos/${id}/imagens/${imagemId}`)
    setImagensExistentes(p => p.filter(i => i.id !== imagemId))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setSalvando(true)

    try {
      if (editando) {
        await api.put(`/veiculos/${id}`, form)
        if (arquivos.length > 0) {
          const fd = new FormData()
          arquivos.forEach(f => fd.append('imagens', f))
          await api.post(`/veiculos/${id}/imagens`, fd)
        }
      } else {
        const fd = new FormData()
        Object.entries(form).forEach(([k, v]) => fd.append(k, v))
        arquivos.forEach(f => fd.append('imagens', f))
        await api.post('/veiculos', fd)
      }
      navigate('/painel-interno/dashboard')
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao salvar veículo.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="vform">
      <div className="container">
        <div className="vform__topo">
          <Link to="/painel-interno/dashboard" className="vform__voltar">← Dashboard</Link>
          <h1 className="vform__titulo">
            {editando ? 'Editar veículo' : 'Novo veículo'}
          </h1>
        </div>

        {erro && <div className="vform__erro">{erro}</div>}

        <form onSubmit={handleSubmit} className="vform__form">
          <div className="vform__secao">
            <h2 className="vform__secao-titulo">Informações básicas</h2>
            <div className="vform__grid">
              <div className="vform__campo vform__campo--full">
                <label className="vform__label">Título do anúncio</label>
                <input className="vform__input" placeholder="Ex: Honda Civic EXL 2022"
                  value={form.titulo} onChange={e => atualizar('titulo', e.target.value)} required />
              </div>
              <div className="vform__campo">
                <label className="vform__label">Marca</label>
                <input className="vform__input" placeholder="Honda"
                  value={form.marca} onChange={e => atualizar('marca', e.target.value)} required />
              </div>
              <div className="vform__campo">
                <label className="vform__label">Modelo</label>
                <input className="vform__input" placeholder="Civic"
                  value={form.modelo} onChange={e => atualizar('modelo', e.target.value)} required />
              </div>
              <div className="vform__campo">
                <label className="vform__label">Ano</label>
                <input className="vform__input" type="number" placeholder="2022"
                  value={form.ano} onChange={e => atualizar('ano', e.target.value)} required />
              </div>
              <div className="vform__campo">
                <label className="vform__label">Cor</label>
                <input className="vform__input" placeholder="Prata"
                  value={form.cor} onChange={e => atualizar('cor', e.target.value)} required />
              </div>
            </div>
          </div>

          <div className="vform__secao">
            <h2 className="vform__secao-titulo">Dados técnicos</h2>
            <div className="vform__grid">
              <div className="vform__campo">
                <label className="vform__label">Preço (R$)</label>
                <input className="vform__input" type="number" placeholder="95000"
                  value={form.preco} onChange={e => atualizar('preco', e.target.value)} required />
              </div>
              <div className="vform__campo">
                <label className="vform__label">Quilometragem</label>
                <input className="vform__input" type="number" placeholder="30000"
                  value={form.quilometragem} onChange={e => atualizar('quilometragem', e.target.value)} required />
              </div>
              <div className="vform__campo">
                <label className="vform__label">Tipo</label>
                <select className="vform__input" value={form.tipo} onChange={e => atualizar('tipo', e.target.value)}>
                  <option value="carro">Carro</option>
                  <option value="moto">Moto</option>
                  <option value="caminhao">Caminhão</option>
                </select>
              </div>
              <div className="vform__campo">
                <label className="vform__label">Combustível</label>
                <select className="vform__input" value={form.combustivel} onChange={e => atualizar('combustivel', e.target.value)}>
                  <option value="flex">Flex</option>
                  <option value="gasolina">Gasolina</option>
                  <option value="etanol">Etanol</option>
                  <option value="diesel">Diesel</option>
                  <option value="elétrico">Elétrico</option>
                  <option value="híbrido">Híbrido</option>
                </select>
              </div>
              <div className="vform__campo vform__campo--full">
                <label className="vform__label">Descrição (opcional)</label>
                <textarea className="vform__input vform__textarea" placeholder="Descreva o veículo..."
                  value={form.descricao} onChange={e => atualizar('descricao', e.target.value)} rows={4} />
              </div>
            </div>
          </div>

          <div className="vform__secao">
            <h2 className="vform__secao-titulo">Fotos</h2>

            {imagensExistentes.length > 0 && (
              <div className="vform__imgs-existentes">
                {imagensExistentes.map((img, i) => (
                  <div key={img.id} className="vform__img-item">
                    <img src={img.url} alt={`Foto ${i+1}`} />
                    {img.ehPrimaria && <span className="vform__img-badge">Principal</span>}
                    <button type="button" className="vform__img-remover"
                      onClick={() => removerImagemExistente(img.id)}>×</button>
                  </div>
                ))}
              </div>
            )}

            <label className="vform__upload">
              <input type="file" multiple accept="image/*" onChange={selecionarArquivos} />
              <span className="vform__upload-icone">+</span>
              <span>{arquivos.length > 0 ? `${arquivos.length} foto(s) selecionada(s)` : 'Clique para selecionar fotos'}</span>
              <span className="vform__upload-sub">JPG, PNG ou WEBP · máx 10MB cada</span>
            </label>

            {previews.length > 0 && (
              <div className="vform__previews">
                {previews.map((url, i) => (
                  <div key={i} className="vform__preview">
                    <img src={url} alt={`Preview ${i+1}`} />
                    {i === 0 && !editando && <span className="vform__img-badge">Principal</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="vform__acoes">
            <Link to="/painel-interno/dashboard" className="vform__btn-cancelar">
              Cancelar
            </Link>
            <button type="submit" className="vform__btn-salvar" disabled={salvando}>
              {salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Cadastrar veículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}