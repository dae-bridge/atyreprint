"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks, type NavItem } from "@/config/site";
import type { NavCategory } from "./Header";
import type { SiteSettings, Product } from "@/types";
import {
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Search,
  Heart,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Accordion nav item for mobile ─── */
const MobileNavItem = ({
  item,
  onClose,
  isActive,
}: {
  item: NavItem;
  onClose: () => void;
  isActive: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="border-b border-border-light last:border-b-0">
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          onClick={onClose}
          className={cn(
            "flex-1 py-3 px-5 text-[15px] font-medium transition-colors",
            isActive
              ? "text-primary font-semibold bg-accent/10"
              : "text-foreground hover:text-primary",
          )}
        >
          <span className="flex items-center gap-2">
            {item.label}
            {item.badge && (
              <span
                className={cn(
                  "text-[8px] font-bold text-white px-1.5 py-0.5 rounded-sm",
                  item.badgeColor || "bg-primary",
                )}
              >
                {item.badge}
              </span>
            )}
          </span>
        </Link>
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-3 text-text-muted hover:text-primary transition-colors"
            aria-label={`Expand ${item.label}`}
          >
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform duration-200",
                expanded && "rotate-180",
              )}
            />
          </button>
        )}
      </div>

      {/* Sub-items */}
      {hasChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="bg-surface/50 pb-2">
            {item.children!.map((child, childIdx) => (
              <div key={`${child.label}-${childIdx}`}>
                <Link
                  href={child.href}
                  onClick={onClose}
                  className="flex items-center gap-2 px-7 py-2.5 text-sm text-text-secondary hover:text-primary hover:bg-white/50 transition-colors"
                >
                  <ChevronRight size={12} className="text-text-muted" />
                  <span className="font-medium">{child.label}</span>
                </Link>
                {/* Third level */}
                {child.children?.map((sub, subIdx) => (
                  <Link
                    key={`${sub.href}-${subIdx}`}
                    href={sub.href}
                    onClick={onClose}
                    className="block px-12 py-2 text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Mobile Nav Overlay ─── */
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navCategories?: NavCategory[];
  settings: SiteSettings;
  bestSellingProducts?: Product[];
  trendingProducts?: Product[];
  popularProducts?: Product[];
}

export const MobileNav = ({
  isOpen,
  onClose,
  navCategories = [],
  settings,
  bestSellingProducts = [],
  trendingProducts = [],
  popularProducts = [],
}: MobileNavProps) => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-out lg:hidden flex flex-col shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-white">
          <Link href="/" onClick={onClose} className="flex items-center">
            <div className="relative w-[120px] h-[38px]">
              <Image
                src="/logo.png"
                alt={settings.siteName}
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-foreground transition-colors rounded-full hover:bg-surface"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-border-light">
          <div className="flex bg-surface-alt rounded-lg overflow-hidden border border-border h-10">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 text-sm bg-transparent outline-none text-foreground placeholder-text-muted"
            />
            <button className="px-3 text-text-secondary hover:text-primary transition-colors">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex border-b border-border-light">
          <Link
            href="/login"
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-text-secondary hover:text-primary transition-colors border-r border-border-light"
          >
            <User size={16} />
            <span className="font-medium">Account</span>
          </Link>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <Heart size={16} />
            <span className="font-medium">Wishlist</span>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto overscroll-contain">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            // Replace hardcoded Categories children with dynamic data
            let dynamicItem = item;
            if (item.label === "Categories" && navCategories.length > 0) {
              dynamicItem = {
                ...item,
                children: navCategories.map((cat) => ({
                  label: cat.name,
                  href: `/shop/${cat.slug}`,
                  children: cat.children.map((child) => ({
                    label: child.name,
                    href: `/shop/${cat.slug}/${child.slug}`,
                  })),
                })),
              };
            }
            // Overlay Shop product columns with Firestore data
            if (item.label === "Shop" && item.children) {
              dynamicItem = {
                ...dynamicItem,
                children: dynamicItem.children?.map((group) => {
                  if (
                    group.label === "Best Selling" &&
                    bestSellingProducts.length > 0
                  ) {
                    return {
                      ...group,
                      children: bestSellingProducts.map((p) => ({
                        label: p.name,
                        href: `/shop/product/${p.slug}`,
                      })),
                    };
                  }
                  if (
                    group.label === "Trending" &&
                    trendingProducts.length > 0
                  ) {
                    return {
                      ...group,
                      children: trendingProducts.map((p) => ({
                        label: p.name,
                        href: `/shop/product/${p.slug}`,
                      })),
                    };
                  }
                  if (group.label === "Popular" && popularProducts.length > 0) {
                    return {
                      ...group,
                      children: popularProducts.map((p) => ({
                        label: p.name,
                        href: `/shop/product/${p.slug}`,
                      })),
                    };
                  }
                  return group;
                }),
              };
            }
            return (
              <MobileNavItem
                key={item.label}
                item={dynamicItem}
                onClose={onClose}
                isActive={isActive}
              />
            );
          })}
        </nav>

        {/* Contact footer */}
        <div className="p-4 border-t border-border bg-surface space-y-2">
          <a
            href={`tel:${settings.contact.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2.5 py-1.5 text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <Phone size={14} className="shrink-0" />
            <span>{settings.contact.phone}</span>
          </a>
          <a
            href={`mailto:${settings.contact.email}`}
            className="flex items-center gap-2.5 py-1.5 text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <Mail size={14} className="shrink-0" />
            <span>{settings.contact.email}</span>
          </a>
          <div className="flex items-start gap-2.5 py-1.5 text-sm text-text-muted">
            <MapPin size={14} className="shrink-0 mt-0.5" />
            <span className="text-xs leading-relaxed">
              {settings.contact.address}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
