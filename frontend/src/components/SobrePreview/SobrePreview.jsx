import { Link } from 'react-router-dom'
import './SobrePreview.css'

export default function SobrePreview() {
  return (
    <section className="sobre-prev">
      <div className="container">
        <div className="sobre-prev__inner">

          <div className="sobre-prev__esq">
            <span className="sobre-prev__badge">Sobre nós</span>
            <h2 className="sobre-prev__titulo">
              Referência em veículos<br />
              <span className="sobre-prev__titulo-red">no Rio Grande do Sul</span>
            </h2>
            <p className="sobre-prev__texto">
              A RD Veículos e Financiamentos é uma empresa sólida, construída com base
              na confiança e no atendimento de excelência. Estamos localizados no
              coração de Morro Redondo, prontos para realizar o seu sonho.
            </p>
            <Link to="/sobre" className="sobre-prev__btn">
              Conheça nossa história →
            </Link>
          </div>

          <div className="sobre-prev__dir">
            {[
              { icone: '🏅', titulo: 'Qualidade Comprovada', texto: 'Todos os veículos passam por rigorosa inspeção antes de entrar no estoque.' },
              { icone: '💰', titulo: 'Melhores Taxas', texto: 'Trabalhamos com os principais bancos para as melhores condições de financiamento.' },
              { icone: '🔄', titulo: 'Troca Facilitada', texto: 'Avaliamos seu veículo com transparência e o melhor valor na troca.' },
            ].map((item, i) => (
              <div key={i} className="sobre-prev__card">
                <span className="sobre-prev__card-icone">{item.icone}</span>
                <div>
                  <h4 className="sobre-prev__card-titulo">{item.titulo}</h4>
                  <p className="sobre-prev__card-texto">{item.texto}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}