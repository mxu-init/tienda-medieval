import React from 'react';
import { Link } from 'react-router-dom';
import BannerComp from '../../components/Bannerx/Bannerx';
import stoneImg from '../../assets/img/stone.jpg';
import parchmentImg from '../../assets/img/parchment.jpg';
import bannerImg from '../../assets/img/banner.png';
import lanternImg from '../../assets/img/lantern.png';
import marketImg from '../../assets/img/market.jpg';
import sealImg from '../../assets/img/seal.png';
import './Home.css';

const VIRTUDES = [
    { t: 'Honor', d: 'Cada trato se cierra con palabra dada y sello de cera.' },
    { t: 'Calidad', d: 'Obras de artesanos examinadas por el gremio del reino.' },
    { t: 'Confianza', d: 'Miles de clientes en villas, burgos y castillos.' }
];

const Home = () => {
    return (
        <div
            className="home-medieval-shell"
            style={{
                backgroundColor: 'oklch(0.19 0.012 60)',
                backgroundImage: `url(${stoneImg})`,
                backgroundSize: '620px',
                backgroundRepeat: 'repeat'
            }}
        >
            <div className="home-overlay">
                {/* Mobile Heraldry Header (below lg screens) */}
                <div className="mobile-heraldry">
                    <img
                        src={bannerImg}
                        alt="Estandarte con león rampante dorado"
                        className="mobile-banner-img"
                    />
                    <img
                        src={lanternImg}
                        alt="Farol de latón"
                        className="mobile-lantern-img"
                    />
                </div>

                <div className="home-layout-body">
                    {/* Left Rail Sidebar (lg screens) */}
                    <aside className="left-rail">
                        <img
                            src={bannerImg}
                            alt="Estandarte con león rampante dorado"
                            className="left-rail-banner"
                        />
                        <span className="left-rail-lantern-glow" />
                        <img
                            src={lanternImg}
                            alt="Farol de latón"
                            className="left-rail-lantern"
                        />
                    </aside>

                    {/* Main Parchment Surface Panel */}
                    <main
                        className="parchment-panel"
                        style={{
                            backgroundImage: `url(${parchmentImg})`,
                            backgroundSize: '1600px',
                            backgroundRepeat: 'repeat'
                        }}
                    >
                        <div className="parchment-content">
                            {/* Page Header */}
                            <header className="page-header">
                                <span aria-hidden="true" className="vellum-wash" />
                                <h1 className="page-title">Mercatum Regni</h1>
                                <div className="ornament-divider">
                                    <span className="ink-rule" />
                                    <svg
                                        width="46"
                                        height="12"
                                        viewBox="0 0 46 12"
                                        fill="none"
                                        className="ornament-svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M23 1c2.4 0 3.6 1.8 3.6 3.4 0 1.6-1.2 2.6-2.4 2.6-1 0-1.8-.6-1.8-1.5 0-.8.6-1.3 1.2-1.3"
                                            stroke="currentColor"
                                            strokeWidth="0.9"
                                        />
                                        <path
                                            d="M23 1c-2.4 0-3.6 1.8-3.6 3.4 0 1.6 1.2 2.6 2.4 2.6 1 0 1.8-.6 1.8-1.5 0-.8-.6-1.3-1.2-1.3"
                                            stroke="currentColor"
                                            strokeWidth="0.9"
                                        />
                                        <path d="M0 6h14M32 6h14" stroke="currentColor" strokeWidth="0.9" />
                                        <path d="M15.5 4l2 2-2 2M30.5 4l-2 2 2 2" stroke="currentColor" strokeWidth="0.9" />
                                    </svg>
                                    <span className="ink-rule" />
                                </div>
                            </header>

                            {/* Top Featured Goods Section / Banner Carousel Component */}
                            <div className="banner-carousel-section">
                                <div className="vellum-box banner-heading-box">
                                    <h2 className="section-subtitle">
                                        Las cinco mercancías más preciadas
                                    </h2>
                                </div>
                                <BannerComp />
                            </div>

                            {/* Market Welcome Intro Section */}
                            <div className="welcome-grid">
                                <div className="vellum-box intro-text-box">
                                    <p>
                                        Bienvenido al mercado del reino, donde mercaderes y artesanos exponen sus
                                        mejores obras bajo el amparo del gremio.
                                    </p>
                                    <p>
                                        Armas forjadas, arneses, libros iluminados y remedios de botica esperan al
                                        viajero que cruce nuestras puertas.
                                    </p>
                                    <div className="action-buttons-group">
                                        <Link to="/tienda" className="ink-btn-link">
                                            <button type="button" className="ink-button ink-button-solid">
                                                Visitar la tienda
                                            </button>
                                        </Link>
                                        <Link to="/vendedores" className="ink-btn-link">
                                            <button type="button" className="ink-button ink-button-outline">
                                                Conocer el gremio
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="market-img-wrapper">
                                    <img
                                        src={marketImg}
                                        alt="Grabado de un puesto de mercado medieval"
                                        className="market-engraving-img"
                                    />
                                </div>
                            </div>

                            {/* Virtues Cards Section */}
                            <div className="virtues-grid">
                                {VIRTUDES.map((v) => (
                                    <article key={v.t} className="parchment-card">
                                        <span className="card-inner-frame" />
                                        <div className="card-content">
                                            <h3 className="card-title">{v.t}</h3>
                                            <p className="card-desc">{v.d}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Seal Divider Section */}
                            <div className="seal-divider-wrapper">
                                <div className="seal-divider">
                                    <span className="ink-rule divider-rule" />
                                    <svg width="16" height="10" viewBox="0 0 16 10" className="divider-diamond" aria-hidden="true">
                                        <path d="M8 0l4 5-4 5-4-5z" fill="currentColor" opacity=".7" />
                                    </svg>
                                    <img
                                        src={sealImg}
                                        alt="Sello de cera de Mercatum Regni"
                                        className="seal-img"
                                    />
                                    <svg width="16" height="10" viewBox="0 0 16 10" className="divider-diamond" aria-hidden="true">
                                        <path d="M8 0l4 5-4 5-4-5z" fill="currentColor" opacity=".7" />
                                    </svg>
                                    <span className="ink-rule divider-rule" />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Home;
