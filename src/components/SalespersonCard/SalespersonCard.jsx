import { Link } from 'react-router-dom';
import './SalespersonCard.css';

const SalespersonCard = ({ seller }) => {
    return (
        <article className="salespersonCard">
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
            <Link
                to="/store"
                className="viewWorkshopBtn"
            >
                Ver taller
            </Link>
        </article>
    );
};

export default SalespersonCard;