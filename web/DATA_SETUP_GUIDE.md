# AtyrePrint — Data Setup Guide

This guide explains how to create categories and products in the admin dashboard so they appear on the web storefront.

---

## 1. Categories Setup

Categories use a **parent → child** tree structure. Create parent categories first, then children.

### Step 1: Create Parent Categories

Go to **Admin → Categories → Add Category** and create the top-level groups:

| Name | Slug | Description |
|------|------|-------------|
| Custom Clothing | `clothing` | Premium custom clothing with embroidery and print options |
| Drinkware & Gifts | `drinkware` | Personalised drinkware and gift items |
| Accessories | `accessories` | Custom accessories including bags, caps, and more |
| Home & Living | `home-living` | Personalised home items and living accessories |

For each parent category:

- **Status**: Set to `Published`
- **Image**: Upload a category banner image (recommended: 800×600px, JPG/PNG)
- **SEO**: Fill in meta title and description
- **Parent**: Leave as `None` (these are root categories)

### Step 2: Create Child Categories

After parents exist, create child categories under each parent:

#### Under "Custom Clothing" (`clothing`)

| Name | Slug | Parent |
|------|------|--------|
| T-Shirts | `t-shirts` | Custom Clothing |
| Hoodies | `hoodies` | Custom Clothing |
| Sweatshirts | `sweatshirts` | Custom Clothing |
| Aprons | `aprons` | Custom Clothing |

#### Under "Drinkware & Gifts" (`drinkware`)

| Name | Slug | Parent |
|------|------|--------|
| Mugs | `mugs` | Drinkware & Gifts |
| Glass Cans | `glass-cans` | Drinkware & Gifts |
| Tumblers | `tumblers` | Drinkware & Gifts |

#### Under "Accessories" (`accessories`)

| Name | Slug | Parent |
|------|------|--------|
| Caps & Hats | `caps` | Accessories |
| Tote Bags | `tote-bags` | Accessories |

#### Under "Home & Living" (`home-living`)

| Name | Slug | Parent |
|------|------|--------|
| Pillowcases | `pillowcases` | Home & Living |

For each child category:

- **Status**: `Published`
- **Image**: Upload image (recommended: 600×600px)
- **Parent**: Select the correct parent from the dropdown

---

## 2. Products Setup

### Required Fields for Every Product

| Field | Format | Example |
|-------|--------|---------|
| **Name** | Text | Custom Printed T-Shirt |
| **Slug** | URL-safe string | `custom-printed-tshirt` |
| **SKU** | Unique code | `ATYRE-TS-001` |
| **Description** | Short text (1-2 sentences) | Premium quality custom printed t-shirt... |
| **Long Description** | Detailed text (paragraphs separated by blank lines) | Full product details... |
| **Price** | Pence integer (e.g. £19.99 = `1999`) | `1999` |
| **Category** | Select from dropdown | T-Shirts |
| **Status** | Published | `Published` |
| **Button Label** | `ADD TO CART` or `CUSTOMISE` | `CUSTOMISE` |

### Optional but Recommended Fields

| Field | Format | Example |
|-------|--------|---------|
| **Compare At Price** | Pence integer (original price for sale items) | `2499` |
| **Badge** | Short label | `NEW`, `SALE`, `HOT` |
| **Featured** | Checkbox | ✓ (shows on homepage) |
| **Customisable** | Checkbox | ✓ |
| **Stock Quantity** | Number | `100` |
| **In Stock** | Checkbox | ✓ |

### Images

Each product needs at least **1 image**, recommended **3-5 images**.

**Image requirements:**

- **Format**: JPG or PNG
- **Recommended size**: 800×1000px (4:5 aspect ratio) for product images
- **Background**: White or transparent preferred
- **File size**: Under 2MB per image
- **First image**: This is the main image shown on product cards

**Upload process:**

