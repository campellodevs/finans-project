import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { registerRequest } from '../services/auth'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

function GlitchText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState(text)

  useEffect(() => {
    let iterations = 0
    const interval = setInterval(() => {
      setDisplayed(
        text.split('').map((char, i) => {
          if (i < iterations) return char
          if (char === ' ') return ' '
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (iterations >= text.length) clearInterval(interval)
      iterations += 0.5
    }, 40)
    return () => clearInterval(interval)
  }, [text])

  return <span>{displayed}</span>
}

function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-10"
      style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
      }}
    />
  )
}

function GridBackground() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundColor: '#000',
        backgroundImage: `
          linear-gradient(rgba(0,255,128,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,128,0.07) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    />
  )
}

export function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530)
    return () => clearInterval(t)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, user } = await registerRequest(name, email, password)
      login(token, user)
      navigate('/dashboard')
    } catch {
      setError('>> ERRO AO CRIAR CONTA. EMAIL JA CADASTRADO.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridBackground />
      <ScanlineOverlay />

      <div className="fixed top-6 left-6 z-20 font-mono text-xs" style={{ color: '#00ff80' }}>
        <div>SYS://FINQ.REGISTER</div>
        <div style={{ color: '#00ff8088' }}>v2.0.26 [NEW USER]</div>
      </div>
      <div className="fixed top-6 right-6 z-20 font-mono text-xs text-right" style={{ color: '#00ff80' }}>
        <div>STATUS: <span style={{ color: '#ffff00' }}>CREATING PROFILE</span></div>
        <div style={{ color: '#00ff8088' }}>CONN: ENCRYPTED</div>
      </div>
      <div className="fixed bottom-6 left-6 z-20 font-mono text-xs" style={{ color: '#00ff8044' }}>
        ████████░░░░ 3 FIELDS REQUIRED
      </div>
      <div className="fixed bottom-6 right-6 z-20 font-mono text-xs" style={{ color: '#00ff8044' }}>
        [ESC] ABORT · [F1] HELP
      </div>

      <div
        className="relative z-20 w-full max-w-md mx-4"
        style={{
          border: '1px solid #00ff80',
          boxShadow: '0 0 40px rgba(0,255,128,0.15), inset 0 0 40px rgba(0,255,128,0.03)',
          backgroundColor: 'rgba(0,0,0,0.85)',
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ borderBottom: '1px solid #00ff8033', backgroundColor: 'rgba(0,255,128,0.05)' }}
        >
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff5555' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ffff55' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#00ff80' }} />
          </div>
          <span className="font-mono text-xs" style={{ color: '#00ff8066' }}>NEW_USER_SETUP.EXE</span>
          <span className="font-mono text-xs" style={{ color: '#00ff8066' }}>■ □ ✕</span>
        </div>

        <div className="p-8">
          <div className="mb-8 text-center">
            <h1
              className="font-mono font-bold tracking-widest"
              style={{
                fontSize: '3rem',
                color: '#00ff80',
                textShadow: '0 0 20px rgba(0,255,128,0.8), 0 0 40px rgba(0,255,128,0.4)',
                letterSpacing: '0.3em',
              }}
            >
              <GlitchText text="FINQ" />
            </h1>
            <div className="font-mono text-xs mt-1" style={{ color: '#00ff8066', letterSpacing: '0.4em' }}>
              FINANCIAL CONTROL SYSTEM
            </div>
            <div className="font-mono text-xs mt-3" style={{ color: '#ffff0099' }}>
              {`> CADASTRO DE NOVO USUARIO`}
              <span style={{ opacity: blink ? 1 : 0 }}>█</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs" style={{ color: '#00ff8099', letterSpacing: '0.2em' }}>
                {'>'} USERNAME:
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-3 font-mono text-sm outline-none"
                style={{
                  backgroundColor: 'rgba(0,255,128,0.05)',
                  border: '1px solid #00ff8044',
                  color: '#00ff80',
                  caretColor: '#00ff80',
                }}
                onFocus={e => e.target.style.borderColor = '#00ff80'}
                onBlur={e => e.target.style.borderColor = '#00ff8044'}
                placeholder="seu nome completo"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs" style={{ color: '#00ff8099', letterSpacing: '0.2em' }}>
                {'>'} EMAIL_ID:
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 font-mono text-sm outline-none"
                style={{
                  backgroundColor: 'rgba(0,255,128,0.05)',
                  border: '1px solid #00ff8044',
                  color: '#00ff80',
                  caretColor: '#00ff80',
                }}
                onFocus={e => e.target.style.borderColor = '#00ff80'}
                onBlur={e => e.target.style.borderColor = '#00ff8044'}
                placeholder="usuario@sistema.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs" style={{ color: '#00ff8099', letterSpacing: '0.2em' }}>
                {'>'} SENHA_KEY:
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 font-mono text-sm outline-none"
                style={{
                  backgroundColor: 'rgba(0,255,128,0.05)',
                  border: '1px solid #00ff8044',
                  color: '#00ff80',
                  caretColor: '#00ff80',
                }}
                onFocus={e => e.target.style.borderColor = '#00ff80'}
                onBlur={e => e.target.style.borderColor = '#00ff8044'}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div
                className="font-mono text-xs p-3"
                style={{
                  color: '#ff5555',
                  border: '1px solid #ff555544',
                  backgroundColor: 'rgba(255,85,85,0.05)',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-mono text-sm font-bold mt-2 transition-all duration-200"
              style={{
                backgroundColor: loading ? 'transparent' : '#00ff80',
                color: loading ? '#00ff80' : '#000',
                border: '1px solid #00ff80',
                boxShadow: loading ? 'none' : '0 0 20px rgba(0,255,128,0.4)',
                letterSpacing: '0.3em',
              }}
              onMouseEnter={e => {
                if (!loading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#000'
                  ;(e.target as HTMLButtonElement).style.color = '#00ff80'
                }
              }}
              onMouseLeave={e => {
                if (!loading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#00ff80'
                  ;(e.target as HTMLButtonElement).style.color = '#000'
                }
              }}
            >
              {loading ? '>> CRIANDO CONTA...' : '>> INICIALIZAR CONTA'}
            </button>
          </form>

          <div
            className="mt-6 pt-4 font-mono text-xs text-center"
            style={{ borderTop: '1px solid #00ff8022', color: '#00ff8055' }}
          >
            {'> JA TEM CONTA? '}
            <Link
              to="/login"
              style={{ color: '#00ff8088' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#00ff80'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#00ff8088'}
            >
              ACESSAR SISTEMA
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
