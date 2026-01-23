import { useTransactionContext } from "../contexts/TransactionContext";

export function useTransaction() {
  return useTransactionContext();
}
