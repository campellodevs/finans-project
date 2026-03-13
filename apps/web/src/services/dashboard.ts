import { api } from './api'

const USER_ID = '892bf17f-ae88-4cef-84f6-a8ba6d604f0c'

export async function getDashboardData() {
  const { data } = await api.get(`/dashboard/${USER_ID}`)
  return data
}