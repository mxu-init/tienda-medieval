import api from './api';

export const getProducts = async (signal) => {
  try {
    const response = await api.get('/products?select=*,category:categories(*)', { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
    const message = error.response?.data?.message || 'Error al obtener las mercancías del catálogo.';
    throw new Error(message, { cause: error });
  }
};

export const getProductById = async (id, signal) => {
  try {
    const response = await api.get(`/products?id=eq.${id}&select=*,category:categories(*)`, { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
    const message = error.response?.data?.message || `Error al obtener la mercancía con ID ${id}.`;
    throw new Error(message, { cause: error });
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Error al registrar la nueva mercancía en la tienda.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products?id=eq.${id}`, updatedData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || `Error al actualizar la mercancía con ID ${id}.`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products?id=eq.${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || `Error al eliminar la mercancía con ID ${id}.`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

export const getCategories = async (signal) => {
  try {
    const response = await api.get('/categories', { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
    const message = error.response?.data?.message || 'Error al obtener los gremios y categorías de mercancías.';
    throw new Error(message, { cause: error });
  }
};