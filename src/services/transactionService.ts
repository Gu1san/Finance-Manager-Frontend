import api from "../api/api";
import { ITransaction } from "../types";

export const transactionService = {
  async getAll(): Promise<ITransaction[]> {
    const { data } = await api.get("/transactions");
    return data;
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
};
