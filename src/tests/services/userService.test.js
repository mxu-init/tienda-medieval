import { describe, it, expect, beforeEach, vi } from 'vitest';
import api from '../../services/api';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../../services/userService';
import { mockUsers, mockSingleUser } from '../mocks/mockData';

vi.mock('../../services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn()
  }
}));

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should fetch all users successfully', async () => {
      api.get.mockResolvedValueOnce({ data: mockUsers });

      const signal = new AbortController().signal;
      const result = await getUsers(signal);

      expect(api.get).toHaveBeenCalledWith('/users?select=*', { signal });
      expect(result).toEqual(mockUsers);
    });

    it('should rethrow CanceledError when request is canceled', async () => {
      const cancelError = new Error('Canceled');
      cancelError.name = 'CanceledError';
      api.get.mockRejectedValueOnce(cancelError);

      await expect(getUsers()).rejects.toThrow('Canceled');
    });

    it('should rethrow AbortError when request is aborted', async () => {
      const abortError = new Error('Aborted');
      abortError.name = 'AbortError';
      api.get.mockRejectedValueOnce(abortError);

      await expect(getUsers()).rejects.toThrow('Aborted');
    });

    it('should throw custom error message on failure', async () => {
      api.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(getUsers()).rejects.toThrow('Error al obtener la lista de usuarios del reino.');
    });
  });

  describe('getUserById', () => {
    it('should fetch user by id successfully', async () => {
      api.get.mockResolvedValueOnce({ data: [mockSingleUser] });

      const signal = new AbortController().signal;
      const result = await getUserById(1, signal);

      expect(api.get).toHaveBeenCalledWith('/users?id=eq.1', { signal });
      expect(result).toEqual(mockSingleUser);
    });

    it('should rethrow CanceledError or AbortError', async () => {
      const abortError = new Error('Aborted request');
      abortError.name = 'AbortError';
      api.get.mockRejectedValueOnce(abortError);

      await expect(getUserById(1)).rejects.toThrow('Aborted request');
    });

    it('should throw error when user fetch fails', async () => {
      api.get.mockRejectedValueOnce(new Error('User not found'));

      await expect(getUserById(99)).rejects.toThrow('Error al obtener los detalles del usuario con ID 99.');
    });
  });

  describe('createUser', () => {
    it('should create user successfully and return single user object', async () => {
      const newUserData = { name: 'King Arthur', email: 'arthur@camelot.realm', role: 'king' };
      const createdUser = { id: 3, ...newUserData };

      api.post.mockResolvedValueOnce({ data: [createdUser] });

      const result = await createUser(newUserData);

      expect(api.post).toHaveBeenCalledWith('/users', newUserData);
      expect(result).toEqual(createdUser);
    });

    it('should throw RLS permission error when returned data array is empty', async () => {
      api.post.mockResolvedValueOnce({ data: [] });

      await expect(createUser({ name: 'Unauthorized' })).rejects.toThrow(
        'No se pudo registrar el usuario. Verifique los permisos de acceso.'
      );
    });

    it('should throw server error message when creation fails', async () => {
      api.post.mockRejectedValueOnce({
        response: { data: { message: 'Duplicate email address' } }
      });

      await expect(createUser({ email: 'existing@realm.com' })).rejects.toThrow('Duplicate email address');
    });
  });

  describe('updateUser', () => {
    it('should update user successfully and return updated user object', async () => {
      const updateData = { role: 'archmage' };
      const updatedUser = { ...mockSingleUser, role: 'archmage' };

      api.patch.mockResolvedValueOnce({ data: [updatedUser] });

      const result = await updateUser(1, updateData);

      expect(api.patch).toHaveBeenCalledWith('/users?id=eq.1', updateData);
      expect(result).toEqual(updatedUser);
    });

    it('should throw RLS policy error when response data is empty array', async () => {
      api.patch.mockResolvedValueOnce({ data: [] });

      await expect(updateUser(1, { role: 'admin' })).rejects.toThrow(
        'No se pudo actualizar el usuario. Verifique las políticas de acceso (RLS) en la base de datos.'
      );
    });

    it('should throw server error message on update failure', async () => {
      api.patch.mockRejectedValueOnce({
        response: { data: { message: 'Permission denied' } }
      });

      await expect(updateUser(1, { name: 'New Name' })).rejects.toThrow('Permission denied');
    });

    it('should throw default error message when update failure has no custom message', async () => {
      api.patch.mockRejectedValueOnce({ response: {} });

      await expect(updateUser(1, { name: 'New Name' })).rejects.toThrow(
        'Error al actualizar la información del usuario con ID 1.'
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      api.delete.mockResolvedValueOnce({ data: [mockSingleUser] });

      const result = await deleteUser(1);

      expect(api.delete).toHaveBeenCalledWith('/users?id=eq.1');
      expect(result).toEqual(mockSingleUser);
    });

    it('should throw custom error message on deletion failure', async () => {
      api.delete.mockRejectedValueOnce({
        response: { data: { message: 'User cannot be deleted' } }
      });

      await expect(deleteUser(1)).rejects.toThrow('User cannot be deleted');
    });
  });
});
