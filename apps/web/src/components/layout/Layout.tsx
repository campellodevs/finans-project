import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-8">
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-zinc-200/20 to-transparent dark:from-zinc-800/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="relative bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 shadow-sm">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}