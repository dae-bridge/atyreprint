import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions | AtyrePrint",
  description:
    "Read AtyrePrint's terms and conditions governing the use of our website and custom printing services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before placing an order."
        badge="Legal"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <p className="text-sm text-text-muted">
            Last updated: 1 January 2026
          </p>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              1. Overview
            </h2>
            <p className="text-text-secondary leading-relaxed">
              These Terms &amp; Conditions govern your use of the AtyrePrint
              website (atyreprint.com) and the purchase of products and services
              from us. By using our website or placing an order, you agree to be
              bound by these terms.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              2. Custom Products
            </h2>
            <p className="text-text-secondary leading-relaxed">
              All products are custom-made to your specifications. By approving
              artwork proofs, you confirm you are satisfied with the design,
              colours, text and placement. We are not responsible for errors in
              customer-supplied artwork or approved proofs.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              3. Pricing & Payment
            </h2>
            <p className="text-text-secondary leading-relaxed">
              All prices are listed in GBP (£) and include VAT where applicable.
              Prices may change without prior notice, but confirmed orders will
              be fulfilled at the price shown at time of purchase. Payment is
              taken at the point of order.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              4. Intellectual Property
            </h2>
            <p className="text-text-secondary leading-relaxed">
              You confirm that any artwork, logos, text or images you submit for
              customisation are either your original work or you have permission
              to use them. AtyrePrint is not liable for copyright infringement
              caused by customer-supplied content.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              5. Delivery
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Delivery times are estimates and not guaranteed. We are not liable
              for delays caused by couriers, customs, or events beyond our
              control. See our{" "}
              <a
                href="/shipping"
                className="text-primary font-medium hover:text-primary-light transition-colors"
              >
                Shipping &amp; Delivery
              </a>{" "}
              page for full details.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              6. Returns & Refunds
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Custom-made products cannot be returned for change of mind. If
              there is a manufacturing defect or error on our part, we will
              reprint or refund. See our{" "}
              <a
                href="/returns"
                className="text-primary font-medium hover:text-primary-light transition-colors"
              >
                Returns Policy
              </a>{" "}
              for full details.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              7. Limitation of Liability
            </h2>
            <p className="text-text-secondary leading-relaxed">
              To the maximum extent permitted by law, AtyrePrint shall not be
              liable for any indirect, incidental, or consequential damages
              arising from your use of our website or products.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              8. Changes to These Terms
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We may update these terms from time to time. Continued use of our
              website after changes are published constitutes acceptance of the
              updated terms.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              9. Governing Law
            </h2>
            <p className="text-text-secondary leading-relaxed">
              These terms are governed by the laws of England and Wales. Any
              disputes will be subject to the exclusive jurisdiction of the
              English courts.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-3">
              10. Contact
            </h2>
            <p className="text-text-secondary leading-relaxed">
              For questions about these terms, email us at{" "}
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
