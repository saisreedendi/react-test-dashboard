import type { Status } from '../types'

const LABEL: Record<Status, string> = { PASSED: 'Passed', FAILED: 'Failed', SKIPPED: 'Skipped' }

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge badge-${status.toLowerCase()}`}>{LABEL[status]}</span>
}
