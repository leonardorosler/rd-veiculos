import './Hero.css'
import golImage from './gol-hero.png'

export default function Hero({ total }) {
  function rolar() {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero__fundo">
        <div className="hero__linhas" />
        <div className="hero__glow-esq" />
        <div className="hero__glow-dir" />
      </div>

      <div className="hero__conteudo">
        {/* Coluna Esquerda - Conteúdo */}
        <div>
          <div className="hero__badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            </svg>
            Referência em Morro Redondo
          </div>

          <h1 className="hero__titulo">
            Os melhores
            <span className="hero__titulo-red">carros</span>
            da região
          </h1>

          <p className="hero__sub">
            Novos e seminovos com procedência garantida, financiamento facilitado e atendimento personalizado. Venha realizar o sonho do seu veículo ideal.
          </p>

          <div className="hero__acoes">
            <button className="hero__btn-pri" onClick={rolar}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 12h18M13 5l7 7-7 7" />
              </svg>
              Ver veículos disponíveis
            </button>
            <a href="https://wa.me/5553999513430" target="_blank" rel="noopener noreferrer" className="hero__btn-sec">
              Fale conosco
            </a>
          </div>

          <div className="hero__nums">
            <div className="hero__num">
              <span className="hero__num-val">200<span style={{color: 'var(--red)', fontSize: '0.8em'}}>+</span></span>
              <span className="hero__num-txt">Veículos vendidos</span>
            </div>
            <div className="hero__num">
              <span className="hero__num-val">10<span style={{color: 'var(--red)', fontSize: '0.8em'}}>+</span></span>
              <span className="hero__num-txt">Anos de mercado</span>
            </div>
            <div className="hero__num">
              <span className="hero__num-val">100%</span>
              <span className="hero__num-txt">Satisfação</span>
            </div>
          </div>
        </div>

        {/* Coluna Direita - Visual */}
        <div className="hero__visual">
          <div className="hero__card-float hero__card-float--1">
            <div className="hero__card-label">Financiamento em</div>
            <div className="hero__card-value">
              <span className="hero__card-value--red">48x</span> ✓
            </div>
          </div>
          <div className="hero__card-float hero__card-float--2">
            <div className="hero__card-label">Seminovos a partir de</div>
            <div className="hero__card-value">
              R$ <span className="hero__card-value--red">35k</span>
            </div>
          </div>

          {/* Imagem Real do Gol */}
          <img
            src={golImage}
            alt="Volkswagen Gol 2025 Vermelho"
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '550px',
              filter: 'drop-shadow(0 40px 100px rgba(220,38,38,0.35))',
              animation: 'fadeInRight 1s var(--ease) 0.2s both'
            }}
          />
        </div>
      </div>
    </section>
  )
}
