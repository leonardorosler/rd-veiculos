import { useState } from 'react'
import './Filter.css'

export default function Filter({ onFiltrar }) {
  const [aberto, setAberto] = useState(false)
  const [busca, setBusca] = useState('')
  const [filtros, setFiltros] = useState({
    tipo: '', precoMax: '', anoMin: '', quilometragemMax: ''
  })

  function atualizar(campo, valor) {
    setFiltros(p => ({ ...p, [campo]: valor }))
  }

  function aplicar(e) {
    e?.preventDefault()
    const params = {}
    if (busca.trim()) params.marca = busca.trim()
    Object.entries(filtros).forEach(([k, v]) => { if (v) params[k] = v })
    onFiltrar(params)
  }

  function limpar() {
    setBusca('')
    setFiltros({ tipo: '', precoMax: '', anoMin: '', quilometragemMax: '' })
    onFiltrar({})
  }

  const temFiltros = busca || Object.values(filtros).some(v => v)

  return (
    <div className="filtro">
      {/* Barra principal de busca */}
      <div className="filtro__barra">
        <div className="filtro__busca-wrap">
          <svg className="filtro__busca-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="filtro__busca"
            placeholder="Buscar por marca, modelo ou ano..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && aplicar()}
          />
          {busca && (
            <button className="filtro__busca-clear" onClick={() => { setBusca(''); onFiltrar({}) }}>×</button>
          )}
        </div>

        <button className="filtro__toggle" onClick={() => setAberto(p => !p)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="8" y1="12" x2="20" y2="12"/>
            <line x1="12" y1="18" x2="20" y2="18"/>
          </svg>
          Filtros
          {temFiltros && <span className="filtro__badge">•</span>}
        </button>

        <button className="filtro__btn-buscar" onClick={aplicar}>
          Buscar
        </button>
      </div>

      {/* Filtros avançados */}
      {aberto && (
        <div className="filtro__avancado">
          <div className="filtro__avancado-grid">
            <div className="filtro__grupo">
              <label className="filtro__label">Tipo</label>
              <div className="filtro__chips">
                {['', 'carro', 'moto', 'caminhao'].map(t => (
                  <button
                    key={t}
                    type="button"
                    className={`filtro__chip ${filtros.tipo === t ? 'ativo' : ''}`}
                    onClick={() => atualizar('tipo', t)}
                  >
                    {t === '' ? 'Todos' : t === 'caminhao' ? 'Caminhão' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="filtro__grupo">
              <label className="filtro__label">Ano mínimo</label>
              <select className="filtro__select" value={filtros.anoMin} onChange={e => atualizar('anoMin', e.target.value)}>
                <option value="">Qualquer</option>
                {Array.from({length: 15}, (_, i) => 2024 - i).map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="filtro__grupo">
              <label className="filtro__label">Preço máximo</label>
              <select className="filtro__select" value={filtros.precoMax} onChange={e => atualizar('precoMax', e.target.value)}>
                <option value="">Qualquer</option>
                {[30000,50000,70000,100000,150000,200000].map(p => (
                  <option key={p} value={p}>Até {p.toLocaleString('pt-BR', {style:'currency',currency:'BRL',minimumFractionDigits:0})}</option>
                ))}
              </select>
            </div>

            <div className="filtro__grupo">
              <label className="filtro__label">KM máximo</label>
              <select className="filtro__select" value={filtros.quilometragemMax} onChange={e => atualizar('quilometragemMax', e.target.value)}>
                <option value="">Qualquer</option>
                {[30000,50000,80000,100000,150000].map(k => (
                  <option key={k} value={k}>Até {k.toLocaleString('pt-BR')} km</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filtro__avancado-rodape">
            <button type="button" className="filtro__limpar" onClick={limpar}>
              Limpar tudo
            </button>
            <button type="button" className="filtro__aplicar" onClick={aplicar}>
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}