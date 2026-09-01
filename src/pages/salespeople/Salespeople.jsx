import { SALESPEOPLE  } from '../../data/sellers';
import stoneImg from '../../assets/img/stone.jpg';
import parchmentImg from '../../assets/img/parchment.jpg';
import sealImg from '../../assets/img/seal.png';
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
            <div className="sellersPageOverlay">
                <main
                    className="sellersParchmentPanel"
                    style={{
                        backgroundImage: `url(${parchmentImg})`,
                        backgroundSize: '1600px',
                        backgroundRepeat: 'repeat',
                    }}
                >
                    <div className="sellersParchmentContent">
                        <header className="sellersPageHeader">
                            <h1 className="sellersPageTitle">Vendedores del Gremio</h1>
                            <p className="sellersPageSubtitle">
                                Maestros y talleres admitidos por el gremio, con su retrato y su nombre
                                registrado en los libros del reino.
                            </p>
                            <div className="ornamentDivider">
                                <span className="inkRule" />
                                <img src={sealImg} alt="Sello real del reino" className="headerSealIcon" />
                                <span className="inkRule" />
                            </div>
                        </header>

                        <div className="sellersGrid">
                            {SALESPEOPLE.map((seller) => (
                                <article key={seller.name} className="sellerCard">
                                    <img
                                        src={seller.image}
                                        alt={`Retrato de ${seller.name}`}
                                        className="sellerPortrait"
                                    />
                                    <h2 className="sellerName">{seller.name}</h2>
                                    <p className="sellerCraft">{seller.craft}</p>
                                    <dl className="sellerDetails">
                                        <div>
                                            <dt>Taller</dt>
                                            <dd>{seller.workshop}</dd>
                                        </div>
                                        <div>
                                            <dt>Villa</dt>
                                            <dd>{seller.town}</dd>
                                        </div>
                                        <div>
                                            <dt>Admitido</dt>
                                            <dd>Año {seller.admittedYear}</dd>
                                        </div>
                                    </dl>
                                </article>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Salespeople;