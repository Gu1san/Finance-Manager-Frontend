'use client';
import { Trash2 } from 'lucide-react';
import { useTransactionContext } from '@/src//hooks/useTransaction';

export default function Report() {
  const { transactions, deleteTransaction } = useTransactionContext();

  return (
    <div className="p-6 w-full max-w-3xl mx-auto justify-center">
      <h1 className="text-2xl font-bold mb-4">Extrato</h1>
      <div className="bg-black-forest-active p-6 rounded-xl shadow">
        {transactions && transactions.length === 0 ? (
          <p className="text-foreground-secondary">
            Nenhuma transação registrada.
          </p>
        ) : (
          <ul className="divide-y divide-sunlit-clay-secondary">
            {transactions &&
              transactions
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .map((t) => (
                  <li
                    key={t.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-100">
                        {t.description}
                      </p>
                      <p className="text-sm text-gray-300">
                        {t.category}{' '}
                        <span className="text-sunlit-clay-secondary">•</span>{' '}
                        {new Date(t.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p
                        className={`font-semibold ${
                          t.type === 'entrada'
                            ? 'text-olive-leaf-secondary'
                            : 'text-danger-hover'
                        }`}
                      >
                        {t.type === 'entrada' ? '+' : '-'}{' '}
                        {t.amount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>

                      <button
                        onClick={() => deleteTransaction(String(t.id))}
                        className="p-2 rounded hover:bg-danger-hover text-danger transition"
                        title="Excluir transação"
                      >
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </div>
                  </li>
                ))}
          </ul>
        )}
      </div>
    </div>
  );
}
