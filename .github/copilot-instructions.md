# Copilot Instructions — AtyrePrint Monorepo

## Important: Instruction Change Protocol

When a code change introduces a new convention, pattern, or architectural decision that differs from or extends what's documented here, **always ask the developer:**

> "This introduces a new pattern/convention. Should I update `copilot-instructions.md` or any doc in `/docs/` to reflect this?"

This ensures all contributors and AI agents stay aligned. Never silently deviate from these instructions.

## Project Documentation

Full project documentation lives in `/docs/`. Always reference these when you need context:

| Document | Path | Purpose |
|---|---|---|
| **Architecture** | `docs/architecture.md` | Project structure, tech decisions, app routes |
| **Features** | `docs/features.md` | Feature roadmap with phases and checklists |
| **Setup Guide** | `docs/setup-guide.md` | How to install, run, and contribute |
| **Brand Guidelines** | `docs/brand-guidelines.md` | Colours, typography, tone, photography style |
| **API Design** | `docs/api-design.md` | Server Actions patterns, validation, error handling |
| **Image Requirements** | `IMAGE_REQUIREMENTS.md` | Public folder image structure and specs |
| **TODOs** | `TODOS.md` | Project-wide task tracker (kept in the base) |

When starting a new chat or context, read the relevant docs above for full clarity on decisions already made.

## Project Overview

AtyrePrint is a custom clothing & gifts e-commerce platform with two Next.js apps:

- **web/** — Customer-facing storefront (atyreprint.com)
- **admin/** — Internal admin dashboard for managing products, orders, and customers

## Tech Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS v4
- **Font:** Inter (primary), Playfair Display (headings/accent)
- **Icons:** Lucide React
- **State Management:** Zustand (when needed)
- **Forms:** React Hook Form + Zod validation
- **API:** REST or Server Actions (prefer Server Actions for mutations)

## Code Conventions

- Use `src/` directory structure with App Router
- Use Server Components by default; add `"use client"` only when needed
- Prefer named exports over default exports for components
- Use absolute imports with `@/` alias
- Component files: PascalCase (e.g., `HeroBanner.tsx`)
- Utility files: camelCase (e.g., `formatPrice.ts`)
- Use TypeScript strict mode; avoid `any`
- Prefer `interface` over `type` for object shapes
- Use `const` arrow functions for components

## Styling Rules

- Use Tailwind utility classes; avoid inline styles
- Use CSS custom properties for brand colors (defined in globals.css)
- Mobile-first responsive design
- Follow the Kidupia/Codezeel template layout patterns adapted for print/embroidery e-commerce

## Brand Colors (AtyrePrint)

- **Primary:** `#1B4D3E` (deep forest green)
- **Primary Light:** `#2D7A5F`
- **Primary Dark:** `#0F2E25`
- **Secondary/Accent:** `#D4A853` (warm gold)
- **Accent Light:** `#E8C97A`
- **Background:** `#FFFFFF`
- **Surface:** `#F8F9FA`
- **Text Primary:** `#1A1A1A`
- **Text Secondary:** `#6B7280`
- **Text Muted:** `#9CA3AF`
- **Border:** `#E5E7EB`
- **Success:** `#10B981`
- **Error:** `#EF4444`
- **Warning:** `#F59E0B`

## SEO

- Every page must have proper metadata (title, description, Open Graph)
- Use semantic HTML (header, main, nav, section, article, footer)
- All images must have alt text
- Use Next.js `<Image>` component for all images

## File Organization

```
src/
  app/              # App router pages and layouts
  components/
    ui/             # Reusable UI primitives (Button, Input, Card, etc.)
    layout/         # Header, Footer, Sidebar, Navigation
    sections/       # Page sections (HeroBanner, Categories, etc.)
    forms/          # Form components
  lib/              # Utilities, helpers, constants
  hooks/            # Custom React hooks
  types/            # TypeScript type definitions
  config/           # App configuration (site metadata, navigation, etc.)
```
