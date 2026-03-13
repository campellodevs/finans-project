import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, TransactionType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('í¼± Criando dados mock...')

  await prisma.budget.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.card.deleteMany()
  await prisma.user.deleteMany()

  const hashedPassword = await bcrypt.hash('123456', 10)

  const user = await prisma.user.create({
    data: {
      name: 'Lucca Campello',
      email: 'lucca@finans.com',
      password: hashedPassword,
    }
  })

  await prisma.card.create({
    data: {
      name: 'Nubank',
      limit: 3000,
      currentSpend: 1250.90,
      closingDay: 15,
      dueDay: 22,
      userId: user.id,
    }
  })

  const transactions = [
    { title: 'SalÃ¡rio',      amount: 4500, type: TransactionType.INCOME,  category: 'Renda',       date: new Date('2026-03-01') },
    { title: 'Freelance',    amount: 800,  type: TransactionType.INCOME,  category: 'Renda',       date: new Date('2026-03-05') },
    { title: 'Aluguel',      amount: 1200, type: TransactionType.EXPENSE, category: 'Moradia',     date: new Date('2026-03-05') },
    { title: 'Supermercado', amount: 450,  type: TransactionType.EXPENSE, category: 'AlimentaÃ§Ã£o', date: new Date('2026-03-07') },
    { title: 'Conta de luz', amount: 180,  type: TransactionType.EXPENSE, category: 'Contas',      date: new Date('2026-03-08') },
    { title: 'Spotify',      amount: 21,   type: TransactionType.EXPENSE, category: 'Assinaturas', date: new Date('2026-03-10') },
    { title: 'Restaurante',  amount: 95,   type: TransactionType.EXPENSE, category: 'AlimentaÃ§Ã£o', date: new Date('2026-03-11') },
    { title: 'Uber',         amount: 45,   type: TransactionType.EXPENSE, category: 'Transporte',  date: new Date('2026-03-12') },
    { title: 'Academia',     amount: 99,   type: TransactionType.EXPENSE, category: 'SaÃºde',       date: new Date('2026-03-12') },
    { title: 'Amazon',       amount: 230,  type: TransactionType.EXPENSE, category: 'Compras',     date: new Date('2026-03-13') },
  ]

  for (const t of transactions) {
    await prisma.transaction.create({ data: { ...t, userId: user.id } })
  }

  const budgets = [
    { category: 'AlimentaÃ§Ã£o', limit: 600,  spent: 545 },
    { category: 'Moradia',     limit: 1200, spent: 1200 },
    { category: 'Transporte',  limit: 200,  spent: 45 },
    { category: 'SaÃºde',       limit: 150,  spent: 99 },
    { category: 'Assinaturas', limit: 100,  spent: 21 },
    { category: 'Compras',     limit: 300,  spent: 230 },
  ]

  for (const b of budgets) {
    await prisma.budget.create({ data: { ...b, month: 3, year: 2026, userId: user.id } })
  }

  console.log('âœ… Seed concluÃ­do!')
  console.log(`í±¤ Email: lucca@finans.com`)
  console.log(`í´‘ Senha: 123456`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
