import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function listBudgets(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.headers['x-user-id'] as string
  const now = new Date()
  const budgets = await prisma.budget.findMany({
    where: { userId, month: now.getMonth() + 1, year: now.getFullYear() },
    orderBy: { category: 'asc' }
  })
  return reply.send(budgets)
}

export async function createBudget(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.headers['x-user-id'] as string
  const { category, limit, showOnHome } = req.body as any
  const now = new Date()
  const budget = await prisma.budget.create({
    data: { category, limit, month: now.getMonth() + 1, year: now.getFullYear(), showOnHome: showOnHome ?? true, userId }
  })
  return reply.status(201).send(budget)
}

export async function deleteBudget(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as any
  await prisma.budget.delete({ where: { id } })
  return reply.status(204).send()
}
