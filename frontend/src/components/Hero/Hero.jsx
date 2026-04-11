import './Hero.css'

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

      <div className="container hero__conteudo">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Morro Redondo — RS
        </div>

        <h1 className="hero__titulo">
          Os melhores<br />
          <span className="hero__titulo-red">seminovos</span><br />
          da região
        </h1>

        <p className="hero__sub">
          Veículos inspecionados, financiamento facilitado e atendimento que você não esquece.
        </p>

        <div className="hero__acoes">
          <button className="hero__btn-pri" onClick={rolar}>
            Ver catálogo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <a href="https://wa.me/5553999999999" target="_blank" rel="noopener noreferrer" className="hero__btn-sec">
            Falar com consultor
          </a>
        </div>

        <div className="hero__nums">
          <div className="hero__num">
            <span className="hero__num-val">{total || '0'}</span>
            <span className="hero__num-txt">Em estoque</span>
          </div>
          <div className="hero__num-div" />
          <div className="hero__num">
            <span className="hero__num-val">100%</span>
            <span className="hero__num-txt">Inspecionados</span>
          </div>
          <div className="hero__num-div" />
          <div className="hero__num">
            <span className="hero__num-val">+10</span>
            <span className="hero__num-txt">Anos de mercado</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint" onClick={rolar}>
        <div className="hero__scroll-seta" />
      </div>
    </section>
  )
}