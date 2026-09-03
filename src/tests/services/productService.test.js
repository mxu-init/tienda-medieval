import { describe, it, expect, beforeEach, vi } from 'vitest';
import api from '../../services/api';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} from '../../services/productService';
import { mockProducts, mockSingleProduct, mockCategories } from '../mocks/mockData';

vi.mock('../../services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn()
  }
}));

describe('productService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch all products successfully', async () => {
      api.get.mockResolvedValueOnce({ data: mockProducts });

      const signal = new AbortController().signal;
      const result = await getProducts(signal);

      expect(api.get).toHaveBeenCalledWith('/products?select=*,category:categories(*)', { signal });
      expect(result).toEqual(mockProducts);
    });

    it('should rethrow CanceledError when request is canceled', async () => {
      const cancelError = new Error('Canceled');
      cancelError.name = 'CanceledError';
      api.get.mockRejectedValueOnce(cancelError);

      await expect(getProducts()).rejects.toThrow('Canceled');
    });

    it('should rethrow AbortError when request is aborted', async () => {
      const abortError = new Error('Aborted');
      abortError.name = 'AbortError';
      api.get.mockRejectedValueOnce(abortError);

      await expect(getProducts()).rejects.toThrow('Aborted');
    });

    it('should throw custom error message on network failure', async () => {
      api.get.mockRejectedValueOnce({
        response: { data: { message: 'Database failure' } }
      });

      await expect(getProducts()).rejects.toThrow('Database failure');
    });

    it('should throw default error message when error response has no message', async () => {
      api.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(getProducts()).rejects.toThrow('Error al obtener las mercancías del catálogo.');
    });
  });

  describe('getProductById', () => {
    it('should fetch product by id successfully', async () => {
      api.get.mockResolvedValueOnce({ data: [mockSingleProduct] });

      const signal = new AbortController().signal;
      const result = await getProductById(1, signal);

      expect(api.get).toHaveBeenCalledWith('/products?id=eq.1&select=*,category:categories(*)', { signal });
      expect(result).toEqual(mockSingleProduct);
    });

    it('should rethrow CanceledError or AbortError', async () => {
      const abortError = new Error('Request aborted');
      abortError.name = 'AbortError';
      api.get.mockRejectedValueOnce(abortError);

      await expect(getProductById(1)).rejects.toThrow('Request aborted');
    });

    it('should throw custom error message when product fetch fails', async () => {
      api.get.mockRejectedValueOnce(new Error('Connection lost'));

      await expect(getProductById(99)).rejects.toThrow('Error al obtener la mercancía con ID 99.');
    });
  });

  describe('createProduct', () => {
    it('should create product successfully and return created product object', async () => {
      const newProductInput = { name: 'Maza de Guerra', price: 95.0, stock: 8, categoryId: 1 };
      const createdProductResponse = { id: 3, ...newProductInput };

      api.post.mockResolvedValueOnce({ data: [createdProductResponse] });

      const result = await createProduct(newProductInput);

      expect(api.post).toHaveBeenCalledWith('/products', newProductInput);
      expect(result).toEqual(createdProductResponse);
    });

    it('should send categoryId payload directly to products endpoint', async () => {
      const inputWithCategory = { name: 'Hacha de Combate', price: 110.0, stock: 4, categoryId: 1 };

      api.post.mockResolvedValueOnce({ data: [{ id: 4, ...inputWithCategory }] });

      await createProduct(inputWithCategory);

      expect(api.post).toHaveBeenCalledWith('/products', inputWithCategory);
    });

    it('should throw RLS permission error when returned data array is empty', async () => {
      api.post.mockResolvedValueOnce({ data: [] });

      await expect(createProduct({ name: 'Prohibited Item' })).rejects.toThrow(
        'No se pudo registrar la mercancía. Verifique los permisos de acceso.'
      );
    });

    it('should throw network or server error message when request fails', async () => {
      api.post.mockRejectedValueOnce({
        response: { data: { message: 'Invalid product payload' } }
      });

      await expect(createProduct({ name: 'Faulty Item' })).rejects.toThrow('Invalid product payload');
    });
  });

  describe('updateProduct', () => {
    it('should update product successfully and return updated product object', async () => {
      const updatePayload = { price: 175.0 };
      const updatedProductResponse = { ...mockSingleProduct, price: 175.0 };

      api.patch.mockResolvedValueOnce({ data: [updatedProductResponse] });

      const result = await updateProduct(1, updatePayload);

      expect(api.patch).toHaveBeenCalledWith('/products?id=eq.1', updatePayload);
      expect(result).toEqual(updatedProductResponse);
    });

    it('should update product with categoryId payload successfully', async () => {
      const updateWithCategoryId = { categoryId: 3 };

      api.patch.mockResolvedValueOnce({ data: [{ ...mockSingleProduct, categoryId: 3 }] });

      await updateProduct(1, updateWithCategoryId);

      expect(api.patch).toHaveBeenCalledWith('/products?id=eq.1', updateWithCategoryId);
    });

    it('should throw RLS policy error when response data is empty due to permission restriction', async () => {
      api.patch.mockResolvedValueOnce({ data: [] });

      await expect(updateProduct(1, { name: 'Restricted Item' })).rejects.toThrow(
        'No se pudo actualizar la mercancía. Verifique las políticas de acceso (RLS) en la base de datos.'
      );
    });

    it('should throw server error message on update failure', async () => {
      api.patch.mockRejectedValueOnce({
        response: { data: { message: 'Update forbidden' } }
      });

      await expect(updateProduct(1, { price: 100 })).rejects.toThrow('Update forbidden');
    });

    it('should throw default error message when update failure has no custom message', async () => {
      api.patch.mockRejectedValueOnce({ response: {} });

      await expect(updateProduct(1, { price: 100 })).rejects.toThrow('Error al actualizar la mercancía con ID 1.');
    });
  });

  describe('deleteProduct', () => {
    it('should delete product successfully', async () => {
      api.delete.mockResolvedValueOnce({ data: [mockSingleProduct] });

      const result = await deleteProduct(1);

      expect(api.delete).toHaveBeenCalledWith('/products?id=eq.1');
      expect(result).toEqual(mockSingleProduct);
    });

    it('should throw custom error message on deletion failure', async () => {
      api.delete.mockRejectedValueOnce({
        response: { data: { message: 'Foreign key restriction' } }
      });

      await expect(deleteProduct(1)).rejects.toThrow('Foreign key restriction');
    });
  });

  describe('getCategories', () => {
    it('should fetch categories successfully', async () => {
      api.get.mockResolvedValueOnce({ data: mockCategories });

      const signal = new AbortController().signal;
      const result = await getCategories(signal);

      expect(api.get).toHaveBeenCalledWith('/categories?select=*', { signal });
      expect(result).toEqual(mockCategories);
    });

    it('should rethrow CanceledError or AbortError', async () => {
      const cancelError = new Error('Canceled request');
      cancelError.name = 'CanceledError';
      api.get.mockRejectedValueOnce(cancelError);

      await expect(getCategories()).rejects.toThrow('Canceled request');
    });

    it('should throw default error message when category fetching fails', async () => {
      api.get.mockRejectedValueOnce(new Error('Server error'));

      await expect(getCategories()).rejects.toThrow('Error al obtener los gremios y categorías de mercancías.');
    });
  });
});
