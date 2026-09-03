import { useState } from 'react';
import './UserForm.css';

const UserForm = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: initialData?.password || '',
    avatar: initialData?.avatar || 'https://i.imgur.com/LDOO5wF.jpg',
    role: initialData?.role || 'customer',
  }));
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
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido.';
    }
    if (!initialData && !formData.password) {
      newErrors.password = 'La contraseña es obligatoria para nuevos registros.';
    } else if (formData.password && formData.password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres.';
    }
    if (!formData.avatar.trim()) {
      newErrors.avatar = 'La URL del retrato/avatar es obligatoria.';
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
    // Si estamos editando y no se proporcionó nueva contraseña, no la enviamos para no sobrescribirla vacía
    const dataToSend = { ...formData };
    if (initialData && !dataToSend.password) {
      delete dataToSend.password;
    }
    onSubmit(dataToSend);
  };

  return (
    <form className="userFormParchment" onSubmit={handleSubmit} noValidate>
      <h2 className="userFormTitle">
        {initialData ? 'Enmendar Registro de Usuario' : 'Inscribir Nuevo Usuario en el Reino'}
      </h2>

      <div className="formGroup">
        <label htmlFor="nameInput" className="formLabel">
          Nombre completo
        </label>
        <input
          id="nameInput"
          type="text"
          name="name"
          className={`formInput ${errors.name ? 'inputError' : ''}`}
          placeholder="Ej. Sir Lancelot"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'nameInputError' : undefined}
          disabled={isSubmitting}
          required
        />
        {errors.name && (
          <span id="nameInputError" className="errorMessage" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="formGroup">
        <label htmlFor="emailInput" className="formLabel">
          Correo electrónico
        </label>
        <input
          id="emailInput"
          type="email"
          name="email"
          className={`formInput ${errors.email ? 'inputError' : ''}`}
          placeholder="lancelot@reino.com"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'emailInputError' : undefined}
          disabled={isSubmitting}
          required
        />
        {errors.email && (
          <span id="emailInputError" className="errorMessage" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="formGroup">
        <label htmlFor="passwordInput" className="formLabel">
          Contraseña {initialData && '(dejar en blanco para mantener la actual)'}
        </label>
        <input
          id="passwordInput"
          type="password"
          name="password"
          className={`formInput ${errors.password ? 'inputError' : ''}`}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? 'passwordInputError' : undefined}
          disabled={isSubmitting}
          required={!initialData}
        />
        {errors.password && (
          <span id="passwordInputError" className="errorMessage" role="alert">
            {errors.password}
          </span>
        )}
      </div>

      <div className="formGroup">
        <label htmlFor="avatarInput" className="formLabel">
          URL del retrato / avatar
        </label>
        <input
          id="avatarInput"
          type="url"
          name="avatar"
          className={`formInput ${errors.avatar ? 'inputError' : ''}`}
          placeholder="https://ejemplo.com/avatar.jpg"
          value={formData.avatar}
          onChange={handleChange}
          aria-invalid={Boolean(errors.avatar)}
          aria-describedby={errors.avatar ? 'avatarInputError' : undefined}
          disabled={isSubmitting}
          required
        />
        {errors.avatar && (
          <span id="avatarInputError" className="errorMessage" role="alert">
            {errors.avatar}
          </span>
        )}
      </div>

      <div className="formGroup">
        <label htmlFor="roleSelect" className="formLabel">
          Rango / Rol
        </label>
        <select
          id="roleSelect"
          name="role"
          className="formSelect"
          value={formData.role}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="customer">Súbdito (Cliente)</option>
          <option value="admin">Mayordomo del reino (Administrador)</option>
        </select>
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
            ? 'Sellando…'
            : initialData
            ? 'Guardar Cambios'
            : 'Inscribir Usuario'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
