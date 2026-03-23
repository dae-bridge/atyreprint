# AtyrePrint — Image Requirements & Public Folder Structure

## Web App (`web/public/images/`)

### Directory Structure

```
web/public/
├── favicon.ico                          # Site favicon (32x32, ICO format)
├── images/
│   ├── hero/                            # Homepage hero/banner images
│   │   ├── hero-main.jpg               # Main hero background (1920x900, dark/moody product shot)
│   │   ├── hero-slide-2.jpg            # Carousel slide 2 (1920x900)
│   │   └── hero-slide-3.jpg            # Carousel slide 3 (1920x900)
│   │
│   ├── categories/                      # Category thumbnail images
│   │   ├── tshirts.jpg                 # T-Shirts category (600x600)
│   │   ├── hoodies.jpg                 # Hoodies category (600x600)
│   │   ├── sweatshirts.jpg             # Sweatshirts category (600x600)
│   │   ├── tote-bags.jpg              # Tote Bags category (600x600)
│   │   ├── aprons.jpg                 # Aprons category (600x600)
│   │   ├── mugs.jpg                   # Mugs category (600x600)
│   │   ├── glass-cans.jpg             # Glass Cans category (600x600)
│   │   ├── tumblers.jpg               # Tumblers category (600x600)
│   │   ├── caps.jpg                   # Caps category (600x600)
│   │   └── pillowcases.jpg            # Pillowcases category (600x600)
│   │
│   ├── products/                        # Product images (added dynamically per product)
│   │   └── (product-slug)/
│   │       ├── main.jpg               # Main product image (800x800)
│   │       ├── thumb-1.jpg            # Gallery thumbnail 1 (800x800)
│   │       └── thumb-2.jpg            # Gallery thumbnail 2 (800x800)
│   │
│   ├── services/                        # Service section icons/images
│   │   ├── embroidery.jpg             # Embroidery service image (600x400)
│   │   ├── printing.jpg               # Printing service image (600x400)
│   │   └── design.jpg                 # Design service image (600x400)
│   │
│   ├── about/                           # About page images
│   │   ├── team.jpg                   # Team/workshop photo (1200x800)
│   │   ├── workshop.jpg               # Workshop/production photo (1200x800)
│   │   └── products-showcase.jpg      # Product showcase collage (1200x800)
│   │
│   ├── banners/                         # Promotional banner images
│   │   ├── promo-1.jpg               # Promotional banner (1200x400)
│   │   ├── promo-2.jpg               # Promotional banner (1200x400)
│   │   └── cta-bg.jpg                # CTA section background (1920x600)
│   │
│   ├── testimonials/                    # Customer testimonial avatars
│   │   ├── customer-1.jpg            # Customer avatar (200x200, circular crop)
│   │   └── customer-2.jpg            # Customer avatar (200x200)
│   │
│   ├── blog/                            # Blog post cover images
│   │   └── (post-slug).jpg           # Blog cover (1200x630)
│   │
│   ├── partners/                        # Partner/client logos
│   │   └── (partner-name).png        # Logo (transparent PNG, ~200x80)
│   │
│   ├── og/                              # Open Graph / social sharing images
│   │   ├── og-default.jpg            # Default OG image (1200x630)
│   │   ├── og-shop.jpg               # Shop page OG (1200x630)
│   │   └── og-about.jpg              # About page OG (1200x630)
│   │
│   └── icons/                           # App icons & favicons
│       ├── apple-touch-icon.png       # Apple touch icon (180x180)
│       ├── icon-192.png               # PWA icon (192x192)
│       ├── icon-512.png               # PWA icon (512x512)
│       └── logo.svg                   # AtyrePrint logo (SVG, vector)
```

### Admin App (`admin/public/images/`)

```
admin/public/
├── favicon.ico
├── images/
│   ├── icons/
│   │   └── logo.svg                   # AtyrePrint admin logo (SVG)
│   └── og/
│       └── og-admin.jpg               # Admin OG image (1200x630)
```

---

## Images You Need to Prepare

### Priority 1 — Required for Launch

| Image | Location | Size | Description |
|---|---|---|---|
| **AtyrePrint Logo** | `images/icons/logo.svg` | Vector SVG | Main brand logo in forest green (#1B4D3E) + gold (#D4A853) |
| **Favicon** | `favicon.ico` | 32x32 | Small icon version of logo |
| **Apple Touch Icon** | `images/icons/apple-touch-icon.png` | 180x180 | iOS home screen icon |
| **Hero Image** | `images/hero/hero-main.jpg` | 1920x900 | Main homepage hero — showcase of custom printed/embroidered products on dark forest green background |
| **OG Default** | `images/og/og-default.jpg` | 1200x630 | Social sharing image with logo + tagline "Custom Clothing & Gifts that Speak for You" |
| **10 Category Images** | `images/categories/*.jpg` | 600x600 each | One photo per product category: T-Shirts, Hoodies, Sweatshirts, Tote Bags, Aprons, Mugs, Glass Cans, Tumblers, Caps, Pillowcases |
| **3 Service Images** | `images/services/*.jpg` | 600x400 each | Embroidery close-up, Printing process, Design mockup |

### Priority 2 — For Full Homepage

| Image | Location | Size | Description |
|---|---|---|---|
| **About/Team Photo** | `images/about/team.jpg` | 1200x800 | Team or workspace photo |
| **Workshop Photo** | `images/about/workshop.jpg` | 1200x800 | Production/workshop in action |
| **Product Showcase** | `images/about/products-showcase.jpg` | 1200x800 | Collage of best products |
| **Testimonial Avatars** | `images/testimonials/*.jpg` | 200x200 each | Customer photos (or use initials fallback) |
| **Promo Banners** | `images/banners/*.jpg` | 1200x400 | Seasonal/promotional banners |
| **Partner Logos** | `images/partners/*.png` | ~200x80 | Client/partner logos (transparent PNG) |

### Priority 3 — Blog & Extras

| Image | Location | Size | Description |
|---|---|---|---|
| **Blog Covers** | `images/blog/*.jpg` | 1200x630 | Blog post cover images |
| **Additional Hero Slides** | `images/hero/hero-slide-*.jpg` | 1920x900 | Extra carousel slides |
| **CTA Background** | `images/banners/cta-bg.jpg` | 1920x600 | Background for call-to-action sections |

---

## Image Guidelines

- **Format:** Use `.jpg` for photos, `.png` for logos/transparency, `.svg` for icons/logos
- **Optimization:** Compress all images (use tools like TinyPNG or Squoosh) before adding
- **Naming:** Use lowercase kebab-case (e.g., `tote-bags.jpg`, not `Tote Bags.jpg`)
- **Alt text:** Every image in the codebase uses descriptive alt text (handled in components)
- **Next.js Image:** All images are served through `<Image>` component for automatic optimization
- **Brand Colors in Images:** Use forest green (#1B4D3E) and gold (#D4A853) accents where possible
