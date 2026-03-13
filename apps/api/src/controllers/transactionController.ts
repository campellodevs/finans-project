import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function listTransactions(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.headers['x-user-id'] as string
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: 'desc' }
  })
  return reply.send(transactions)
}

export async function createTransaction(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.headers['x-user-id'] as string
  const { title, amount, type, category, date, description } = req.body as any

  const transaction = await prisma.transaction.create({
    data: {
      title,
      amount,
      type,
      category: category || null,
      date: new Date(date),
      description: description || null,
      userId,
    }
  })

  return reply.status(201).send(transaction)
}
