import type { TestRun } from '../types'
import { StatusBadge } from './StatusBadge'

interface Props {
  runs: TestRun[]
  query: string
}

export function RunsTable({ runs, query }: Props) {
  const q = query.trim().toLowerCase()
  const shown = runs.filter((r) => r.name.toLowerCase().includes(q) || r.build.includes(q))

  if (shown.length === 0) return <p className="empty">No test runs match.</p>

  return (
    <table>
      <thead>
        <tr><th>ID</th><th>Test</th><th>Build</th><th>Status</th><th>Duration</th></tr>
      </thead>
      <tbody>
        {shown.map((r) => (
          <tr key={r.id} className={r.status === 'FAILED' ? 'row-failed' : ''}>
            <td>{r.id}</td>
            <td>{r.name}</td>
            <td>{r.build}</td>
            <td><StatusBadge status={r.status} /></td>
            <td>{r.durationMs} ms</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
