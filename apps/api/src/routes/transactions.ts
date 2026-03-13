import { FastifyInstance } from 'fastify'
import { listTransactions, createTransaction } from '../controllers/transactionController'
import { authenticate } from '../middlewares/auth'

export async function transactionRoutes(app: FastifyInstance) {

  app.get(
    '/transactions',
    { preHandler: [authenticate] },
    listTransactions
  )

  app.post(
    '/transactions',
    { preHandler: [authenticate] },
    createTransaction
  )

}
