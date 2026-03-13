import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { authRoutes } from './routes/auth'
import { transactionRoutes } from './routes/transactions'
import { cardRoutes } from './routes/cards'
import { dashboardRoutes } from './routes/dashboard'
import { categoryRoutes } from './routes/categories'
import { recurringRoutes } from './routes/recurring'
import { budgetRoutes } from './routes/budgets'

const app = Fastify({ logger: true })

app.register(cors, { origin: 'http://localhost:5173', credentials: true })

app.get('/health', () => ({ status: 'ok' }))

app.register(authRoutes,        { prefix: '/api' })
app.register(transactionRoutes, { prefix: '/api' })
app.register(cardRoutes,        { prefix: '/api' })
app.register(dashboardRoutes,   { prefix: '/api' })
app.register(categoryRoutes,    { prefix: '/api' })
app.register(recurringRoutes,   { prefix: '/api' })
app.register(budgetRoutes,      { prefix: '/api' })

app.listen({ port: 3333, host: '0.0.0.0' }, () => {
  console.log('íº€ API rodando em http://localhost:3333')
})
