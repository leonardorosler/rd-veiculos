import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import './Login.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', senha: '' })
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await login(form.email, form.senha)
      navigate('/painel-interno/dashboard')
    } catch {
      setErro('Email ou senha incorretos.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__topo">
          <span className="login__logo">◈</span>
          <h1 className="login__titulo">Painel interno</h1>
          <p className="login__sub">Acesso restrito</p>
        </div>

        {erro && <div className="login__erro">{erro}</div>}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__campo">
            <label className="login__label">Email</label>
            <input
              className="login__input"
              type="email"
              placeholder="admin@autorevenda.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
            />
          </div>

          <div className="login__campo">
            <label className="login__label">Senha</label>
            <input
              className="login__input"
              type="password"
              placeholder="••••••••"
              value={form.senha}
              onChange={e => setForm(p => ({ ...p, senha: e.target.value }))}
              required
            />
          </div>

          <button className="login__btn" type="submit" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}