import Link from "next/link";
import { siteConfig, footerLinks } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const FooterLinkColumn = ({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) => (
  <div>
    <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
      {title}
    </h3>
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-sm text-white/70 hover:text-secondary transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main Footer */}
      <Container className="py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About / Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary-dark font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold text-white">
                  {siteConfig.name}
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              Premium print-on-demand &amp; embroidery services. Custom
              clothing, drinkware, accessories &amp; gifts — delivering quality
              across the UK, Africa &amp; Europe.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary/20 transition-colors"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary/20 transition-colors"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <FooterLinkColumn
            title="Quick Links"
            links={footerLinks.quickLinks}
          />

          {/* Help & Support */}
          <FooterLinkColumn
            title="Help & Support"
            links={footerLinks.helpAndSupport}
          />

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-2.5 text-sm text-white/70 hover:text-secondary transition-colors"
                >
                  <Phone size={16} className="mt-0.5 shrink-0" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-2.5 text-sm text-white/70 hover:text-secondary transition-colors"
                >
                  <Mail size={16} className="mt-0.5 shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                {siteConfig.contact.address}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <span>
                  Mon–Fri: {siteConfig.businessHours.weekdays}
                  <br />
                  Weekends: {siteConfig.businessHours.weekend}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/50">
            {footerLinks.legalAndPolicies.map((link) => (
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