1. In the product form, go to the Images section
2. Upload images using the file picker
3. Images are stored in Firebase Storage automatically
4. First image = main product card image
5. Drag to reorder if needed

**Banner Image** (optional): A wider banner image (1200×400px) used on the product detail page header.

### Colors (Optional)

Add color variants with swatch images:

| Field | Description |
|-------|-------------|
| **Name** | Color name (e.g. "Navy Blue") |
| **Hex** | Hex color code (e.g. `#1a237e`) |
| **Image Index** | Which product image shows this color (0-based) |

### Variants (Optional)

Add size/style variants:

| Field | Description |
|-------|-------------|
| **Label** | Variant type (e.g. "Size") |
| **Options** | Comma-separated values (e.g. "S, M, L, XL, XXL") |

### Features

Add bullet-point features:

- e.g. "100% Organic Cotton"
- e.g. "Machine Washable"
- e.g. "Available in 8 Colors"

### Additional Info

Add specification rows:

| Label | Value |
|-------|-------|
| Material | 100% Organic Cotton |
| Weight | 180 GSM |
| Print Method | DTG (Direct to Garment) |

### Reviews (Optional)

Add customer reviews:

- **Author**: Customer name
- **Rating**: 1-5 stars
- **Date**: e.g. "15 Jan 2025"
- **Text**: Review content

---

## 3. Suggested Products to Create

Here's a starter set of products to populate the store:

### Clothing

1. **Custom Printed T-Shirt** — `custom-printed-tshirt` — Category: T-Shirts — Price: £19.99 (1999)
2. **Embroidered Hoodie** — `embroidered-hoodie` — Category: Hoodies — Price: £45.00 (4500)
3. **Embroidered Sweatshirt** — `embroidered-sweatshirt` — Category: Sweatshirts — Price: £35.00 (3500)
4. **Custom Apron** — `custom-apron` — Category: Aprons — Price: £18.00 (1800)

### Drinkware

1. **Personalised Mug** — `personalised-mug` — Category: Mugs — Price: £12.00 (1200)
2. **Custom Glass Can** — `custom-glass-can` — Category: Glass Cans — Price: £15.00 (1500)
3. **Custom Tumbler** — `custom-tumbler` — Category: Tumblers — Price: £22.00 (2200)

### Accessories

1. **Branded Snapback Cap** — `branded-snapback-cap` — Category: Caps & Hats — Price: £20.00 (2000)
2. **Custom Tote Bag** — `custom-tote-bag` — Category: Tote Bags — Price: £15.00 (1500)

### Home & Living

1. **Personalised Pillowcase** — `personalised-pillowcase` — Category: Pillowcases — Price: £14.00 (1400)

**Tips:**

- Mark 3-5 products as **Featured** for the homepage
- Add **Compare At Price** on 2-3 products to show sale tags
- Add **"NEW"** badge to newest products
- Add at least 2 reviews per product for social proof
- Set **buttonLabel** to `CUSTOMISE` for customisable products

---

## 4. Product Tags — Navbar & Homepage Sections

Tags drive the **navbar mega menus** and the **homepage sections**. Without the right tags, the site falls back to hardcoded placeholder data.

### Available Tags

| Tag | Where It Appears | Description |
|-----|-----------------|-------------|
| `bestselling` | **Shop** nav mega menu → "Best Selling" column | Top 4 products shown |
| `trending` | **Shop** nav mega menu → "Trending" column + **Homepage** → "Trending Products" carousel | Top 4 in nav, top 8 on homepage |
| `popular` | **Shop** nav mega menu → "Popular" column | Top 4 products shown |
| `deals` | **Homepage** → "Top Deals" section + `/deals` page + **Top deals** nav mega menu | Products with active discounts |
| `new-arrival` | Badge display | Shows "NEW" badge on product cards |

### How to Add Tags in Admin

1. Go to **Admin → Products → Edit Product**
2. Scroll to the **Tags** section
3. Click the tag chips: `bestselling`, `trending`, `popular`, `deals`, `new-arrival`
4. Active tags are highlighted green
5. Save the product

