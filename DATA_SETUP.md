# Data Setup Guide — AtyrePrint

This guide explains what data to create in the **Admin Dashboard** (`localhost:3001`) so that the **Web Storefront** (`localhost:3000`) sections populate with real content from Firestore.

> All sections have **hardcoded fallbacks** — the site looks fine without any data. But once you add data in admin, it replaces the fallback content.

---

## 1. Trending Products Section (Homepage)

**Admin Page:** Products → edit any product  
**Collection:** `products`  
**What drives it:** Products with the tag `trending`

### Steps

1. Go to **Products** in admin
2. Create or edit a product
3. In the **Tags** section, click the `trending` chip (it turns green when active)
4. Make sure the product has:
   - `status: published`
   - `isDeleted: false`
   - At least 1 image uploaded
   - A price set
5. Repeat for 6–8 products you want in the trending carousel

### Fields the web uses

| Field | Purpose |
|-------|---------|
| `name` | Product title |
| `slug` | URL link (`/shop/product/{slug}`) |
| `price` | Display price |
| `compareAtPrice` | Strikethrough price (shows discount badge if set) |
| `images[0]` | Main product image |
| `images[1]` | Hover image (optional) |
| `rating` | Star rating (1–5) |
| `customisable` | Shows "CUSTOMISE" vs "ADD TO CART" button |
| `tags` | Must include `"trending"` |

---

## 2. Testimonials Section (Homepage)

**Admin Page:** Testimonials  
**Collection:** `testimonials`

### Steps

1. Go to **Testimonials** in admin
2. Click **"Add Testimonial"**
3. Fill in:
   - **Name** — e.g. "Sarah M."
   - **Location** — e.g. "London, UK"
   - **Role** — (optional) e.g. "Business Owner"
   - **Testimonial Text** — the quote
   - **Rating** — 1–5 stars
   - **Avatar** — upload a photo (optional, fallback used if empty)
   - **Status** — set to `published`
   - **Featured** — toggle on if you want it prioritised
   - **Sort Order** — lower numbers appear first
4. Add at least 3–5 testimonials for a good carousel

### Fields the web uses

| Field | Purpose |
|-------|---------|
| `name` | Customer name |
| `location` | City/country |
| `text` | The testimonial quote |
| `rating` | Star rating display |
| `avatar` | Customer photo (ImageAsset) |

---

## 3. FAQs Page (`/faqs`)

**Admin Page:** FAQs  
**Collection:** `faq-categories` (parent) → `faq-categories/{id}/items` (questions)

### Steps

1. Go to **FAQs** in admin
2. Click **"Add Category"** to create a category:
   - **Name** — e.g. "Ordering", "Shipping & Delivery", "Returns & Issues"
   - **Slug** — auto-generated from name
   - **Sort Order** — controls display order (0 = first)
3. Expand a category and click the **+** icon to add questions:
   - **Question** — the FAQ question
   - **Answer** — the answer (supports basic text)
   - **Status** — set to `published`
   - **Sort Order** — order within the category
4. Create at least 2–3 categories with 3–4 questions each

### Fields the web uses

| Field | Purpose |
|-------|---------|
| `category.name` | Section heading |
| `item.question` | Question text |
| `item.answer` | Answer text |

---

## 4. Brand Logos Section (Homepage)

**Admin Page:** CMS → Homepage → Brand Logos  
**Collection:** `cms/homepage` → `brandLogos` array

### Steps

1. Go to **CMS** → **Homepage** in admin
2. Find the **Brand Logos** section
3. Add brand entries:
   - **Name** — brand name (e.g. "Gildan", "Fruit of the Loom")
   - **Logo** — upload brand logo image (optional — text fallback if empty)
   - **URL** — external link to brand (optional)
   - **Sort Order** — display order
   - **Active** — must be toggled on
4. Add 4–8 brands for best appearance

### Fields the web uses

