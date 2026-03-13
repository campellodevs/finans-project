import { FastifyInstance } from 'fastify'
import { listBudgets, createBudget, deleteBudget } from '../controllers/budgetController'
import { authenticate } from '../middlewares/auth'

export async function budgetRoutes(app: FastifyInstance) {
  app.get('/budgets', { preHandler: authenticate }, listBudgets)
  app.post('/budgets', { preHandler: authenticate }, createBudget)
  app.delete('/budgets/:id', { preHandler: authenticate }, deleteBudget)
}
