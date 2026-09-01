"use client";

import { useState } from "react";
import { ReportPeriodOption } from "../hooks/useReports";

interface PeriodSelectorProps {
  period: ReportPeriodOption;
  onPeriodChange: (period: ReportPeriodOption) => void;

  customPeriod: {
    from?: string;
    to?: string;
  };

  onCustomPeriodChange: (period: { from?: string; to?: string }) => void;

  onApplyCustomPeriod: () => void;
}

const periodOptions: {
  value: ReportPeriodOption;
  label: string;
}[] = [
  {
    value: "last-month",
    label: "Último mês",
  },
  {
    value: "last-3-months",
    label: "Últimos 3 meses",
  },
  {
    value: "last-6-months",
    label: "Últimos 6 meses",
  },
  {
    value: "this-year",
    label: "Este ano",
  },
  {
    value: "all",
    label: "Todo o período",
  },
  {
    value: "custom",
    label: "Personalizado",
  },
];

export default function PeriodSelector({
  period,
  onPeriodChange,
  customPeriod,
  onCustomPeriodChange,
  onApplyCustomPeriod,
}: PeriodSelectorProps) {
  const [customOpen, setCustomOpen] = useState(false);

  function handlePeriodChange(value: ReportPeriodOption) {
    if (value === "custom") {
      setCustomOpen(true);
      return;
    }

    onPeriodChange(value);
    setCustomOpen(false);
  }

  function handleApply() {
    onApplyCustomPeriod();
    setCustomOpen(false);
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <label htmlFor="period" className="text-sm font-medium">
          Período
        </label>

        <select
          id="period"
          value={period}
          onChange={(e) =>
            handlePeriodChange(e.target.value as ReportPeriodOption)
          }
          className="rounded-lg border border-border bg-background-secondary px-3 py-2 text-sm outline-none focus:ring-2"
        >
          {periodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {customOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-background-secondary p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Período personalizado</h2>

              <p className="mt-1 text-sm text-foreground-secondary">
                Escolha o intervalo que deseja consultar.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Data inicial
                </label>

                <input
                  type="date"
                  className="w-full rounded-lg border border-border bg-background-primary p-2.5"
                  value={customPeriod.from ?? ""}
                  onChange={(e) =>
                    onCustomPeriodChange({
                      ...customPeriod,
                      from: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Data final
                </label>

                <input
                  type="date"
                  className="w-full rounded-lg border border-border bg-background-primary p-2.5"
                  value={customPeriod.to ?? ""}
                  onChange={(e) =>
                    onCustomPeriodChange({
                      ...customPeriod,
                      to: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCustomOpen(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-background-primary"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleApply}
                disabled={!customPeriod.from || !customPeriod.to}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
