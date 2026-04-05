import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  Check,
  ArrowRight,
  Package2,
  Users,
  CalendarCheck,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Bulk Ordering | AtyrePrint",
  description:
    "Competitive bulk pricing on custom printed and embroidered clothing, uniforms, workwear, and promotional merchandise. Dedicated account support for large orders.",
};

const benefits = [
  {
    title: "Volume Discounts",
    description:
      "The more you order, the more you save. Our tiered pricing structure rewards larger quantities with significant per-unit savings.",
    icon: TrendingDown,
  },
  {
    title: "Dedicated Account Manager",
    description:
      "Every bulk client gets a dedicated point of contact who manages your project from quote to delivery.",
    icon: Users,
  },
  {
    title: "Fast Turnaround",
    description:
      "We prioritise bulk orders with dedicated production slots. Most orders ship within 7–10 working days.",
    icon: CalendarCheck,
  },
  {
    title: "Quality Guaranteed",
    description:
      "Every item is inspected before dispatch. If anything isn't perfect, we'll replace it at no extra cost.",
    icon: ShieldCheck,
  },
];

const useCases = [
  {
    title: "Corporate & Workwear",
    description:
      "Branded uniforms, polo shirts, jackets, and hi-vis for your team.",
    items: [
      "Embroidered logos",
      "Name badges",
      "Department colour coding",
      "PPE & hi-vis options",
    ],
  },
  {
    title: "Events & Festivals",
    description:
      "Custom t-shirts, tote bags, and lanyards for conferences, charity runs, and festivals.",
    items: [
      "Event branding",
      "Sponsor logos",
      "Crew & volunteer kits",
      "Giveaway merchandise",
    ],
  },
  {
    title: "Schools & Universities",
    description:
      "Leavers hoodies, society merch, sports kits, and staff uniforms.",
    items: [
      "Leavers hoodies",
      "Society t-shirts",
      "Sports team kits",
      "Staff polo shirts",
    ],
  },
  {
    title: "Promotional Merchandise",
    description:
      "Branded mugs, bags, pens, and accessories to market your business.",
    items: [
      "Printed mugs & bottles",
      "Branded tote bags",
      "Custom caps & beanies",
      "Gift sets",
    ],
  },
];

const process = [
  {
    step: "1",
    title: "Get in Touch",
    description:
      "Tell us what you need — products, quantities, decoration method, and deadline.",
  },
  {
    step: "2",
    title: "Receive Your Quote",
    description:
      "We'll send a detailed quote with pricing tiers, mockups, and delivery timeline.",
  },
  {
    step: "3",
    title: "Approve & Produce",
    description:
      "Once you approve the proof, we begin production with regular progress updates.",
  },
  {
    step: "4",
    title: "Quality Check & Delivery",
    description:
      "Every item is inspected, packed, and delivered to your door — or multiple locations.",
  },
];

export default function BulkOrderingPage() {
  return (
    <>
      <PageHeader
        title="Bulk Ordering"
        subtitle="Competitive pricing, dedicated support, and fast turnaround for large orders — from 25 to 10,000+ pieces."
        badge="Our Services"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-text-secondary mb-10">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/services"
              className="hover:text-primary transition-colors"
            >
              Services
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Bulk Ordering</span>
          </nav>

          {/* Intro */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="font-jost text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Order in Bulk with AtyrePrint?
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Whether you&apos;re outfitting a team of 25 or ordering 10,000
                promotional items, our bulk service is designed to make large
                orders simple, affordable, and stress-free. We handle everything
                from design to delivery.
              </p>
              <p className="text-text-secondary leading-relaxed">
                All decoration methods are available for bulk orders —
                embroidery, DTG printing, heat transfer, sublimation, and screen
                printing. Our team will recommend the best option for your
                product and budget.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/services/bulk-ordering.jpg"
                alt="Bulk ordering — stacked custom printed t-shirts"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="font-jost text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Benefits of Bulk Ordering
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-white border border-border rounded-xl p-6 text-center"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <b.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-jost font-bold text-foreground mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="font-jost text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Popular Bulk Orders
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {useCases.map((uc) => (
                <div
                  key={uc.title}
                  className="bg-white border border-border rounded-xl p-6"
                >
                  <h3 className="font-jost text-lg font-bold text-foreground mb-2">
                    {uc.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {uc.description}
                  </p>
                  <ul className="space-y-2">
                    {uc.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <Check
                          size={16}
                          className="text-accent mt-0.5 shrink-0"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h2 className="font-jost text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              How It Works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((p) => (
                <div key={p.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {p.step}
                  </div>
                  <h3 className="font-jost font-bold text-foreground mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Note */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center mb-16">
            <Package2 size={32} className="text-primary mx-auto mb-4" />
            <h3 className="font-jost text-xl font-bold text-foreground mb-2">
              Minimum Order: 25 Pieces
            </h3>
            <p className="text-text-secondary max-w-xl mx-auto mb-6">
              Bulk pricing starts at 25 units. The more you order, the lower the
              per-unit cost. Contact us for a free, no-obligation quote tailored
              to your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Request a Quote <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
