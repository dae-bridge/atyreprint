# TODOS — AtyrePrint Project

> Project-wide task tracker. Updated June 2026 — all phases complete.

---

## Phase 1: Homepage Sections — Wire to Firestore/CMS ✅

- [x] **TopCategories section** — Accept Firestore categories as props
- [x] **TwinPromoBanners** — Connect to CMS `promoBanners`
- [x] **TriplePromoBanners** — Connect to CMS `promoBanners`
- [x] **BlogPreview section** — Wire to Firestore `blog-posts` collection
- [x] **PurchaseToast** — Shows real recent purchases from Firestore
- [x] **ServiceCards section** — Accept CMS services data

---

## Phase 2: Search & Navigation ✅

- [x] **Product search** — Header search bar wired to Firestore product search
- [x] **Create `lib/search.ts`** — Product search by name, description, tags
- [x] **Search results page** — `/search?q=` route with filtered product grid
- [x] **Dynamic sitemap** — Fetches categories + products from Firestore

---

## Phase 3: Auth System (Firebase Auth) ✅

- [x] **Create `lib/auth.ts`** — Firebase Auth helpers (signIn, signUp, signOut, resetPassword, onAuthStateChanged)
- [x] **Auth context/provider** — App wrapped with auth state
- [x] **Login page** — Wired to Firebase Auth email/password + Google OAuth
- [x] **Signup page** — Wired to Firebase Auth
- [x] **Forgot Password page** — Wired to Firebase `sendPasswordResetEmail`
- [x] **Protected routes middleware** — Redirects unauthenticated users from `/account`, `/checkout`
- [x] **Header user menu** — Shows login/signup or user avatar based on auth state

---

## Phase 4: Account Dashboard ✅

- [x] **Wire account page to Auth** — Real Firestore data for orders, addresses, profile
- [x] **Order history tab** — Fetches real orders from Firestore `orders` collection
- [x] **Saved designs tab** — Fetches from Firestore `designs` collection
- [x] **Address book tab** — CRUD addresses in Firestore `users/{uid}/addresses`
- [x] **Account details tab** — Edit profile (name, email, phone) via Firebase Auth + Firestore user doc

---

## Phase 5: Wishlist ✅

- [x] **Create `lib/wishlistStore.ts`** — Zustand store with persist
- [x] **Wire ProductCard heart button** — Toggle wishlist
- [x] **Wire ProductDetailClient heart button** — Toggle wishlist
- [x] **Wishlist page** — Shows saved items with remove + add-to-cart
- [x] **Sync with Firestore** — Persists wishlist for logged-in users

---

## Phase 6: Contact & Newsletter ✅

- [x] **Contact form** — Wired to Server Action, saves to Firestore
- [x] **Newsletter signup** — Wired to Firestore `newsletter-subscribers` collection

---

## Phase 7: Blog ✅

- [x] **Blog listing page** — Fetches from Firestore `blog-posts` collection
- [x] **Blog post detail page** — `/blog/[slug]` route with full post content
- [x] **Admin blog management** — CRUD blog posts with rich text editor (TipTap)
- [x] **BlogPreview homepage section** — Wired to latest 3 posts

---

## Phase 8: Coupon System ✅

- [x] **Create `lib/coupon.ts`** — Validates coupon codes against Firestore `coupons` collection
- [x] **Cart coupon field** — Wired to validation + applies discount
- [x] **Checkout coupon field** — Same as cart
- [x] **Admin coupon management** — CRUD coupons in admin

---

## Phase 9: Order System ✅

- [x] **Create `lib/orders.ts`** — `createOrder()`, `getOrdersByUser()`, `getOrderById()`
- [x] **Create Order types** — `Order`, `OrderItem`, `OrderStatus` in `types/index.ts`
- [x] **Order confirmation page** — Creates real order in Firestore
- [x] **Order tracking page** — Fetches real order by ID/email
- [x] **Order confirmation email** — Cloud Function to send email on order creation

---

## Phase 10: Payment Integration (Stripe) ✅

- [x] **Stripe integration** — PaymentIntent API, client-side Elements
- [x] **Checkout page** — Full form validation + Stripe payment processing
- [x] **Payment confirmation** — Handles success/failure callbacks
- [x] **Admin order payment status** — Shows payment state in admin orders

---

## Phase 11: Remaining Pages & Polish ✅

- [x] **Services/Bulk page** — Full content with metadata
- [x] **Services/Screen-Printing page** — Full content with metadata
- [x] **Remove `/shop/accessories` static page** — Using `[...category]` catch-all
- [x] **Quick View modal** — Wire ProductCard eye button
- [x] **Add missing metadata** to all routes

---

## Phase 12: Security & Infrastructure ✅

- [x] Security headers middleware (CSP, X-Frame-Options, etc.)
- [x] Firestore security rules for all collections
- [x] Input validation with Zod on all Server Actions
- [x] Rate limiting on forms (contact, newsletter, auth)
- [x] Admin route authentication + RBAC
- [x] CI/CD with GitHub Actions
- [x] Configure deployment (Vercel)

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
