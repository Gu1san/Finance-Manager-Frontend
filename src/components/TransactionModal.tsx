'use client';

import { useState } from 'react';
import { useCategories } from '../contexts/CategoryContext';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { Check, ChevronDown, ChevronsUpDown } from 'lucide-react';

export interface TransactionFormData {
  description: string;
  amount: number;
  category_id: number;
  date: string;
  type: 'entrada' | 'saida';
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => Promise<void>;
}

const initialForm = {
  description: '',
  amount: '',
  categoryName: '',
  category_id: '',
  date: '',
  type: 'entrada' as 'entrada' | 'saida',
};

export default function TransactionModal({
  isOpen,
  onClose,
  onSubmit,
}: TransactionModalProps) {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    refreshCategories,
    createCategory,
  } = useCategories();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  function normalizeName(name: string) {
    return name.trim().toLocaleLowerCase('pt-BR');
  }

  function handleChange(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleCategoryChange(value: string) {
    const matchedCategory = categories.find(
      (category) => normalizeName(category.name) === normalizeName(value),
    );

    setForm((current) => ({
      ...current,
      categoryName: value,
      category_id: matchedCategory ? String(matchedCategory.id) : '',
    }));

    setSubmitError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (!form.categoryName.trim()) {
      setSubmitError('Informe uma categoria.');
      return;
    }

    try {
      setLoading(true);

      const normalizedName = normalizeName(form.categoryName);

      const existingCategory = categories.find(
        (category) => normalizeName(category.name) === normalizedName,
      );

      let categoryId: number;

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const created = await createCategory(form.categoryName.trim());

        categoryId = created.id;

        // Preserva o ID caso a criação da transação falhe.
        setForm((current) => ({
          ...current,
          categoryName: created.name,
          category_id: String(created.id),
        }));
      }

      await onSubmit({
        description: form.description.trim(),
        amount: Number(form.amount),
        category_id: categoryId,
        date: form.date,
        type: form.type,
      });

      setForm(initialForm);
      onClose();
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Não foi possível salvar a transação.',
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (loading) return;

    setForm(initialForm);
    setSubmitError(null);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-border bg-background-secondary p-6 shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Nova transação</h2>

          <p className="mt-1 text-sm text-foreground-secondary">
            Adicione uma nova entrada ou saída.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Descrição</label>

            <input
              required
              disabled={loading}
              className="w-full rounded-lg border border-border bg-background-primary p-2.5 outline-none focus:ring-2"
              placeholder="Ex.: Supermercado"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Valor</label>

              <input
                required
                disabled={loading}
                min="0.01"
                step="1"
                type="number"
                className="w-full rounded-lg border border-border bg-background-primary p-2.5 outline-none focus:ring-2"
                placeholder="0,00"
                value={form.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Data</label>

              <input
                required
                disabled={loading}
                type="date"
                className="w-full rounded-lg border border-border bg-background-primary p-2.5 outline-none focus:ring-2"
                value={form.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Categoria</label>

            <Combobox
              value={form.categoryName}
              onChange={(value: string | null) =>
                handleCategoryChange(value ?? '')
              }
            >
              <div className="relative">
                <ComboboxInput
                  className="w-full rounded-lg border border-border bg-background-primary p-2.5 pr-10 text-foreground outline-none focus:ring-2"
                  placeholder="Digite ou selecione uma categoria"
                  displayValue={(value: string) => value}
                  onChange={(event) => handleCategoryChange(event.target.value)}
                  autoComplete="off"
                />

                <ComboboxButton
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-foreground-secondary"
                  aria-label="Mostrar categorias"
                >
                  <ChevronsUpDown size={18} aria-hidden="true" />
                </ComboboxButton>

                <ComboboxOptions
                  anchor="bottom"
                  className="z-50 mt-1 max-h-60 w-(--input-width) overflow-auto rounded-lg border border-border bg-background-secondary p-1 shadow-xl empty:invisible"
                >
                  {categories
                    .filter((category) =>
                      category.name
                        .toLocaleLowerCase('pt-BR')
                        .includes(
                          form.categoryName.trim().toLocaleLowerCase('pt-BR'),
                        ),
                    )
                    .map((category) => (
                      <ComboboxOption
                        key={category.id}
                        value={category.name}
                        className="group flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-foreground data-focus:bg-foreground/10"
                      >
                        <span>{category.name}</span>

                        {normalizeName(form.categoryName) ===
                          normalizeName(category.name) && (
                          <Check
                            size={16}
                            aria-hidden="true"
                            className="text-foreground"
                          />
                        )}
                      </ComboboxOption>
                    ))}
                </ComboboxOptions>
              </div>
            </Combobox>

            {form.categoryName.trim() &&
              !categories.some(
                (category) =>
                  normalizeName(category.name) ===
                  normalizeName(form.categoryName),
              ) && (
                <p className="mt-2 text-sm text-foreground-secondary">
                  Nova categoria. Ela será criada ao salvar a transação.
                </p>
              )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Tipo</label>

            <Listbox
              value={form.type}
              onChange={(value: 'entrada' | 'saida') =>
                handleChange('type', value)
              }
            >
              <div className="relative">
                <ListboxButton className="flex w-full items-center justify-between rounded-lg border border-border bg-background-primary p-2.5 text-left text-foreground outline-none focus:ring-2">
                  <span>{form.type === 'entrada' ? 'Entrada' : 'Saída'}</span>

                  <ChevronDown
                    size={18}
                    className="text-foreground-secondary"
                  />
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-background-secondary p-1 shadow-xl focus:outline-none"
                >
                  <ListboxOption
                    value="entrada"
                    className="group flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-foreground data-focus:bg-foreground/10"
                  >
                    <span>Entrada</span>
                    {form.type === 'entrada' && (
                      <Check size={16} aria-hidden="true" />
                    )}
                  </ListboxOption>

                  <ListboxOption
                    value="saida"
                    className="group flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-foreground data-focus:bg-foreground/10"
                  >
                    <span>Saída</span>
                    {form.type === 'saida' && (
                      <Check size={16} aria-hidden="true" />
                    )}
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          {submitError && (
            <p role="alert" className="text-sm text-red-500">
              {submitError}
            </p>
          )}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={handleClose}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-background-primary disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                categoriesLoading ||
                !!categoriesError ||
                !form.categoryName.trim()
              }
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar transação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
