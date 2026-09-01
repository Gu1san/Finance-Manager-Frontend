import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ICategoryReport } from "../services/reportService";

interface ExpensesByCategoryProps {
  data: ICategoryReport[];
}

export default function ExpensesByCategory({ data }: ExpensesByCategoryProps) {
  return (
    <div className="h-full min-h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 10,
            bottom: 5,
            left: 10,
          }}
        >
          <XAxis
            type="number"
            tickFormatter={(value) =>
              `R$ ${Number(value).toLocaleString("pt-BR")}`
            }
          />

          <YAxis type="category" dataKey="category" width={100} />

          <Tooltip
            formatter={(value) =>
              `R$ ${Number(value).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`
            }
          />

          <Bar dataKey="total" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
