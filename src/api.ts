import type { Summary, TestRun } from './types'

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  return res.json() as Promise<T>
}

export const fetchRuns = (status?: string) =>
  get<TestRun[]>(`/api/runs${status ? `?status=${encodeURIComponent(status)}` : ''}`)

export const fetchSummary = () => get<Summary>('/api/summary')
