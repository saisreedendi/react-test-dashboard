# React Test Dashboard

A React + TypeScript dashboard that shows automated test results from the [Java Test Results API](https://github.com/saisreedendi/java-test-results-api).

## What it does
- Shows passed, failed and skipped counts in summary cards
- Filter by status and search by test name or build
- Failed runs are highlighted
- Loads data with `fetch` inside `useEffect` and refreshes every 5 seconds
- Loading, error (with retry) and empty states on every screen

## Tech
React, TypeScript, Vite, HTML5, CSS3, REST API (JSON from a Java backend)

## Run it
Start the Java API first (see that repo), then:

```bash
npm install
npm run dev
```

Open http://localhost:5173. To use a different API address, set `VITE_API_URL`.

## Project layout
- `src/types.ts` - TypeScript types that match the API's JSON
- `src/api.ts` - API calls
- `src/components/` - reusable table and status badge
- `src/App.tsx` - page, state and data loading
