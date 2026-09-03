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
    return response.data[0];
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
    const payload = { ...productData };
    if ('categoryId' in payload) {
      payload.category_id = payload.categoryId;
      delete payload.categoryId;
    }
    const response = await api.post('/products', payload);
    if (!response.data || response.data.length === 0) {
      throw new Error('No se pudo registrar la mercancía. Verifique los permisos de acceso.');
    }
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error al registrar la nueva mercancía en la tienda.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const payload = { ...productData };
    if ('categoryId' in payload) {
      payload.category_id = payload.categoryId;
      delete payload.categoryId;
    }
    const response = await api.patch(`/products?id=eq.${id}`, payload);
    if (!response.data || response.data.length === 0) {
      throw new Error('No se pudo actualizar la mercancía. Verifique las políticas de acceso (RLS) en la base de datos.');
    }
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || error.message || `Error al actualizar la mercancía con ID ${id}.`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products?id=eq.${id}`);
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || `Error al eliminar la mercancía con ID ${id}.`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

export const getCategories = async (signal) => {
  try {
    const response = await api.get('/categories?select=*', { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
    const message = error.response?.data?.message || 'Error al obtener los gremios y categorías de mercancías.';
    throw new Error(message, { cause: error });
  }
};