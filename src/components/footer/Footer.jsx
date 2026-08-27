import React from 'react';
import { Link } from 'react-router-dom';
import ribbon from '../../assets/img/ribbon.png';
import './Footer.css';


const footerNavLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Vendedores', to: '/salespeople' },
  { label: 'Historia', to: '/history' },
  { label: 'Tienda', to: '/store' },
  { label: 'Usuarios', to: '/users' },
];


const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="siteFooter">
      <div className="footerContent">
        <div className="footerBrand">
          <img
            src={ribbon}
            alt="Sello del gremio Mercatum Regni"
            className="footerSeal"
          />
          <div>
            <h3 className="footerTitle">Mercatum Regni</h3>
            <p className="footerTagline">
              Gremio de mercaderes y artesanos al servicio del reino desde el
              año 1024.
            </p>
          </div>
        </div>

        <div className="footerColumn">
          <h4 className="footerHeading">Secciones</h4>
          <nav className="footerLinks">
            {footerNavLinks.map((link) => (
              <Link key={link.to} to={link.to} className="footerLink">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footerColumn">
          <h4 className="footerHeading">Cartas y fuentes</h4>
          <ul className="footerSources">
            <li>
              Mercancías y súbditos:{' '}
              <a
                href="https://fakeapi.platzi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footerSourceLink"
              >
                FakeAPI Platzi
              </a>
            </li>
            <li>
              Parte del cielo:{' '}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footerSourceLink"
              >
                Open-Meteo
              </a>
            </li>
            <li>Forjado con React, TanStack Start y Tailwind.</li>
          </ul>
        </div>
      </div>

      <div className="footerBottom">
        <p>
          © {currentYear} Mercatum Regni · Todos los fueros reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
