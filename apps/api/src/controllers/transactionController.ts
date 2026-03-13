import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function listTransactions(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.headers['x-user-id'] as string

  if (!userId) {
    return reply.status(401).send({ error: 'User not authenticated' })
  }

  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: 'desc' }
  })

  return reply.send(transactions)
}

export async function createTransaction(req: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = req.headers['x-user-id'] as string

    if (!userId) {
      return reply.status(401).send({ error: 'User not authenticated' })
    }

    const { title, amount, type, category, date, description } = req.body as any

    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount: Number(amount),
        type,
        category: category || null,
        date: date ? new Date(date) : new Date(),
        description: description || null,
        userId
      }
    })

    return reply.status(201).send(transaction)

  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao criar transação' })
  }
}
