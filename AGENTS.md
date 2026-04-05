# Copilot Instructions — AtyrePrint Monorepo

## Important: Instruction Change Protocol

When a code change introduces a new convention, pattern, or architectural decision that differs from or extends what's documented here, **always ask the developer:**

> "This introduces a new pattern/convention. Should I update `copilot-instructions.md` or any doc in `/docs/` to reflect this?"

This ensures all contributors and AI agents stay aligned. Never silently deviate from these instructions.

## Project Documentation

Full project documentation lives in `/docs/`. Always reference these when you need context:

| Document               | Path                       | Purpose                                             |
| ---------------------- | -------------------------- | --------------------------------------------------- |
| **Architecture**       | `docs/architecture.md`     | Project structure, tech decisions, app routes       |
| **Features**           | `docs/features.md`         | Feature roadmap with phases and checklists          |
| **Setup Guide**        | `docs/setup-guide.md`      | How to install, run, and contribute                 |
| **Brand Guidelines**   | `docs/brand-guidelines.md` | Colours, typography, tone, photography style        |
| **API Design**         | `docs/api-design.md`       | Server Actions patterns, validation, error handling |
| **Security**           | `docs/security.md`         | Rate limiting, bot protection, middleware, GDPR     |
| **Image Requirements** | `IMAGE_REQUIREMENTS.md`    | Public folder image structure and specs             |
| **TODOs**              | `TODOS.md`                 | Project-wide task tracker (kept in the base)        |

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
- **Backend:** Firebase (Firestore for data, Storage for files, Analytics)

## Firebase Configuration

All Firebase configuration lives inside the **admin/** project — NOT at the repo root. This includes:

- `admin/.firebaserc` — Project alias (default: `atyreprint-01`)
- `admin/firebase.json` — Firestore, Storage, Functions & emulator config
- `admin/firestore.rules` — Firestore security rules (covers both web & admin)
- `admin/firestore.indexes.json` — Composite index definitions
- `admin/storage.rules` — Storage security rules
- `admin/functions/` — Cloud Functions (TypeScript, built from `admin/functions/src/`)

**Deploy from the `admin/` directory:**

```bash
cd admin
firebase deploy --only firestore:rules
firebase deploy --only storage
firebase deploy --only functions
firebase deploy  # deploys everything
```

Never place Firebase config files (firebase.json, .firebaserc, rules, functions/) at the monorepo root.

### Firestore Data Safety

**Never save `undefined` to Firestore** — Firestore rejects `undefined` values and throws errors. Follow these rules for all document writes:

- **Optional string fields:** Use `""` (empty string), never `undefined` or `null`
- **Optional numeric fields:** Use `0`, never `undefined`
- **Optional array fields:** Use `[]` (empty array), never `undefined` or `null`
- **Optional object fields (e.g. ImageAsset):** Use `null` only when the field represents an absent object (e.g. no image uploaded). Never `undefined`.
- **Conditional values:** Use `value || ""` instead of `value || undefined`
- **The CRUD layer in `lib/firestore.ts` has a `stripUndefined()` safety net** that converts any `undefined` to `""` before writing — but code should still avoid passing `undefined` in the first place.

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
- **Extract reusable components aggressively** — if a UI pattern appears (or could appear) on multiple pages, make it a component in `components/ui/` or `components/sections/`. Avoid duplicating markup.

### Safe File Rewrites

When you need to **rewrite an entire file or folder** (not a small edit):

1. **Rename** the existing file/folder first (e.g., `MyComponent.tsx` → `MyComponent.old.tsx`)
2. **Create** the new file/folder with the updated code
3. **Wait for the developer to confirm** the new version works correctly
4. **Only then delete** the `.old` backup

This prevents data loss. Never delete the original before the developer has verified the replacement.

## Styling Rules

- Use Tailwind utility classes; avoid inline styles
- Use CSS custom properties for brand colors (defined in globals.css)
- Mobile-first responsive design
- Follow the Kidupia/Codezeel template layout patterns adapted for print/embroidery e-commerce

## Brand Colors (AtyrePrint)

- **Primary:** `#3D6B1E` (dark olive green — readable with white text)
- **Primary Light:** `#4A7C25` (medium green — hover states)
- **Primary Dark:** `#1A3A10` (very dark green — footer, topbar)
- **Accent:** `#A7CF45` (brand lime green — highlights, nav indicators, decorative pops)
- **Accent Light:** `#C8E07D`
- **Secondary:** `#D4A853` (warm gold)
- **Secondary Light:** `#E8C97A`
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
