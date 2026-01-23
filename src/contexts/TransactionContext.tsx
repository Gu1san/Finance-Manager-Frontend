import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IBalance, IPieChartValue, ITransaction } from "../types";
import { transactionService } from "../services/transactionService";

interface TransactionContextData {
  balance: IBalance;
  expensesByCategory: IPieChartValue[];
  incomesByCategory: IPieChartValue[];
  transactions: ITransaction[];
  createTransaction: (data: Omit<ITransaction, "id">) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const TransactionContext = createContext({} as TransactionContextData);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState<IBalance>({
    total: 0,
    entradas: 0,
    saidas: 0,
  });

  const [expensesByCategory, setExpensesByCategory] = useState<
    IPieChartValue[]
  >([]);
  const [incomesByCategory, setIncomesByCategory] = useState<IPieChartValue[]>(
    [],
  );
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  async function refresh() {
    const transactions = await transactionService.getAll();
    const balanceData = await transactionService.getBalance();

    const categoryMap: Record<string, { entrada: number; saida: number }> = {};

    transactions.forEach((t) => {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = { entrada: 0, saida: 0 };
      }

      categoryMap[t.category][t.type] += Number(t.amount);
    });

    setExpensesByCategory(
      Object.entries(categoryMap)
        .filter(([, v]) => v.saida > 0)
        .map(([name, v]) => ({ name, value: v.saida })),
    );

    setIncomesByCategory(
      Object.entries(categoryMap)
        .filter(([, v]) => v.entrada > 0)
        .map(([name, v]) => ({ name, value: v.entrada })),
    );

    setTransactions(transactions);

    setBalance(balanceData);
  }

  async function createTransaction(data: Omit<ITransaction, "id">) {
    await transactionService.create(data);
    await refresh();
  }

  async function deleteTransaction(id: string) {
    await transactionService.delete(id);
    await refresh();
  }

  useEffect(() => {
    console.log("Refreshing transaction data...");
    refresh();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        balance,
        expensesByCategory,
        incomesByCategory,
        transactions,
        createTransaction,
        deleteTransaction,
        refresh,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  return useContext(TransactionContext);
}
