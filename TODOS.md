# TODOS — AtyrePrint Project

> Project-wide task tracker. Updated April 2026 after full audit.
> Payment integration (Stripe/PayPal) will be done last.

---

## Phase 1: Homepage Sections — Wire to Firestore/CMS

- [ ] **TopCategories section** — Accept Firestore categories as props (currently hardcoded 6 categories)
- [ ] **TwinPromoBanners** — Connect to CMS `promoBanners` (currently hardcoded 2 banners)
- [ ] **TriplePromoBanners** — Connect to CMS `promoBanners` (currently hardcoded 3 banners)
- [ ] **BlogPreview section** — Wire to Firestore `blog-posts` collection (currently hardcoded, not on homepage)
- [ ] **PurchaseToast** — Show real recent purchases from Firestore or remove fake social proof
- [ ] **ServiceCards section** — Accept CMS services data (currently `siteConfig` only)

---

## Phase 2: Search & Navigation

- [ ] **Product search** — Wire Header search bar to Firestore product search (currently does nothing)
- [ ] **Create `lib/search.ts`** — Product search by name, description, tags
- [ ] **Search results page** — `/search?q=` route with filtered product grid
- [ ] **Dynamic sitemap** — Fetch categories + products from Firestore (currently hardcoded slugs)

---

## Phase 3: Auth System (Firebase Auth)

- [ ] **Create `lib/auth.ts`** — Firebase Auth helpers (signIn, signUp, signOut, resetPassword, onAuthStateChanged)
- [ ] **Auth context/provider** — Wrap app with auth state
- [ ] **Login page** — Wire to Firebase Auth email/password + Google OAuth (currently `e.preventDefault()` stub)
- [ ] **Signup page** — Wire to Firebase Auth (currently stub)
- [ ] **Forgot Password page** — Wire to Firebase `sendPasswordResetEmail` (currently fakes submission)
- [ ] **Protected routes middleware** — Redirect unauthenticated users from `/account`, `/checkout`
- [ ] **Header user menu** — Show login/signup or user avatar based on auth state

---

## Phase 4: Account Dashboard

- [ ] **Wire account page to Auth** — Replace `MOCK_ORDERS`, `MOCK_DESIGNS`, `MOCK_ADDRESSES` with Firestore data
- [ ] **Order history tab** — Fetch real orders from Firestore `orders` collection
- [ ] **Saved designs tab** — Fetch from Firestore `designs` collection
- [ ] **Address book tab** — CRUD addresses in Firestore `users/{uid}/addresses`
- [ ] **Account details tab** — Edit profile (name, email, phone) via Firebase Auth + Firestore user doc

---

## Phase 5: Wishlist

- [ ] **Create `lib/wishlistStore.ts`** — Zustand store with persist (like cartStore)
- [ ] **Wire ProductCard heart button** — Toggle wishlist (currently `e.preventDefault()`)
- [ ] **Wire ProductDetailClient heart button** — Toggle wishlist
- [ ] **Wishlist page** — Show saved items with remove + add-to-cart (currently empty placeholder)
- [ ] **Sync with Firestore** — Persist wishlist for logged-in users

---

## Phase 6: Contact & Newsletter

- [ ] **Contact form** — Wire to Server Action or Cloud Function to send email (currently `setTimeout` fake)
- [ ] **Newsletter signup** — Wire to email service (Mailchimp/SendGrid/Cloud Function) (currently `e.preventDefault()`)

---

## Phase 7: Blog

- [ ] **Blog listing page** — Fetch from Firestore `blog-posts` collection (currently "Coming Soon" placeholder)
- [ ] **Blog post detail page** — `/blog/[slug]` route with full post content
- [ ] **Admin blog management** — CRUD blog posts in admin (check if already exists)
- [ ] **BlogPreview homepage section** — Wire to latest 3 posts + add to homepage

---

## Phase 8: Coupon System

- [ ] **Create `lib/coupon.ts`** — Validate coupon codes against Firestore `coupons` collection
- [ ] **Cart coupon field** — Wire to validation + apply discount (currently non-functional)
- [ ] **Checkout coupon field** — Same as cart
- [ ] **Admin coupon management** — CRUD coupons in admin (check if already exists)

---

