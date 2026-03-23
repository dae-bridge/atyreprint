import { siteConfig } from "@/config/site";
import { Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import Link from "next/link";

export const TopBar = () => {
  return (
    <div className="bg-primary-dark text-white text-sm hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
        {/* Left - Promo text */}
        <p className="text-white/80">
          Free UK shipping on orders over £50 —{" "}
          <Link href="/shop" className="text-secondary hover:text-secondary-light underline">
            Shop Now
          </Link>
        </p>

        {/* Right - Contact & Social */}
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
          >
            <Mail size={14} />
            <span>{siteConfig.contact.email}</span>
          </a>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
          >
            <Phone size={14} />
            <span>{siteConfig.contact.phone}</span>
          </a>
          <div className="flex items-center gap-3 ml-2 pl-3 border-l border-white/20">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/70 hover:text-white transition-colors"
            >
              <FacebookIcon size={14} />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/70 hover:text-white transition-colors"
            >
              <InstagramIcon size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
