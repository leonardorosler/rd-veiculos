import { Link } from 'react-router-dom'
import './Footer.css'
import logo from '../../assets/logo.png'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__glow" />
            <div className="container">
                <div className="footer__corpo">
                    <div className="footer__marca">
                        <div className="footer__logo">
                            <img src={logo} alt="RD Veículos" style={{width:'44px',height:'44px',objectFit:'contain',borderRadius:'8px'}} />
                            <div>
                                <span className="footer__logo-nome">RD Veículos</span>
                                <span className="footer__logo-sub">& Financiamentos</span>
                            </div>
                        </div>
                        <p className="footer__desc">
                            Os melhores carros novos e seminovos da região, com financiamento
                            facilitado e atendimento premium. Sua satisfação é nossa prioridade.
                        </p>
                        <a href="https://wa.me/5553999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__wpp">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                            </svg>
                            (53) 9 9999-9999
                        </a>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-titulo">Navegação</h4>
                        <nav className="footer__nav">
                            <Link to="/" className="footer__link">Catálogo</Link>
                            <Link to="/sobre" className="footer__link">Sobre Nós</Link>
                            <Link to="/sobre#contato" className="footer__link">Contato</Link>
                        </nav>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-titulo">Horários</h4>
                        <div className="footer__horarios">
                            <div className="footer__horario">
                                <span>Seg – Sex</span>
                                <span>08h às 18h</span>
                            </div>
                            <div className="footer__horario">
                                <span>Sábado</span>
                                <span>08h às 12h</span>
                            </div>
                            <div className="footer__horario footer__horario--fechado">
                                <span>Domingo</span>
                                <span>Fechado</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-titulo">Endereço</h4>
                        <p className="footer__endereco">
                            Av. Jacarandá, 233<br />
                            Centro — Morro Redondo<br />
                            RS, 96150-000
                        </p>
                    </div>
                </div>

                <div className="footer__base">
                    <span className="footer__copy">
                        © {new Date().getFullYear()} RD Veículos & Financiamentos — Todos os direitos reservados
                    </span>
                    <span className="footer__dev">
                        Desenvolvido com ♥ em Pelotas, RS
                    </span>
                </div>
            </div>
        </footer>
    )
}