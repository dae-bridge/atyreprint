import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy & Cookies | AtyrePrint",
  description:
    "Read about how AtyrePrint collects, uses and protects your personal data. GDPR compliant.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy & Cookies"
        subtitle="How we collect, use and protect your information."
        badge="Legal"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <p className="text-sm text-text-muted">
            Last updated: 1 January 2026
          </p>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              1. Who We Are
            </h2>
            <p className="text-text-secondary leading-relaxed">
              AtyrePrint (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;)
              operates the website atyreprint.com. We are committed to
              protecting your privacy and handling your personal data
              transparently and lawfully in accordance with the UK GDPR.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              2. Information We Collect
            </h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              We may collect the following types of data:
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              {[
                "Name, email address, phone number (when you contact us or place an order)",
                "Shipping and billing address",
                "Order history and preferences",
                "Files uploaded to our design tool (artwork, logos, images)",
                "Technical data: IP address, browser type, device info, pages visited",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              3. How We Use Your Data
            </h2>
            <ul className="space-y-2 text-text-secondary text-sm">
              {[
                "To process and fulfil your orders",
                "To send order confirmations, shipping updates and invoices",
                "To respond to enquiries and provide customer support",
                "To improve our website, products and services",
                "To send promotional emails (only with your consent — you can unsubscribe anytime)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              4. Cookies
            </h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              We use cookies to improve your browsing experience. These include:
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              {[
                "Essential cookies: Required for the site to function (basket, session)",
                "Analytics cookies: Help us understand how visitors use the site (Google Analytics)",
                "Preference cookies: Remember your settings and choices",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-text-secondary leading-relaxed mt-3">
              You can manage or disable cookies in your browser settings at any
              time.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              5. Data Sharing
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We do not sell your personal data. We may share data with trusted
              third parties solely for order fulfilment (e.g. delivery couriers,
              payment processors). All third parties are GDPR compliant.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              6. Your Rights
            </h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Under the UK GDPR, you have the right to:
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              {[
                "Access the personal data we hold about you",
                "Request correction of inaccurate data",
                "Request deletion of your data",
                "Object to or restrict processing",
                "Withdraw consent at any time",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-text-secondary leading-relaxed mt-3">
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:info@atyreprint.com"
                className="text-primary font-medium hover:text-primary-light transition-colors"
              >
                info@atyreprint.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              7. Contact
            </h2>
            <p className="text-text-secondary leading-relaxed">
              For any privacy-related questions, please contact us at{" "}
              <a
                href="mailto:info@atyreprint.com"
                className="text-primary font-medium hover:text-primary-light transition-colors"
              >
                info@atyreprint.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
