import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(!menuOpen)
  }

  function fecharMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="RD Veículos" className="navbar__logo-img" />
          <div className="navbar__logo-texto">
            <span className="navbar__logo-nome">RD Veículos</span>
            <span className="navbar__logo-sub">& Financiamentos</span>
          </div>
        </Link>

        {/* BOTÃO HAMBURGUER */}
        <div 
          className={`navbar__toggle ${menuOpen ? 'ativo' : ''}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* LINKS */}
        <div className={`navbar__links ${menuOpen ? 'ativo' : ''}`}>

          <Link to="/" className="navbar__link" onClick={fecharMenu}>
            Início
          </Link>

          <button className="navbar__link" onClick={() => {
            document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
            fecharMenu()
          }}>
            Catálogo
          </button>

          <button className="navbar__link" onClick={() => {
            document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })
            fecharMenu()
          }}>
            Sobre
          </button>

          <a
            href="https://wa.me/5553999513430"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__wpp"
            onClick={fecharMenu}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  )
}