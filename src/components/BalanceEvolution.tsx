import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { IBalanceEvolution } from '../services/reportService';

interface BalanceEvolutionProps {
  data: IBalanceEvolution[];
}

export default function BalanceEvolution({ data }: BalanceEvolutionProps) {
  return (
    <div className="flex h-auto min-h-64 items-center justify-center">
      {data.length > 0 ? (
        <div className="h-65 w-full">
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
                  `${Number(value).toLocaleString('pt-BR')}`
                }
              />

              <Tooltip
                formatter={(value) =>
                  `R$${Number(value).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}`
                }
                labelStyle={{
                  color: '#d2852d',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              />

              <Line
                name="Saldo"
                type="monotone"
                dataKey="result"
                strokeWidth={2}
                dot={true}
                stroke="#d2852d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-foreground">
          Nenhuma despesa para exibir.
        </div>
      )}
    </div>
  );
}
