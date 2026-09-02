import { SALESPEOPLE } from '../../data/salespeople';
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
            <div className="salespeoplePageOverlay">
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
                                <img src={sealImg} alt="Sello real del reino" className="headerSealIcon" />
                                <span className="inkRule" />
                            </div>
                        </header>

                        <div className="salespeopleGrid">
                            {SALESPEOPLE.map((seller) => (
                                <article key={seller.name} className="salespersonCard">
                                    <div className="salespersonCardTop">
                                        <img
                                            src={seller.image}
                                            alt={`Retrato de ${seller.name}`}
                                            className="salespersonPortrait"
                                        />
                                        <div>
                                            <h2 className="salespersonName">{seller.name}</h2>
                                            <p className="salespersonCraft">{seller.craft}</p>
                                            <p className="salespersonWorkshop">🛡 {seller.workshop}</p>
                                        </div>
                                    </div>
                                    <dl className="salespersonDetails">
                                        <div>
                                            <dt>Villa</dt>
                                            <dd>{seller.town}</dd>
                                        </div>
                                        <div>
                                            <dt>Admitido</dt>
                                            <dd>Anno {seller.admittedYear}</dd>
                                        </div>
                                    </dl>
                                    <button type="button" className="viewWorkshopBtn">Ver taller</button>
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