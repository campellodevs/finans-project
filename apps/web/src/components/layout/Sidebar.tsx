import { useTheme } from '../../hooks/useTheme'
import { useState } from 'react'
import { LayoutDashboard, CreditCard, Receipt, PieChart, Sun, Moon } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '#', icon: LayoutDashboard },
  { label: 'Transações', href: '#', icon: Receipt },
  { label: 'Cartões', href: '#', icon: CreditCard },
  { label: 'Orçamento', href: '#', icon: PieChart },
]   

export function Sidebar() {
  const { isDark, toggle } = useTheme()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-black border-r border-zinc-200/70 dark:border-zinc-800/50 flex flex-col px-5 py-8 z-10 transition-colors duration-300">
      <div className="mb-10 group">
        <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white relative">
          FINQ
          <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-normal">CONTROLE FINANCEIRO</p>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              className="group relative px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-black dark:bg-white rounded-full transition-all duration-300 ${hoveredItem === item.label ? 'h-6' : 'h-0'}`}></span>
              
              <span className="relative flex items-center gap-3">
                <Icon size={18} className="text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300" />
                <span className="relative">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </span>
            </a>
          )
        })}
      </nav>

      <button
        onClick={toggle}
        className="group relative mt-auto px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all duration-300 overflow-hidden"
      >
        <span className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        <span className="relative flex items-center gap-3">
          {isDark ? (
            <Sun size={18} className="text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300" />
          ) : (
            <Moon size={18} className="text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300" />
          )}
          <span className="relative">
            {isDark ? 'Modo claro' : 'Modo escuro'}
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
        </span>
      </button>

      <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"></div>
    </aside>
  )
}