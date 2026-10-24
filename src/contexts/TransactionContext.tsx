'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { ITransaction } from '../types';
import { transactionService } from '../services/transactionService';
import { useAuth } from './AuthContexts';
import { TransactionFormData } from '../components/TransactionModal';

interface TransactionContextData {
  transactions: ITransaction[];
  createTransaction: (data: TransactionFormData) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export const TransactionContext = createContext<
  TransactionContextData | undefined
>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const { isAuthenticated } = useAuth();

  async function refresh() {
    if (!isAuthenticated) {
      setTransactions([]);
      return;
    }

    const data = await transactionService.getAll();

    setTransactions(data);
  }

  async function createTransaction(data: TransactionFormData) {
    await transactionService.create(data);
    await refresh();
  }

  async function deleteTransaction(id: string) {
    await transactionService.delete(id);
    await refresh();
  }

  useEffect(() => {
    if (!isAuthenticated) {
      Promise.resolve().then(() => setTransactions([]));
      return;
    }

    Promise.resolve().then(() => refresh());
  }, [isAuthenticated]);

  return (
    <TransactionContext.Provider
      value={{
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
