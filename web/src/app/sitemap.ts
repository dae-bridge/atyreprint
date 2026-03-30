import type { MetadataRoute } from "next";

const BASE_URL = "https://atyreprint.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ─── Static pages ──────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faqs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/deals`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/personalise-it`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // ─── Service pages ─────────────────────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = [
    "printing",
    "embroidery",
    "screen-printing",
    "design",
    "bulk",
  ].map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ─── Shop category pages ──────────────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = [
    "clothing",
    "clothing/t-shirts",
    "clothing/hoodies",
    "clothing/sweatshirts",
    "clothing/polo-shirts",
    "accessories",
    "accessories/mugs",
    "accessories/tote-bags",
    "accessories/caps",
    "accessories/aprons",
    "accessories/glass-cans",
    "accessories/tumblers",
    "accessories/pillowcases",
    "home-living",
  ].map((path) => ({
    url: `${BASE_URL}/shop/${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ─── Legal / info pages ────────────────────────────────────────────
  const legalPages: MetadataRoute.Sitemap = [
    "terms",
    "privacy-policy",
    "shipping",
    "returns",
  ].map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.3,
  }));

  return [...staticPages, ...servicePages, ...categoryPages, ...legalPages];
}
