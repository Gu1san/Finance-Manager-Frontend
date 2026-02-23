import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import BalanceCard from "../components/BalanceCard";
import { IBalance, IPieChartValue, ITransaction } from "../types";
import PieChartComponent from "../components/PieChart";
import Card from "../components/Card";
import { useTransactionContext } from "../hooks/useTransaction";

export default function Dashboard() {
  const {
    balance,
    expensesByCategory,
    incomesByCategory,
    transactions,
    createTransaction,
    refresh,
  } = useTransactionContext();

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
    type: "entrada",
  });

  const [recentTransactions, setRecentTransactions] = useState<ITransaction[]>(
    [],
  );

  useEffect(() => {
    if (transactions === undefined || transactions.length <= 0) return;
    setRecentTransactions(
      transactions
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5),
    );
  }, [transactions]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createTransaction(form as any);
    setForm({
      description: "",
      amount: "",
      category: "",
      date: "",
      type: "entrada",
    });
  }

  return (
    <div className="p-6 w-full max-w-5xl mx-auto flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-2">Transações</h1>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <BalanceCard
          title="Saldo total"
          value={balance?.total}
          color="text-blue-600"
        />
        <BalanceCard
          title="Entradas"
          value={balance?.entradas}
          color="text-green-600"
        />
        <BalanceCard
          title="Saídas"
          value={balance?.saidas}
          color="text-red-600"
        />
      </div>

      <Card title="Nova transação" subtitle="Adicione entradas ou saídas">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
          <input
            className="border rounded p-2 col-span-2"
            placeholder="Descrição"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="number"
            className="border rounded p-2"
            placeholder="Valor"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            className="border rounded p-2"
            placeholder="Categoria"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            type="date"
            className="border rounded p-2"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <select
            className="border rounded p-2"
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value === "Entrada" ? "entrada" : "saida",
              })
            }
          >
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>

          <button className="bg-blue-500 text-white rounded p-2 col-span-2 hover:bg-blue-600">
            Salvar transação
          </button>
        </form>
      </Card>

      <Card title="Transações recentes">
        <ul className="space-y-3">
          {recentTransactions &&
            recentTransactions.map((t) => (
              <li key={t.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{t.description}</p>
                  <p className="text-xs text-gray-500">{t.category}</p>
                </div>

                <span
                  className={`font-semibold ${
                    t.type === "entrada" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type === "entrada" ? "+" : "-"}
                  {Number(t.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </li>
            ))}
        </ul>
      </Card>

      {/* Gráfico de categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Gastos por Categoria</h2>
          <div className="w-full h-80">
            <PieChartComponent name="Sla" values={expensesByCategory} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Ganhos por Categoria</h2>
          <div className="w-full h-80">
            <PieChartComponent name="Sla" values={incomesByCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}
