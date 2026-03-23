import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Shipping & Delivery Information | AtyrePrint",
  description:
    "Learn about AtyrePrint's shipping options, delivery times, and international shipping to the UK, Europe and Africa.",
};

export default function ShippingPage() {
  return (
    <>
      <PageHeader
        title="Shipping & Delivery"
        subtitle="Everything you need to know about how we get your custom products to you."
        badge="Delivery Info"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* UK Shipping */}
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-4">
              UK Shipping
            </h2>
            <div className="bg-white border border-border-light rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-surface">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Service
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Estimated Delivery
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  <tr>
                    <td className="px-6 py-3 text-foreground">
                      Standard Delivery
                    </td>
                    <td className="px-6 py-3 text-text-secondary">
                      3–5 working days
                    </td>
                    <td className="px-6 py-3 text-foreground font-medium">
                      £3.99 (Free over £50)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-foreground">
                      Express Delivery
                    </td>
                    <td className="px-6 py-3 text-text-secondary">
                      1–2 working days
                    </td>
                    <td className="px-6 py-3 text-foreground font-medium">
                      £7.99
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* International */}
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground mb-4">
              International Shipping
            </h2>
            <div className="bg-white border border-border-light rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-surface">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Region
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Estimated Delivery
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  <tr>
                    <td className="px-6 py-3 text-foreground">Europe</td>
                    <td className="px-6 py-3 text-text-secondary">
                      5–10 working days
                    </td>
                    <td className="px-6 py-3 text-foreground font-medium">
                      From £9.99
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-foreground">Africa</td>
                    <td className="px-6 py-3 text-text-secondary">
                      7–14 working days
                    </td>
                    <td className="px-6 py-3 text-foreground font-medium">
                      From £14.99
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-foreground">Rest of World</td>
                    <td className="px-6 py-3 text-text-secondary">
                      10–21 working days
                    </td>
                    <td className="px-6 py-3 text-foreground font-medium">
                      Calculated at checkout
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Production time note */}
          <div className="bg-surface rounded-xl p-6">
            <h3 className="font-bold text-foreground mb-2">
              Important: Production Time
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              All delivery estimates above are from the date of dispatch, not
              from the date of order. Custom products typically require 3–5
              working days for production before shipping. You&apos;ll receive a
              tracking number via email once your order has been dispatched.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
