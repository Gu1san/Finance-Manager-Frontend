import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";

export function useTransactionContext() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within TransactionProvider",
    );
  }

  return context;
}
