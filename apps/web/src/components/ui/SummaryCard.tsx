import { TrendingUp, TrendingDown } from 'lucide-react'

interface SummaryCardProps {
  title: string
  value: string
  subtitle?: string
  positive?: boolean
}

export function SummaryCard({ title, value, subtitle, positive }: SummaryCardProps) {
  return (
    <div className="group relative bg-white dark:bg-black border border-zinc-200/70 dark:border-zinc-800/50 rounded-2xl p-6 flex flex-col gap-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/0 via-zinc-100/0 to-zinc-100/50 dark:from-zinc-900/0 dark:via-zinc-900/0 dark:to-zinc-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="absolute -right-6 -top-6 w-20 h-20 bg-zinc-200/20 dark:bg-zinc-700/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      
      {positive !== undefined && (
        <div className="absolute top-3 right-3">
          {positive ? (
            <TrendingUp size={16} className="text-emerald-500" />
          ) : (
            <TrendingDown size={16} className="text-rose-400" />
          )}
        </div>
      )}

      <div className="relative z-10">
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] font-medium">
          {title}
        </p>
        
        <p className={`text-3xl font-semibold mt-2 transition-colors duration-300 ${
          positive === false 
            ? 'text-zinc-500 dark:text-zinc-400' 
            : positive === true 
              ? 'text-emerald-600 dark:text-emerald-400' 
              : 'text-black dark:text-white'
        }`}>
          {value}
        </p>
        
        {subtitle && (
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-3 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
            {subtitle}
          </p>
        )}
      </div>

      <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-zinc-300/50 dark:via-zinc-700/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  )
}