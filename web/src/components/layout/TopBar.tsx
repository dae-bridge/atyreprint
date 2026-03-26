import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const TopBar = () => {
  return (
    <div className="bg-primary text-white text-sm hidden md:block border-b border-white/10">
      <Container>
        <div className="flex items-center justify-between h-9 relative">
          {/* Left - Promo text */}
          <div className="flex items-center gap-1">
            <span>Free shipping world wide for all orders over $199</span>
            <Link
              href="/shop"
              className="font-bold underline hover:text-accent transition-colors ml-1"
            >
              Shop Now
            </Link>
          </div>

          {/* Right - Links */}
          <div className="flex items-center">
            {siteConfig.topBarLinks?.map((link, idx) => (
              <div key={link.label} className="flex items-center">
                <Link
                  href={link.href}
                  className="hover:text-accent transition-colors px-3 py-1"
                >
                  {link.label}
                </Link>
                {idx < siteConfig.topBarLinks.length - 1 && (
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
