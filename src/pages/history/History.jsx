import React from 'react';
import stoneImg from '../../assets/img/stone.jpg';
import parchmentImg from '../../assets/img/parchment.jpg';
import bannerImg from '../../assets/img/banner.png';
import lanternImg from '../../assets/img/lantern.png';
import townImg from '../../assets/img/town.jpg';
import sealImg from '../../assets/img/seal.png';
import './History.css';

const History = () => {
    return (
        <div
            className="homeMedievalShell"
            style={{
                backgroundColor: 'oklch(0.19 0.012 60)',
                backgroundImage: `url(${stoneImg})`,
                backgroundSize: '620px',
                backgroundRepeat: 'repeat'
            }}
        >
            <div className="homeOverlay">
                {/* Mobile Heraldry Header (below lg screens) */}
                <div className="mobileHeraldry">
                    <img
                        src={bannerImg}
                        alt="Estandarte con león rampante dorado"
                        className="mobileBannerImg"
                    />
                    <img
                        src={lanternImg}
                        alt="Farol de latón"
                        className="mobileLanternImg"
                    />
                </div>

                <div className="homeLayoutBody">
                    {/* Left Rail Sidebar (lg screens) */}
                    <aside className="leftRail">
                        <img
                            src={bannerImg}
                            alt="Estandarte con león rampante dorado"
                            className="leftRailBanner"
                        />
                        <span className="leftRailLanternGlow" />
                        <img
                            src={lanternImg}
                            alt="Farol de latón"
                            className="leftRailLantern"
                        />
                    </aside>

                    {/* Main Parchment Surface Panel */}
                    <main
                        className="parchmentPanel"
                        style={{
                            backgroundImage: `url(${parchmentImg})`,
                            backgroundSize: '1600px',
                            backgroundRepeat: 'repeat'
                        }}
                    >
                        <div className="parchmentContent">
                            {/* Page Header */}
                            <header className="pageHeader">
                                <span aria-hidden="true" className="vellumWash" />
                                <h1 className="pageTitle">Nuestra Historia</h1>
                                <div className="ornamentDivider">
                                    <span className="inkRule" />
                                    <svg
                                        width="46"
                                        height="12"
                                        viewBox="0 0 46 12"
                                        fill="none"
                                        className="ornamentSvg"
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
                                    <span className="inkRule" />
                                </div>
                            </header>

                            {/* Texto de la historia + ilustración de la villa */}
                            <div className="historyGrid">
                                <div className="vellumBox historyTextBox">
                                    <p>
                                        Mercatum Regni nace en el año 1024, cuando un grupo de
                                        comerciantes y artesanos decidieron unir sus fuerzas para
                                        ofrecer productos extraordinarios a todo el reino.
                                    </p>
                                    <p>
                                        Inspirados por los valores de honor, calidad y confianza,
                                        hemos recorrido un largo camino para convertirnos en la
                                        tienda preferida de miles de clientes.
                                    </p>
                                    <p>Hoy, seguimos escribiendo nuestra historia contigo.</p>
                                </div>

                                <div className="historyImgWrapper">
                                    <img
                                        src={townImg}
                                        alt="Grabado de una villa medieval con castillo al fondo"
                                        className="historyEngravingImg"
                                    />
                                </div>
                            </div>

                            {/* Seal Divider Section */}
                            <div className="sealDividerWrapper">
                                <div className="sealDivider">
                                    <span className="inkRule dividerRule" />
                                    <svg width="16" height="10" viewBox="0 0 16 10" className="dividerDiamond" aria-hidden="true">
                                        <path d="M8 0l4 5-4 5-4-5z" fill="currentColor" opacity=".7" />
                                    </svg>
                                    <img
                                        src={sealImg}
                                        alt="Sello de cera de Mercatum Regni"
                                        className="sealImg"
                                    />
                                    <svg width="16" height="10" viewBox="0 0 16 10" className="dividerDiamond" aria-hidden="true">
                                        <path d="M8 0l4 5-4 5-4-5z" fill="currentColor" opacity=".7" />
                                    </svg>
                                    <span className="inkRule dividerRule" />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default History;
