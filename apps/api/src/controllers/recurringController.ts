import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function listRecurring(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.headers['x-user-id'] as string
  const items = await prisma.recurringIncome.findMany({ where: { userId }, orderBy: { dayOfMonth: 'asc' } })
  return reply.send(items)
}

export async function createRecurring(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.headers['x-user-id'] as string
  const { title, amount, dayOfMonth, description } = req.body as any
  const item = await prisma.recurringIncome.create({
    data: { title, amount, dayOfMonth, description, userId }
  })
  return reply.status(201).send(item)
}

export async function deleteRecurring(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as any
  await prisma.recurringIncome.delete({ where: { id } })
  return reply.status(204).send()
}
