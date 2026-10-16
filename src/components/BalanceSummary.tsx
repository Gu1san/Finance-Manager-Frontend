import { ArrowDown, ArrowUp } from "lucide-react";
import { IReportSummary } from "../services/reportService";

interface BalanceSummaryProps {
  summary: IReportSummary;
}

export default function BalanceSummary({ summary }: BalanceSummaryProps) {
  const { entradas, saidas, resultado } = summary;

  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <p className="text-sm text-foreground-secondary">Saldo atual</p>

        <p className="mt-2 text-4xl font-bold tracking-tight">
          R${" "}
          {resultado.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-foreground-secondary">
            <ArrowUp size={16} />
            <span>Entradas</span>
          </div>

          <p className="mt-1 text-lg font-semibold">
            R${" "}
            {entradas.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-foreground-secondary">
            <ArrowDown size={16} />
            <span>Saídas</span>
          </div>

          <p className="mt-1 text-lg font-semibold">
            R${" "}
            {saidas.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
