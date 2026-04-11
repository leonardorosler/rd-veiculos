import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-mark">◈</span>
          <span className="navbar__logo-nome">AutoRevenda</span>
        </Link>

        <div className="navbar__links">
          <Link to="/" className="navbar__link">Estoque</Link>
          <a href="https://wa.me/5551999999999" target="_blank" rel="noopener noreferrer" className="navbar__link">
            Contato
          </a>
        </div>
      </div>
    </nav>
  )
}