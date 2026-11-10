import { useCallback, useEffect, useState } from 'react'
import { fetchRuns, fetchSummary } from './api'
import { RunsTable } from './components/RunsTable'
import type { Summary, TestRun } from './types'
import './index.css'

const FILTERS = ['ALL', 'PASSED', 'FAILED', 'SKIPPED'] as const

export default function App() {
  const [runs, setRuns] = useState<TestRun[]>([])
  const [summary, setSummary] = useState<Summary | null>(null)
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('ALL')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const [r, s] = await Promise.all([fetchRuns(filter === 'ALL' ? undefined : filter), fetchSummary()])
      setRuns(r)
      setSummary(s)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [filter])

  // Load now and refresh every 5 seconds while runs are still coming in.
  useEffect(() => {
    load()
    const timer = setInterval(load, 5000)
    return () => clearInterval(timer)
  }, [load])

  return (
    <main>
      <h1>Test Results Dashboard</h1>

      {summary && (
        <section className="cards">
          <div className="card passed"><b>{summary.PASSED}</b> passed</div>
          <div className="card failed"><b>{summary.FAILED}</b> failed</div>
          <div className="card skipped"><b>{summary.SKIPPED}</b> skipped</div>
        </section>
      )}

      <div className="controls">
        {FILTERS.map((f) => (
          <button key={f} className={f === filter ? 'active' : ''} onClick={() => setFilter(f)}>
            {f === 'ALL' ? 'All' : f[0] + f.slice(1).toLowerCase()}
          </button>
        ))}
        <input placeholder="Search test or build" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {loading && <p>Loading...</p>}
      {error && (
        <p className="error">
          {error}. Is the Java API running? <button onClick={load}>Retry</button>
        </p>
      )}
      {!loading && !error && <RunsTable runs={runs} query={query} />}
    </main>
  )
}