## Phase 9: Order System

- [ ] **Create `lib/orders.ts`** — `createOrder()`, `getOrdersByUser()`, `getOrderById()`
- [ ] **Create Order types** — `Order`, `OrderItem`, `OrderStatus` in `types/index.ts`
- [ ] **Order confirmation page** — Create real order in Firestore (currently generates mock ID)
- [ ] **Order tracking page** — Fetch real order by ID/email (currently stub form)
- [ ] **Order confirmation email** — Cloud Function to send email on order creation

---

## Phase 10: Payment Integration (LAST)

- [ ] **Stripe integration** — Payment intent, checkout session
- [ ] **Checkout page** — Wire form validation + payment processing (currently full UI but no handler)
- [ ] **Payment confirmation** — Handle success/failure callbacks
- [ ] **Admin order payment status** — Show payment state in admin orders

---

## Phase 11: Remaining Pages & Polish

- [ ] **Services/Bulk page** — Complete content (currently placeholder stub, no metadata)
- [ ] **Services/Screen-Printing page** — Complete content (currently placeholder stub, no metadata)
- [ ] **Remove `/shop/accessories` static page** — Redundant with `[...category]` catch-all
- [ ] **Quick View modal** — Wire ProductCard eye button (currently `e.preventDefault()`)
- [ ] **Add missing metadata** to: `/blog`, `/login`, `/signup`, `/forgot-password`, `/account`, `/wishlist`, `/services/bulk`, `/services/screen-printing`, `/order-confirmation`

---

## Phase 12: Security & Infrastructure

- [ ] Security headers middleware (CSP, X-Frame-Options, etc.)
- [ ] Firestore security rules for new collections (orders, users, wishlists)
- [ ] Input validation with Zod on all Server Actions
- [ ] Rate limiting on forms (contact, newsletter, auth)
- [ ] Admin route authentication + RBAC
- [ ] CI/CD with GitHub Actions
- [ ] Configure deployment (Vercel)

---

## Completed

- [x] Project scaffolding — `web/` and `admin/` Next.js 16 apps
- [x] Tailwind CSS v4 with brand colour tokens
- [x] Font configured (Jost)
- [x] Lucide React icons
- [x] SEO metadata (title, description, keywords, OG, Twitter)
- [x] Site config (`web/src/config/site.ts`)
- [x] Type definitions (`web/src/types/index.ts`)
- [x] Utility functions (`web/src/lib/utils.ts`)
- [x] Firebase SDK configured (both apps)
- [x] Firestore generic CRUD layer (`lib/firestore.ts` with `serialize()`)
- [x] Product data layer (`lib/products.ts` — all queries)
- [x] Settings data layer (`lib/settings.ts` — site settings + homepage CMS)
- [x] Content data layer (`lib/content.ts` — testimonials, FAQs)
- [x] Cart store (`lib/cartStore.ts` — Zustand with persist)
- [x] Header with TopBar, DesktopNav (4 mega menus), MobileNav — all wired to Firestore
- [x] Footer fully dynamic from Firestore settings
- [x] CartDrawer with real cart store
- [x] Homepage: HeroBanner (CMS), FeatureBadges (CMS), TrendingProducts (Firestore), TopDeals (Firestore), Testimonials (Firestore), BrandLogos (CMS), NewsletterSignup
- [x] Shop index page — dynamic from Firestore categories
- [x] Category pages `[...category]` — dynamic from Firestore
- [x] Product detail page — dynamic with per-color images, variants, reviews, related products
- [x] Deals page — dynamic from Firestore (products tagged "deals")
- [x] FAQs page — dynamic from Firestore with fallback
- [x] Contact page — dynamic settings, UI-complete form
- [x] Legal pages (Terms, Privacy, Shipping, Returns) — all complete
- [x] About page — partial (trustStats from CMS, rest hardcoded)
- [x] Personalise-It page — Fabric.js design editor
- [x] Firestore composite indexes deployed
- [x] GDPR cookie consent banner
- [x] robots.txt and sitemap (basic)
- [x] PWA manifest
- [x] Image 404 errors fixed
- [x] Admin dashboard — 15+ pages, full product CRUD, tag chips, per-color image upload
- [x] DATA_SETUP_GUIDE.md written
