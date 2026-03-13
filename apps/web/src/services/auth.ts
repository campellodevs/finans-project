import { api } from './api'

interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export async function loginRequest(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export async function registerRequest(name: string, email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post('/auth/register', { name, email, password })
  return data
}
