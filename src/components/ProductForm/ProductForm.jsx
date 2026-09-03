import { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({
  initialData,
  categories = [],
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
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
      categoryId: initialData?.category?.id
        ? String(initialData.category.id)
        : categories[0]?.id
        ? String(categories[0].id)
        : '1',
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
      newErrors.title = 'El nombre de la mercancía es obligatorio.';
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
      <div className="formFieldGroup">
        <label htmlFor="productTitleInput" className="formFieldLabel">
          Nombre
        </label>
        <input
          id="productTitleInput"
          type="text"
          name="title"
          className={`formFieldControl ${errors.title ? 'controlError' : ''}`}
          placeholder="Nombre de la mercancía..."
          value={formData.title}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'titleError' : undefined}
          required
        />
        {errors.title && (
          <span id="titleError" className="formFieldErrorText" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      <div className="formFieldGroup">
        <label htmlFor="productPriceInput" className="formFieldLabel">
          Precio en monedas de oro
        </label>
        <input
          id="productPriceInput"
          type="number"
          name="price"
          min="1"
          step="any"
          className={`formFieldControl ${errors.price ? 'controlError' : ''}`}
          placeholder="100"
          value={formData.price}
          onChange={handleChange}
          aria-invalid={Boolean(errors.price)}
          aria-describedby={errors.price ? 'priceError' : undefined}
          required
        />
        {errors.price && (
          <span id="priceError" className="formFieldErrorText" role="alert">
            {errors.price}
          </span>
        )}
      </div>

      {categories.length > 0 && (
        <div className="formFieldGroup">
          <label htmlFor="productCategorySelect" className="formFieldLabel">
            Categoría / Gremio
          </label>
          <select
            id="productCategorySelect"
            name="categoryId"
            className="formFieldControl formFieldSelect"
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
      )}

      <div className="formFieldGroup">
        <label htmlFor="productDescriptionInput" className="formFieldLabel">
          Descripción
        </label>
        <textarea
          id="productDescriptionInput"
          name="description"
          rows={3}
          className={`formFieldControl formFieldTextarea ${
            errors.description ? 'controlError' : ''
          }`}
          placeholder="Descripción de la mercancía..."
          value={formData.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'descriptionError' : undefined}
          required
        />
        {errors.description && (
          <span id="descriptionError" className="formFieldErrorText" role="alert">
            {errors.description}
          </span>
        )}
      </div>

      <div className="formFieldGroup">
        <label htmlFor="productImageUrlInput" className="formFieldLabel">
          Grabado (URL)
        </label>
        <input
          id="productImageUrlInput"
          type="url"
          name="imageUrl"
          className={`formFieldControl ${errors.imageUrl ? 'controlError' : ''}`}
          placeholder="https://ejemplo.com/grabado.jpg"
          value={formData.imageUrl}
          onChange={handleChange}
          aria-invalid={Boolean(errors.imageUrl)}
          aria-describedby={errors.imageUrl ? 'imageUrlError' : undefined}
          required
        />
        {errors.imageUrl && (
          <span id="imageUrlError" className="formFieldErrorText" role="alert">
            {errors.imageUrl}
          </span>
        )}
      </div>

      <div className="formActionsGroup">
        <button
          type="submit"
          className="formActionBtn formActionBtnSolid"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sellando...' : 'Sellar'}
        </button>
        <button
          type="button"
          className="formActionBtn formActionBtnOutline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
