import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'finans_secret'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = req.body as {
    name: string
    email: string
    password: string
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return reply.status(400).send({ message: 'Email já cadastrado' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword }
  })

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

  return reply.status(201).send({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  })
}

export async function login(req: FastifyRequest, reply: FastifyReply) {
  const { email, password } = req.body as {
    email: string
    password: string
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return reply.status(401).send({ message: 'Email ou senha incorretos' })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return reply.status(401).send({ message: 'Email ou senha incorretos' })
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

  return reply.send({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  })
}
