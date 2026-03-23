"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, type NavItem, type NavChild } from "@/config/site";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Mega Menu (multi-column with sub-items) ─── */
const MegaMenu = ({ item }: { item: NavItem }) => {
  return (
    <div className="absolute left-0 top-full w-screen bg-white shadow-xl border-t border-border z-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-8">
          {item.children?.map((group) => (
            <div key={group.label}>
              <Link
                href={group.href}
                className="text-sm font-bold text-primary uppercase tracking-wider hover:text-primary-light transition-colors"
              >
                {group.label}
              </Link>
              {group.children && (
                <ul className="mt-3 space-y-2">
                  {group.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        className="text-sm text-text-secondary hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Featured promo spot */}
          <div className="bg-surface rounded-xl p-6 flex flex-col justify-center items-center text-center">
            <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">
              New Arrivals
            </p>
            <p className="text-foreground font-bold text-lg mb-3">
              Custom Hoodies
            </p>
            <Link
              href="/shop/clothing/hoodies"
              className="text-sm text-primary font-semibold hover:text-primary-light transition-colors"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Dropdown menu (simple list) ─── */
const DropdownMenu = ({ children }: { children: NavChild[] }) => {
  return (
    <div className="absolute left-0 top-full mt-0 w-64 bg-white shadow-xl rounded-b-lg border border-border-light z-50 py-2">
      {children.map((child) => (
        <Link
          key={child.label}
          href={child.href}
          className="block px-5 py-3 hover:bg-surface transition-colors"
        >
          <span className="text-sm font-medium text-foreground">
            {child.label}
          </span>
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
}: {
  item: NavItem;
  isActive: boolean;
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

  const hasChildren = item.children && item.children.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={item.href}
        className={cn(
          "relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
          item.featured
            ? "text-secondary hover:text-secondary-light font-bold"
            : isActive
              ? "text-primary font-semibold"
              : "text-foreground hover:text-primary",
        )}
      >
        {item.label}
        {hasChildren && (
          <ChevronDown
            size={14}
            className={cn("transition-transform", open && "rotate-180")}
          />
        )}
        {isActive && (
          <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-accent rounded-full" />
        )}
      </Link>

      {hasChildren &&
        open &&
        (item.megaMenu ? (
          <MegaMenu item={item} />
        ) : (
          <DropdownMenu>{item.children!}</DropdownMenu>
        ))}
    </div>
  );
};

export const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navLinks.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <NavItemComponent key={item.label} item={item} isActive={isActive} />
        );
      })}
    </nav>
  );
};
