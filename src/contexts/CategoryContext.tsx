'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ICategory } from '../types';
import { categoryService } from '../services/categoryService';

interface CategoryContextType {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
  refreshCategories: () => Promise<void>;
  createCategory: (name: string) => Promise<ICategory>;
  updateCategory: (id: number, name: string) => Promise<ICategory>;
  deleteCategory: (id: number) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

function sortCategories(categories: ICategory[]): ICategory[] {
  return [...categories].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await categoryService.getAll();
      setCategories(sortCategories(data));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar categorias.';

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (name: string) => {
    setError(null);

    try {
      const created = await categoryService.create(name);

      setCategories((current) => sortCategories([...current, created]));

      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar categoria.');
      throw err;
    }
  }, []);

  const updateCategory = useCallback(async (id: number, name: string) => {
    setError(null);

    try {
      const updated = await categoryService.update(id, name);

      setCategories((current) =>
        sortCategories(
          current.map((category) => (category.id === id ? updated : category)),
        ),
      );

      return updated;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao atualizar categoria.',
      );
      throw err;
    }
  }, []);

  const deleteCategory = useCallback(async (id: number) => {
    setError(null);

    try {
      await categoryService.delete(id);

      setCategories((current) =>
        current.filter((category) => category.id !== id),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao excluir categoria.',
      );
      throw err;
    }
  }, []);

  useEffect(() => {
    void refreshCategories().catch(() => {});
  }, [refreshCategories]);

  const value = useMemo(
    () => ({
      categories,
      loading,
      error,
      refreshCategories,
      createCategory,
      updateCategory,
      deleteCategory,
    }),
    [
      categories,
      loading,
      error,
      refreshCategories,
      createCategory,
      updateCategory,
      deleteCategory,
    ],
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error(
      'useCategories deve ser utilizado dentro de CategoryProvider.',
    );
  }

  return context;
}
