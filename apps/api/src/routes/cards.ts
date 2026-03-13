import { FastifyInstance } from 'fastify'
import { listCards } from '../controllers/cardController'

export async function cardRoutes(app: FastifyInstance) {
  app.get('/cards', listCards)
}