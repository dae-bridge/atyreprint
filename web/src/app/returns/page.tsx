import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Returns Policy | AtyrePrint",
  description:
    "Read AtyrePrint's returns policy for custom printed and embroidered products. Learn about our quality guarantee and how we handle issues.",
};

export default function ReturnsPage() {
  return (
    <>
      <PageHeader
        title="Returns Policy"
        subtitle="Our commitment to quality and your satisfaction."
        badge="Policy"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-jost text-xl font-bold text-foreground mb-3">
              Custom Products
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Because every item we produce is custom-made to your
              specifications, we are unable to accept returns for change of
              mind. We strongly encourage you to review your artwork proof
              carefully before approving production.
            </p>
          </div>

          <div>
            <h2 className="font-jost text-xl font-bold text-foreground mb-3">
              Our Quality Guarantee
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              If your order arrives with a defect, incorrect design, wrong
              product, or any error attributable to us, we will:
            </p>
            <ul className="space-y-2">
              {[
                "Reprint or remake the item at no extra charge, or",
                "Issue a full refund for the affected item(s)",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-text-secondary"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-jost text-xl font-bold text-foreground mb-3">
              How to Report an Issue
            </h2>
            <ol className="space-y-3 list-decimal list-inside text-text-secondary leading-relaxed">
              <li>
                <strong className="text-foreground">
                  Contact us within 48 hours
                </strong>{" "}
                of receiving your order.
              </li>
              <li>
                <strong className="text-foreground">Provide photos</strong>{" "}
                clearly showing the defect or issue.
              </li>
              <li>
                Include your{" "}
                <strong className="text-foreground">order number</strong> and a
                brief description of the problem.
              </li>
            </ol>
            <p className="text-text-secondary mt-4">
              Email:{" "}
              <a
                href="mailto:info@atyreprint.com"
                className="text-primary font-medium hover:text-primary-light transition-colors"
              >
                info@atyreprint.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-jost text-xl font-bold text-foreground mb-3">
              Damaged During Delivery
            </h2>
            <p className="text-text-secondary leading-relaxed">
              If your package arrives damaged during transit, please contact us
              immediately with photos. We&apos;ll work with the courier to
              resolve the issue and send a replacement at no cost to you.
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 text-center">
            <p className="text-foreground font-medium mb-2">
              Need to report an issue?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
