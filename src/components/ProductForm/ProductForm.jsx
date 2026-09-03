import { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ initialData, categories, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState(() => {
    let firstImage = 'https://picsum.photos/640/480';
    if (initialData?.images && initialData.images.length > 0) {
      const rawImg = initialData.images[0];
      if (typeof rawImg === 'string') {
        firstImage = rawImg.replace(/^["'[]+/, '').replace(/["'\]]+$/, '');
      }
    }
    return {
      title: initialData?.title || '',
      price: initialData?.price ? String(initialData.price) : '',
      description: initialData?.description || '',
      categoryId: initialData?.category?.id ? String(initialData.category.id) : categories[0]?.id ? String(categories[0].id) : '1',
      imageUrl: firstImage,
    };
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'El título de la mercancía es obligatorio.';
    }
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Ingrese un precio válido superior a 0.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria.';
    }
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'La URL de la imagen es obligatoria.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      title: formData.title.trim(),
      price: Number(formData.price),
      description: formData.description.trim(),
      categoryId: Number(formData.categoryId),
      images: [formData.imageUrl.trim()],
    };

    onSubmit(payload);
  };

  return (
    <form className="productFormParchment" onSubmit={handleSubmit} noValidate>
      <h2 className="productFormTitle">
        {initialData ? 'Editar Mercancía' : 'Registrar Nueva Mercancía'}
      </h2>

      <div className="formGroup">
        <label htmlFor="productTitleInput" className="formLabel">
          Título de la mercancía
        </label>
        <input
          id="productTitleInput"
          type="text"
          name="title"
          className={`formInput ${errors.title ? 'inputError' : ''}`}
          placeholder="Ej. Espada de Acero de Toledo"
          value={formData.title}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'titleError' : undefined}
          required
        />
        {errors.title && (
          <span id="titleError" className="errorMessage" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      <div className="formGroup">
        <label htmlFor="productPriceInput" className="formLabel">
          Precio (en monedas de oro)
        </label>
        <input
          id="productPriceInput"
          type="number"
          name="price"
          min="1"
          step="any"
          className={`formInput ${errors.price ? 'inputError' : ''}`}
          placeholder="150"
          value={formData.price}
          onChange={handleChange}
          aria-invalid={Boolean(errors.price)}
          aria-describedby={errors.price ? 'priceError' : undefined}
          required
        />
        {errors.price && (
          <span id="priceError" className="errorMessage" role="alert">
            {errors.price}
          </span>
        )}
      </div>

      <div className="formGroup">
        <label htmlFor="productCategorySelect" className="formLabel">
          Categoría / Gremio
        </label>
        <select
          id="productCategorySelect"
          name="categoryId"
          className="formSelect"
          value={formData.categoryId}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="formGroup">
        <label htmlFor="productImageUrlInput" className="formLabel">
          URL de la imagen de la mercancía
        </label>
        <input
          id="productImageUrlInput"
          type="url"
          name="imageUrl"
          className={`formInput ${errors.imageUrl ? 'inputError' : ''}`}
          placeholder="https://ejemplo.com/imagen.jpg"
          value={formData.imageUrl}
          onChange={handleChange}
          aria-invalid={Boolean(errors.imageUrl)}
          aria-describedby={errors.imageUrl ? 'imageUrlError' : undefined}
          required
        />
        {errors.imageUrl && (
          <span id="imageUrlError" className="errorMessage" role="alert">
            {errors.imageUrl}
          </span>
        )}
      </div>

      <div className="formGroup">
        <label htmlFor="productDescriptionInput" className="formLabel">
          Descripción detallada
        </label>
        <textarea
          id="productDescriptionInput"
          name="description"
          rows="4"
          className={`formInput formTextarea ${errors.description ? 'inputError' : ''}`}
          placeholder="Describa la calidad, materiales y origen de la mercancía..."
          value={formData.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'descriptionError' : undefined}
          required
        />
        {errors.description && (
          <span id="descriptionError" className="errorMessage" role="alert">
            {errors.description}
          </span>
        )}
      </div>

      <div className="formActions">
        <button
          type="button"
          className="formBtn btnSecondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="formBtn btnPrimary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Guardando...'
            : initialData
            ? 'Guardar Cambios'
            : 'Registrar Mercancía'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
