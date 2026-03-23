"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { TopBar } from "./TopBar";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);

  return (
    <>
      {/* Top Bar */}
      <TopBar />

      {/* Main Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>

              <Link href="/" className="flex items-center gap-2">
                {/* Logo mark */}
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold text-primary">
                    {siteConfig.name}
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <DesktopNav />

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                className="p-2.5 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-surface"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/account"
                className="p-2.5 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-surface hidden sm:flex"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
              <Link
                href="/cart"
                className="relative p-2.5 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-surface"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {totalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-secondary text-primary-dark text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems() > 99 ? "99+" : totalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
