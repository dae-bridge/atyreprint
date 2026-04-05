"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TopBar } from "./TopBar";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { CartDrawer } from "./CartDrawer";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/ui/SearchBar";
import { Search, ShoppingBag, User, Menu, Heart, X } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { SiteSettings, Product } from "@/types";

export interface NavCategory {
  id: string;
  name: string;
  slug: string;
  children: { id: string; name: string; slug: string }[];
}

/** Lightweight product shape for nav mega menus (serialized from server) */
export interface NavProduct {
  name: string;
  slug: string;
  price: { amount: number; currency: string };
  compareAtPrice: { amount: number; currency: string } | null;
  images: { url: string; alt: string }[];
  badge: string | null;
  rating: number;
  featured: boolean;
}

interface HeaderProps {
  navCategories?: NavCategory[];
  settings: SiteSettings;
  featuredProducts?: Product[];
  bestSellingProducts?: Product[];
  trendingProducts?: Product[];
  popularProducts?: Product[];
  topRatedProducts?: Product[];
}

export const Header = ({
  navCategories = [],
  settings,
  featuredProducts = [],
  bestSellingProducts = [],
  trendingProducts = [],
  popularProducts = [],
  topRatedProducts = [],
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const wishlistTotal = useWishlistStore((s) => s.totalItems);
  const { user } = useAuth();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 145);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopBar settings={settings} />

      <header className="bg-white">
        {/* Middle Level: Logo, Search, Actions */}
        <Container>
          <div className="flex items-center justify-between py-2 md:py-3 gap-3 md:gap-8 relative">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 text-foreground hover:text-primary transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>

              <Link href="/" className="flex items-center">
                <div className="relative w-[140px] h-[45px] sm:w-[180px] sm:h-[55px] md:w-[220px] md:h-[70px] lg:w-[260px] lg:h-[85px]">
                  <Image
                    src="/logo.png"
                    alt={`${settings.siteName} Logo`}
                    fill
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Center: Search Bar (desktop) */}
            <div className="hidden md:flex flex-1 max-w-3xl bg-surface-alt rounded-md overflow-hidden border border-border group focus-within:border-primary transition-colors h-12">
              <SearchBar
                className="flex-1 h-full"
                inputClassName="w-full px-4 py-2 text-[15px] h-full"
              />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-4 flex-shrink-0">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-1.5 text-foreground hover:text-primary transition-colors"
                aria-label="Search"
              >
                {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              {/* Account */}
              <Link
                href={user ? "/account" : "/login"}
                className="flex items-center gap-3 p-1 text-foreground hover:text-primary transition-colors"
              >
                <div className="flex items-center justify-center">
                  <User size={22} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
                </div>
                <div className="hidden lg:flex flex-col text-[11px] leading-tight text-nowrap">
                  <span className="text-text-secondary font-medium">
                    {user ? "My" : "Sign In"}
                  </span>
                  <span className="font-bold text-[15px]">Account</span>
                </div>
              </Link>

              {/* Favourites */}
              <Link
                href="/wishlist"
                className="relative p-1.5 text-foreground hover:text-primary transition-colors hidden sm:block"
                aria-label="Favourites"
              >
                <Heart
                  size={22}
                  strokeWidth={1.5}
                  className="sm:w-[26px] sm:h-[26px]"
                />
                <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-accent text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {hydrated ? wishlistTotal() : 0}
                </span>
              </Link>

              {/* My Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 lg:gap-3 p-1 text-foreground hover:text-primary transition-colors cursor-pointer group"
              >
                <div className="relative">
                  <ShoppingBag
                    size={22}
                    strokeWidth={1.5}
                    className="group-hover:scale-110 transition-transform sm:w-[26px] sm:h-[26px]"
                  />
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-accent text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {hydrated ? totalItems() : 0}
                  </span>
                </div>
                <div className="hidden lg:flex flex-col text-[11px] leading-tight text-nowrap items-start">
                  <span className="text-text-secondary font-medium whitespace-nowrap">
                    £{hydrated ? totalPrice().toFixed(2) : "0.00"}
                  </span>
                  <span className="font-bold text-[15px]">My Cart</span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (expandable) */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300",
              mobileSearchOpen ? "max-h-14 pb-3" : "max-h-0",
            )}
          >
            <div className="flex bg-surface-alt rounded-md overflow-hidden border border-border h-11">
              <SearchBar
                className="flex-1 h-full"
                inputClassName="flex-1 px-4 text-sm"
                compact
              />
            </div>
          </div>
        </Container>

        {/* Bottom Level: Desktop Navigation */}
        <div
          className={cn(
            "hidden lg:block border-t border-border bg-white transition-all duration-300",
            isSticky
              ? "fixed top-0 left-0 w-full z-50 shadow-md transform-gpu"
              : "relative",
          )}
        >
          <Container>
            <div className="flex items-center justify-between relative h-full">
              <DesktopNav
                navCategories={navCategories}
                featuredProducts={featuredProducts}
                bestSellingProducts={bestSellingProducts}
                trendingProducts={trendingProducts}
                popularProducts={popularProducts}
                topRatedProducts={topRatedProducts}
              />

              {/* Today's Deal */}
              <Link
                href="/deals"
                className="flex items-center gap-2 py-3 text-foreground hover:text-primary transition-colors font-semibold text-[15px]"
              >
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary text-primary">
                  <span className="text-[10px] font-bold">%</span>
                </div>
                Today&apos;s Deal
              </Link>
            </div>
          </Container>
        </div>
      </header>

      {/* Mobile Nav */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navCategories={navCategories}
        settings={settings}
        bestSellingProducts={bestSellingProducts}
        trendingProducts={trendingProducts}
        popularProducts={popularProducts}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        freeShippingThreshold={settings.freeShippingThreshold}
      />
    </>
  );
};
