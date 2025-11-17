import { useEffect, useState } from "react";
import api from "../api/api";
import { ITransaction } from "../types";

export default function Report() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api.get("/transactions").then((res) => setTransactions(res.data));
  }, []);

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Extrato</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        {transactions.length === 0 ? (
          <p className="text-gray-500">Nenhuma transação registrada.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {transactions
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((t) => (
                <li
                  key={t.id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{t.description}</p>
                    <p className="text-sm text-gray-500">
                      {t.category} •{" "}
                      {new Date(t.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${
                      t.type === "entrada" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type === "entrada" ? "+" : "-"}{" "}
                    {t.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