| Field | Purpose |
|-------|---------|
| `name` | Brand name (text fallback if no logo) |
| `logo.url` | Brand logo image |
| `url` | Click-through link |
| `active` | Must be `true` to show |
| `sortOrder` | Display order |

---

## 5. Nav Mega Menu Products

**Admin Page:** Products → edit any product  
**Collection:** `products`  
**What drives it:** Product tags

### Tag Mappings

| Tag | Where it appears |
|-----|-----------------|
| `bestselling` | Shop mega menu → "Best Selling" column |
| `trending` | Shop mega menu → "Trending" column + homepage trending section |
| `popular` | Shop mega menu → "Popular" column |
| `deals` | Deals mega menu |
| `new-arrival` | General purpose |

### Steps

1. Edit products in admin
2. Click the tag chips to assign: `bestselling`, `trending`, `popular`, `deals`, `new-arrival`
3. Each tag section shows up to 4 products in the nav
4. Products must be `published` and not deleted

---

## 6. Hero Slides (Homepage Banner)

**Admin Page:** CMS → Homepage → Hero Slides  
**Collection:** `cms/homepage` → `heroSlides` array

### Steps

1. Go to **CMS** → **Homepage** in admin
2. Add hero slides with:
   - **Image** — full-width banner image
   - **Overline** — small text above title
   - **Title** + **Highlight** — main heading
   - **Description** — subtitle text
   - **Primary CTA** + **Secondary CTA** — buttons with labels and links
   - **Active** — must be toggled on
   - **Sort Order** — slide order

---

## 7. Feature Badges (Homepage)

**Admin Page:** CMS → Homepage → Feature Badges  
**Collection:** `cms/homepage` → `featureBadges` array

### Steps

1. Add badges with:
   - **Title** — e.g. "Free Shipping"
   - **Description** — e.g. "On orders over £100"
   - **Icon** — Lucide icon name
   - **Sort Order** — display order

---

## 8. Categories (Nav + Shop pages)

**Admin Page:** Categories  
**Collection:** `categories`

### Steps

1. Create **root categories** (depth 0): e.g. "T-Shirts", "Hoodies", "Mugs"
2. Create **child categories** under each parent if needed
3. Set `status: published` and `featured: true` for key categories
4. Upload a category image for visual display
5. Categories appear in:
   - Nav "Categories" mega menu
   - Shop page sidebar/filters
   - "Top Deals" mega menu "Shop By" circles

---

## 9. Site Settings

**Admin Page:** Settings → General  
**Collection:** `settings/general`

### Key fields

- **Site Name, Tagline, Description** — SEO and display
- **Contact info** — email, phone, address (shown in footer + contact page)
- **Social links** — Facebook, Instagram URLs
- **Business Hours** — weekday/weekend hours
- **Top Bar Message** — announcement banner text
- **Free Shipping Threshold** — amount for free shipping messaging
- **Footer Links** — quick links, help & support, legal

---

## Quick Checklist

| Section | Admin Page | Min Items | Status |
|---------|-----------|-----------|--------|
| Trending Products | Products (tag: `trending`) | 6–8 | ⬜ |
| Testimonials | Testimonials | 3–5 | ⬜ |
| FAQs | FAQs | 2–3 categories, 3–4 Q each | ⬜ |
| Brand Logos | CMS → Homepage | 4–8 | ⬜ |
| Nav Best Selling | Products (tag: `bestselling`) | 4 | ⬜ |
| Nav Trending | Products (tag: `trending`) | 4 | ⬜ |
| Nav Popular | Products (tag: `popular`) | 4 | ⬜ |
| Hero Slides | CMS → Homepage | 2–3 | ⬜ |
| Feature Badges | CMS → Homepage | 4 | ⬜ |
| Categories | Categories | 4–6 root | ⬜ |
| Site Settings | Settings | 1 | ⬜ |

---

## Deploy Firestore Indexes

After adding data, deploy the composite indexes needed for queries:

```bash
cd admin
firebase deploy --only firestore:indexes
```

This enables the sorted/filtered queries used by the nav mega menus and product listings.
