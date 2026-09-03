import { useState } from 'react';
import './UserForm.css';

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
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button type="submit" className="inkButton inkButtonSolid" disabled={isSubmitting}>
          {isSubmitting ? 'Sellando…' : 'Sellar'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
