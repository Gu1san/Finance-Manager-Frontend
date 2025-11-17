export interface ITransaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "entrada" | "saida";
}

export interface ICategoryReport {
  category: string;
  total: number;
}

export interface IBalance {
  total: number;
  entradas: number;
  saidas: number;
}

export interface IPieChartData {
  name: string;
  values: IPieChartValue[];
}

export interface IPieChartValue {
  name: string;
  value: number;
}
