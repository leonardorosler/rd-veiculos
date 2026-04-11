import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import api from '../../../services/api'
import './Dashboard.css'

export default function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [veiculos, setVeiculos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => { carregar() }, [])

  async function carregar() {
    try {
      const { data } = await api.get('/veiculos')
      setVeiculos(data)
    } finally {
      setCarregando(false)
    }
  }

  async function handleVendido(id) {
    if (!confirm('Marcar como vendido?')) return
    await api.patch(`/veiculos/${id}/vendido`)
    carregar()
  }

  async function handleDeletar(id) {
    if (!confirm('Deletar este veículo permanentemente?')) return
    await api.delete(`/veiculos/${id}`)
    carregar()
  }

  function handleLogout() {
    logout()
    navigate('/painel-interno')
  }

  const disponiveis = veiculos.filter(v => !v.vendido).length
  const vendidos = veiculos.filter(v => v.vendido).length

  return (
    <div className="dash">
      <header className="dash__header">
        <div className="container dash__header-inner">
          <div>
            <span className="dash__logo">◈ AutoRevenda</span>
            <span className="dash__admin-tag">Painel Admin</span>
          </div>
          <div className="dash__header-acoes">
            <Link to="/" className="dash__btn-voltar">Ver site</Link>
            <button className="dash__btn-logout" onClick={handleLogout}>Sair</button>
          </div>
        </div>
      </header>

      <div className="container dash__corpo">
        <div className="dash__stats">
          <div className="dash__stat">
            <span className="dash__stat-num">{veiculos.length}</span>
            <span className="dash__stat-label">Total</span>
          </div>
          <div className="dash__stat">
            <span className="dash__stat-num dash__stat-num--ok">{disponiveis}</span>
            <span className="dash__stat-label">Disponíveis</span>
          </div>
          <div className="dash__stat">
            <span className="dash__stat-num dash__stat-num--off">{vendidos}</span>
            <span className="dash__stat-label">Vendidos</span>
          </div>
        </div>

        <div className="dash__topo-lista">
          <h2 className="dash__titulo">Veículos</h2>
          <Link to="/painel-interno/veiculos/novo" className="dash__btn-novo">
            + Adicionar veículo
          </Link>
        </div>

        {carregando ? (
          <div className="dash__loading"><div className="spinner" /></div>
        ) : veiculos.length === 0 ? (
          <div className="dash__vazio">
            <p>Nenhum veículo cadastrado ainda.</p>
            <Link to="/painel-interno/veiculos/novo" className="dash__btn-novo">
              Cadastrar primeiro veículo
            </Link>
          </div>
        ) : (
          <div className="dash__lista">
            {veiculos.map(v => {
              const img = v.imagens?.[0]?.url
              const preco = v.preco.toLocaleString('pt-BR', {
                style: 'currency', currency: 'BRL', minimumFractionDigits: 0
              })
              return (
                <div key={v.id} className={`dash__item ${v.vendido ? 'dash__item--vendido' : ''}`}>
                  <div className="dash__item-img">
                    {img
                      ? <img src={img} alt={v.titulo} />
                      : <span>Sem foto</span>
                    }
                  </div>

                  <div className="dash__item-info">
                    <div className="dash__item-topo">
                      <span className="dash__item-marca">{v.marca} · {v.ano}</span>
                      {v.vendido && <span className="dash__tag-vendido">Vendido</span>}
                    </div>
                    <p className="dash__item-titulo">{v.titulo}</p>
                    <p className="dash__item-preco">{preco}</p>
                  </div>

                  <div className="dash__item-acoes">
                    <Link
                      to={`/painel-interno/veiculos/${v.id}/editar`}
                      className="dash__acao dash__acao--editar"
                    >
                      Editar
                    </Link>
                    {!v.vendido && (
                      <button
                        className="dash__acao dash__acao--vendido"
                        onClick={() => handleVendido(v.id)}
                      >
                        Vendido
                      </button>
                    )}
                    <button
                      className="dash__acao dash__acao--deletar"
                      onClick={() => handleDeletar(v.id)}
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}