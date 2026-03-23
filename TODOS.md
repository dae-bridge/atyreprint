# TODOS — AtyrePrint Project

> This is the project-wide task tracker. Update this file as tasks are completed or new ones are added.

---

## In Progress

- [ ] Add images to `web/public/images/` (see [IMAGE_REQUIREMENTS.md](./IMAGE_REQUIREMENTS.md))
  - [ ] AtyrePrint logo (SVG)
  - [ ] Favicon & apple-touch-icon
  - [ ] Hero image(s)
  - [ ] Category images (10 product categories)
  - [ ] Service images (embroidery, printing, design)
  - [ ] OG social sharing image

---

## Up Next

### Web App — Layout & Components
- [ ] Build `Header` component (logo, nav, search, cart, mobile menu)
- [ ] Build `Footer` component (multi-column with links, contact, social)
- [ ] Build `MobileNav` component (hamburger slide-out)
- [ ] Build reusable `Button` component with variants
- [ ] Build reusable `Card` component
- [ ] Build `Container` layout wrapper

### Web App — Homepage Sections
- [ ] `HeroBanner` — full-width carousel with CTA
- [ ] `CategoryGrid` — browseable category cards
- [ ] `TrendingProducts` — product card slider
- [ ] `ServiceCards` — embroidery, printing, design
- [ ] `TrustBanner` — stats (5+ years, 3 continents, etc.)
- [ ] `Testimonials` — customer review carousel
- [ ] `NewsletterSignup` — email capture section
- [ ] `PromoBanners` — promotional slider/grid

### Web App — Pages
- [ ] About Us page
- [ ] Contact page with form
- [ ] Shop listing page
- [ ] Product detail page
- [ ] Category listing page
- [ ] Personalise It page
- [ ] FAQs page

### Admin App
- [ ] Build admin sidebar navigation with Lucide icons
- [ ] Build admin top bar with search & user menu
- [ ] Build dashboard stat cards with real data placeholders
- [ ] Product CRUD pages
- [ ] Order management pages
- [ ] Category management pages

### Infrastructure
- [ ] Decide on database (Prisma + PostgreSQL vs Supabase vs MongoDB)
- [ ] Decide on authentication (NextAuth.js vs Clerk)
- [ ] Set up CI/CD with GitHub Actions
- [ ] Set up environment variables structure
- [ ] Configure deployment (Vercel)

---

## Completed

- [x] Project scaffolding — `web/` and `admin/` Next.js 16 apps created
- [x] Tailwind CSS v4 configured with brand colour tokens
- [x] Inter + Playfair Display fonts configured (web)
- [x] Inter font configured (admin)
- [x] Lucide React installed in both projects
- [x] SEO metadata configured (web) — title, description, keywords, OG, Twitter
- [x] Admin marked as `noindex, nofollow`
- [x] Site config created (`web/src/config/site.ts`)
- [x] Type definitions created (`web/src/types/index.ts`)
- [x] Utility functions created (`web/src/lib/utils.ts`)
- [x] Public folder image structure created with directories
- [x] Initial homepage with placeholder sections (web)
- [x] Initial admin dashboard with sidebar + stat cards
- [x] IMAGE_REQUIREMENTS.md documented
- [x] Documentation folder (`/docs`) created
- [x] `.github/copilot-instructions.md` updated with docs reference
