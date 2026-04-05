/* ═══════════════════════════════════════════════════════════════════════════
 * Settings & CMS Data Fetching
 * Reads site settings and homepage CMS from Firestore with fallbacks
 * ═══════════════════════════════════════════════════════════════════════════ */

import { getSingleton } from "@/lib/firestore";
import type { SiteSettings, HomepageCMS } from "@/types";
import { siteConfig, footerLinks } from "@/config/site";

// ─── Defaults (fallback when Firestore is empty) ─────────────────────────

const defaultSettings: SiteSettings = {
  siteName: siteConfig.name,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  url: siteConfig.url,
  ogImage: null,
  contact: siteConfig.contact,
  social: {
    facebook: siteConfig.social.facebook,
    instagram: siteConfig.social.instagram,
  },
  businessHours: siteConfig.businessHours,
  topBarMessage: "Free shipping world wide for all orders over £100",
  topBarLink: { label: "Shop Now", href: "/shop" },
  freeShippingThreshold: { amount: 10000, currency: "GBP" },
  navLinks: [],
  footerLinks: {
    quickLinks: [...footerLinks.quickLinks],
    helpAndSupport: [...footerLinks.helpAndSupport],
    legalAndPolicies: [...footerLinks.legalAndPolicies],
  },
  updatedAt: null as unknown as string,
};

const defaultHomepageCMS: HomepageCMS = {
  heroSlides: [],
  featureBadges: [],
  promoBanners: [],
  trustStats: [],
  brandLogos: [],
  updatedAt: "",
};

// ─── Fetchers ────────────────────────────────────────────────────────────

/** Fetch site settings from Firestore, falling back to defaults */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await getSingleton<SiteSettings>("settings", "general");
    if (!settings) return defaultSettings;
    return { ...defaultSettings, ...settings };
  } catch {
    return defaultSettings;
  }
}

/** Fetch homepage CMS from Firestore, falling back to defaults */
export async function getHomepageCMS(): Promise<HomepageCMS> {
  try {
    const cms = await getSingleton<HomepageCMS>("cms", "homepage");
    if (!cms) return defaultHomepageCMS;
    return { ...defaultHomepageCMS, ...cms };
  } catch {
    return defaultHomepageCMS;
  }
}
