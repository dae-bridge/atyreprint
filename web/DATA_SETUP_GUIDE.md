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

## 4. Price Format Reference

Prices are stored in **pence** (integer) in Firestore:

| Display Price | Stored Value (amount) | Currency |
|--------------|----------------------|----------|
| £9.99 | `999` | `GBP` |
| £19.99 | `1999` | `GBP` |
| £45.00 | `4500` | `GBP` |
| £0.00 (free) | `0` | `GBP` |

---

## 5. After Creating Data

Once categories and products are created in the admin dashboard:

1. The **web storefront** will automatically display them (pages use `force-dynamic` rendering)
2. The **navbar** Categories mega menu will show your category tree
3. The **shop page** will list all categories with images
4. Category pages at `/shop/{parent-slug}` and `/shop/{parent-slug}/{child-slug}` will show filtered products
5. Product pages at `/shop/product/{slug}` will show full product details

No code changes or redeployment needed — the web project reads directly from Firestore in real-time.
