import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function listTransactions(req: FastifyRequest, reply: FastifyReply) {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' }
  })
  return reply.send(transactions)
}

export async function createTransaction(req: FastifyRequest, reply: FastifyReply) {
  const { title, amount, type, category, date, description, userId } = req.body as any

  const transaction = await prisma.transaction.create({
    data: { title, amount, type, category, date: new Date(date), description, userId }
  })

  return reply.status(201).send(transaction)
}