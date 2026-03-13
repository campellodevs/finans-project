import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { api } from '../../services/api'

const DEFAULT_EXPENSE = ['Alimentação','Moradia','Transporte','Saúde','Assinaturas','Compras','Lazer','Educação','Contas']
const DEFAULT_INCOME  = ['Salário','Freelance','Renda Extra','Mesada','Investimentos']

interface Props { onClose: () => void; onSuccess: () => void }

export function AddTransactionModal({ onClose, onSuccess }: Props) {
  const [type, setType]             = useState<'EXPENSE'|'INCOME'>('EXPENSE')
  const [title, setTitle]           = useState('')
  const [amount, setAmount]         = useState('')
  const [category, setCategory]     = useState('')
  const [date, setDate]             = useState(new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')
  const [newCat, setNewCat]         = useState('')
  const [showNewCat, setShowNewCat] = useState(false)
  const [customCats, setCustomCats] = useState<string[]>([])

  const isExpense = type === 'EXPENSE'
  const accent    = isExpense ? '#ef4444' : '#22c55e'
  const accentBg  = isExpense ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)'
  const categories = [...(isExpense ? DEFAULT_EXPENSE : DEFAULT_INCOME), ...customCats]

  function handleTypeSwitch(t: 'EXPENSE'|'INCOME') {
    setType(t); setCategory(''); setCustomCats([])
  }

  function handleAddCategory() {
    const name = newCat.trim()
    if (!name || customCats.includes(name)) return
    setCustomCats(c => [...c, name])
    setCategory(name)
    setNewCat('')
    setShowNewCat(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/transactions', { title, amount: parseFloat(amount), type, category: category || null, date, description })
      onSuccess(); onClose()
    } catch { setError('Erro ao salvar transação') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">

        {/* Faixa colorida no topo */}
        <div style={{ height: 4, backgroundColor: accent }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Nova transação</p>
          <button onClick={onClose} className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"><X size={16}/></button>
        </div>

        {/* Toggle GASTO / GANHO */}
        <div className="px-6 pb-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => handleTypeSwitch('EXPENSE')}
            className="py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: isExpense ? '#ef4444' : 'transparent', color: isExpense ? '#fff' : '#71717a', border: isExpense ? '1.5px solid #ef4444' : '1.5px solid #e4e4e7' }}>
            Gasto
          </button>
          <button type="button" onClick={() => handleTypeSwitch('INCOME')}
            className="py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: !isExpense ? '#22c55e' : 'transparent', color: !isExpense ? '#fff' : '#71717a', border: !isExpense ? '1.5px solid #22c55e' : '1.5px solid #e4e4e7' }}>
            Ganho
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 flex flex-col gap-4">
          {/* Descrição */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-widest">Descrição</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Ex: Supermercado, Salário..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none transition-colors"
              style={{ '--tw-ring-color': accent } as any}
              onFocus={e => e.target.style.borderColor = accent}
              onBlur={e => e.target.style.borderColor = ''} />
          </div>

          {/* Valor + Data */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 uppercase tracking-widest">Valor (R$)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="0.01" placeholder="0,00"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
                onFocus={e => e.target.style.borderColor = accent}
                onBlur={e => e.target.style.borderColor = ''} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 uppercase tracking-widest">Data</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
                onFocus={e => e.target.style.borderColor = accent}
                onBlur={e => e.target.style.borderColor = ''} />
            </div>
          </div>

          {/* Categorias */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase tracking-widest">Categoria</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} type="button" onClick={() => setCategory(cat === category ? '' : cat)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                  style={{
                    backgroundColor: category === cat ? accentBg : 'transparent',
                    color: category === cat ? accent : '#71717a',
                    border: category === cat ? `1.5px solid ${accent}` : '1.5px solid #e4e4e7',
                  }}>
                  {cat}
                </button>
              ))}
              <button type="button" onClick={() => setShowNewCat(s => !s)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-dashed transition-all duration-150"
                style={{ borderColor: '#d4d4d8', color: '#a1a1aa' }}>
                + nova
              </button>
            </div>

            {showNewCat && (
              <div className="flex gap-2 mt-1">
                <input value={newCat} onChange={e => setNewCat(e.target.value)}
                  placeholder="Nome da categoria"
                  className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white outline-none"
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())} />
                <button type="button" onClick={handleAddCategory}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white"
                  style={{ backgroundColor: accent }}>
                  Criar
                </button>
              </div>
            )}
          </div>

          {/* Observação */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-widest">Observação <span className="normal-case">(opcional)</span></label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Algum detalhe adicional..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
              onFocus={e => e.target.style.borderColor = accent}
              onBlur={e => e.target.style.borderColor = ''} />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50 mt-1"
            style={{ backgroundColor: accent }}>
            {loading ? 'Salvando...' : 'Salvar transação'}
          </button>
        </form>
      </div>
    </div>
  )
}
