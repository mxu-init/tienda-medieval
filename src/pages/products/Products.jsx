import { useState, useEffect } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from '../../services/productService';
import ProductList from '../../components/ProductList/ProductList';
import ProductForm from '../../components/ProductForm/ProductForm';
import ProductModal from '../../components/ProductModal/ProductModal';
import stoneImg from '../../assets/img/stone.jpg';
import bannerImg from '../../assets/img/banner.png';
import lanternImg from '../../assets/img/lantern.png';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    Promise.all([
      getProducts(controller.signal),
      getCategories(controller.signal),
    ])
      .then(([productsData, categoriesData]) => {
        if (isMounted) {
          setProducts(productsData);
          setCategories(categoriesData);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted && err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setErrorMessage(err.message || 'Error al conectar con el catálogo de mercancías.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const categoryNames = [
    'Todo',
    ...Array.from(new Set(products.map((p) => p.category?.name).filter(Boolean))),
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'Todo' || p.category?.name === selectedCategory;
    const matchesSearch = p.title?.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenView = (product) => {
    setSelectedProduct(product);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleReload = () => {
    setIsLoading(true);
    setErrorMessage('');
    Promise.all([getProducts(), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message || 'Error al recargar el catálogo.');
        setIsLoading(false);
      });
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      if (modalMode === 'create') {
        const newProduct = await createProduct(formData);
        const categoryObj = categories.find((c) => String(c.id) === String(formData.categoryId));
        const completeProduct = {
          ...newProduct,
          category: categoryObj || { name: 'General' },
        };
        setProducts((prev) => [completeProduct, ...prev]);
        setSuccessMessage(`La mercancía "${newProduct.title}" fue registrada exitosamente.`);
      } else if (modalMode === 'edit' && selectedProduct) {
        const updated = await updateProduct(selectedProduct.id, formData);
        const categoryObj = categories.find((c) => String(c.id) === String(formData.categoryId));
        const completeProduct = {
          ...selectedProduct,
          ...updated,
          category: categoryObj || selectedProduct.category,
        };
        setProducts((prev) =>
          prev.map((p) => (p.id === selectedProduct.id ? completeProduct : p))
        );
        setSuccessMessage(`La mercancía "${updated.title || selectedProduct.title}" ha sido actualizada.`);
      }
      setIsModalOpen(false);
    } catch (err) {
      setErrorMessage(err.message || 'Ocurrió un error al procesar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await deleteProduct(selectedProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      setSuccessMessage(`La mercancía "${selectedProduct.title}" ha sido retirada del mercado.`);
      setIsModalOpen(false);
    } catch (err) {
      setErrorMessage(err.message || 'Error al eliminar la mercancía.');
    } finally {
      setIsSubmitting(false);
    }
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
    return 'https://picsum.photos/400/300';
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://picsum.photos/400/300';
  };

  return (
    <section
      className="shopHall"
      style={{
        backgroundImage: `url(${stoneImg})`,
        backgroundSize: '620px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="shopHallOverlay">
        <h1 className="srOnly">Tienda del reino</h1>

        <div className="shopLayout">
          <CatalogueSidebar
            categories={categoryNames}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCreateClick={handleOpenCreate}
            onReloadClick={handleReload}
          />

          <div className="shopCatalogue">
            <CatalogueHeading />

            {successMessage && (
              <div className="shopNotice shopNoticeSuccess" role="status">
                <p>{successMessage}</p>
                <button
                  type="button"
                  className="shopNoticeDismiss"
                  onClick={() => setSuccessMessage('')}
                  aria-label="Cerrar notificación"
                >
                  ✕
                </button>
              </div>
            )}

            {errorMessage && (
              <div className="shopNotice shopNoticeError" role="alert">
                <p>{errorMessage}</p>
                <button
                  type="button"
                  className="shopNoticeDismiss"
                  onClick={() => setErrorMessage('')}
                  aria-label="Cerrar error"
                >
                  ✕
                </button>
              </div>
            )}

            <ProductList
              products={filteredProducts}
              isLoading={isLoading}
              onView={handleOpenView}
            />
          </div>
        </div>
      </div>

      <div className="shopCounter" aria-hidden="true" />

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          modalMode === 'create'
            ? 'Inscribir Mercancía'
            : modalMode === 'edit'
            ? 'Enmendar Mercancía'
            : modalMode === 'view'
            ? 'Detalles de la Mercancía'
            : 'Confirmar Eliminación'
        }
      >
        {(modalMode === 'create' || modalMode === 'edit') && (
          <ProductForm
            key={selectedProduct?.id || 'new'}
            initialData={modalMode === 'edit' ? selectedProduct : null}
            categories={categories}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseModal}
            isSubmitting={isSubmitting}
          />
        )}

        {modalMode === 'view' && selectedProduct && (
          <article className="productViewDetail">
            <div className="detailProductImgWrapper">
              <img
                src={getImageUrl(selectedProduct.images)}
                alt={`Imagen de ${selectedProduct.title}`}
                className="detailProductImg"
                onError={handleImageError}
              />
            </div>
            <div className="detailInfoGroup">
              <h3 className="detailTitle">{selectedProduct.title}</h3>
              <p className="detailPrice">
                <strong>Precio:</strong> {selectedProduct.price} Monedas de Oro
              </p>
              <p className="detailCategory">
                <strong>Categoría / Gremio:</strong>{' '}
                <span className="categoryTag">
                  {selectedProduct.category?.name || 'General'}
                </span>
              </p>
              <p className="detailId">
                <strong>ID de Registro:</strong> #{selectedProduct.id}
              </p>
              <p className="detailDescription">
                <strong>Descripción:</strong> {selectedProduct.description}
              </p>
            </div>
            <div className="detailActions">
              <button
                type="button"
                className="formBtn btnPrimary"
                onClick={() => handleOpenEdit(selectedProduct)}
              >
                Enmendar
              </button>
              <button
                type="button"
                className="formBtn btnDeleteModal"
                onClick={() => handleOpenDelete(selectedProduct)}
              >
                Retirar
              </button>
              <button
                type="button"
                className="formBtn btnSecondary"
                onClick={handleCloseModal}
              >
                Cerrar
              </button>
            </div>
          </article>
        )}

        {modalMode === 'delete' && selectedProduct && (
          <div className="deleteConfirmBox">
            <p className="deleteText">
              ¿Está seguro de que desea retirar permanentemente la mercancía{' '}
              <strong>{selectedProduct.title}</strong> del catálogo real?
            </p>
            <div className="formActions">
              <button
                type="button"
                className="formBtn btnSecondary"
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="formBtn btnDeleteConfirm"
                onClick={confirmDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Eliminando...' : 'Sí, Eliminar'}
              </button>
            </div>
          </div>
        )}
      </ProductModal>
    </section>
  );
};

const CatalogueHeading = () => {
  return (
    <div className="shopHeading">
      <HeadingRule flip />
      <h2 className="shopHeadingTitle">Todos los productos</h2>
      <HeadingRule />
    </div>
  );
};

const HeadingRule = ({ flip = false }) => {
  return (
    <span className="shopHeadingRule" aria-hidden="true">
      {flip && <HeadingFinial flip />}
      <span className="shopHeadingLine" />
      {!flip && <HeadingFinial />}
    </span>
  );
};

const HeadingFinial = ({ flip = false }) => {
  return (
    <svg
      width="42"
      height="12"
      viewBox="0 0 42 12"
      fill="none"
      className="shopHeadingFinial"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M0 6h20" stroke="currentColor" strokeWidth="1" />
      <path d="M26 1.5 30.5 6 26 10.5 21.5 6z" fill="currentColor" opacity="0.85" />
      <path d="M35 3.5 37.5 6 35 8.5 32.5 6z" fill="currentColor" opacity="0.6" />
      <path d="M39.5 4.5 41.5 6l-2 1.5z" fill="currentColor" opacity="0.4" />
    </svg>
  );
};

const CatalogueSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onCreateClick,
  onReloadClick,
}) => {
  return (
    <div className="shopSidebar">
      <aside className="shopPanel">
        <span className="shopPanelCorner shopPanelCornerTl" aria-hidden="true" />
        <span className="shopPanelCorner shopPanelCornerTr" aria-hidden="true" />
        <span className="shopPanelCorner shopPanelCornerBl" aria-hidden="true" />
        <span className="shopPanelCorner shopPanelCornerBr" aria-hidden="true" />

        <nav aria-label="Categorías">
          <h2 className="shopPanelTitle">Categorías</h2>
          <div className="shopCategoryList">
            {categories.map((categoryName) => (
              <button
                key={categoryName}
                type="button"
                className="shopCategoryBtn"
                aria-pressed={selectedCategory === categoryName}
                onClick={() => onCategoryChange(categoryName)}
              >
                {categoryName}
              </button>
            ))}
          </div>
        </nav>

        <div className="shopPanelSearch">
          <h2 className="shopPanelTitle">Buscar</h2>
          <label className="srOnly" htmlFor="searchProduct">
            Buscar mercancía
          </label>
          <input
            id="searchProduct"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar mercancía…"
            className="shopSearchInput"
          />
          <div className="shopPanelActions">
            <button type="button" className="shopPanelBtn shopPanelBtnSolid" onClick={onCreateClick}>
              Inscribir mercancía
            </button>
            <button type="button" className="shopPanelBtn shopPanelBtnOutline" onClick={onReloadClick}>
              Recargar
            </button>
          </div>
        </div>
      </aside>

      <div className="shopHeraldry" aria-hidden="true">
        <img src={bannerImg} alt="" width={576} height={1152} className="shopHeraldryBanner" />
        <img
          src={lanternImg}
          alt=""
          width={672}
          height={992}
          loading="lazy"
          className="shopHeraldryLantern"
        />
      </div>
    </div>
  );
};

export default Products;
