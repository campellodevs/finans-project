import { useState } from 'react'
import { X } from 'lucide-react'
import { api } from '../../services/api'

const BANKS = ['Nubank','Itaú','Bradesco','Santander','Caixa','Banco do Brasil','Inter','C6 Bank','BTG','XP','Outro']

interface Props { onClose: () => void; onSuccess: () => void }

export function AddCardModal({ onClose, onSuccess }: Props) {
  const [name, setName]               = useState('')
  const [bank, setBank]               = useState('')
  const [limit, setLimit]             = useState('')
  const [closingDay, setClosingDay]   = useState('')
  const [dueDay, setDueDay]           = useState('')
  const [showOnHome, setShowOnHome]   = useState(true)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/cards', { name, bank, limit: parseFloat(limit), closingDay: parseInt(closingDay), dueDay: parseInt(dueDay), showOnHome })
      onSuccess(); onClose()
    } catch { setError('Erro ao salvar cartão') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
        <div style={{ height: 4, backgroundColor: '#6366f1' }} />

        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Novo cartão</p>
          <button onClick={onClose} className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"><X size={16}/></button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 flex flex-col gap-4">
          {/* Nome do cartão */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-widest">Nome do cartão</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Ex: Nubank Black, Itaú Visa..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
              onFocus={e => e.target.style.borderColor = '#6366f1'}
              onBlur={e => e.target.style.borderColor = ''} />
          </div>

          {/* Banco */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase tracking-widest">Banco</label>
            <div className="flex flex-wrap gap-2">
              {BANKS.map(b => (
                <button key={b} type="button" onClick={() => setBank(b)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                  style={{
                    backgroundColor: bank === b ? 'rgba(99,102,241,0.1)' : 'transparent',
                    color: bank === b ? '#6366f1' : '#71717a',
                    border: bank === b ? '1.5px solid #6366f1' : '1.5px solid #e4e4e7',
                  }}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Limite */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-widest">Limite (R$)</label>
            <input type="number" value={limit} onChange={e => setLimit(e.target.value)} required min="1" step="0.01" placeholder="5.000,00"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
              onFocus={e => e.target.style.borderColor = '#6366f1'}
              onBlur={e => e.target.style.borderColor = ''} />
          </div>

          {/* Fechamento + Vencimento */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 uppercase tracking-widest">Dia fechamento</label>
              <input type="number" value={closingDay} onChange={e => setClosingDay(e.target.value)} required min="1" max="31" placeholder="15"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = ''} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 uppercase tracking-widest">Dia vencimento</label>
              <input type="number" value={dueDay} onChange={e => setDueDay(e.target.value)} required min="1" max="31" placeholder="22"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = ''} />
            </div>
          </div>

          {/* Mostrar no home */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-800">
            <div>
              <p className="text-sm text-zinc-900 dark:text-white font-medium">Mostrar no início</p>
              <p className="text-xs text-zinc-400">Exibir este cartão no painel principal</p>
            </div>
            <button type="button" onClick={() => setShowOnHome(s => !s)}
              className="w-11 h-6 rounded-full transition-all duration-300 relative"
              style={{ backgroundColor: showOnHome ? '#6366f1' : '#e4e4e7' }}>
              <span className="absolute top-0.5 transition-all duration-300 w-5 h-5 rounded-full bg-white shadow"
                style={{ left: showOnHome ? '22px' : '2px' }} />
            </button>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50"
            style={{ backgroundColor: '#6366f1' }}>
            {loading ? 'Salvando...' : 'Adicionar cartão'}
          </button>
        </form>
      </div>
    </div>
  )
}
