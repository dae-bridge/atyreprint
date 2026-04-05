import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Printing Services | AtyrePrint",
  description:
    "Professional printing services — DTG, heat transfer, sublimation and UV printing on clothing, drinkware, accessories and more. Vibrant, long-lasting results.",
};

const methods = [
  {
    title: "DTG (Direct-to-Garment)",
    description:
      "Inkjet technology prints directly onto fabric with incredible detail and unlimited colours. Best for cotton garments and photographic designs.",
    best: "Best for: T-shirts, hoodies, tote bags",
  },
  {
    title: "Heat Transfer Vinyl",
    description:
      "Cut vinyl designs are heat-pressed onto garments for bold, solid-colour graphics. Excellent durability and a smooth finish.",
    best: "Best for: Names, numbers, simple logos",
  },
  {
    title: "Sublimation Printing",
    description:
      "Dye is infused into polyester or polymer-coated surfaces for full-wrap, edge-to-edge colour. Seamless, fade-resistant results.",
    best: "Best for: Mugs, pillowcases, sportswear",
  },
  {
    title: "UV Printing",
    description:
      "UV-cured inks are printed directly onto hard surfaces like glass, metal, and wood. Crisp, durable, and scratch-resistant.",
    best: "Best for: Glass cans, tumblers, phone cases",
  },
];

const process = [
  {
    step: "1",
    title: "Choose Your Product",
    description: "Browse our range or tell us what you need printed.",
  },
  {
    step: "2",
    title: "Upload Your Design",
    description:
      "Send us your artwork or use our design tool to create one from scratch.",
  },
  {
    step: "3",
    title: "Proof & Approval",
    description: "We send a digital proof for you to review before printing.",
  },
  {
    step: "4",
    title: "Print & Ship",
    description:
      "Your items are printed, quality-checked, and dispatched to your door.",
  },
];

export default function PrintingPage() {
  return (
    <>
      <PageHeader
        title="Printing Services"
        subtitle="Vibrant, long-lasting prints on clothing, drinkware, accessories and more. From single pieces to bulk runs."
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
            <span className="text-foreground font-medium">Printing</span>
          </nav>

          {/* Intro */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/services/printing.jpg"
                alt="Printing service"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-jost text-2xl md:text-3xl font-bold text-foreground mb-4">
                Professional Printing for Every Surface
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Whether it&apos;s a name on a mug, a full-colour photo on a
                t-shirt, or a company logo on 500 tumblers — we deliver crisp,
                vivid, wash-resistant results every time.
              </p>
              <ul className="space-y-3">
                {[
                  "Full-colour photo-quality prints",
                  "No minimum order requirement",
                  "Fast 2–5 day turnaround",
                  "Durable, wash & scratch-resistant",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <Check size={18} className="text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Print Methods */}
          <div className="mb-16">
            <h2 className="font-jost text-2xl font-bold text-foreground text-center mb-10">
              Our Printing Methods
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {methods.map((method) => (
                <div key={method.title} className="bg-surface rounded-xl p-6">
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {method.description}
                  </p>
                  <p className="text-xs font-semibold text-primary">
                    {method.best}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h2 className="font-jost text-2xl font-bold text-foreground text-center mb-10">
              How It Works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="font-jost text-2xl md:text-3xl font-bold mb-3">
              Ready to start printing?
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Upload your design or get in touch for a free quote. No minimum
              order.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/personalise-it"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-primary-dark font-semibold rounded-lg hover:bg-secondary-light transition-colors"
              >
                Design Your Own <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
