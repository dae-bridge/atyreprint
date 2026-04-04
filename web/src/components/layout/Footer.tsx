import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { SiteSettings } from "@/types";

const FooterLinkColumn = ({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) => (
  <div>
    <h3 className="text-[15px] font-bold uppercase tracking-wider text-white mb-4">
      {title}
    </h3>
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-[15px] text-white/70 hover:text-secondary transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

interface FooterProps {
  settings: SiteSettings;
}

export const Footer = ({ settings }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const {
    contact,
    social,
    businessHours,
    footerLinks: links,
    siteName,
  } = settings;

  const quickLinks = links?.quickLinks || [];
  const helpAndSupport = links?.helpAndSupport || [];
  const legalAndPolicies = links?.legalAndPolicies || [];

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main Footer */}
      <Container className="py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* About / Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-[150px] h-[42px] md:w-[180px] md:h-[50px] brightness-0 invert opacity-90">
                <Image
                  src="/logo.png"
                  alt={`${siteName} Logo`}
                  fill
                  sizes="(max-width: 768px) 150px, 180px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm md:text-[15px] text-white/70 leading-relaxed mb-5">
              Premium print-on-demand &amp; embroidery services. Custom
              clothing, drinkware, accessories &amp; gifts — delivering quality
              across the UK, Africa &amp; Europe.
            </p>
            <div className="flex items-center gap-3">
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary/20 transition-colors"
                >
                  <FacebookIcon size={16} />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary/20 transition-colors"
                >
                  <InstagramIcon size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          {quickLinks.length > 0 && (
            <FooterLinkColumn title="Quick Links" links={quickLinks} />
          )}

          {/* Help & Support */}
          {helpAndSupport.length > 0 && (
            <FooterLinkColumn title="Help & Support" links={helpAndSupport} />
          )}

          {/* Contact Info */}
          <div>
            <h3 className="text-[15px] font-bold uppercase tracking-wider text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-start gap-2.5 text-sm md:text-[15px] text-white/70 hover:text-secondary transition-colors"
                  >
                    <Phone size={16} className="mt-0.5 shrink-0" />
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-2.5 text-sm md:text-[15px] text-white/70 hover:text-secondary transition-colors break-all"
                  >
                    <Mail size={16} className="mt-0.5 shrink-0" />
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-2.5 text-sm md:text-[15px] text-white/70">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  {contact.address}
                </li>
              )}
              <li className="flex items-start gap-2.5 text-xs md:text-sm text-white/70">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <span>
                  Mon–Fri: {businessHours.weekdays}
                  <br />
                  Weekends: {businessHours.weekend}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container className="py-4 md:py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            &copy; {currentYear} {siteName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs text-white/50">
            {legalAndPolicies.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
};
