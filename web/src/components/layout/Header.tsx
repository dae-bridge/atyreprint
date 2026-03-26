"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TopBar } from "./TopBar";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Container } from "@/components/ui/Container";
import { Search, ShoppingBag, User, Menu, Heart, ChevronDown } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);

  return (
    <>
      <TopBar />

      <header className="bg-white">
        {/* Middle Level: Logo, Search, Actions */}
        <Container>
          <div className="flex items-center justify-between py-3 gap-8 relative">
            {/* Left: Logo */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>

              <Link href="/" className="flex items-center">
                <div className="relative w-[260px] h-[85px]">
                  <Image
                    src="/images/icons/atyreprint-logo.png"
                    alt={`${siteConfig.name} Logo`}
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-3xl bg-surface-alt rounded-md overflow-hidden border border-border group focus-within:border-primary transition-colors h-12">
              <div className="flex items-center px-4 py-2 border-r border-border cursor-pointer hover:bg-surface transition-colors min-w-[140px] h-full">
                <span className="text-[15px] font-medium text-text-secondary mr-2">All Categories</span>
                <ChevronDown size={14} className="text-text-muted" />
              </div>
              <div className="flex-1 flex items-center relative h-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 text-[15px] bg-transparent outline-none text-foreground placeholder-text-muted h-full"
                />
                <button className="px-5 text-text-secondary hover:text-primary transition-colors h-full flex items-center justify-center">
                  <Search size={22} />
                </button>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 lg:gap-4 flex-shrink-0">
              {/* Account */}
              <Link
                href="/account"
                className="flex items-center gap-3 p-1 text-foreground hover:text-primary transition-colors"
              >
                <div className="flex items-center justify-center">
                  <User size={28} strokeWidth={1.5} />
                </div>
                <div className="hidden lg:flex flex-col text-[11px] leading-tight text-nowrap">
                  <span className="text-text-secondary font-medium">Sign In</span>
                  <span className="font-bold text-[15px]">Account</span>
                </div>
              </Link>

              {/* Favourites */}
              <Link
                href="/wishlist"
                className="relative p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Favourites"
              >
                <Heart size={26} strokeWidth={1.5} />
                <span className="absolute top-1 right-0.5 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  0
                </span>
              </Link>

              {/* My Cart */}
              <Link
                href="/cart"
                className="flex items-center gap-3 p-1 text-foreground hover:text-primary transition-colors"
              >
                <div className="relative">
                  <ShoppingBag size={26} strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1.5 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {totalItems()}
                  </span>
                </div>
                <div className="hidden lg:flex flex-col text-[11px] leading-tight text-nowrap">
                  <span className="text-text-secondary font-medium whitespace-nowrap">£0.00</span>
                  <span className="font-bold text-[15px]">My Cart</span>
                </div>
              </Link>
            </div>
          </div>
        </Container>

        {/* Bottom Level: Desktop Navigation */}
        <div className="hidden lg:block border-t border-border">
          <Container>
            <div className="flex items-center justify-between relative h-full">
              <DesktopNav />
              
              {/* Today's Deal */}
              <Link 
                href="/deals" 
                className="flex items-center gap-2 py-3 text-foreground hover:text-primary transition-colors font-semibold text-[15px]"
              >
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary text-primary">
                  <span className="text-[10px] font-bold">%</span>
                </div>
                Today's Deal
              </Link>
            </div>
          </Container>
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
