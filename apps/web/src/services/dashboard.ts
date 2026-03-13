import { api } from './api'

export async function getDashboardData() {
  const { data } = await api.get('/dashboard')
  return data
}
