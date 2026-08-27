import React from 'react';
import { Link } from "react-router-dom";
import Watherwidget from '../Weatherwidget/Watherwidget';
import './Header.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Vendedores', to: '/salespeople' },
  { label: 'Historia', to: '/history' },
  { label: 'Tienda', to: '/store' },
  { label: 'Usuarios', to: '/users' },
];

const Header = () => {
  return (
    <header className="siteHeader">
            <Link to="/" className="logoRibbon">
                <span className="logoStar">✦</span>
                <span className="logoText">Mercatum Regni</span>
                <span className="logoStar">✦</span>
            </Link>

            <nav className="mainNav">
                {navLinks.map((link) => (
                    <Link key={link.to} to={link.to} className="navLink">
                        {link.label}
                    </Link>
                ))}
            </nav>

            <Watherwidget place="Tu villa" />
        </header>
  );
};

export default Header;