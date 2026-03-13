import { FastifyInstance } from 'fastify'
import { getDashboard } from '../controllers/dashboardController'

export async function dashboardRoutes(app: FastifyInstance) {
  app.get('/dashboard/:userId', getDashboard)
}