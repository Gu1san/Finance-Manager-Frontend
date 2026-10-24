export interface ICategory {
  id: number;
  name: string;
  user_id: number | null;
}

export interface ICreateCategory {
  name: string;
}

export interface IUpdateCategory {
  name: string;
}

export interface ITransaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  category_id: number;
  date: string;
  type: 'entrada' | 'saida';
}

export interface IBalance {
  total: number;
  entradas: number;
  saidas: number;
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}
