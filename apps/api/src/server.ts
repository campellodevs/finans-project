import Fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'
import { authRoutes } from './routes/auth'
import { transactionRoutes } from './routes/transactions'
import { cardRoutes } from './routes/cards'
import { dashboardRoutes } from './routes/dashboard'

const app = Fastify({ logger: false })

app.register(cors, { origin: '*' })

app.register(authRoutes, { prefix: '/api' })
app.register(transactionRoutes, { prefix: '/api' })
app.register(cardRoutes, { prefix: '/api' })
app.register(dashboardRoutes, { prefix: '/api' })

app.get('/health', async () => ({ status: 'ok' }))

app.listen({ port: 3333 }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('íº€ API rodando em http://localhost:3333')
})
