import { Layout } from './components/layout/Layout'
import { SummaryCard } from './components/ui/SummaryCard'
import { CreditCard } from './components/ui/CreditCard'
import { TransactionList } from './components/ui/TransactionList'
import { BudgetList } from './components/ui/BudgetList'
import { useDashboard } from './hooks/useDashboard'

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function App() {
  const { data, loading } = useDashboard()

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-zinc-400 text-sm animate-pulse tracking-widest uppercase">Carregando</p>
      </div>
    )
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">

        <div className="grid grid-cols-3 gap-4">
          <SummaryCard
            title="Saldo atual"
            value={formatCurrency(data?.balance ?? 0)}
          />
          <SummaryCard
            title="Entradas"
            value={formatCurrency(data?.totalIncome ?? 0)}
            positive={true}
          />
          <SummaryCard
            title="Gastos"
            value={formatCurrency(data?.totalExpense ?? 0)}
            positive={false}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <TransactionList transactions={data?.transactions ?? []} />
          </div>
          <div className="flex flex-col gap-4">
            {data?.cards.map(card => (
              <CreditCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        <BudgetList budgets={data?.budgets ?? []} />

      </div>
    </Layout>
  )
}
