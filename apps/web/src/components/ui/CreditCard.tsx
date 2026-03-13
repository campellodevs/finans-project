import { CreditCard as CardIcon } from 'lucide-react'
import type { Card } from '../../types'

interface CreditCardProps {
  card: Card
}

function getDaysUntilDue(dueDay: number) {
  const today = new Date()
  const due = new Date(today.getFullYear(), today.getMonth(), dueDay)
  if (due < today) due.setMonth(due.getMonth() + 1)
  const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

export function CreditCard({ card }: CreditCardProps) {
  const usedPercent = (card.currentSpend / card.limit) * 100
  const daysUntilDue = getDaysUntilDue(card.dueDay)

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="group relative bg-white dark:bg-black border border-zinc-200/70 dark:border-zinc-800/50 rounded-2xl p-6 flex flex-col gap-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
            <CardIcon size={20} className="text-zinc-500 dark:text-zinc-400" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] font-medium">
              Cartão
            </p>
            <p className="text-lg font-semibold text-black dark:text-white mt-0.5">{card.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] font-medium">
            Vencimento
          </p>
          <p className="text-sm font-semibold text-black dark:text-white mt-0.5">
            {daysUntilDue === 0 ? 'Hoje' : `${daysUntilDue} dias`}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>Utilizado</span>
          <span>{usedPercent.toFixed(0)}%</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-black dark:bg-white rounded-full transition-all duration-700"
            style={{ width: `${usedPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-black dark:text-white font-medium">{formatCurrency(card.currentSpend)}</span>
          <span className="text-zinc-400 dark:text-zinc-500">{formatCurrency(card.limit)}</span>
        </div>
      </div>

      <div className="relative z-10 pt-2 border-t border-zinc-100 dark:border-zinc-900">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Fecha dia <span className="text-black dark:text-white font-medium">{card.closingDay}</span>
          {' · '}
          Vence dia <span className="text-black dark:text-white font-medium">{card.dueDay}</span>
        </p>
      </div>
    </div>
  )
}