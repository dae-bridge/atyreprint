import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Graphic Design Services | AtyrePrint",
  description:
    "In-house graphic design for print and embroidery. Logo creation, artwork vectorisation, mockups and proofs — we bring your ideas to life.",
};

const offerings = [
  {
    title: "Logo Creation & Refinement",
    description:
      "Start from scratch or refine an existing logo. We create clean, professional logos optimised for both print and embroidery.",
  },
  {
    title: "Print-Ready Artwork",
    description:
      "We prepare your designs in the correct format, resolution, and colour profile for flawless results on any product.",
  },
  {
    title: "Vectorisation",
    description:
      "Got a hand-drawn sketch or low-res image? We convert it into a crisp, scalable vector file ready for production.",
  },
  {
    title: "Mockups & Proofs",
    description:
      "See exactly how your design will look on the final product before we go to print. Unlimited revisions on approval.",
  },
];

const process = [
  {
    step: "1",
    title: "Share Your Vision",
    description:
      "Tell us what you need — a new logo, artwork for a product, or a full design concept.",
  },
  {
    step: "2",
    title: "Initial Concepts",
    description:
      "Our designers create 2–3 initial concepts based on your brief for you to review.",
  },
  {
    step: "3",
    title: "Revisions & Refinement",
    description:
      "We refine the chosen concept based on your feedback until it's perfect.",
  },
  {
    step: "4",
    title: "Final Files",
    description:
      "You receive print-ready files in all formats you need (PNG, SVG, PDF, etc.).",
  },
];

export default function DesignPage() {
  return (
    <>
      <PageHeader
        title="Graphic Design"
        subtitle="Our in-house designers bring your vision to life with stunning graphics, logos and layouts — ready for print or embroidery."
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
            <span className="text-foreground font-medium">Design</span>
          </nav>

          {/* Intro */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="font-jost text-2xl md:text-3xl font-bold text-foreground mb-4">
                Design That Delivers
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Great products start with great design. Whether you need a logo
                from scratch, artwork prepared for printing, or a hand-drawn
                sketch turned into a vector — we&apos;ve got you covered.
              </p>
              <ul className="space-y-3">
                {[
                  "Unlimited revisions on approval",
                  "Quick 24–48 hour turnaround",
                  "Print & embroidery optimised files",
                  "Affordable flat-rate pricing",
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
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/services/design.jpg"
                alt="Graphic design service"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Offerings Grid */}
          <div className="mb-16">
            <h2 className="font-jost text-2xl font-bold text-foreground text-center mb-10">
              What We Offer
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {offerings.map((offering) => (
                <div key={offering.title} className="bg-surface rounded-xl p-6">
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {offering.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {offering.description}
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
              Need design help?
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Share your idea and we&apos;ll create something brilliant. Free
              initial consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/personalise-it"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-primary-dark font-semibold rounded-lg hover:bg-secondary-light transition-colors"
              >
                Try Our Design Tool <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
