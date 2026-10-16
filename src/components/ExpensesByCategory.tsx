import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ICategoryReport } from '../services/reportService';

interface ExpensesByCategoryProps {
  data: ICategoryReport[];
}

export default function ExpensesByCategory({ data }: ExpensesByCategoryProps) {
  const colors = ['#283618', '#DDA15E', '#BC6C25'];

  const chartData = data
    .filter(
      (item) => Number.isFinite(Number(item.total)) && Number(item.total) > 0,
    )
    .map((item) => ({
      category: item.category,
      total: Number(item.total),
    }));

  const totalExpenses = chartData.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex h-auto min-h-64 flex-col items-center justify-center gap-4 sm:flex-row">
      {chartData.length > 0 ? (
        <>
          <div className="flex justify-start h-64 w-auto sm:w-3/5">
            <ResponsiveContainer width="80%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  innerRadius={70}
                  paddingAngle={3}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.category}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `R$ ${Number(value).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  }
                  labelStyle={{
                    color: '#d2852d',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-2/5">
            {chartData.map((entry, index) => {
              const percentage = (entry.total / totalExpenses) * 100;

              return (
                <div
                  key={entry.category}
                  className="flex min-w-0 items-center gap-2"
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: colors[index % colors.length],
                    }}
                  />

                  <span className="min-w-0 flex-1 truncate text-sm">
                    {entry.category}
                  </span>

                  <span className="shrink-0 text-sm font-semibold">
                    {percentage.toLocaleString('pt-BR', {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                    %
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-foreground">
          Nenhuma despesa para exibir.
        </div>
      )}
    </div>
  );
}
