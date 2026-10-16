"use client";

import { useState } from "react";
import { ITransaction } from "../types";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<ITransaction, "id">) => Promise<void>;
}

const initialForm = {
  description: "",
  amount: "",
  category: "",
  date: "",
  type: "entrada" as "entrada" | "saida",
};

export default function TransactionModal({
  isOpen,
  onClose,
  onSubmit,
}: TransactionModalProps) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  function handleChange(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await onSubmit({
        ...form,
        amount: Number(form.amount),
      });

      setForm(initialForm);
      onClose();
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (loading) return;

    setForm(initialForm);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
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
              className="w-full rounded-lg border border-border bg-background-primary p-2.5 outline-none focus:ring-2"
              placeholder="Ex.: Supermercado"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Valor</label>

              <input
                required
                min="0"
                step="0.01"
                type="number"
                className="w-full rounded-lg border border-border bg-background-primary p-2.5 outline-none focus:ring-2"
                placeholder="0,00"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Data</label>

              <input
                required
                type="date"
                className="w-full rounded-lg border border-border bg-background-primary p-2.5 outline-none focus:ring-2"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Categoria</label>

            <input
              required
              className="w-full rounded-lg border border-border bg-background-primary p-2.5 outline-none focus:ring-2"
              placeholder="Ex.: Alimentação"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Tipo</label>

            <select
              className="w-full rounded-lg border border-border bg-background-primary p-2.5 outline-none focus:ring-2"
              value={form.type}
              onChange={(e) =>
                handleChange("type", e.target.value as "entrada" | "saida")
              }
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>

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
              disabled={loading}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar transação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
