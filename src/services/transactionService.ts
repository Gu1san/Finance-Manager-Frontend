import api from "../api/api";
import { ITransaction } from "../types";

export const transactionService = {
  async getAll(): Promise<ITransaction[]> {
    const { data } = await api.get("/transactions");
    return data;
  },

  async getById(id: string): Promise<ITransaction> {
    const { data } = await api.get(`/transactions/${id}`);
    return data;
  },

  async getByCategory(category: string): Promise<ITransaction[]> {
    const { data } = await api.get("/transactions/category", {
      params: { category },
    });

    return data;
  },

  async getByType(type: "entrada" | "saida"): Promise<ITransaction[]> {
    const { data } = await api.get("/transactions/type", {
      params: { type },
    });

    return data;
  },

  async create(transaction: Omit<ITransaction, "id">) {
    await api.post("/transactions", {
      ...transaction,
      amount: Number(transaction.amount),
    });
  },

  async delete(id: string) {
    await api.delete(`/transactions/${id}`);
  },
};
