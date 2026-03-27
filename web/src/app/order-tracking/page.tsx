import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Search, Package, Truck, MapPin, CheckCircle2, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Track Your Order | AtyrePrint",
  description:
    "Track your AtyrePrint order status. Enter your order number to see real-time updates on your custom printed or embroidered products.",
};

export default function OrderTrackingPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Order Tracking"
        subtitle="Check the status of your order."
        badge="Track Order"
      />

      <section className="py-16 md:py-20 bg-[#f8f9fa]">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left Column: Tracking Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl border border-border p-8 md:p-10">
                <h2 className="text-xl font-bold font-jost uppercase tracking-widest text-[#1a3014] mb-2 border-b border-border pb-4">
                  Track Your Order
                </h2>
                <p className="text-sm text-text-secondary mb-8 mt-4">
                  Enter your order number and email address to view your order status and delivery updates.
                </p>

                <form className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="orderNumber"
                      className="text-[11px] font-bold uppercase tracking-wider text-text-secondary"
                    >
                      Order Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="orderNumber"
                      name="orderNumber"
                      type="text"
                      required
                      className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                      placeholder="e.g. AP-20260327-001"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="trackEmail"
                      className="text-[11px] font-bold uppercase tracking-wider text-text-secondary"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="trackEmail"
                      name="trackEmail"
                      type="email"
                      required
                      className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                      placeholder="The email used when placing your order"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#a9cb5b] text-white font-bold rounded uppercase tracking-widest text-sm hover:opacity-95 transition-all shadow-lg shadow-[#a9cb5b]/20 flex items-center justify-center gap-3"
                  >
                    <Search size={18} />
                    Track Order
                  </button>
                </form>

                <p className="text-[11px] text-text-secondary mt-6 text-center leading-relaxed">
                  Order tracking is available once your order has been dispatched. For urgent enquiries, please{" "}
                  <a
                    href="/contact"
                    className="text-[#a9cb5b] font-semibold hover:underline transition-colors"
                  >
                    contact us
                  </a>.
                </p>
              </div>
            </div>

            {/* Right Column: Info & Help */}
            <div className="lg:col-span-5 space-y-6">

              {/* How It Works */}
              <div className="bg-white rounded-xl border border-border p-8">
                <h3 className="text-lg font-bold font-jost uppercase tracking-widest text-[#1a3014] mb-6 border-b border-border pb-4">
                  How It Works
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: CheckCircle2, title: "Order Placed", desc: "Your order is confirmed and being prepared." },
                    { icon: Package, title: "Processing", desc: "We're custom printing/embroidering your items." },
                    { icon: Truck, title: "Shipped", desc: "Your order is on its way! Track it in real-time." },
                    { icon: MapPin, title: "Delivered", desc: "Your items have arrived. Enjoy!" },
                  ].map((step, idx) => (
                    <div key={step.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#a9cb5b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <step.icon size={18} className="text-[#a9cb5b]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">{step.title}</h4>
                        <p className="text-[12px] text-text-secondary mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help? */}
              <div className="bg-gradient-to-br from-[#1a3014] to-[#2d4a24] rounded-xl p-8 text-white">
                <h3 className="text-lg font-bold font-jost uppercase tracking-widest mb-4">
                  Need Help?
                </h3>
                <p className="text-sm text-white/70 mb-6 leading-relaxed">
                  Can&apos;t find your order or need assistance? Our support team is here to help.
                </p>
                <div className="space-y-3">
                  <a href="mailto:support@atyreprint.com" className="flex items-center gap-3 text-sm text-white/90 hover:text-[#a9cb5b] transition-colors">
                    <Mail size={16} />
                    support@atyreprint.com
                  </a>
                  <a href="tel:+447309503295" className="flex items-center gap-3 text-sm text-white/90 hover:text-[#a9cb5b] transition-colors">
                    <Phone size={16} />
                    +44 7309 503295
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
