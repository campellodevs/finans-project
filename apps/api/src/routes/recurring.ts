import { FastifyInstance } from 'fastify'
import { listRecurring, createRecurring, deleteRecurring } from '../controllers/recurringController'
import { authenticate } from '../middlewares/auth'

export async function recurringRoutes(app: FastifyInstance) {
  app.get('/recurring', { preHandler: authenticate }, listRecurring)
  app.post('/recurring', { preHandler: authenticate }, createRecurring)
  app.delete('/recurring/:id', { preHandler: authenticate }, deleteRecurring)
}
