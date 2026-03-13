import { FastifyInstance } from 'fastify'
import { getDashboard } from '../controllers/dashboardController'
import { authenticate } from '../middlewares/auth'

export async function dashboardRoutes(app: FastifyInstance) {
  app.get('/dashboard', { preHandler: authenticate }, getDashboard)
}
