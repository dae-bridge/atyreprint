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

### Security Implementation (see `docs/security.md`)

- [ ] Security headers middleware (`X-Content-Type-Options`, `X-Frame-Options`, CSP, etc.)
- [ ] Firestore security rules (products, orders, users)
- [ ] Honeypot fields on all public forms
- [ ] Input validation with Zod on all Server Actions
- [ ] Rate limiting (API + form submissions)
- [ ] Admin route authentication + RBAC
- [ ] Session management (httpOnly cookies)
- [ ] Content Security Policy header
- [ ] Bot/crawler detection
- [ ] GDPR cookie consent banner
- [ ] `robots.txt` with AI crawler blocks

### Infrastructure

- [ ] Set up Firebase Auth (email/password)
- [ ] Set up CI/CD with GitHub Actions
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
- [x] IMAGE_REQUIREMENTS.md documented
- [x] Documentation folder (`/docs`) created
- [x] `.github/copilot-instructions.md` updated with docs reference
- [x] Firebase SDK installed and configured (both apps)
- [x] `.env.local` and `.env.example` files created
- [x] Site config updated with mega-menu navigation structure
- [x] Reusable UI components: Button, Container, SectionHeading, Card, Badge, SocialIcons
- [x] Header with TopBar, DesktopNav (mega-menu), MobileNav (slide-out drawer)
- [x] Footer with multi-column layout, contact info, social links
- [x] Homepage sections: HeroBanner, FeatureBadges, CategoryGrid, TrendingProducts, ServiceCards, PromoBanner, TrustBanner, Testimonials, NewsletterSignup, CTASection
- [x] `page.tsx` rebuilt using reusable section components
- [x] `layout.tsx` updated with Header + Footer in root layout
- [x] Security doc created (`docs/security.md`)
