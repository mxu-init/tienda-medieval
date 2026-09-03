import api from './api';

const toErrorMessage = (error, fallback) => {
  const message = error.response?.data?.message || fallback;
  return Array.isArray(message) ? message.join(', ') : message;
};

export const getUsers = async (signal) => {
  try {
    const response = await api.get('/users', { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
    throw new Error(
      toErrorMessage(error, 'Error al obtener la lista de usuarios del reino.'),
      { cause: error }
    );
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error(
      toErrorMessage(error, 'Error al registrar el nuevo usuario en el reino.'),
      { cause: error }
    );
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(
      toErrorMessage(error, `Error al actualizar la información del usuario con ID ${id}.`),
      { cause: error }
    );
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      toErrorMessage(error, `Error al eliminar el usuario con ID ${id}.`),
      { cause: error }
    );
  }
};
