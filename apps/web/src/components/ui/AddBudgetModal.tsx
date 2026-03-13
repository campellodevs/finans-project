import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import { api } from '../../services/api'

const CATEGORIES = ['Alimentação','Moradia','Transporte','Saúde','Assinaturas','Compras','Lazer','Educação','Contas']

interface Props { onClose: () => void; onSuccess: () => void }

type Tab = 'budget' | 'recurring'

export function AddBudgetModal({ onClose, onSuccess }: Props) {
  const [tab, setTab]                 = useState<Tab>('budget')

  // Budget
  const [category, setCategory]       = useState('')
  const [budgetLimit, setBudgetLimit] = useState('')
  const [showOnHome, setShowOnHome]   = useState(true)
  const [budgetLoading, setBudgetLoading] = useState(false)
  const [budgetError, setBudgetError] = useState('')

  // Recurring income
  const [recTitle, setRecTitle]       = useState('')
  const [recAmount, setRecAmount]     = useState('')
  const [recDay, setRecDay]           = useState('')
  const [recDesc, setRecDesc]         = useState('')
  const [recLoading, setRecLoading]   = useState(false)
  const [recError, setRecError]       = useState('')

  async function handleBudgetSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!category) { setBudgetError('Selecione uma categoria'); return }
    setBudgetLoading(true); setBudgetError('')
    try {
      await api.post('/budgets', { category, limit: parseFloat(budgetLimit), showOnHome })
      onSuccess(); onClose()
    } catch { setBudgetError('Erro ao salvar orçamento') }
    finally { setBudgetLoading(false) }
  }

  async function handleRecurringSubmit(e: React.FormEvent) {
    e.preventDefault()
    setRecLoading(true); setRecError('')
    try {
      await api.post('/recurring', { title: recTitle, amount: parseFloat(recAmount), dayOfMonth: parseInt(recDay), description: recDesc })
      onSuccess(); onClose()
    } catch { setRecError('Erro ao salvar renda fixa') }
    finally { setRecLoading(false) }
  }

  const tabStyle = (t: Tab) => ({
    color: tab === t ? '#f59e0b' : '#71717a',
    borderBottom: tab === t ? '2px solid #f59e0b' : '2px solid transparent',
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
        <div style={{ height: 4, backgroundColor: '#f59e0b' }} />

        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Orçamento</p>
          <button onClick={onClose} className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"><X size={16}/></button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 gap-6 border-b border-zinc-100 dark:border-zinc-800">
          <button type="button" onClick={() => setTab('budget')}
            className="pb-3 text-sm font-medium transition-all" style={tabStyle('budget')}>
            Limite por categoria
          </button>
          <button type="button" onClick={() => setTab('recurring')}
            className="pb-3 text-sm font-medium transition-all" style={tabStyle('recurring')}>
            Renda fixa
          </button>
        </div>

        {/* Tab: Budget */}
        {tab === 'budget' && (
          <form onSubmit={handleBudgetSubmit} className="px-6 py-5 flex flex-col gap-4">
            <p className="text-xs text-zinc-400">Defina um limite de gasto mensal para uma categoria. O sistema alertará quando você se aproximar do limite.</p>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase tracking-widest">Categoria</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat} type="button" onClick={() => setCategory(cat)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                    style={{
                      backgroundColor: category === cat ? 'rgba(245,158,11,0.1)' : 'transparent',
                      color: category === cat ? '#f59e0b' : '#71717a',
                      border: category === cat ? '1.5px solid #f59e0b' : '1.5px solid #e4e4e7',
                    }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 uppercase tracking-widest">Limite mensal (R$)</label>
              <input type="number" value={budgetLimit} onChange={e => setBudgetLimit(e.target.value)} required min="1" step="0.01" placeholder="500,00"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
                onFocus={e => e.target.style.borderColor = '#f59e0b'}
                onBlur={e => e.target.style.borderColor = ''} />
            </div>

            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-800">
              <div>
                <p className="text-sm text-zinc-900 dark:text-white font-medium">Mostrar no início</p>
                <p className="text-xs text-zinc-400">Exibir na barra de orçamentos do painel</p>
              </div>
              <button type="button" onClick={() => setShowOnHome(s => !s)}
                className="w-11 h-6 rounded-full transition-all duration-300 relative"
                style={{ backgroundColor: showOnHome ? '#f59e0b' : '#e4e4e7' }}>
                <span className="absolute top-0.5 transition-all duration-300 w-5 h-5 rounded-full bg-white shadow"
                  style={{ left: showOnHome ? '22px' : '2px' }} />
              </button>
            </div>

            {budgetError && <p className="text-xs text-red-500">{budgetError}</p>}

            <button type="submit" disabled={budgetLoading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#f59e0b' }}>
              {budgetLoading ? 'Salvando...' : 'Definir limite'}
            </button>
          </form>
        )}

        {/* Tab: Renda Fixa */}
        {tab === 'recurring' && (
          <form onSubmit={handleRecurringSubmit} className="px-6 py-5 flex flex-col gap-4">
            <p className="text-xs text-zinc-400">Cadastre uma renda fixa mensal. O sistema lançará automaticamente como receita na data configurada.</p>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 uppercase tracking-widest">Descrição</label>
              <input type="text" value={recTitle} onChange={e => setRecTitle(e.target.value)} required placeholder="Ex: Salário, Aluguel recebido..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
                onFocus={e => e.target.style.borderColor = '#f59e0b'}
                onBlur={e => e.target.style.borderColor = ''} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest">Valor (R$)</label>
                <input type="number" value={recAmount} onChange={e => setRecAmount(e.target.value)} required min="1" step="0.01" placeholder="4.500,00"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
                  onFocus={e => e.target.style.borderColor = '#f59e0b'}
                  onBlur={e => e.target.style.borderColor = ''} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 uppercase tracking-widest">Dia do mês</label>
                <input type="number" value={recDay} onChange={e => setRecDay(e.target.value)} required min="1" max="31" placeholder="5"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
                  onFocus={e => e.target.style.borderColor = '#f59e0b'}
                  onBlur={e => e.target.style.borderColor = ''} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 uppercase tracking-widest">Observação <span className="normal-case">(opcional)</span></label>
              <input type="text" value={recDesc} onChange={e => setRecDesc(e.target.value)} placeholder="Ex: empresa X, cliente Y..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
                onFocus={e => e.target.style.borderColor = '#f59e0b'}
                onBlur={e => e.target.style.borderColor = ''} />
            </div>

            {recError && <p className="text-xs text-red-500">{recError}</p>}

            <button type="submit" disabled={recLoading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#f59e0b' }}>
              {recLoading ? 'Salvando...' : 'Adicionar renda fixa'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
