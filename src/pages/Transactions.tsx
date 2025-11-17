import { useEffect, useState } from "react";
import api from "../api/api";
import BalanceCard from "../components/BalanceCard";
import { IBalance, IPieChartValue, ITransaction } from "../types";
import PieChartComponent from "../components/PieChart";

export default function Transactions() {
  const [expensesByCategory, setExpensesByCategory] = useState<
    IPieChartValue[]
  >([]);
  const [incomesByCategory, setIncomesByCategory] = useState<IPieChartValue[]>(
    []
  );
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
    type: "entrada",
  });

  const [balance, setBalance] = useState<IBalance>({
    total: 0,
    entradas: 0,
    saidas: 0,
  });

  const fetchData = async () => {
    const transactionsRes = await api.get("/transactions");
    const balanceRes = await api.get("/transactions/balance");
    const transactions: ITransaction[] = transactionsRes.data;

    const categoryMap: Record<string, { entrada: number; saida: number }> = {};

    for (const t of transactions) {
      const cat = t.category;
      const amount = Number(t.amount);

      if (!categoryMap[cat]) {
        categoryMap[cat] = { entrada: 0, saida: 0 };
      }

      if (t.type === "entrada") {
        categoryMap[cat].entrada += amount;
      } else {
        categoryMap[cat].saida += amount;
      }
    }

    // Transformar o objeto em array
    const expensesData = Object.entries(categoryMap)
      .map(([category, values]) => {
        if (values.saida === 0) return null;
        return { name: category, value: values.saida };
      })
      .filter((e) => e !== null);
    const incomesData = Object.entries(categoryMap)
      .map(([category, values]) => {
        if (values.entrada === 0) return null;
        return { name: category, value: values.entrada };
      })
      .filter((e) => e !== null);

    setExpensesByCategory(expensesData);
    setIncomesByCategory(incomesData);
    setBalance(balanceRes.data.balance);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.category || !form.date) {
      alert("Preencha todos os campos!");
      return;
    }

    await api.post("/transactions", {
      ...form,
      amount: parseFloat(form.amount),
    });

    setForm({
      description: "",
      amount: "",
      category: "",
      date: "",
      type: "entrada",
    });

    fetchData();
  };

  return (
    <div className="p-6 w-full max-w-5xl mx-auto flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-2">Transações</h1>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <BalanceCard
          title="Saldo total"
          value={balance.total}
          color="text-blue-600"
        />
        <BalanceCard
          title="Entradas"
          value={balance.entradas}
          color="text-green-600"
        />
        <BalanceCard
          title="Saídas"
          value={balance.saidas}
          color="text-red-600"
        />
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow"
      >
        <input
          type="text"
          placeholder="Descrição"
          className="border p-2 rounded col-span-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Valor"
          className="border p-2 rounded"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Categoria"
          className="border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 col-span-2"
        >
          Criar Transação
        </button>
      </form>

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
