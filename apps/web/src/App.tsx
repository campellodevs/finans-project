import { Layout } from './components/layout/Layout'
import { SummaryCard } from './components/ui/SummaryCard'
import { useDashboard } from './hooks/useDashboard'

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function App() {
  const { data, loading } = useDashboard()

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400 text-sm animate-pulse">Carregando...</p>
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
          />
          <SummaryCard
            title="Gastos"
            value={formatCurrency(data?.totalExpense ?? 0)}
            positive={false}
          />
        </div>
      </div>
    </Layout>
  )
}