import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function listCards(req: FastifyRequest, reply: FastifyReply) {
  const cards = await prisma.card.findMany()
  return reply.send(cards)
}