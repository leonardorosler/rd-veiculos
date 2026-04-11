import { useState } from 'react'
import './Filter.css'

const TIPOS = ['', 'carro', 'moto', 'caminhao']
const COMBUSTIVEIS = ['', 'flex', 'gasolina', 'etanol', 'diesel', 'elétrico', 'híbrido']

export default function Filter({ onFiltrar }) {
  const [filtros, setFiltros] = useState({
    marca: '',
    modelo: '',
    tipo: '',
    anoMin: '',
    anoMax: '',
    precoMin: '',
    precoMax: '',
    quilometragemMax: ''
  })

  function atualizar(campo, valor) {
    setFiltros(prev => ({ ...prev, [campo]: valor }))
  }

  function aplicar(e) {
    e.preventDefault()
    const limpos = Object.fromEntries(
      Object.entries(filtros).filter(([, v]) => v !== '')
    )
    onFiltrar(limpos)
  }

  function limpar() {
    setFiltros({
      marca: '', modelo: '', tipo: '',
      anoMin: '', anoMax: '',
      precoMin: '', precoMax: '',
      quilometragemMax: ''
    })
    onFiltrar({})
  }

  return (
    <form className="filter" onSubmit={aplicar}>
      <div className="filter__grid">
        <div className="filter__grupo">
          <label className="filter__label">Marca</label>
          <input
            className="filter__input"
            placeholder="Ex: Honda"
            value={filtros.marca}
            onChange={e => atualizar('marca', e.target.value)}
          />
        </div>

        <div className="filter__grupo">
          <label className="filter__label">Modelo</label>
          <input
            className="filter__input"
            placeholder="Ex: Civic"
            value={filtros.modelo}
            onChange={e => atualizar('modelo', e.target.value)}
          />
        </div>

        <div className="filter__grupo">
          <label className="filter__label">Tipo</label>
          <select
            className="filter__input"
            value={filtros.tipo}
            onChange={e => atualizar('tipo', e.target.value)}
          >
            <option value="">Todos</option>
            <option value="carro">Carro</option>
            <option value="moto">Moto</option>
            <option value="caminhao">Caminhão</option>
          </select>
        </div>

        <div className="filter__grupo">
          <label className="filter__label">Ano</label>
          <div className="filter__duplo">
            <input
              className="filter__input"
              placeholder="De"
              type="number"
              value={filtros.anoMin}
              onChange={e => atualizar('anoMin', e.target.value)}
            />
            <input
              className="filter__input"
              placeholder="Até"
              type="number"
              value={filtros.anoMax}
              onChange={e => atualizar('anoMax', e.target.value)}
            />
          </div>
        </div>

        <div className="filter__grupo">
          <label className="filter__label">Preço (R$)</label>
          <div className="filter__duplo">
            <input
              className="filter__input"
              placeholder="Mínimo"
              type="number"
              value={filtros.precoMin}
              onChange={e => atualizar('precoMin', e.target.value)}
            />
            <input
              className="filter__input"
              placeholder="Máximo"
              type="number"
              value={filtros.precoMax}
              onChange={e => atualizar('precoMax', e.target.value)}
            />
          </div>
        </div>

        <div className="filter__grupo">
          <label className="filter__label">KM máximo</label>
          <input
            className="filter__input"
            placeholder="Ex: 50000"
            type="number"
            value={filtros.quilometragemMax}
            onChange={e => atualizar('quilometragemMax', e.target.value)}
          />
        </div>
      </div>

      <div className="filter__acoes">
        <button type="button" className="filter__btn-limpar" onClick={limpar}>
          Limpar
        </button>
        <button type="submit" className="filter__btn-buscar">
          Buscar veículos
        </button>
      </div>
    </form>
  )
}