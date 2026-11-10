export type Status = 'PASSED' | 'FAILED' | 'SKIPPED'

/** Matches the JSON returned by the Java Test Results API. */
export interface TestRun {
  id: number
  name: string
  build: string
  status: Status
  durationMs: number
  createdAt: string
}

export type Summary = Record<Status, number>
