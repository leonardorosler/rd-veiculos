import './Sobre.css'

export default function Sobre() {
    return (
        <div className="sobre">

            {/* Hero interno */}
            <div className="sobre__hero">
                <div className="sobre__hero-fundo" />
                <div className="container sobre__hero-conteudo">
                    <span className="sobre__badge">Quem somos</span>
                    <h1 className="sobre__hero-titulo">
                        Referência em veículos<br />
                        <span className="sobre__hero-red">no Rio Grande do Sul</span>
                    </h1>
                    <p className="sobre__hero-sub">
                        A RD Veículos e Financiamentos é uma empresa sólida, construída com base
                        na confiança e no atendimento de excelência. Estamos localizados no coração
                        de Morro Redondo, prontos para realizar o seu sonho.
                    </p>
                </div>
            </div>

            {/* Diferenciais */}
            <section className="sobre__dif">
                <div className="container">
                    <div className="sobre__dif-grid">
                        {[
                            { icone: '🏅', titulo: 'Qualidade Comprovada', texto: 'Todos os veículos passam por rigorosa inspeção antes de entrar no nosso estoque.' },
                            { icone: '💰', titulo: 'Melhores Taxas', texto: 'Trabalhamos com os principais bancos para oferecer as melhores condições de financiamento do mercado.' },
                            { icone: '🔄', titulo: 'Troca Facilitada', texto: 'Avaliamos seu veículo com transparência e oferecemos o melhor valor na troca.' },
                        ].map(d => (
                            <div key={d.titulo} className="sobre__card">
                                <div className="sobre__card-icone">{d.icone}</div>
                                <h3 className="sobre__card-titulo">{d.titulo}</h3>
                                <p className="sobre__card-texto">{d.texto}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contato */}
            <section className="sobre__contato">
                <div className="container">
                    <div className="sobre__contato-header">
                        <div className="catalogo__linha-red" style={{ width: '4px', height: '48px', background: 'var(--red)', borderRadius: '2px', boxShadow: '0 0 12px var(--red-glow)' }} />
                        <div>
                            <h2 className="sobre__contato-titulo">Entre em Contato</h2>
                            <p className="sobre__contato-sub">Estamos prontos para atender você da melhor forma possível.</p>
                        </div>
                    </div>

                    <div className="sobre__contato-grid">
                        <div className="sobre__info-card">
                            <div className="sobre__info-icone">📍</div>
                            <div>
                                <h4 className="sobre__info-titulo">Endereço</h4>
                                <p className="sobre__info-texto">Av. Jacarandá, 233 - Centro</p>
                                <p className="sobre__info-texto">Morro Redondo - RS, 96150-000</p>
                            </div>
                        </div>

                        <div className="sobre__info-card">
                            <div className="sobre__info-icone">📞</div>
                            <div>
                                <h4 className="sobre__info-titulo">Telefone / WhatsApp</h4>
                                <p className="sobre__info-texto">(53) 9 9999-9999</p>
                                <a href="https://wa.me/5553999999999"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sobre__wpp-link">


                                    Chamar no WhatsApp →
                                </a>
                            </div>
                        </div>

                        <div className="sobre__info-card">
                            <div className="sobre__info-icone">🕐</div>
                            <div>
                                <h4 className="sobre__info-titulo">Horário de Funcionamento</h4>
                                <p className="sobre__info-texto">Seg – Sex: 08h às 18h</p>
                                <p className="sobre__info-texto">Sábado: 08h às 12h</p>
                                <p className="sobre__info-texto" style={{ color: 'var(--texto-ter)' }}>Domingo: Fechado</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA WhatsApp */}
                    <div className="sobre__cta">
                        <div className="sobre__cta-inner">
                            <div>
                                <h3 className="sobre__cta-titulo">Fale Agora</h3>
                                <p className="sobre__cta-sub">Atendimento rápido e personalizado pelo WhatsApp</p>
                            </div>
                            <a href="https://wa.me/5553999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sobre__cta-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                                </svg>
                                WhatsApp Agora
                            </a>
                        </div>
                    </div>

                    {/* Mapa */}
                    <div className="sobre__mapa">
                        <div className="sobre__mapa-header">
                            <span>📍</span>
                            <span>Av. Jacarandá, 233 — Centro, Morro Redondo - RS</span>
                        </div>
                        <iframe
                            className="sobre__mapa-frame"
                            title="Localização RD Veículos"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.0!2d-52.63!3d-31.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMyJzI0LjAiUyA1MsKwMzcnNDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>
            </section >
        </div >
    )
}