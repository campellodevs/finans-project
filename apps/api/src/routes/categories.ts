import { FastifyInstance } from 'fastify'
import { listCategories, createCategory } from '../controllers/categoryController'
import { authenticate } from '../middlewares/auth'

export async function categoryRoutes(app: FastifyInstance) {
  app.get('/categories', { preHandler: authenticate }, listCategories)
  app.post('/categories', { preHandler: authenticate }, createCategory)
}
