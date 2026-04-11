import { useState } from 'react'
import { useVehicles } from '../../hooks/useVehicles'
import Hero from '../../components/Hero/Hero'
import VehicleCard from '../../components/VehicleCard/VehicleCard'
import Filter from '../../components/Filter/Filter'
import './Home.css'

export default function Home() {
  const [filtros, setFiltros] = useState({})
  const { veiculos, carregando, erro } = useVehicles(filtros)
  const temFiltros = Object.keys(filtros).length > 0

  return (
    <>
      <Hero total={veiculos.length} />

      <section id="estoque" className="estoque">
        <div className="container">
          <div className="estoque__header">
            <div>
              <h2 className="estoque__titulo">Estoque completo</h2>
              <p className="estoque__sub">
                {carregando ? 'Carregando...' : `${veiculos.length} veículo${veiculos.length !== 1 ? 's' : ''} disponíve${veiculos.length !== 1 ? 'is' : 'l'}`}
              </p>
            </div>
          </div>

          <Filter onFiltrar={setFiltros} />

          {erro && <div className="estoque__erro">{erro}</div>}

          {carregando ? (
            <div className="estoque__loading">
              <div className="spinner" />
            </div>
          ) : veiculos.length === 0 ? (
            <div className="estoque__vazio">
              <span className="estoque__vazio-icone">◈</span>
              <p>{temFiltros ? 'Nenhum veículo encontrado com esses filtros.' : 'Nenhum veículo no estoque no momento.'}</p>
              {temFiltros && (
                <button className="estoque__limpar" onClick={() => setFiltros({})}>
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            <div className="estoque__grid">
              {veiculos.map((v, i) => (
                <div key={v.id} style={{ animationDelay: `${i * 0.05}s` }}>
                  <VehicleCard veiculo={v} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="rodape">
        <div className="container rodape__inner">
          <span className="rodape__logo">◈ AutoRevenda</span>
          <span className="rodape__copy">© {new Date().getFullYear()} · Todos os direitos reservados</span>
        </div>
      </footer>
    </>
  )
}