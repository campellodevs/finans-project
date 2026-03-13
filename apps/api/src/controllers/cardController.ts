import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function listCards(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.headers['x-user-id'] as string
  const cards = await prisma.card.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  return reply.send(cards)
}

export async function createCard(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.headers['x-user-id'] as string
  const { name, bank, limit, closingDay, dueDay, showOnHome } = req.body as any
  const card = await prisma.card.create({
    data: { name, bank, limit, closingDay, dueDay, showOnHome: showOnHome ?? true, userId }
  })
  return reply.status(201).send(card)
}

export async function deleteCard(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as any
  await prisma.card.delete({ where: { id } })
  return reply.status(204).send()
}
