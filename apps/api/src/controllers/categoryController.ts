import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function listCategories(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.headers['x-user-id'] as string
  const categories = await prisma.category.findMany({ where: { userId }, orderBy: { name: 'asc' } })
  return reply.send(categories)
}

export async function createCategory(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.headers['x-user-id'] as string
  const { name, type } = req.body as any
  const category = await prisma.category.create({ data: { name, type, userId } })
  return reply.status(201).send(category)
}
