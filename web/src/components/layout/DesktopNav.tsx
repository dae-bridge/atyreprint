"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, type NavItem, type NavChild } from "@/config/site";
import type { NavCategory } from "./Header";
import type { Product } from "@/types";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import Image from "next/image";

// ─── Helpers ─────────────────────────────────────────────────────────────

function fmtPrice(money: { amount: number; currency: string }): string {
  return `£${(money.amount / 100).toFixed(2)}`;
}

function productImage(product: Product): string {
  return product.images?.[0]?.url || "/images/categories/mega/1.jpg";
}

function productImageAlt(product: Product): string {
  return product.images?.[0]?.alt || product.name;
}

function discountPercent(product: Product): string | null {
  if (
    !product.compareAtPrice ||
    product.compareAtPrice.amount <= product.price.amount
  )
    return null;
  const pct = Math.round(
    ((product.compareAtPrice.amount - product.price.amount) /
      product.compareAtPrice.amount) *
      100,
  );
  return `-${pct}%`;
}

// ─── Hardcoded Fallbacks (used when Firestore has no data) ───────────────

const fallbackFeaturedProducts = [
  {
    title: "Eco-Friendly T-Shirt",
    slug: "custom-printed-tshirt",
    price: "£22.00",
    discountPrice: "£18.00",
    discount: "-18%",
    rating: 5,
    image: "/images/categories/mega/1.jpg",
    badge: "New",
  },
  {
    title: "Premium Hoodie",
    slug: "embroidered-hoodie",
    price: "£45.00",
    discountPrice: "£38.00",
    discount: "-15%",
    rating: 5,
    image: "/images/categories/mega/2.jpg",
  },
  {
    title: "Custom Ceramic Mug",
    slug: "personalised-mug",
    price: "£12.00",
    rating: 4,
    image: "/images/categories/mega/3.jpg",
  },
  {
    title: "Printed Tote Bag",
    slug: "custom-tote-bag",
    price: "£15.00",
    discountPrice: "£12.00",
    discount: "-20%",
    rating: 5,
    image: "/images/categories/mega/4.jpg",
  },
  {
    title: "Embroidered Cap",
    slug: "branded-snapback-cap",
    price: "£25.00",
    rating: 5,
    image: "/images/categories/mega/1.jpg",
  },
];

const fallbackDealCategories = [
  { label: "T-Shirts", image: "/images/categories/mega/1.jpg" },
  { label: "Hoodies", image: "/images/categories/mega/2.jpg" },
  { label: "Mugs", image: "/images/categories/mega/3.jpg" },
  { label: "Tote Bags", image: "/images/categories/mega/4.jpg" },
  { label: "Caps & Hats", image: "/images/categories/mega/3.jpg" },
  { label: "Workwear", image: "/images/categories/mega/1.jpg" },
  { label: "Drinkware", image: "/images/categories/mega/4.jpg" },
  { label: "Accessories", image: "/images/categories/mega/2.jpg" },
];

const fallbackTopRatedProducts = [
  {
    title: "Custom Printed T-Shirt",
    slug: "custom-printed-tshirt",
    price: "£20",
    image: "/images/categories/mega/3.jpg",
  },
  {
    title: "Embroidered Hoodie",
    slug: "embroidered-hoodie",
    price: "£45",
    oldPrice: "£50",
    image: "/images/categories/mega/1.jpg",
  },
  {
    title: "Personalised Mug",
    slug: "personalised-mug",
    price: "£13",
    image: "/images/categories/mega/4.jpg",
  },
  {
    title: "Branded Snapback Cap",
    slug: "branded-snapback-cap",
    price: "£20",
    oldPrice: "£25",
    image: "/images/categories/mega/2.jpg",
  },
  {
    title: "Custom Tote Bag",
    slug: "custom-tote-bag",
    price: "£15",
    image: "/images/categories/mega/4.jpg",
  },
  {
    title: "Custom Glass Can",
    slug: "custom-glass-can",
    price: "£16",
    image: "/images/categories/mega/1.jpg",
  },
];

