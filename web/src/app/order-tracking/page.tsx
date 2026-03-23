import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Track Your Order | AtyrePrint",
  description:
    "Track your AtyrePrint order status. Enter your order number to see real-time updates on your custom printed or embroidered products.",
};

export default function OrderTrackingPage() {
  return (
    <>
      <PageHeader
        title="Order Tracking"
        subtitle="Check the status of your order."
        badge="Track Order"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
            <h2 className="text-lg font-bold text-foreground mb-2">
              Enter Your Order Number
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              You can find your order number in the confirmation email we sent
              you.
            </p>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Order Number *
                </label>
                <input
                  id="orderNumber"
                  name="orderNumber"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="e.g. AP-20260101-001"
                />
              </div>
              <div>
                <label
                  htmlFor="trackEmail"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Email Address *
                </label>
                <input
                  id="trackEmail"
                  name="trackEmail"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="The email used when ordering"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Track Order
              </button>
            </form>

            <p className="text-xs text-text-muted mt-4 text-center">
              Order tracking will be available once your order has been
              dispatched. For urgent enquiries, please{" "}
              <a
                href="/contact"
                className="text-primary font-medium hover:text-primary-light transition-colors"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
