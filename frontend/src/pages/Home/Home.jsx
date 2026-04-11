import { useState } from 'react'
import { useVehicles } from '../../hooks/useVehicles'
import Hero from '../../components/Hero/Hero'
import VehicleCard from '../../components/VehicleCard/VehicleCard'
import Filter from '../../components/Filter/Filter'
import SobrePreview from '../../components/SobrePreview/SobrePreview'
import './Home.css'
import Sobre from '../Sobre/Sobre'

export default function Home() {
  const [filtros, setFiltros] = useState({})
  const { veiculos, carregando, erro } = useVehicles(filtros)
  const temFiltros = Object.keys(filtros).length > 0

  return (
    <>
      <Hero total={veiculos.length} />

      <section id="catalogo" className="catalogo">
        <div className="container">
          <div className="catalogo__header">
            <div className="catalogo__header-esq">
              <div className="catalogo__linha-red" />
              <div>
                <h2 className="catalogo__titulo">Catálogo</h2>
                <p className="catalogo__sub">
                  {carregando
                    ? 'Carregando veículos...'
                    : `${veiculos.length} veículo${veiculos.length !== 1 ? 's' : ''} encontrado${veiculos.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
            </div>
          </div>

          <Filter onFiltrar={setFiltros} />

          {erro && <div className="catalogo__erro">{erro}</div>}

          {carregando ? (
            <div className="catalogo__loading"><div className="spinner" /></div>
          ) : veiculos.length === 0 ? (
            <div className="catalogo__vazio">
              <div className="catalogo__vazio-icone">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
              <p>{temFiltros ? 'Nenhum veículo encontrado com esses filtros.' : 'Estoque vazio no momento.'}</p>
              {temFiltros && (
                <button className="catalogo__limpar" onClick={() => setFiltros({})}>
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            <div className="catalogo__grid">
              {veiculos.map((v, i) => (
                <div key={v.id} style={{ animationDelay: `${i * 0.05}s` }}>
                  <VehicleCard veiculo={v} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* <SobrePreview /> */}
      <Sobre />
    </>
  )
}