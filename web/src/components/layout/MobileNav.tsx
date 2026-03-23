"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks, siteConfig, type NavItem } from "@/config/site";
import { X, ChevronDown, ChevronRight, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Accordion nav item for mobile ─── */
const MobileNavItem = ({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="border-b border-border-light">
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          onClick={onClose}
          className={cn(
            "flex-1 py-3.5 px-4 text-base font-medium transition-colors",
            item.featured
              ? "text-secondary font-bold"
              : "text-foreground hover:text-primary"
          )}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-3 text-text-muted hover:text-primary transition-colors"
            aria-label={`Expand ${item.label}`}
          >
            <ChevronDown
              size={18}
              className={cn("transition-transform", expanded && "rotate-180")}
            />
          </button>
        )}
      </div>

      {/* Sub-items */}
      {hasChildren && expanded && (
        <div className="bg-surface pb-2">
          {item.children!.map((child) => (
            <div key={child.label}>
              <Link
                href={child.href}
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-2.5 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                <ChevronRight size={14} />
                <span className="font-medium">{child.label}</span>
              </Link>
              {child.description && (
                <p className="px-10 pb-1 text-xs text-text-muted">
                  {child.description}
                </p>
              )}
              {/* Third level */}
              {child.children?.map((sub) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  onClick={onClose}
                  className="block px-10 py-2 text-sm text-text-muted hover:text-primary transition-colors"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Mobile Nav Overlay ─── */
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 lg:hidden flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              {siteConfig.name}
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-foreground transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto">
          {navLinks.map((item) => (
            <MobileNavItem key={item.label} item={item} onClose={onClose} />
          ))}
        </nav>

        {/* Contact footer */}
        <div className="p-4 border-t border-border bg-surface">
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 py-2 text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <Phone size={16} />
            {siteConfig.contact.phone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 py-2 text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <Mail size={16} />
            {siteConfig.contact.email}
          </a>
        </div>
      </div>
    </>
  );
};
