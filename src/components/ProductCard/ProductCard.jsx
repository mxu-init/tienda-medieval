import parchmentImg from '../../assets/img/parchment.jpg';
import p1Img from '../../assets/img/sword.jpg';
import p2Img from '../../assets/img/p2.jpg';
import p3Img from '../../assets/img/p3.jpg';
import p4Img from '../../assets/img/p4.jpg';
import './ProductCard.css';

const fallbackImages = [p1Img, p2Img, p3Img, p4Img];

const ProductCard = ({ product, index = 0, onView }) => {
  if (!product) {
    return null;
  }

  const fallback = fallbackImages[index % fallbackImages.length];

  const getImageUrl = (images) => {
    if (Array.isArray(images) && images.length > 0) {
      let cleanUrl = images[0];
      if (typeof cleanUrl === 'string') {
        cleanUrl = cleanUrl.replace(/^["'[]+/, '').replace(/["'\]]+$/, '');
        if (cleanUrl.startsWith('http')) {
          return cleanUrl;
        }
      }
    }
    return fallback;
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallback;
  };

  const imageUrl = getImageUrl(product.images);

  return (
    <article
      className="shopCard"
      style={{ '--shopParchment': `url(${parchmentImg})` }}
      onClick={() => onView && onView(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onView && onView(product);
        }
      }}
      aria-label={`Ver detalles de ${product.title}`}
    >
      <div className="shopCardInner">
        <div className="shopCardMedia">
          <img
            src={imageUrl}
            alt={product.title}
            className="shopCardImg"
            loading="lazy"
            width={640}
            height={480}
            onError={handleImageError}
          />
        </div>
        <div className="shopCardBody">
          <h3 className="shopCardTitle">{product.title}</h3>
          <p className="shopCardPrice">
            {Math.round(product.price)}{' '}
            <span className="shopCardPriceCurrency">monedas de oro</span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
