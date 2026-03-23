# Features — AtyrePrint

## Web App Features

### Phase 1 — MVP (Current Sprint)

- [ ] **Homepage** — Hero banner, categories grid, services section, trust stats, CTA
- [ ] **Header/Navigation** — Logo, nav links, search, cart icon, mobile hamburger menu
- [ ] **Footer** — Contact info, quick links, social links, newsletter signup
- [ ] **About Page** — Company story, services, team, business hours
- [ ] **Contact Page** — Contact form, map, business info, social links
- [ ] **Product Listing** — Grid/list view, category filtering, sorting, pagination
- [ ] **Product Detail** — Image gallery, description, pricing, add to cart, related products
- [ ] **Category Pages** — Category overview with product grid
- [ ] **Responsive Design** — Mobile-first, fully responsive across breakpoints

### Phase 2 — Enhanced Experience

- [ ] **Personalise It** — Custom order builder (upload design, choose product, preview)
- [ ] **Shopping Cart** — Add/remove items, quantity adjustment, cart summary
- [ ] **Checkout** — Customer details, delivery options, payment integration
- [ ] **User Accounts** — Register, login, order history, saved addresses
- [ ] **Search** — Full-text product search with suggestions
- [ ] **FAQs Page** — Accordion-style FAQ section
- [ ] **Blog** — Blog listing and detail pages for SEO content
- [ ] **Newsletter** — Email signup with backend integration
- [ ] **Reviews/Testimonials** — Customer review system on products

### Phase 3 — Growth & Optimisation

- [ ] **Wishlist** — Save products for later
- [ ] **Discount Codes** — Coupon/promo code system at checkout
- [ ] **Order Tracking** — Real-time order status updates
- [ ] **Multi-currency** — GBP default with EUR/USD support
- [ ] **SEO Blog Strategy** — Targeted content for print/embroidery keywords
- [ ] **Analytics Integration** — GA4, Meta Pixel
- [ ] **Performance Audit** — Core Web Vitals optimisation
- [ ] **Accessibility Audit** — WCAG 2.1 AA compliance

---

## Admin App Features

### Phase 1 — MVP

- [ ] **Dashboard** — Overview stats (orders, revenue, products, customers)
- [ ] **Product Management** — Create, read, update, delete products
- [ ] **Category Management** — CRUD for product categories
- [ ] **Order Management** — View orders, update status, order details
- [ ] **Authentication** — Admin login with role-based access

### Phase 2 — Operations

- [ ] **Customer Management** — Customer list, order history per customer
- [ ] **Analytics Dashboard** — Sales charts, traffic data, top products
- [ ] **Inventory Management** — Stock levels, low stock alerts
- [ ] **Bulk Operations** — Bulk edit/delete products
- [ ] **Image Management** — Upload, crop, organise product images
- [ ] **Settings** — Site settings, business info, email templates

### Phase 3 — Advanced

- [ ] **Discount/Coupon Management** — Create and manage promo codes
- [ ] **Blog Management** — Create and publish blog posts
- [ ] **Email Notifications** — Order confirmation, shipping updates
- [ ] **Export/Reports** — CSV export for orders, customers, revenue
- [ ] **Audit Log** — Track admin actions
- [ ] **Multi-admin** — Multiple admin users with roles (admin, editor, viewer)

---

## Cross-Cutting Concerns

| Concern | Approach |
|---|---|
| **Authentication** | TBD — NextAuth.js / Clerk / custom JWT |
| **Database** | TBD — Prisma + PostgreSQL / Supabase / MongoDB |
| **Payments** | Stripe (primary) |
| **Email** | Resend / SendGrid |
| **File Storage** | Cloudinary / AWS S3 for product images |
| **Hosting** | Vercel (web) + Vercel (admin) or separate |
| **CI/CD** | GitHub Actions |
| **Monitoring** | Sentry for error tracking |
