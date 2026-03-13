import { FastifyInstance } from 'fastify'
import { listCards, createCard, deleteCard } from '../controllers/cardController'
import { authenticate } from '../middlewares/auth'

export async function cardRoutes(app: FastifyInstance) {
  app.get('/cards', { preHandler: authenticate }, listCards)
  app.post('/cards', { preHandler: authenticate }, createCard)
  app.delete('/cards/:id', { preHandler: authenticate }, deleteCard)
}
