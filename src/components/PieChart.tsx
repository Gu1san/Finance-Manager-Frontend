import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { IPieChartData } from "../types";

export default function PieChartComponent({ values }: IPieChartData) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const total = values?.reduce((sum, item) => sum + Number(item.value), 0);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={values as any}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label
        >
          {values &&
            values.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>

        <text
          x="50%"
          y="47%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-700 text-base font-semibold"
        >
          {total &&
            total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
        </text>

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
