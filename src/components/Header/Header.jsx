import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import Watherwidget from '../Weatherwidget/Weatherwidget';
import ribbon from '../../assets/img/ribbon.png';
import './Header.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Vendedores', to: '/salespeople' },
  { label: 'Historia', to: '/history' },
  { label: 'Tienda', to: '/store' },
  { label: 'Usuarios', to: '/users' },
];

const Header = () => {
  
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="siteHeader">
      <Link to="/" className="logoRibbon">
        <img src={ribbon} alt="" className="logoRibbonImage" />
        <div className="logoTextOverlay">
          <span className="logoStar">✦</span>
          <span className="logoText">Mercatum Regni</span>
          <span className="logoStar">✦</span>
        </div>
      </Link>

      <nav className={`mainNav ${menuOpen ? 'mainNavOpen' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `navLink ${isActive ? 'navLinkActive' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="navLinkStar">✦</span>}
                {link.label}
                {isActive && <span className="navLinkStar">✦</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="headerRight">
        <Watherwidget place="Tu villa" />

        <button
          type="button"
          className="menuToggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú de navegación"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
