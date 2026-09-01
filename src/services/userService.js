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