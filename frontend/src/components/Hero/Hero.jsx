import './Hero.css'

export default function Hero({ total }) {
    function scrollParaEstoque() {
        document.getElementById('estoque')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="hero">
            <div className="hero__fundo">
                <div className="hero__grade" />
                <div className="hero__brilho" />
            </div>

            <div className="container hero__conteudo">
                <div className="hero__badge">Estoque selecionado</div>
                <h1 className="hero__titulo">
                    Encontre seu<br />
                    <span className="hero__titulo-destaque">próximo veículo</span>
                </h1>
                <p className="hero__subtitulo">
                    {total > 0
                        ? `${total} veículo${total !== 1 ? 's' : ''} disponíve${total !== 1 ? 'is' : 'l'} com procedência garantida`
                        : 'Veículos selecionados com procedência garantida'
                    }
                </p>

                <div className="hero__acoes">
                    <button className="hero__btn-primario" onClick={scrollParaEstoque}>
                        Ver estoque completo
                    </button>
                    <a
                        href="https://wa.me/5551999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero__btn-secundario"
                    >
                        Falar com consultor
                    </a>
                </div>

                <div className="hero__stats">
                    <div className="hero__stat">
                        <span className="hero__stat-num">{total || '—'}</span>
                        <span className="hero__stat-label">Em estoque</span>
                    </div>
                    <div className="hero__divisor" />
                    <div className="hero__stat">
                        <span className="hero__stat-num">100%</span>
                        <span className="hero__stat-label">Procedência</span>
                    </div>
                    <div className="hero__divisor" />
                    <div className="hero__stat">
                        <span className="hero__stat-num">★ 5.0</span>
                        <span className="hero__stat-label">Avaliação</span>
                    </div>
                </div>
            </div>

            <div className="hero__scroll" onClick={scrollParaEstoque}>
                <div className="hero__scroll-seta" />
            </div>
        </section>
    )
}