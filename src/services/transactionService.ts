import api from "../api/api";
import { ITransaction } from "../types";

export const transactionService = {
  async getAll(): Promise<ITransaction[]> {
    try {
      const { data } = await api.get("/transactions");
      return Promise.resolve(data);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  },

  async getBalance() {
    const { data } = await api.get("/transactions/balance");
    return data.balance;
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
