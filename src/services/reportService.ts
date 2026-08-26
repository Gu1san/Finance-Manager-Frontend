import api from "../api/api";

export type ReportPeriod = {
  from?: string;
  to?: string;
};

export interface IReportSummary {
  entradas: number;
  saidas: number;
  resultado: number;
}

export interface ICategoryReport {
  category: string;
  total: number;
}

export interface IBalanceEvolution {
  date: string;
  result: number;
}

export const reportService = {
  async getSummary(period?: ReportPeriod): Promise<IReportSummary> {
    const { data } = await api.get("/reports/summary", {
      params: period,
    });

    return data;
  },

  async getExpensesByCategory(
    period?: ReportPeriod,
  ): Promise<ICategoryReport[]> {
    const { data } = await api.get("/reports/expenses-by-category", {
      params: period,
    });

    return data;
  },

  async getIncomeByCategory(period?: ReportPeriod): Promise<ICategoryReport[]> {
    const { data } = await api.get("/reports/income-by-category", {
      params: period,
    });

    return data;
  },

  async getBalanceEvolution(
    period?: ReportPeriod,
  ): Promise<IBalanceEvolution[]> {
    const { data } = await api.get("/reports/balance-evolution", {
      params: period,
    });

    return data;
  },
};
