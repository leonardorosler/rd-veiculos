import { Link } from 'react-router-dom'
import './VehicleCard.css'

export default function VehicleCard({ veiculo }) {
  const img = veiculo.imagens?.[0]?.url

  const preco = veiculo.preco.toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL', minimumFractionDigits: 0
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
        {veiculo.vendido && <span className="vcard__tag vcard__tag--vendido">Vendido</span>}
        <span className="vcard__tag vcard__tag--tipo">{veiculo.tipo}</span>
      </div>

      <div className="vcard__corpo">
        <div className="vcard__topo">
          <span className="vcard__marca">{veiculo.marca}</span>
          <span className="vcard__ano">{veiculo.ano}</span>
        </div>

        <h3 className="vcard__titulo">{veiculo.titulo}</h3>

        <div className="vcard__specs">
          <span>{km} km</span>
          <span className="vcard__ponto">·</span>
          <span>{veiculo.combustivel}</span>
          <span className="vcard__ponto">·</span>
          <span>{veiculo.cor}</span>
        </div>

        <div className="vcard__rodape">
          <span className="vcard__preco">{preco}</span>
          <span className="vcard__seta">→</span>
        </div>
      </div>
    </Link>
  )
}