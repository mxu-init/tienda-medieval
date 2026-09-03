import api from './api';

<<<<<<< HEAD
const toErrorMessage = (error, fallback) => {
  const message = error.response?.data?.message || fallback;
  return Array.isArray(message) ? message.join(', ') : message;
};

export const getUsers = async (signal) => {
  try {
    const response = await api.get('/users', { signal });
=======
export const getUsers = async (signal) => {
  try {
    const response = await api.get('/users?select=*', { signal });
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
    return response.data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
<<<<<<< HEAD
    throw new Error(
      toErrorMessage(error, 'Error al obtener la lista de usuarios del reino.'),
      { cause: error }
    );
=======
    const message = error.response?.data?.message || 'Error al obtener la lista de usuarios del reino.';
    throw new Error(message, { cause: error });
  }
};

export const getUserById = async (id, signal) => {
  try {
    const response = await api.get(`/users?id=eq.${id}`, { signal });
    return response.data[0];
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
    const message = error.response?.data?.message || `Error al obtener los detalles del usuario con ID ${id}.`;
    throw new Error(message, { cause: error });
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
<<<<<<< HEAD
    return response.data;
  } catch (error) {
    throw new Error(
      toErrorMessage(error, 'Error al registrar el nuevo usuario en el reino.'),
      { cause: error }
    );
=======
    if (!response.data || response.data.length === 0) {
      throw new Error('No se pudo registrar el usuario. Verifique los permisos de acceso.');
    }
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error al registrar el nuevo usuario en el reino.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
  }
};

export const updateUser = async (id, userData) => {
  try {
<<<<<<< HEAD
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(
      toErrorMessage(error, `Error al actualizar la información del usuario con ID ${id}.`),
      { cause: error }
    );
=======
    const response = await api.patch(`/users?id=eq.${id}`, userData);
    if (!response.data || response.data.length === 0) {
      throw new Error('No se pudo actualizar el usuario. Verifique las políticas de acceso (RLS) en la base de datos.');
    }
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || error.message || `Error al actualizar la información del usuario con ID ${id}.`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
  }
};

export const deleteUser = async (id) => {
  try {
<<<<<<< HEAD
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      toErrorMessage(error, `Error al eliminar el usuario con ID ${id}.`),
      { cause: error }
    );
  }
};
=======
    const response = await api.delete(`/users?id=eq.${id}`);
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || `Error al eliminar el usuario con ID ${id}.`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
