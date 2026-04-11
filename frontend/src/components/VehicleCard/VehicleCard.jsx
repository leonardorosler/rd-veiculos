import { Link } from 'react-router-dom'
import './VehicleCard.css'

export default function VehicleCard({ veiculo }) {
  const img = veiculo.imagens?.[0]?.url
  const preco = veiculo.preco.toLocaleString('pt-BR', {
    style:'currency', currency:'BRL', minimumFractionDigits:0
  })
  const km = veiculo.quilometragem.toLocaleString('pt-BR')

  return (
    <Link to={`/veiculo/${veiculo.id}`} className="vcard">
      <div className="vcard__img">
        {img
          ? <img src={img} alt={veiculo.titulo} loading="lazy" />
          : <div className="vcard__sem-img"><span>Sem foto</span></div>
        }
        <div className="vcard__overlay" />
        <div className="vcard__tags">
          {veiculo.vendido
            ? <span className="vcard__tag vcard__tag--vendido">Vendido</span>
            : <span className="vcard__tag vcard__tag--disp">Disponível</span>
          }
          <span className="vcard__tag vcard__tag--tipo">{veiculo.tipo}</span>
        </div>
        <div className="vcard__preco-overlay">
          <span>{preco}</span>
        </div>
      </div>

      <div className="vcard__corpo">
        <div className="vcard__topo">
          <span className="vcard__marca">{veiculo.marca}</span>
          <span className="vcard__ano">{veiculo.ano}</span>
        </div>
        <h3 className="vcard__titulo">{veiculo.titulo}</h3>
        <div className="vcard__specs">
          <span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
            {km} km
          </span>
          <span>{veiculo.combustivel}</span>
          <span>{veiculo.cor}</span>
        </div>
        <div className="vcard__rodape">
          <span className="vcard__preco">{preco}</span>
          <span className="vcard__ver">Ver detalhes →</span>
        </div>
      </div>
    </Link>
  )
}