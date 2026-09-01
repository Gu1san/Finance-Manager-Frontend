import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { IBalanceEvolution } from "../services/reportService";

interface BalanceEvolutionProps {
  data: IBalanceEvolution[];
}

export default function BalanceEvolution({ data }: BalanceEvolutionProps) {
  return (
    <div className="h-full min-h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            bottom: 5,
            left: 10,
          }}
        >
          <XAxis dataKey="date" />

          <YAxis
            tickFormatter={(value) =>
              `R$ ${Number(value).toLocaleString("pt-BR")}`
            }
          />

          <Tooltip
            formatter={(value) =>
              `R$ ${Number(value).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`
            }
          />

          <Line type="monotone" dataKey="result" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