/* ─── Product-Centric Mega Menu (5 columns) ─── */
const ProductMegaMenu = ({
  products,
  navCategories,
}: {
  products: Product[];
  navCategories: NavCategory[];
}) => {
  // Use Firestore products if available, else fallback
  const hasRealData = products.length > 0;

  // Build category tabs from navCategories (dynamic) with fallback
  const tabs =
    navCategories.length > 0
      ? navCategories.slice(0, 3).map((c) => c.name)
      : ["Clothing", "Giftware", "Accessories"];

  return (
    <div className="absolute left-0 top-full w-full bg-white shadow-2xl border border-border z-50 overflow-hidden rounded-b-xl">
      <div className="py-5 flex justify-center items-center gap-4 border-b border-border/30">
        {tabs.map((tab, i) => (
          <span key={tab}>
            {i > 0 && (
              <span className="w-px h-4 bg-border/60 inline-block mr-4" />
            )}
            <button
              className={cn(
                "text-[16px] font-medium transition-colors",
                i === 0 ? "text-accent" : "text-foreground hover:text-primary",
              )}
            >
              {tab}
            </button>
          </span>
        ))}
      </div>

      <div className="p-8 bg-surface">
        <div className="grid grid-cols-5 gap-5">
          {hasRealData
            ? products.slice(0, 5).map((product) => {
                const discount = discountPercent(product);
                const img = productImage(product);
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg p-4 flex flex-col group transition-all hover:opacity-95"
                  >
                    <div className="relative aspect-square mb-4 bg-surface-alt rounded overflow-hidden">
                      {discount && (
                        <span className="absolute top-2 left-2 z-10 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                          {discount}
                        </span>
                      )}
                      <Link
                        href={`/shop/product/${product.slug}`}
                        className="block relative w-full h-full"
                      >
                        <Image
                          src={img}
                          alt={productImageAlt(product)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col flex-1">
                      <Link href={`/shop/product/${product.slug}`}>
                        <h4 className="text-[13px] font-bold text-foreground line-clamp-2 mb-1 hover:text-primary transition-colors cursor-pointer">
                          {product.name}
                        </h4>
                      </Link>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={cn(
                              "w-3 h-3",
                              i < product.rating
                                ? "text-yellow-400 fill-current"
                                : "text-border",
                            )}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-auto mb-4">
                        {product.compareAtPrice &&
                        product.compareAtPrice.amount > product.price.amount ? (
                          <>
                            <span className="text-accent font-bold text-[15px]">
                              {fmtPrice(product.price)}
                            </span>
                            <span className="text-text-muted text-[12px] line-through">
                              {fmtPrice(product.compareAtPrice)}
                            </span>
                          </>
                        ) : (
                          <span className="text-primary font-bold text-[15px]">
                            {fmtPrice(product.price)}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/personalise-it?product=${product.slug}`}
                        className="w-full py-2 border border-border text-[11px] font-bold text-foreground hover:bg-primary hover:text-white transition-all uppercase rounded text-center block"
                      >
                        Customise
                      </Link>
                    </div>
                  </div>
                );
              })
            : fallbackFeaturedProducts.map((product) => (
                <div
                  key={product.title}
                  className="bg-white rounded-lg p-4 flex flex-col group transition-all hover:opacity-95"
                >
                  <div className="relative aspect-square mb-4 bg-surface-alt rounded overflow-hidden">
                    {product.discount && (
                      <span className="absolute top-2 left-2 z-10 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        {product.discount}
                      </span>
                    )}
                    <Link
                      href={`/shop/product/${product.slug}`}
                      className="block relative w-full h-full"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col flex-1">
                    <Link href={`/shop/product/${product.slug}`}>
                      <h4 className="text-[13px] font-bold text-foreground line-clamp-2 mb-1 hover:text-primary transition-colors cursor-pointer">
                        {product.title}
                      </h4>
                    </Link>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={cn(
                            "w-3 h-3",
                            i < product.rating
                              ? "text-yellow-400 fill-current"
                              : "text-border",
                          )}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-auto mb-4">
                      {product.discountPrice ? (
                        <>
                          <span className="text-accent font-bold text-[15px]">
                            {product.discountPrice}
                          </span>
                          <span className="text-text-muted text-[12px] line-through">
                            {product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-primary font-bold text-[15px]">
                          {product.price}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/personalise-it?product=${product.slug}`}
                      className="w-full py-2 border border-border text-[11px] font-bold text-foreground hover:bg-primary hover:text-white transition-all uppercase rounded text-center block"
                    >
                      Customise
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

const dealCategories = [
  { label: "T-Shirts", image: "/images/categories/mega/1.jpg" },
  { label: "Hoodies", image: "/images/categories/mega/2.jpg" },
  { label: "Mugs", image: "/images/categories/mega/3.jpg" },
  { label: "Tote Bags", image: "/images/categories/mega/4.jpg" },
  { label: "Caps & Hats", image: "/images/categories/mega/3.jpg" },
  { label: "Workwear", image: "/images/categories/mega/1.jpg" },
  { label: "Drinkware", image: "/images/categories/mega/4.jpg" },
  { label: "Accessories", image: "/images/categories/mega/2.jpg" },
];

const topRatedProducts = [
  {
    title: "Custom Printed T-Shirt",
    slug: "custom-printed-tshirt",
    price: "£20",
    image: "/images/categories/mega/3.jpg",
  },
  {
    title: "Embroidered Hoodie",
    slug: "embroidered-hoodie",
    price: "£45",
    oldPrice: "£50",
    image: "/images/categories/mega/1.jpg",
  },
  {
    title: "Personalised Mug",
    slug: "personalised-mug",
    price: "£13",
    image: "/images/categories/mega/4.jpg",
  },
  {
    title: "Branded Snapback Cap",
    slug: "branded-snapback-cap",
    price: "£20",
    oldPrice: "£25",
    image: "/images/categories/mega/2.jpg",
  },
  {
    title: "Custom Tote Bag",
    slug: "custom-tote-bag",
    price: "£15",
    image: "/images/categories/mega/4.jpg",
  },
  {
    title: "Custom Glass Can",
    slug: "custom-glass-can",
    price: "£16",
    image: "/images/categories/mega/1.jpg",
  },
];

/* ─── Shop Mega Menu (Links + Promo Banner) ─── */
const ShopMegaMenu = ({
  item,
  bestSelling,
  trending,
  popular,
}: {
  item: NavItem;
  bestSelling: Product[];
  trending: Product[];
  popular: Product[];
}) => {
  // Build columns: keep "Our Services" from config, replace product columns with Firestore data
  const columns = (item.children || []).map((group) => {
    if (group.label === "Best Selling" && bestSelling.length > 0) {
      return {
        ...group,
        children: bestSelling.map((p) => ({
          label: p.name,
          href: `/shop/product/${p.slug}`,
          badge: p.badge || undefined,
          badgeColor: p.badge ? "bg-accent" : undefined,
        })),
      };
    }
    if (group.label === "Trending" && trending.length > 0) {
      return {
        ...group,
        children: trending.map((p) => ({
          label: p.name,
          href: `/shop/product/${p.slug}`,
          badge: p.badge || undefined,
          badgeColor:
            p.badge === "New"
              ? "bg-blue-400"
              : p.badge
                ? "bg-accent"
                : undefined,
        })),
      };
    }
    if (group.label === "Popular" && popular.length > 0) {
      return {
        ...group,
        children: popular.map((p) => ({
          label: p.name,
          href: `/shop/product/${p.slug}`,
          badge: p.badge || undefined,
          badgeColor: p.badge ? "bg-accent" : undefined,
        })),
      };
    }
    return group;
  });

  return (
    <div className="absolute left-0 top-full w-full bg-white shadow-2xl border border-border z-50 overflow-hidden rounded-b-xl flex">
      {/* Left: Link Columns */}
      <div className="flex-[2] px-10 py-10 grid grid-cols-4 gap-8">
        {columns.map((group) => (
          <div key={group.label} className="space-y-6">
            <div>
              <h3 className="text-[18px] font-medium text-foreground mb-4">
                {group.label}
              </h3>
              {group.children && (
                <ul className="space-y-3">
                  {group.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        className="group/item flex items-center justify-between text-[15px] text-text-secondary hover:text-primary transition-all"
                      >
                        <span>{child.label}</span>
                        {child.badge && (
                          <span
                            className={cn(
                              "text-[8px] font-bold text-white px-1.5 py-0.5 rounded-sm ml-2",
                              child.badgeColor || "bg-primary",
                            )}
                          >
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Right: Promo Banner */}
      <div className="flex-1 p-8">
        <div className="relative h-full w-full bg-[#fef2e8] rounded-xl overflow-hidden p-8 flex flex-col justify-center">
          <div className="relative z-10 space-y-4 max-w-[60%]">
            <span className="inline-block bg-white text-foreground text-[10px] font-bold px-3 py-1 rounded shadow-sm">
              SPECIAL SALE!
            </span>
            <h3 className="text-[28px] font-bold text-foreground leading-tight">
              Up to 30% <br /> OFF
            </h3>
            <Link
              href="/shop"
              className="inline-block text-[13px] font-bold text-foreground border-b-2 border-foreground hover:text-primary hover:border-primary transition-all pb-0.5"
            >
              SHOP NOW
            </Link>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-48 h-48">
            <Image
              src="/images/categories/mega/3.jpg"
              alt="Promo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Deals Mega Menu (Circular Categories + Grid) ─── */
const DealsMegaMenu = ({
  navCategories,
  topRated,
}: {
  navCategories: NavCategory[];
  topRated: Product[];
}) => {
  // Build deal category circles from Firestore categories (flatten parents + children), fallback to hardcoded
  const dynamicCategories =
    navCategories.length > 0
      ? navCategories
          .flatMap((parent) => [
            {
              label: parent.name,
              slug: parent.slug,
              image: null as string | null,
            },
            ...parent.children.map((c) => ({
              label: c.name,
              slug: `${parent.slug}/${c.slug}`,
              image: null as string | null,
            })),
          ])
          .slice(0, 8)
      : null;

  const hasRealTopRated = topRated.length > 0;

  return (
    <div className="absolute left-0 top-full w-full bg-white shadow-2xl border border-border z-50 overflow-hidden rounded-b-xl flex">
      {/* Left: Shop By */}
      <div className="flex-[1.5] p-10">
        <h3 className="text-[22px] font-medium text-foreground text-center mb-8">
          Shop By
        </h3>
        <div className="grid grid-cols-4 gap-x-6 gap-y-10">
          {(dynamicCategories || fallbackDealCategories).map((cat, idx) => (
            <Link
              key={cat.label}
              href={`/shop/${"slug" in cat ? cat.slug : ""}`}
              className="group flex flex-col items-center"
            >
              <div className="relative w-32 h-32 rounded-full border border-border/50 shadow-sm bg-white overflow-hidden flex items-center justify-center mb-3 group-hover:border-accent transition-colors">
                <div className="relative w-24 h-24">
                  <Image
                    src={
                      ("image" in cat && cat.image) ||
                      fallbackDealCategories[
                        idx % fallbackDealCategories.length
                      ].image
                    }
                    alt={cat.label}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
              </div>
              <span className="text-[13px] font-bold text-text-secondary group-hover:text-primary transition-colors text-center">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right: Top Rated */}
      <div className="flex-1 bg-surface p-10 border-l border-border/50">
        <h3 className="text-[22px] font-medium text-foreground text-center mb-8">
          Top Rated
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {hasRealTopRated
            ? topRated.slice(0, 6).map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/product/${product.slug}`}
                  className="group flex items-center gap-4 bg-white p-4 rounded-md transition-all hover:bg-white/95"
                >
                  <div className="relative w-16 h-16 bg-surface-alt rounded overflow-hidden shrink-0">
                    <Image
                      src={productImage(product)}
                      alt={productImageAlt(product)}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[14px] font-bold text-foreground leading-snug line-clamp-2 mb-1">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-accent font-bold text-[14px]">
                        {fmtPrice(product.price)}
                      </span>
                      {product.compareAtPrice &&
                        product.compareAtPrice.amount >
                          product.price.amount && (
                          <span className="text-text-muted text-[11px] line-through">
                            {fmtPrice(product.compareAtPrice)}
                          </span>
                        )}
                    </div>
                  </div>
                </Link>
              ))
            : fallbackTopRatedProducts.map((product) => (
                <Link
                  key={product.title}
                  href={`/shop/product/${product.slug}`}
                  className="group flex items-center gap-4 bg-white p-4 rounded-md transition-all hover:bg-white/95"
                >
                  <div className="relative w-16 h-16 bg-surface-alt rounded overflow-hidden shrink-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[14px] font-bold text-foreground leading-snug line-clamp-2 mb-1">
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-accent font-bold text-[14px]">
                        {product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-text-muted text-[11px] line-through">
                          {product.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Category Mega Menu (dynamic from Firestore) ─── */
const CategoryMegaMenu = ({
  navCategories,
}: {
  navCategories: NavCategory[];
}) => {
  return (
    <div className="absolute left-0 top-full w-full bg-white shadow-2xl border border-border z-50 overflow-hidden rounded-b-xl flex">
      {/* Left: Categories Grid */}
      <div className="flex-[1.4] px-10 py-10 grid grid-cols-3 gap-10">
        {navCategories.map((group) => (
          <div key={group.id} className="space-y-6">
            <div>
              <Link
                href={`/shop/${group.slug}`}
                className="text-[16px] font-medium text-foreground hover:text-primary transition-colors block border-b border-border/50 pb-2 mb-4"
              >
                {group.name}
              </Link>
              {group.children.length > 0 && (
                <ul className="space-y-2.5">
                  {group.children.map((child) => (
                    <li key={child.id}>
                      <Link
                        href={`/shop/${group.slug}/${child.slug}`}
                        className="text-[15px] text-text-secondary hover:text-primary transition-all"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Right: Promo Banner */}
      <div className="flex-1 bg-surface py-10 px-8 border-l border-border/50">
        <div className="relative h-full w-full bg-[#fef2e8] rounded-xl overflow-hidden p-8 flex flex-col justify-center min-h-[200px]">
          <div className="relative z-10 space-y-4">
            <span className="inline-block bg-white text-foreground text-[10px] font-bold px-3 py-1 rounded shadow-sm">
              BROWSE ALL
            </span>
            <h3 className="text-[28px] font-bold text-foreground leading-tight">
              Custom Print <br /> & Embroidery
            </h3>
            <Link
              href="/shop"
              className="inline-block text-[13px] font-bold text-foreground border-b-2 border-foreground hover:text-primary hover:border-primary transition-all pb-0.5"
            >
              SHOP ALL
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
const DropdownMenu = ({ children }: { children: NavChild[] }) => {
  return (
    <div className="absolute left-0 top-full mt-0 w-64 bg-white shadow-xl rounded-b-lg border border-border-light z-50 py-2">
      {children.map((child) => (
        <Link
          key={child.label}
          href={child.href}
          className="block px-5 py-3 hover:bg-surface transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {child.label}
            </span>
            {child.badge && (
              <span
                className={cn(
                  "text-[9px] font-bold text-white px-1.5 py-0.5 rounded italic",
                  child.badgeColor,
                )}
              >
                {child.badge}
              </span>
            )}
          </div>
          {child.description && (
            <span className="block text-xs text-text-muted mt-0.5">
              {child.description}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

/* ─── Individual Nav Item ─── */
const NavItemComponent = ({
  item,
  isActive,
  pathname,
  navCategories,
  featuredProducts,
  bestSellingProducts,
  trendingProducts,
  popularProducts,
  topRatedProducts,
}: {
  item: NavItem;
  isActive: boolean;
  pathname: string;
  navCategories: NavCategory[];
  featuredProducts: Product[];
  bestSellingProducts: Product[];
  trendingProducts: Product[];
  popularProducts: Product[];
  topRatedProducts: Product[];
}) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close mega menu on route change (client-side navigation)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const hasChildren =
    (item.children && item.children.length > 0) || item.megaMenu;

  return (
    <div
      className={cn(
        "h-full flex items-center",
        item.megaMenu ? "static" : "relative",
      )}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={item.href}
        className={cn(
          "relative flex items-center gap-1.5 px-4 py-3 text-[15px] font-medium transition-colors",
          isActive
            ? "text-primary basis-auto"
            : "text-foreground hover:text-primary",
        )}
      >
        <span className="relative">
          {item.label}
          {isActive && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </span>

        {item.badge && (
          <span
            className={cn(
              "text-[8px] font-bold text-white px-1 py-0.5 rounded-sm italic -translate-y-1",
              item.badgeColor,
            )}
          >
            {item.badge}
          </span>
        )}

        {hasChildren && (
          <ChevronDown
            size={12}
            className={cn("transition-transform", open && "rotate-180")}
          />
        )}
      </Link>

      {hasChildren &&
        open &&
        (item.megaMenu ? (
          item.label === "Personalise" ? (
            <ProductMegaMenu
              products={featuredProducts}
              navCategories={navCategories}
            />
          ) : item.label === "Top deals" ? (
            <DealsMegaMenu
              navCategories={navCategories}
              topRated={topRatedProducts}
            />
          ) : item.label === "Shop" ? (
            <ShopMegaMenu
              item={item}
              bestSelling={bestSellingProducts}
              trending={trendingProducts}
              popular={popularProducts}
            />
          ) : (
            <CategoryMegaMenu navCategories={navCategories} />
          )
        ) : (
          <DropdownMenu>{item.children!}</DropdownMenu>
        ))}
    </div>
  );
};

export const DesktopNav = ({
  navCategories = [],
  featuredProducts = [],
  bestSellingProducts = [],
  trendingProducts = [],
  popularProducts = [],
  topRatedProducts = [],
}: {
  navCategories?: NavCategory[];
  featuredProducts?: Product[];
  bestSellingProducts?: Product[];
  trendingProducts?: Product[];
  popularProducts?: Product[];
  topRatedProducts?: Product[];
}) => {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center h-full">
      {navLinks.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname === item.href;
        return (
          <NavItemComponent
            key={item.label}
            item={item}
            isActive={isActive}
            pathname={pathname}
            navCategories={navCategories}
            featuredProducts={featuredProducts}
            bestSellingProducts={bestSellingProducts}
            trendingProducts={trendingProducts}
            popularProducts={popularProducts}
            topRatedProducts={topRatedProducts}
          />
        );
      })}
    </nav>
  );
};
