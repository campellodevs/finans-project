import { useTheme } from '../../hooks/useTheme'
import { useState } from 'react'
import { Home, CreditCard, Receipt, PieChart, Sun, Moon } from 'lucide-react'
import { AddTransactionModal } from '../ui/AddTransactionModal'
import { AddCardModal } from '../ui/AddCardModal'
import { AddBudgetModal } from '../ui/AddBudgetModal'

type ModalType = 'transaction' | 'card' | 'budget' | null

const navItems = [
  { label: 'Home',        icon: Home,        modal: null },
  { label: 'Transações',  icon: Receipt,     modal: 'transaction' as ModalType },
  { label: 'Cartões',     icon: CreditCard,  modal: 'card' as ModalType },
  { label: 'Orçamento',   icon: PieChart,    modal: 'budget' as ModalType },
]

interface Props {
  onRefresh?: () => void
}

export function Sidebar({ onRefresh }: Props) {
  const { isDark, toggle } = useTheme()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [activeItem, setActiveItem] = useState('Home')

  function handleNav(label: string, modal: ModalType) {
    if (modal) {
      setActiveModal(modal)
    } else {
      setActiveItem(label)
    }
  }

  function handleSuccess() {
    onRefresh?.()
  }

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-black border-r border-zinc-200/70 dark:border-zinc-800/50 flex flex-col px-5 py-8 z-10 transition-colors duration-300">
        <div className="mb-10 group">
          <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white relative">
            FINQ
            <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-normal">CONTROLE FINANCEIRO</p>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.label && !item.modal
            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.label, item.modal)}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                className="group relative px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-300 overflow-hidden"
                style={{ color: isActive ? '#000' : undefined }}
              >
                {/* Fundo hover */}
                <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-zinc-100 dark:bg-zinc-900 scale-x-100'
                    : 'bg-zinc-100 dark:bg-zinc-900 scale-x-0 group-hover:scale-x-100'
                } origin-left`} />

                {/* Barra lateral ativa */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-black dark:bg-white transition-all duration-300"
                  style={{ height: isActive || hoveredItem === item.label ? '24px' : '0px' }} />

                <span className="relative flex items-center gap-3 text-zinc-600 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                  <Icon size={18} className="text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300" />
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </span>

                  {/* Badge "+" nos itens com modal */}
                  {item.modal && (
                    <span className="ml-auto text-xs text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">+</span>
                  )}
                </span>
              </button>
            )
          })}
        </nav>

        <button
          onClick={toggle}
          className="group relative mt-auto px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all duration-300 overflow-hidden text-left"
        >
          <span className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          <span className="relative flex items-center gap-3">
            {isDark
              ? <Sun size={18} className="text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300" />
              : <Moon size={18} className="text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300" />
            }
            <span className="relative">
              {isDark ? 'Modo claro' : 'Modo escuro'}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </span>
          </span>
        </button>
      </aside>

      {/* Modais */}
      {activeModal === 'transaction' && (
        <AddTransactionModal onClose={() => setActiveModal(null)} onSuccess={handleSuccess} />
      )}
      {activeModal === 'card' && (
        <AddCardModal onClose={() => setActiveModal(null)} onSuccess={handleSuccess} />
      )}
      {activeModal === 'budget' && (
        <AddBudgetModal onClose={() => setActiveModal(null)} onSuccess={handleSuccess} />
      )}
    </>
  )
}
