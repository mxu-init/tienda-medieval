import './ProductCard.css';

const ProductCard = ({ product, onView, onEdit, onDelete }) => {
  if (!product) {
    return null;
  }

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
    return 'https://picsum.photos/300/200';
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://picsum.photos/300/200';
  };

  const imageUrl = getImageUrl(product.images);
  const categoryName = product.category?.name || 'Mercancía General';

  return (
    <article className="productCardParchment">
      <div className="productCardBadge">#{product.id}</div>
      <div className="productImageWrapper">
        <img
          src={imageUrl}
          alt={`Imagen de ${product.title}`}
          className="productCardImg"
          onError={handleImageError}
        />
        <span className="productCategoryTag">{categoryName}</span>
      </div>
      <div className="productCardContent">
        <h3 className="productTitle">{product.title}</h3>
        <p className="productPrice">{product.price} Monedas de Oro</p>
        <p className="productDescription">
          {product.description?.length > 80
            ? `${product.description.substring(0, 80)}...`
            : product.description}
        </p>
      </div>
      <div className="productCardActions">
        <button
          type="button"
          className="productCardBtn btnView"
          onClick={() => onView(product)}
          title={`Ver detalles de ${product.title}`}
          aria-label={`Ver detalles de ${product.title}`}
        >
          Ver
        </button>
        <button
          type="button"
          className="productCardBtn btnEdit"
          onClick={() => onEdit(product)}
          title={`Editar mercancía ${product.title}`}
          aria-label={`Editar mercancía ${product.title}`}
        >
          Editar
        </button>
        <button
          type="button"
          className="productCardBtn btnDelete"
          onClick={() => onDelete(product)}
          title={`Eliminar mercancía ${product.title}`}
          aria-label={`Eliminar mercancía ${product.title}`}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
