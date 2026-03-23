# Setup Guide — AtyrePrint

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Git**

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url> atyreprint
cd atyreprint
```

### 2. Install dependencies for both apps

```bash
cd web && npm install
cd ../admin && npm install
```

### 3. Run the development servers

**Web app (storefront):**

```bash
cd web
npm run dev
# → http://localhost:3000
```

**Admin app (dashboard):**

```bash
cd admin
npm run dev --port 3001
# → http://localhost:3001
```

### 4. Build for production

```bash
cd web && npm run build
cd ../admin && npm run build
```

## Project Structure

See [architecture.md](./architecture.md) for the full project structure and tech decisions.

## Environment Variables

Environment variables go in `.env.local` inside each project (never committed to git).

**web/.env.local:**
```env
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# API (when backend is ready)
# NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Analytics (Phase 3)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**admin/.env.local:**
```env
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# API (when backend is ready)
# NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Coding Standards

All conventions are defined in [`.github/copilot-instructions.md`](../.github/copilot-instructions.md). Key points:

- TypeScript strict mode, no `any`
- Server Components by default
- Tailwind utility classes only (no inline styles)
- Named exports for components
- `@/` import alias for absolute imports
- PascalCase for components, camelCase for utilities
- Mobile-first responsive design

## Adding a New Page (Web)

1. Create the route at `web/src/app/<route>/page.tsx`
2. Add SEO metadata using the `metadata` export
3. Use Server Components by default
4. Import shared components from `@/components/`
5. Add navigation link in `web/src/config/site.ts` if needed

## Adding a New Component

1. Decide the category: `ui/`, `layout/`, `sections/`, or `forms/`
2. Create the file in PascalCase: `web/src/components/<category>/ComponentName.tsx`
3. Use named export: `export const ComponentName = () => { ... }`
4. Add `"use client"` only if it needs browser APIs, state, or event handlers

## Useful Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
