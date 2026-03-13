import { 
  Home, 
  Utensils, 
  FileText, 
  Repeat, 
  Car, 
  Heart, 
  ShoppingBag,
  Briefcase,
  HelpCircle 
} from 'lucide-react'
import type { Budget } from '../../types'

interface BudgetListProps {
  budgets: Budget[]
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Corrigido: React.ReactNode em vez de JSX.Element
const categoryIcon: Record<string, React.ReactNode> = {
  'Moradia': <Home size={16} className="text-zinc-500 dark:text-zinc-400" />,
  'Alimentação': <Utensils size={16} className="text-zinc-500 dark:text-zinc-400" />,
  'Contas': <FileText size={16} className="text-zinc-500 dark:text-zinc-400" />,
  'Assinaturas': <Repeat size={16} className="text-zinc-500 dark:text-zinc-400" />,
  'Transporte': <Car size={16} className="text-zinc-500 dark:text-zinc-400" />,
  'Saúde': <Heart size={16} className="text-zinc-500 dark:text-zinc-400" />,
  'Compras': <ShoppingBag size={16} className="text-zinc-500 dark:text-zinc-400" />,
  'Renda': <Briefcase size={16} className="text-zinc-500 dark:text-zinc-400" />,
}

export function BudgetList({ budgets }: BudgetListProps) {
  return (
    <div className="bg-white dark:bg-black border border-zinc-200/70 dark:border-zinc-800/50 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-900">
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] font-medium">
          Orçamento mensal
        </p>
      </div>
      <div className="p-6 flex flex-col gap-4">
        {budgets.map((b) => {
          const percent = Math.min((b.spent / b.limit) * 100, 100)
          const isOver = b.spent >= b.limit
          return (
            <div key={b.id} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                    {categoryIcon[b.category] ?? <HelpCircle size={14} className="text-zinc-500 dark:text-zinc-400" />}
                  </div>
                  <p className="text-sm font-medium text-black dark:text-white">{b.category}</p>
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  {formatCurrency(b.spent)} <span className="text-zinc-300 dark:text-zinc-700">/</span> {formatCurrency(b.limit)}
                </p>
              </div>
              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isOver ? 'bg-rose-400' : 'bg-black dark:bg-white'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}