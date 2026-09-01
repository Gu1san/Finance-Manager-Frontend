"use client";

import { useState } from "react";

import DashboardCard from "@/src/components/DashboardCard";
import BalanceSummary from "@/src/components/BalanceSummary";
import ExpensesByCategory from "@/src/components/ExpensesByCategory";
import BalanceEvolution from "@/src/components/BalanceEvolution";
import RecentTransactions from "@/src/components/RecentTransactions";
import TransactionModal from "@/src/components/TransactionModal";
import PeriodSelector from "@/src/components/PeriodSelector";

import { useReports } from "@/src/hooks/useReports";
import { useTransactionContext } from "@/src/hooks/useTransaction";

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
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <p className="mt-1 text-sm text-foreground-secondary">
              Acompanhe sua vida financeira.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsTransactionModalOpen(true)}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-foreground hover:opacity-90"
          >
            + Nova transação
          </button>
        </header>

        <div className="flex justify-end">
          <PeriodSelector
            period={period}
            onPeriodChange={setPeriod}
            customPeriod={customPeriod}
            onCustomPeriodChange={setCustomPeriod}
            onApplyCustomPeriod={applyCustomPeriod}
          />
        </div>

        {reportsError && <p className="text-sm text-red-500">{reportsError}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <DashboardCard colSpan={2} rowSpan={2}>
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
