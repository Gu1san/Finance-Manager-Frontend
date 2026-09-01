import { ArrowDown, ArrowUp } from "lucide-react";
import { ITransaction } from "../types";

interface RecentTransactionsProps {
  transactions: ITransaction[];
}

function formatCurrency(value: number | string) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
}

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (recentTransactions.length === 0) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <p className="text-sm text-foreground-secondary">
          Nenhuma transação encontrada.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {recentTransactions.map((transaction) => {
        const isIncome = transaction.type === "entrada";

        return (
          <div
            key={transaction.id}
            className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="shrink-0">
                {isIncome ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {transaction.description}
                </p>

                <p className="text-xs text-foreground-secondary">
                  {transaction.category} · {formatDate(transaction.date)}
                </p>
              </div>
            </div>

            <p className="shrink-0 text-sm font-semibold">
              {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
