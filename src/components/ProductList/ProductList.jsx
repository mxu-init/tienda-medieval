import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const ITEMS_PER_PAGE = 8;

const ProductList = ({ products, categories, isLoading, onView, onEdit, onDelete }) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.length > 0) {
      const match = categories.find(
        (cat) => cat.name.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setSelectedCategory(String(match.id));
      }
    }
  }, [searchParams, categories]);

  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDesc = product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = matchesTitle || matchesDesc;
    const matchesCategory =
      selectedCategory === 'all' || String(product.category?.id) === String(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

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
    return 'https://picsum.photos/200';
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://picsum.photos/200';
  };

  if (isLoading) {
    return (
      <div className="productListLoading" role="status">
        <div className="spinnerIcon" aria-hidden="true" />
        <p>Cargando el inventario de mercancías del reino...</p>
      </div>
    );
  }

  return (
    <section className="productListContainer">
      <div className="productListControls">
        <div className="filterGroup">
          <label htmlFor="searchProduct" className="filterLabel">
            Buscar mercancía:
          </label>
          <input
            id="searchProduct"
            type="search"
            className="filterInput"
            placeholder="Buscar por nombre o descripción..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filterGroup">
          <label htmlFor="categoryFilter" className="filterLabel">
            Filtrar por categoría / gremio:
          </label>
          <select
            id="categoryFilter"
            className="filterSelect"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="viewToggleGroup">
          <button
            type="button"
            className={`viewToggleBtn ${viewMode === 'grid' ? 'activeView' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Vista de cuadrícula"
            aria-label="Vista de cuadrícula"
          >
            Tarjetas
          </button>
          <button
            type="button"
            className={`viewToggleBtn ${viewMode === 'table' ? 'activeView' : ''}`}
            onClick={() => setViewMode('table')}
            title="Vista de lista"
            aria-label="Vista de lista"
          >
            Tabla
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="productListEmpty">
          <p>No se encontraron mercancías que coincidan con la búsqueda.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="productGrid">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="tableWrapper">
          <table className="productTable">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Imagen</th>
                <th scope="col">Título</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoría</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="tableId">#{product.id}</td>
                  <td>
                    <img
                      src={getImageUrl(product.images)}
                      alt={`Imagen de ${product.title}`}
                      className="tableProductImg"
                      onError={handleImageError}
                    />
                  </td>
                  <td className="tableTitle">{product.title}</td>
                  <td className="tablePrice">{product.price} Oros</td>
                  <td className="tableCategory">{product.category?.name || 'General'}</td>
                  <td>
                    <div className="tableActions">
                      <button
                        type="button"
                        className="tableBtn btnView"
                        onClick={() => onView(product)}
                        title={`Ver ${product.title}`}
                        aria-label={`Ver ${product.title}`}
                      >
                        Ver
                      </button>
                      <button
                        type="button"
                        className="tableBtn btnEdit"
                        onClick={() => onEdit(product)}
                        title={`Editar ${product.title}`}
                        aria-label={`Editar ${product.title}`}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="tableBtn btnDelete"
                        onClick={() => onDelete(product)}
                        title={`Eliminar ${product.title}`}
                        aria-label={`Eliminar ${product.title}`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="paginationNav" aria-label="Navegación de páginas de mercancías">
          <button
            type="button"
            className="paginationBtn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Anterior
          </button>
          <span className="paginationInfo">
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            className="paginationBtn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Siguiente
          </button>
        </nav>
      )}
    </section>
  );
};

export default ProductList;