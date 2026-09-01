import { NavLink, Link } from 'react-router-dom';
import Watherwidget from '../Weatherwidget/Weatherwidget';
import ribbonImg from '../../assets/img/ribbon.png';
import './Header.css';

const navLinks = [
    { label: 'Inicio', to: '/' },
    { label: 'Vendedores', to: '/salespeople' },
    { label: 'Historia', to: '/history' },
    { label: 'Tienda', to: '/store' },
    { label: 'Usuarios', to: '/users' },
];

const Header = () => {
    return (
        <header className="siteHeader">
            <Link to="/" className="brandRibbonLink" aria-label="Mercatum Regni - Inicio">
                <img
                    src={ribbonImg}
                    alt=""
                    aria-hidden="true"
                    className="brandRibbonImg"
                />
                <span className="brandRibbonText">MERCATUM REGNI</span>
            </Link>

            <nav className="mainNav" aria-label="Navegación principal">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `navLink ${isActive ? 'activeNavLink' : ''}`}
                        end={link.to === '/'}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && <span className="navStar">✦</span>}
                                <span className="navLabel">{link.label}</span>
                                {isActive && <span className="navStar">✦</span>}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <Watherwidget place="Tu villa" />
        </header>
    );
};

export default Header;