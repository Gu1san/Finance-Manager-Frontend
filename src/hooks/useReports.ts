"use client";

import { useCallback, useEffect, useState } from "react";
import {
  reportService,
  ReportPeriod,
  IReportSummary,
  ICategoryReport,
  IBalanceEvolution,
} from "../services/reportService";
import { useAuth } from "../contexts/AuthContexts";

export type ReportPeriodOption =
  | "last-month"
  | "last-3-months"
  | "last-6-months"
  | "this-year"
  | "all"
  | "custom";

interface UseReportsReturn {
  summary: IReportSummary;
  expensesByCategory: ICategoryReport[];
  incomeByCategory: ICategoryReport[];
  balanceEvolution: IBalanceEvolution[];

  period: ReportPeriodOption;
  setPeriod: (period: ReportPeriodOption) => void;

  customPeriod: ReportPeriod;
  setCustomPeriod: (period: ReportPeriod) => void;
  applyCustomPeriod: () => void;

  loading: boolean;
  error: string | null;

  refresh: () => Promise<void>;
}

const initialSummary: IReportSummary = {
  entradas: 0,
  saidas: 0,
  resultado: 0,
};

const emptyPeriod: ReportPeriod = {
  from: "",
  to: "",
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getPeriodDates(
  option: ReportPeriodOption,
  customPeriod: ReportPeriod,
): ReportPeriod {
  const today = new Date();

  switch (option) {
    case "last-month": {
      const firstDayLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1,
      );

      const lastDayLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0,
      );

      return {
        from: formatDate(firstDayLastMonth),
        to: formatDate(lastDayLastMonth),
      };
    }

    case "last-3-months": {
      const from = new Date(today.getFullYear(), today.getMonth() - 2, 1);

      return {
        from: formatDate(from),
        to: formatDate(today),
      };
    }

    case "last-6-months": {
      const from = new Date(today.getFullYear(), today.getMonth() - 5, 1);

      return {
        from: formatDate(from),
        to: formatDate(today),
      };
    }

    case "this-year":
      return {
        from: `${today.getFullYear()}-01-01`,
        to: formatDate(today),
      };

    case "custom":
      return customPeriod;

    case "all":
    default:
      return {};
  }
}

export function useReports(): UseReportsReturn {
  const { isAuthenticated } = useAuth();

  const [period, setPeriod] = useState<ReportPeriodOption>("last-month");

  // Valores que o usuário está editando no seletor
  const [customPeriod, setCustomPeriod] = useState<ReportPeriod>(emptyPeriod);

  // Valores efetivamente utilizados nas consultas
  const [appliedCustomPeriod, setAppliedCustomPeriod] =
    useState<ReportPeriod>(emptyPeriod);

  const [summary, setSummary] = useState<IReportSummary>(initialSummary);

  const [expensesByCategory, setExpensesByCategory] = useState<
    ICategoryReport[]
  >([]);

  const [incomeByCategory, setIncomeByCategory] = useState<ICategoryReport[]>(
    [],
  );

  const [balanceEvolution, setBalanceEvolution] = useState<IBalanceEvolution[]>(
    [],
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyCustomPeriod = useCallback(() => {
    if (!customPeriod.from || !customPeriod.to) {
      return;
    }

    if (customPeriod.from > customPeriod.to) {
      setError("A data inicial deve ser anterior à data final.");
      return;
    }

    setError(null);
    setAppliedCustomPeriod(customPeriod);
    setPeriod("custom");
  }, [customPeriod]);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setSummary(initialSummary);
      setExpensesByCategory([]);
      setIncomeByCategory([]);
      setBalanceEvolution([]);
      setLoading(false);
      return;
    }

    const dates = getPeriodDates(period, appliedCustomPeriod);

    if (period === "custom" && (!dates.from || !dates.to)) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [summaryData, expensesData, incomeData, evolutionData] =
        await Promise.all([
          reportService.getSummary(dates),
          reportService.getExpensesByCategory(dates),
          reportService.getIncomeByCategory(dates),
          reportService.getBalanceEvolution(dates),
        ]);

      setSummary(summaryData);
      setExpensesByCategory(expensesData);
      setIncomeByCategory(incomeData);
      setBalanceEvolution(evolutionData);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os relatórios.");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, period, appliedCustomPeriod]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    summary,
    expensesByCategory,
    incomeByCategory,
    balanceEvolution,

    period,
    setPeriod,

    customPeriod,
    setCustomPeriod,
    applyCustomPeriod,

    loading,
    error,

    refresh,
  };
}
