import { 
  TrendingUp, 
  Home, 
  Utensils, 
  FileText, 
  Repeat, 
  Car, 
  Heart, 
  ShoppingBag,
  HelpCircle 
} from 'lucide-react'
import type { Transaction } from '../../types'

interface TransactionListProps {
  transactions: Transaction[]
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

// Corrigido: React.ReactNode em vez de JSX.Element
const categoryIcon: Record<string, React.ReactNode> = {
  'Renda': <TrendingUp size={18} className="text-zinc-500 dark:text-zinc-400" />,
  'Moradia': <Home size={18} className="text-zinc-500 dark:text-zinc-400" />,
  'Alimentação': <Utensils size={18} className="text-zinc-500 dark:text-zinc-400" />,
  'Contas': <FileText size={18} className="text-zinc-500 dark:text-zinc-400" />,
  'Assinaturas': <Repeat size={18} className="text-zinc-500 dark:text-zinc-400" />,
  'Transporte': <Car size={18} className="text-zinc-500 dark:text-zinc-400" />,
  'Saúde': <Heart size={18} className="text-zinc-500 dark:text-zinc-400" />,
  'Compras': <ShoppingBag size={18} className="text-zinc-500 dark:text-zinc-400" />,
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white dark:bg-black border border-zinc-200/70 dark:border-zinc-800/50 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-900">
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] font-medium">
          Últimas transações
        </p>
      </div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
        {transactions.slice(0, 8).map((t) => (
          <div 
            key={t.id} 
            className="group flex items-center justify-between px-6 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 transition-colors duration-200">
                {categoryIcon[t.category] ?? <HelpCircle size={18} className="text-zinc-500 dark:text-zinc-400" />}
              </div>
              <div>
                <p className="text-sm font-medium text-black dark:text-white">{t.title}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  {t.category} · {formatDate(t.date)}
                </p>
              </div>
            </div>
            <p className={`text-sm font-semibold ${
              t.type === 'INCOME' 
                ? 'text-emerald-600 dark:text-emerald-400' 
                : 'text-rose-500 dark:text-rose-400'
            }`}>
              {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}