import { SALESPEOPLE } from '../../data/salespeople';
import SalespersonCard from '../../components/SalespersonCard/SalespersonCard';
import stoneImg from '../../assets/img/stone.jpg';
import parchmentImg from '../../assets/img/parchment.jpg';
import sealImg from '../../assets/img/seal.png';
import bannerImg from '../../assets/img/banner.png';
import lanternImg from '../../assets/img/lantern.png';
import './Salespeople.css';

const Salespeople = () => {
    return (
        <div
            className="salespeoplePageShell"
            style={{
                backgroundColor: 'oklch(0.19 0.012 60)',
                backgroundImage: `url(${stoneImg})`,
                backgroundSize: '620px',
                backgroundRepeat: 'repeat',
            }}
        >
            <div className="salespeoplePageOverlay">
                <div className="spMobileHeraldry">
                    <img
                        src={bannerImg}
                        alt="Estandarte con león rampante dorado"
                        className="spMobileBannerImg"
                    />
                    <img
                        src={lanternImg}
                        alt="Farol de latón"
                        className="spMobileLanternImg"
                    />
                </div>

                <div className="salespeopleLayoutBody">
                    <aside className="spLeftRail">
                        <img
                            src={bannerImg}
                            alt="Estandarte con león rampante dorado"
                            className="spLeftRailBanner"
                        />
                        <span className="spLeftRailLanternGlow" />
                        <img
                            src={lanternImg}
                            alt="Farol de latón"
                            className="spLeftRailLantern"
                        />
                    </aside>

                    <main
                        className="salespeopleParchmentPanel"
                        style={{
                            backgroundImage: `url(${parchmentImg})`,
                            backgroundSize: '1600px',
                            backgroundRepeat: 'repeat',
                        }}
                    >
                        <div className="salespeopleParchmentContent">
                            <header className="salespeoplePageHeader">
                                <h1 className="salespeoplePageTitle">Vendedores del Gremio</h1>
                                <p className="salespeoplePageSubtitle">
                                    Maestros y talleres admitidos por el gremio, con su retrato y su nombre
                                    registrado en los libros del reino.
                                </p>
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

                            <div className="salespeopleGrid">
                                {SALESPEOPLE.map((seller) => (
                                    <SalespersonCard key={seller.name} seller={seller} />
                                ))}
                            </div>

                            <div className="sealDividerWrapper">
                                <div className="sealDivider">
                                    <span className="inkRule dividerRule" />
                                    <svg width="16" height="10" viewBox="0 0 16 10" className="dividerDiamond" aria-hidden="true">
                                        <path d="M8 0l4 5-4 5-4-5z" fill="currentColor" opacity=".7" />
                                    </svg>
                                    <img src={sealImg} alt="Sello de cera de Mercatum Regni" className="sealImg" />
                                    <svg width="16" height="10" viewBox="0 0 16 10" className="dividerDiamond" aria-hidden="true">
                                        <path d="M8 0l4 5-4 5-4-5z" fill="currentColor" opacity=".7" />
                                    </svg>
                                    <span className="inkRule dividerRule" />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
        </div >
    );
};

export default Salespeople;