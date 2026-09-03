import { SALESPEOPLE } from '../../data/salespeople';
import SalespersonCard from '../../components/SalespersonCard/SalespersonCard';
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
                                <SalespersonCard key={seller.name} seller={seller} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Salespeople;