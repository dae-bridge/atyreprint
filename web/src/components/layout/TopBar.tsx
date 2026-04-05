import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { SiteSettings } from "@/types";

interface TopBarProps {
  settings: SiteSettings;
}

export const TopBar = ({ settings }: TopBarProps) => {
  const message =
    settings.topBarMessage ||
    "Free shipping world wide for all orders over £100";
  const ctaLink = settings.topBarLink;

  return (
    <div className="bg-primary text-white text-xs sm:text-sm hidden md:block border-b border-white/10">
      <Container>
        <div className="flex items-center justify-between h-9 relative">
          {/* Left - Promo text */}
          <div className="flex items-center gap-1">
            <span>{message}</span>
            {ctaLink && (
              <Link
                href={ctaLink.href}
                className="font-bold underline hover:text-accent transition-colors ml-1"
              >
                {ctaLink.label}
              </Link>
            )}
          </div>

          {/* Right - Links */}
          <div className="hidden lg:flex items-center">
            {[
              { label: "About Us", href: "/about" },
              { label: "Contact Us", href: "/contact" },
              { label: "Blog", href: "/blog" },
              { label: "FAQs", href: "/faqs" },
            ].map((link, idx, arr) => (
              <div key={link.label} className="flex items-center">
                <Link
                  href={link.href}
                  className="hover:text-accent transition-colors px-3 py-1"
                >
                  {link.label}
                </Link>
                {idx < arr.length - 1 && (
                  <span className="h-3 w-px bg-white/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