### Minimum Products Per Tag

For the navbar and homepage to look complete:

| Tag | Minimum | Ideal |
|-----|---------|-------|
| `bestselling` | 4 | 6–8 |
| `trending` | 4 (nav) / 8 (homepage) | 8 |
| `popular` | 4 | 6–8 |
| `deals` | 4 | 6–8 |

**Important:** Products tagged `deals` should have a **Compare At Price** set (the original price before discount) so the discount badge and strikethrough pricing display correctly.

### How It Works

1. **`layout.tsx`** (server) fetches `getProductsByTag("bestselling", 4)`, `getProductsByTag("trending", 4)`, `getProductsByTag("popular", 4)` → passes to Header → DesktopNav/MobileNav
2. **`page.tsx`** (server) fetches `getProductsByTag("trending", 8)` → TrendingProducts section, `getProductsByTag("deals", 8)` → TopDeals section
3. **ShopMegaMenu** replaces "Best Selling", "Trending", "Popular" columns with real products when data exists
4. **DealsMegaMenu** shows top-rated products + category circles
5. If any query returns empty, **hardcoded fallback** data is displayed

### Featured Products

Mark products as **Featured** (checkbox in admin) to show them in:

- The **Personalise** nav mega menu (top 5 featured products)
- Any future featured sections

---

## 5. Top Deals Section — How It Works

The **Top Deals** section appears on the homepage between Feature Badges and Triple Promo Banners.

### Data Source

- Fetches products tagged with `deals` from Firestore: `getProductsByTag("deals", 8)`
- Falls back to 6 hardcoded placeholder products if none found

### What Products Need

For a product to appear in Top Deals:

1. **Tag**: Must have the `deals` tag
2. **Status**: Must be `Published`
3. **Compare At Price**: Should be set (original higher price) so the discount percentage badge shows
4. **Images**: At least 1 image (2 for hover effect)
5. **Badge** (optional): e.g. "SALE", "HOT" shown on the card

### Where Deals Appear

| Location | Source | Max Items |
|----------|--------|-----------|
| Homepage "Top Deals" carousel | `getProductsByTag("deals", 8)` | 8 |
| `/deals` page (full grid) | `getProductsByTag("deals", 20)` | 20 |
| Nav "Top deals" mega menu | Top-rated products + categories | 6 |

### Example Deal Product Setup

```
Name: Custom Printed T-Shirt
Price: £19.99 (1999)
Compare At Price: £24.99 (2499) ← shows -20% badge
Tags: deals, bestselling
Badge: SALE
Featured: ✓
Status: Published
```

---

## 7. Price Format Reference

Prices are stored in **pence** (integer) in Firestore:

| Display Price | Stored Value (amount) | Currency |
|--------------|----------------------|----------|
| £9.99 | `999` | `GBP` |
| £19.99 | `1999` | `GBP` |
| £45.00 | `4500` | `GBP` |
| £0.00 (free) | `0` | `GBP` |

---

## 8. After Creating Data

Once categories and products are created in the admin dashboard:

1. The **web storefront** will automatically display them (pages use `force-dynamic` rendering)
2. The **navbar** Categories mega menu will show your category tree
3. The **Shop mega menu** will show real products in Best Selling / Trending / Popular columns (need tags assigned)
4. The **Top Deals mega menu** will show top-rated products and category circles
5. The **homepage** Trending Products carousel will show products tagged `trending`
6. The **homepage** Top Deals section will show products tagged `deals`
7. The **shop page** will list all categories with images
8. Category pages at `/shop/{parent-slug}` and `/shop/{parent-slug}/{child-slug}` will show filtered products
9. Product pages at `/shop/product/{slug}` will show full product details
10. The `/deals` page will show all products tagged `deals` in a grid

No code changes or redeployment needed — the web project reads directly from Firestore in real-time.
