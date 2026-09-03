import { useState } from 'react';
import './UserForm.css';

<<<<<<< HEAD
const EMPTY_USER_FORM = {
  name: '',
  email: '',
  password: '',
  role: 'customer',
  avatar: 'https://i.pravatar.cc/150?img=12',
};

const buildFormState = (initialData) => ({
  name: initialData?.name || '',
  email: initialData?.email || '',
  password: '',
  role: initialData?.role === 'admin' ? 'admin' : 'customer',
  avatar: initialData?.avatar || EMPTY_USER_FORM.avatar,
});

const UserForm = ({ initialData, mode = 'create', onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState(() => buildFormState(initialData));
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'El nombre es obligatorio.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'El correo es obligatorio.';
    } else if (!formData.email.includes('@')) {
      nextErrors.email = 'El correo no parece válido.';
    }

    if (mode === 'create' && formData.password.trim().length < 4) {
      nextErrors.password = 'La contraseña debe tener al menos 4 caracteres.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate() || isSubmitting) {
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      avatar: formData.avatar.trim() || EMPTY_USER_FORM.avatar,
    };

    if (mode === 'create') {
      payload.password = formData.password;
    }

    onSubmit(payload);
  };

  return (
    <form className="userForm" onSubmit={handleSubmit} noValidate>
      <label className="userFormLabel">
        Nombre
        <input
          className="userFormInput"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.name && <span className="userFormError">{errors.name}</span>}
      </label>

      <label className="userFormLabel">
        Correo
        <input
          className="userFormInput"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.email && <span className="userFormError">{errors.email}</span>}
      </label>

      {mode === 'create' && (
        <label className="userFormLabel">
          Contraseña
          <input
            className="userFormInput"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.password && <span className="userFormError">{errors.password}</span>}
        </label>
      )}

      <label className="userFormLabel">
        Rango
        <select
          className="userFormInput"
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="customer">Súbdito</option>
          <option value="admin">Mayordomo del reino</option>
        </select>
      </label>

      <label className="userFormLabel">
        Retrato (URL)
        <input
          className="userFormInput"
          type="url"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </label>

      <div className="userFormActions">
        <button
          type="button"
          className="inkButton inkButtonOutline"
=======
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
      newErrors.password = 'La contraseña es obligatoria para nuevos usuarios.';
    } else if (formData.password && formData.password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres.';
    }
    if (!formData.avatar.trim()) {
      newErrors.avatar = 'La URL del avatar es obligatoria.';
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
    onSubmit(formData);
  };

  return (
    <form className="userFormParchment" onSubmit={handleSubmit} noValidate>
      <h2 className="userFormTitle">
        {initialData ? 'Editar Usuario del Reino' : 'Registrar Nuevo Usuario'}
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
          URL de la imagen de avatar
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
          Rol de usuario
        </label>
        <select
          id="roleSelect"
          name="role"
          className="formSelect"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="customer">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <div className="formActions">
        <button
          type="button"
          className="formBtn btnSecondary"
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
<<<<<<< HEAD
        <button type="submit" className="inkButton inkButtonSolid" disabled={isSubmitting}>
          {isSubmitting ? 'Sellando…' : 'Sellar'}
=======
        <button
          type="submit"
          className="formBtn btnPrimary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Guardando...'
            : initialData
            ? 'Guardar Cambios'
            : 'Crear Usuario'}
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
        </button>
      </div>
    </form>
  );
};

export default UserForm;
