import api from './api';

export const getUsers = async (signal) => {
  try {
    const response = await api.get('/users', { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
    const message = error.response?.data?.message || 'Error al obtener la lista de usuarios del reino.';
    throw new Error(message, { cause: error });
  }
};

export const getUserById = async (id, signal) => {
  try {
    const response = await api.get(`/users/${id}`, { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
    const message = error.response?.data?.message || `Error al obtener los detalles del usuario con ID ${id}.`;
    throw new Error(message, { cause: error });
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Error al registrar el nuevo usuario en el reino.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || `Error al actualizar la información del usuario con ID ${id}.`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || `Error al eliminar el usuario con ID ${id}.`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};
