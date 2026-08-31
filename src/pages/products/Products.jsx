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
import parchmentImg from '../../assets/img/parchment.jpg';
import sealImg from '../../assets/img/seal.png';
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
    <div
      className="productsPageShell"
      style={{
        backgroundColor: 'oklch(0.19 0.012 60)',
        backgroundImage: `url(${stoneImg})`,
        backgroundSize: '620px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="productsPageOverlay">
        <main
          className="productsParchmentPanel"
          style={{
            backgroundImage: `url(${parchmentImg})`,
            backgroundSize: '1600px',
            backgroundRepeat: 'repeat',
          }}
        >
          <div className="productsParchmentContent">
            <header className="productsPageHeader">
              <span aria-hidden="true" className="vellumWash" />
              <h1 className="productsPageTitle">Mercancías del Reino</h1>
              <p className="productsPageSubtitle">
                Inventario de armas, armaduras, pociones y objetos valiosos expuestos por los gremios.
              </p>
              <div className="ornamentDivider">
                <span className="inkRule" />
                <img src={sealImg} alt="Sello real del reino" className="headerSealIcon" />
                <span className="inkRule" />
              </div>
            </header>

            {successMessage && (
              <div className="alertBox alertSuccess" role="alert">
                <span className="alertIcon">✓</span>
                <p>{successMessage}</p>
                <button
                  type="button"
                  className="alertDismissBtn"
                  onClick={() => setSuccessMessage('')}
                  aria-label="Cerrar notificación"
                >
                  ✕
                </button>
              </div>
            )}

            {errorMessage && (
              <div className="alertBox alertError" role="alert">
                <span className="alertIcon">⚠</span>
                <p>{errorMessage}</p>
                <button
                  type="button"
                  className="alertDismissBtn"
                  onClick={() => setErrorMessage('')}
                  aria-label="Cerrar error"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="productsActionBar">
              <button
                type="button"
                className="createBtn"
                onClick={handleOpenCreate}
              >
                + Registrar nueva mercancía
              </button>
            </div>

            <ProductList
              products={products}
              categories={categories}
              isLoading={isLoading}
              onView={handleOpenView}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          </div>
        </main>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          modalMode === 'create'
            ? 'Nueva Mercancía'
            : modalMode === 'edit'
            ? 'Editar Mercancía'
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
    </div>
  );
};

export default Products;
