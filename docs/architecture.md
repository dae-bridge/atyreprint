# Architecture — AtyrePrint Monorepo

## Overview

AtyrePrint is a monorepo containing two independent Next.js 16 applications that share brand conventions but run as separate deployments.

```
atyreprint/
├── .github/                  # GitHub config & Copilot instructions
│   └── copilot-instructions.md
├── docs/                     # Project documentation (you are here)
│   ├── architecture.md
│   ├── features.md
│   ├── setup-guide.md
│   ├── brand-guidelines.md
│   └── api-design.md
├── TODOS.md                  # Project-wide task tracker
├── IMAGE_REQUIREMENTS.md     # Image asset guide
├── admin/                    # Admin dashboard app
│   ├── public/
│   └── src/
│       ├── app/
│       ├── components/
│       │   ├── ui/
│       │   ├── layout/
│       │   └── forms/
│       ├── hooks/
│       ├── lib/
│       ├── config/
│       └── types/
└── web/                      # Customer-facing storefront
    ├── public/
    │   └── images/
    │       ├── hero/
    │       ├── categories/
    │       ├── products/
    │       ├── services/
    │       ├── testimonials/
    │       ├── about/
    │       ├── banners/
    │       ├── blog/
    │       ├── partners/
    │       ├── og/
    │       └── icons/
    └── src/
        ├── app/
        ├── components/
        │   ├── ui/
        │   ├── layout/
        │   ├── sections/
        │   └── forms/
        ├── hooks/
        ├── lib/
        ├── config/
        └── types/
```

## Application Architecture

### Web App (`web/`)

The customer-facing storefront at **atyreprint.com**.

| Layer | Purpose |
|---|---|
| `app/` | Next.js App Router pages, layouts, metadata, server actions |
| `components/ui/` | Reusable primitives — Button, Input, Card, Badge, Modal, etc. |
| `components/layout/` | Header, Footer, MobileNav, Sidebar, Breadcrumbs |
| `components/sections/` | Page-level sections — HeroBanner, CategoryGrid, ServiceCards, Testimonials, Newsletter |
| `components/forms/` | ContactForm, PersonaliseForm, CheckoutForm |
| `hooks/` | Custom React hooks — `useCart`, `useMediaQuery`, `useDebounce` |
| `lib/` | Utility functions — `formatPrice`, `slugify`, `cn` |
| `config/` | Site metadata, navigation links, footer links, constants |
| `types/` | TypeScript interfaces — Product, Category, Testimonial, BlogPost |

**Key pages (planned):**

| Route | Description |
|---|---|
| `/` | Homepage — hero, categories, trending, services, testimonials, CTA |
| `/shop` | Product listing with filters & sorting |
| `/shop/[slug]` | Product detail page |
| `/categories` | All categories overview |
| `/categories/[slug]` | Products filtered by category |
| `/personalise-it` | Custom order builder |
| `/about` | About us page |
| `/contact` | Contact form + business info |
| `/faqs` | Frequently asked questions |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post detail |

### Admin App (`admin/`)

Internal dashboard for managing the business. **Not indexed by search engines.**

| Layer | Purpose |
|---|---|
| `app/` | Dashboard pages, server actions for CRUD |
| `components/ui/` | Admin UI primitives — DataTable, StatCard, Charts |
| `components/layout/` | Sidebar, TopBar, AdminShell |
| `components/forms/` | ProductForm, OrderForm, CategoryForm |
| `hooks/` | Admin-specific hooks |
| `lib/` | Admin utilities, API helpers |
| `config/` | Admin navigation, dashboard config |
| `types/` | Admin-specific types |

**Key pages (planned):**

| Route | Description |
|---|---|
| `/` | Dashboard — stats, recent orders, quick actions |
| `/products` | Product management (CRUD) |
| `/products/new` | Create product |
| `/products/[id]` | Edit product |
| `/orders` | Order management |
| `/orders/[id]` | Order detail |
| `/customers` | Customer list |
| `/categories` | Category management |
| `/analytics` | Sales & traffic analytics |
| `/settings` | Site settings, profile |

## Tech Decisions

### Why Two Separate Projects (Not a Single App)?

- **Security:** Admin is completely isolated; no risk of leaking admin routes or components to the public
- **Deployment:** Can deploy independently — admin can be behind auth/VPN without affecting storefront
- **Performance:** Web app stays lightweight; admin bundles (charts, data tables) don't bloat the customer experience
- **Teams:** Different developers can work on each without merge conflicts

### Why Next.js 16 App Router?

- Server Components by default for performance
- Built-in metadata API for SEO
- Server Actions for mutations (no separate API layer needed initially)
- Streaming & Suspense for loading states
- Image optimization out of the box

### Why Tailwind CSS v4?

- CSS-first configuration (no `tailwind.config.js`)
- CSS custom properties integrate with design tokens
- Utility-first approach keeps styles colocated with components
- Smaller bundle with automatic purging

### Data Layer (Future)

The backend/data layer is TBD. Options being considered:

1. **Server Actions + Database (Prisma/Drizzle)** — simplest, all in Next.js
2. **Separate API (Express/Fastify)** — if we need shared API for mobile app
3. **Headless CMS (Strapi/Payload)** — for content management
4. **Supabase/Firebase** — for rapid BaaS approach

This will be decided and documented before backend work begins.
