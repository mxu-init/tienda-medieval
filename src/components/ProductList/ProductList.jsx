import { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const ITEMS_PER_PAGE = 8;

const ProductList = ({
  products = [],
  isLoading = false,
  onView,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="productListNotice" role="status">
        <div className="productListSpinner" aria-hidden="true" />
        <p className="productListNoticeTitle">Abriendo el catálogo</p>
        <p className="productListNoticeSubtitle">
          El escribano copia las mercancías del mercado...
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="productListNotice" role="status">
        <p className="productListNoticeTitle">Sin mercancías</p>
        <p className="productListNoticeSubtitle">
          Ninguna mercancía coincide con la búsqueda o el gremio seleccionado.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE) || 1;
  const validPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="productListContainer">
      <div className="productGrid">
        {paginatedProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={startIndex + index}
            onView={onView}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          className="productListPagination"
          aria-label="Navegación de páginas de mercancías"
        >
          <button
            type="button"
            className="paginationBtn"
            disabled={validPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            aria-label="Página anterior"
          >
            Anterior
          </button>
          <span className="paginationInfo">
            Página {validPage} de {totalPages}
          </span>
          <button
            type="button"
            className="paginationBtn"
            disabled={validPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            aria-label="Página siguiente"
          >
            Siguiente
          </button>
        </nav>
      )}
    </div>
  );
};

export default ProductList;
