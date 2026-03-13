import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function getDashboard(req: FastifyRequest, reply: FastifyReply) {
  const { userId } = req.params as { userId: string }

  const [transactions, cards, budgets] = await Promise.all([
    prisma.transaction.findMany({ where: { userId }, orderBy: { date: 'desc' } }),
    prisma.card.findMany({ where: { userId } }),
    prisma.budget.findMany({ where: { userId, month: new Date().getMonth() + 1, year: new Date().getFullYear() } }),
  ])

  const totalIncome = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((acc, t) => acc + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, t) => acc + t.amount, 0)

  const balance = totalIncome - totalExpense

  return reply.send({
    balance,
    totalIncome,
    totalExpense,
    transactions,
    cards,
    budgets,
  })
}