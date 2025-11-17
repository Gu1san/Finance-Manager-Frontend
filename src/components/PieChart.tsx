import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import "../styles/components/pieChart.css";
import { IPieChartData } from "../types";

export default function PieChartComponent(data: IPieChartData) {
  const values = data.values;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const total = values.reduce((sum, item) => sum + Number(item.value), 0);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart className="piechart" width={300} height={300}>
        <Pie
          className="pie"
          data={values as any}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {values.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <text
          x="50%"
          y="47%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-700 text-lg font-bold"
        >
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </text>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
