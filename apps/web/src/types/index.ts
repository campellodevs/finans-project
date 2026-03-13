export type TransactionType = 'INCOME' | 'EXPENSE'

export interface Transaction {
  id: string
  title: string
  amount: number
  type: TransactionType
  category: string
  date: string
  description?: string
  userId: string
  createdAt: string
}

export interface Card {
  id: string
  name: string
  limit: number
  currentSpend: number
  closingDay: number
  dueDay: number
  userId: string
}

export interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  month: number
  year: number
}

export interface DashboardData {
  balance: number
  totalIncome: number
  totalExpense: number
  transactions: Transaction[]
  cards: Card[]
  budgets: Budget[]
}