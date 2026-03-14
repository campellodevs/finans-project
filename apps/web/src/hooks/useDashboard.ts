import { useEffect, useState, useCallback } from 'react'
import { getDashboardData } from '../services/dashboard'
import type { DashboardData } from '../types'

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    setLoading(true)
    getDashboardData()
      .then(setData)
      .catch(() => setError('Erro ao carregar dados'))
      .finally(() => setLoading(false))
  }, [tick])

  const refresh = useCallback(() => setTick(t => t + 1), [])

  return { data, loading, error, refresh }
}
