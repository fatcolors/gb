# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite with HMR)
- **Build:** `npm run build` (runs `tsc -b && vite build`, output in `dist/`)
- **Lint:** `npm run lint` (ESLint with TypeScript + React hooks + React Refresh rules)
- **Preview production build:** `npm run preview`

No test framework is configured.

## Architecture

This is a **fuel trading supplier dashboard** — a single-page React 19 app with React Router v7, Tailwind CSS v4 (via `@tailwindcss/vite` plugin), and TypeScript.

### Routing & Layout

All routes are nested under `MainLayout` (sidebar + main content area). Routes are defined in `src/App.tsx`:
- `/` — Dashboard
- `/messages` — Messages
- `/fuel-products` — Fuel Products
- `/quote-requests` — Quote Requests
- `/analytics` — Analytics
- `/company-profile` — Company Profile

### Key Conventions

- **Styling:** Tailwind CSS v4 with custom theme tokens defined in `src/index.css` (`@theme` block). Brand colors use `brand-*`, plus `orange-*`, `error-*`, `success-*`, `warning-*` semantic tokens. Uses `cn()` utility from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional class merging.
- **Icons:** Lucide React (`lucide-react`). Global stroke-width set to 1.7 in CSS.
- **Charts:** Recharts library (`recharts`).
- **Tables:** TanStack Table v8 (`@tanstack/react-table`).
- **Maps:** Leaflet via `react-leaflet`.
- **Data:** All data is static/mock, defined in `src/data/*.ts` files. No backend or API integration.

### Source Structure

- `src/pages/` — One page component per route
- `src/components/layout/` — MainLayout, Sidebar, PageHeader, SidebarNavItem
- `src/components/charts/` — Reusable chart wrappers (BarChart, LineChart, DonutChart, HorizontalBarChart, ChartCard)
- `src/components/ui/` — Shared UI primitives (button, card, badge, tabs, select, search-input, date-range-picker, add-product-modal)
- `src/data/` — Mock data modules, one per page/feature
