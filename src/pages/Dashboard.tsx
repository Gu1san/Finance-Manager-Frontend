import Card from "../components/Card";
import PieChartComponent from "../components/PieChart";
import MonthlyExpenses from "../components/PieChart";

export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* <Card title="Gastos por Categoria">
        <PieChartComponent />
      </Card> */}

      <Card
        title="Entradas x Saídas"
        subtitle="Resumo do último mês"
        footer={
          <span className="text-sm text-gray-500">Atualizado em hoje</span>
        }
      >
        <p>Em breve, gráfico aqui</p>
      </Card>
    </div>
  );
}
