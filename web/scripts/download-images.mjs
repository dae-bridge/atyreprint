#!/usr/bin/env node

/**
 * Download placeholder images for AtyrePrint development.
 * Uses picsum.photos (Lorem Picsum) for reliable free placeholder photos.
 * Each image gets a unique seed so we get consistent, different images.
 * Run: node scripts/download-images.mjs
 */

import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");

function download(url, dest, maxRedirects = 8) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error("Too many redirects"));

    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const client = url.startsWith("https") ? https : http;

    client
      .get(url, { headers: { "User-Agent": "AtyrePrint-Dev/1.0" } }, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
          const loc = res.headers.location;
          if (!loc) return reject(new Error("Redirect without location"));
          const next = loc.startsWith("http") ? loc : new URL(loc, url).href;
          download(next, dest, maxRedirects - 1)
            .then(resolve)
            .catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(dest);
        });
        file.on("error", (err) => {
          fs.unlink(dest, () => {});
          reject(err);
        });
      })
      .on("error", reject);
  });
}

// [localPath, seed, width, height]
const images = [
  // Hero slides
  ["images/hero/hero-1.jpg", "atyrehero1", 1920, 900],
  ["images/hero/hero-2.jpg", "atyrehero2", 1920, 900],
  ["images/hero/hero-3.jpg", "atyrehero3", 1920, 900],

  // Categories (600x600)
  ["images/categories/tshirts.jpg", "cat-tshirts", 600, 600],
  ["images/categories/hoodies.jpg", "cat-hoodies", 600, 600],
  ["images/categories/sweatshirts.jpg", "cat-sweatshirts", 600, 600],
  ["images/categories/tote-bags.jpg", "cat-totebags", 600, 600],
  ["images/categories/aprons.jpg", "cat-aprons", 600, 600],
  ["images/categories/mugs.jpg", "cat-mugs", 600, 600],
  ["images/categories/glass-cans.jpg", "cat-glasscans", 600, 600],
  ["images/categories/tumblers.jpg", "cat-tumblers", 600, 600],
  ["images/categories/caps.jpg", "cat-caps", 600, 600],
  ["images/categories/pillowcases.jpg", "cat-pillowcases", 600, 600],

  // Services (600x400)
  ["images/services/embroidery.jpg", "svc-embroidery", 600, 400],
  ["images/services/printing.jpg", "svc-printing", 600, 400],
  ["images/services/design.jpg", "svc-design", 600, 400],

  // About (1200x800)
  ["images/about/team.jpg", "about-team", 1200, 800],
  ["images/about/workshop.jpg", "about-workshop", 1200, 800],
  ["images/about/products-showcase.jpg", "about-showcase", 1200, 800],

  // Banners
  ["images/banners/promo-1.jpg", "banner-promo1", 1200, 400],
  ["images/banners/promo-2.jpg", "banner-promo2", 1200, 400],
  ["images/banners/cta-bg.jpg", "banner-cta", 1920, 600],

  // Testimonials (200x200)
  ["images/testimonials/customer-1.jpg", "person-sarah", 200, 200],
  ["images/testimonials/customer-2.jpg", "person-james", 200, 200],
  ["images/testimonials/customer-3.jpg", "person-amara", 200, 200],

  // OG images (1200x630)
  ["images/og/og-default.jpg", "og-default", 1200, 630],
  ["images/og/og-shop.jpg", "og-shop", 1200, 630],
  ["images/og/og-about.jpg", "og-about", 1200, 630],

  // Products — T-Shirts
  [
    "images/products/custom-printed-tshirt/main.jpg",
    "prod-tshirt-main",
    800,
    800,
  ],
  [
    "images/products/custom-printed-tshirt/thumb-1.jpg",
    "prod-tshirt-1",
    800,
    800,
  ],
  [
    "images/products/custom-printed-tshirt/thumb-2.jpg",
    "prod-tshirt-2",
    800,
    800,
  ],
  [
    "images/products/custom-printed-tshirt/thumb-3.jpg",
    "prod-tshirt-3",
    800,
    800,
  ],

  // Products — Hoodies
  ["images/products/embroidered-hoodie/main.jpg", "prod-hoodie-main", 800, 800],
  ["images/products/embroidered-hoodie/thumb-1.jpg", "prod-hoodie-1", 800, 800],
  ["images/products/embroidered-hoodie/thumb-2.jpg", "prod-hoodie-2", 800, 800],
  ["images/products/embroidered-hoodie/thumb-3.jpg", "prod-hoodie-3", 800, 800],

  // Products — Mugs
  ["images/products/personalised-mug/main.jpg", "prod-mug-main", 800, 800],
  ["images/products/personalised-mug/thumb-1.jpg", "prod-mug-1", 800, 800],
  ["images/products/personalised-mug/thumb-2.jpg", "prod-mug-2", 800, 800],
  ["images/products/personalised-mug/thumb-3.jpg", "prod-mug-3", 800, 800],

  // Products — Tote Bags
  ["images/products/custom-tote-bag/main.jpg", "prod-tote-main", 800, 800],
  ["images/products/custom-tote-bag/thumb-1.jpg", "prod-tote-1", 800, 800],
  ["images/products/custom-tote-bag/thumb-2.jpg", "prod-tote-2", 800, 800],
  ["images/products/custom-tote-bag/thumb-3.jpg", "prod-tote-3", 800, 800],

  // Products — Caps
  ["images/products/branded-snapback-cap/main.jpg", "prod-cap-main", 800, 800],
  ["images/products/branded-snapback-cap/thumb-1.jpg", "prod-cap-1", 800, 800],
  ["images/products/branded-snapback-cap/thumb-2.jpg", "prod-cap-2", 800, 800],
  ["images/products/branded-snapback-cap/thumb-3.jpg", "prod-cap-3", 800, 800],

  // Products — Glass Cans
  ["images/products/custom-glass-can/main.jpg", "prod-glass-main", 800, 800],
  ["images/products/custom-glass-can/thumb-1.jpg", "prod-glass-1", 800, 800],
  ["images/products/custom-glass-can/thumb-2.jpg", "prod-glass-2", 800, 800],
  ["images/products/custom-glass-can/thumb-3.jpg", "prod-glass-3", 800, 800],

  // Products — Sweatshirts
  [
    "images/products/embroidered-sweatshirt/main.jpg",
    "prod-sweat-main",
    800,
    800,
  ],
  [
    "images/products/embroidered-sweatshirt/thumb-1.jpg",
    "prod-sweat-1",
    800,
    800,
  ],
  [
    "images/products/embroidered-sweatshirt/thumb-2.jpg",
    "prod-sweat-2",
    800,
    800,
  ],
  [
    "images/products/embroidered-sweatshirt/thumb-3.jpg",
    "prod-sweat-3",
    800,
    800,
  ],

  // Products — Pillowcases
  [
    "images/products/personalised-pillowcase/main.jpg",
    "prod-pillow-main",
    800,
    800,
  ],
  [
    "images/products/personalised-pillowcase/thumb-1.jpg",
    "prod-pillow-1",
    800,
    800,
  ],
  [
    "images/products/personalised-pillowcase/thumb-2.jpg",
    "prod-pillow-2",
    800,
    800,
  ],
  [
    "images/products/personalised-pillowcase/thumb-3.jpg",
    "prod-pillow-3",
    800,
    800,
  ],

  // Products — Aprons
  ["images/products/custom-apron/main.jpg", "prod-apron-main", 800, 800],
  ["images/products/custom-apron/thumb-1.jpg", "prod-apron-1", 800, 800],
  ["images/products/custom-apron/thumb-2.jpg", "prod-apron-2", 800, 800],
  ["images/products/custom-apron/thumb-3.jpg", "prod-apron-3", 800, 800],

  // Products — Tumblers
  ["images/products/custom-tumbler/main.jpg", "prod-tumbler-main", 800, 800],
  ["images/products/custom-tumbler/thumb-1.jpg", "prod-tumbler-1", 800, 800],
  ["images/products/custom-tumbler/thumb-2.jpg", "prod-tumbler-2", 800, 800],
  ["images/products/custom-tumbler/thumb-3.jpg", "prod-tumbler-3", 800, 800],
];

function picsumUrl(seed, w, h) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  console.log(`\n🖼️  Downloading ${images.length} placeholder images...\n`);

  let success = 0;
  let fail = 0;

  for (const [localPath, seed, w, h] of images) {
    const dest = path.join(PUBLIC, localPath);

    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`  ✓ SKIP ${localPath}`);
      success++;
      continue;
    }

    try {
      await download(picsumUrl(seed, w, h), dest);
      const kb = (fs.statSync(dest).size / 1024).toFixed(0);
      console.log(`  ✓ ${localPath} (${kb} KB)`);
      success++;
    } catch (err) {
      console.log(`  ✗ ${localPath} — ${err.message}`);
      fail++;
    }

    await sleep(300);
  }

  console.log(`\n✅ Done: ${success} downloaded, ${fail} failed\n`);
}

main().catch(console.error);
