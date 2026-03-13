import { Calendar } from 'lucide-react'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

function getCurrentMonth() {
  return new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-zinc-200/70 dark:border-zinc-800/50 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-20 transition-all duration-300">
      <div className="group">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          {getGreeting()}, 
          <span className="relative ml-1.5 font-semibold text-black dark:text-white">
            Lucca
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Calendar size={16} className="text-zinc-400 dark:text-zinc-500" />
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 capitalize tracking-wide">
          {getCurrentMonth()}
        </p>
      </div>

      <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent opacity-50"></div>
    </header>
  )
}