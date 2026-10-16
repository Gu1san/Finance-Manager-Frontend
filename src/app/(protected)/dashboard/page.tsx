'use client';

import { useState } from 'react';

import DashboardCard from '@/src/components/DashboardCard';
import BalanceSummary from '@/src/components/BalanceSummary';
import ExpensesByCategory from '@/src/components/ExpensesByCategory';
import BalanceEvolution from '@/src/components/BalanceEvolution';
import RecentTransactions from '@/src/components/RecentTransactions';
import TransactionModal from '@/src/components/TransactionModal';
import PeriodSelector from '@/src/components/PeriodSelector';

import { useReports } from '@/src/hooks/useReports';
import { useTransactionContext } from '@/src/hooks/useTransaction';
import { useAuth } from '@/src/contexts/AuthContexts';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const {
    summary,
    expensesByCategory,
    balanceEvolution,
    period,
    setPeriod,
    customPeriod,
    setCustomPeriod,
    applyCustomPeriod,
    loading: reportsLoading,
    error: reportsError,
  } = useReports();

  const { transactions, createTransaction } = useTransactionContext();

  const { user, isAuthenticated } = useAuth();

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  if (reportsLoading) {
    return (
      <div className="flex w-full items-center justify-center p-6">
        <p className="text-sm text-foreground-secondary">
          Carregando dashboard...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold">{`Olá${isAuthenticated ? `, ${user?.name}` : ''}!`}</h1>

            <p className="mt-1 text-sm text-foreground-secondary">
              Aqui está um resumo da sua vida financeira
            </p>
          </div>
          <div className="flex gap-5">
            <PeriodSelector
              period={period}
              onPeriodChange={setPeriod}
              customPeriod={customPeriod}
              onCustomPeriodChange={setCustomPeriod}
              onApplyCustomPeriod={applyCustomPeriod}
            />

            <button
              type="button"
              onClick={() => setIsTransactionModalOpen(true)}
              className="rounded-full bg-black-forest-active p-2.5 text-cornsilk hover:opacity-90"
            >
              <Plus size={24} />
            </button>
          </div>
        </header>

        {reportsError && <p className="text-sm text-red-500">{reportsError}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard colSpan={2} rowSpan={1}>
            <BalanceSummary summary={summary} />
          </DashboardCard>

          <DashboardCard
            title="Gastos por categoria"
            description="Distribuição das suas despesas no período."
            colSpan={2}
            rowSpan={2}
          >
            <ExpensesByCategory data={expensesByCategory} />
          </DashboardCard>

          <DashboardCard
            title="Evolução do saldo"
            description="Acompanhe seu saldo ao longo do período."
            colSpan={2}
            rowSpan={2}
          >
            <BalanceEvolution data={balanceEvolution} />
          </DashboardCard>

          <DashboardCard
            title="Últimas transações"
            description="Suas movimentações mais recentes."
            colSpan={2}
            rowSpan={2}
          >
            <RecentTransactions transactions={transactions} />
          </DashboardCard>
        </div>
      </div>

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSubmit={createTransaction}
      />
    </>
  );
}
