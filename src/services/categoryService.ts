import api from '../api';
import { ICategory } from '../types';

export const categoryService = {
  async getAll(): Promise<ICategory[]> {
    const { data } = await api.get('/categories');
    return data;
  },

  async create(name: string): Promise<ICategory> {
    const { data } = await api.post('/categories', { name });
    return data;
  },

  async update(id: number, name: string): Promise<ICategory> {
    const { data } = await api.put(`/categories/${id}`, { name });
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
