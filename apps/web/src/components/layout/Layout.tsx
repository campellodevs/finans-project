import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

interface Props {
  children: ReactNode
  onRefresh?: () => void
}

export function Layout({ children, onRefresh }: Props) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Sidebar onRefresh={onRefresh} />
      <div className="ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
