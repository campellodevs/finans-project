import { FastifyInstance } from 'fastify'
import { listTransactions, createTransaction } from '../controllers/transactionController'

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/transactions', listTransactions)
  app.post('/transactions', createTransaction)
}