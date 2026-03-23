import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Embroidery Services | AtyrePrint",
  description:
    "Professional embroidery services for clothing, caps, bags and more. Corporate logos, names, custom artwork — precision stitching with a premium finish.",
};

const features = [
  {
    title: "Corporate Logos & Branding",
    description:
      "Digitise your company logo for crisp, consistent embroidery across uniforms, caps, and corporate gifts.",
  },
  {
    title: "Names & Initials",
    description:
      "Personalise garments with embroidered names, initials, or monograms — perfect for gifts and team wear.",
  },
  {
    title: "Custom Artwork",
    description:
      "From intricate designs to simple motifs, we convert any artwork into beautiful embroidered detail.",
  },
  {
    title: "Multi-Colour Thread",
    description:
      "Choose from hundreds of thread colours to match your brand palette precisely.",
  },
];

const process = [
  {
    step: "1",
    title: "Submit Your Design",
    description:
      "Upload your logo or artwork, or share your ideas and we'll create a design for you.",
  },
  {
    step: "2",
    title: "Digitisation & Proof",
    description:
      "Our team digitises your design for embroidery and sends a visual mockup for approval.",
  },
  {
    step: "3",
    title: "Production",
    description:
      "Once approved, we embroider your items with precision multi-head machines.",
  },
  {
    step: "4",
    title: "Quality Check & Delivery",
    description:
      "Every item is inspected before packing and dispatching to you.",
  },
];

export default function EmbroideryPage() {
  return (
    <>
      <PageHeader
        title="Embroidery Services"
        subtitle="Premium precision embroidery for clothing, accessories, and corporate branding. Built to last, designed to impress."
        badge="Our Services"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-foreground font-medium">Embroidery</span>
          </nav>

          {/* Intro */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Choose Our Embroidery?
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Embroidery adds a premium, professional touch to any garment.
                Unlike printing, embroidered designs are raised and textured —
                they look and feel high-end, and they&apos;re incredibly durable
                through washes and wear.
              </p>
              <ul className="space-y-3">
                {[
                  "Up to 15,000 stitches per design",
                  "Minimum order of just 1 item",
                  "Fast turnaround (3–5 working days)",
                  "Bulk order discounts available",
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
                src="/images/services/embroidery.jpg"
                alt="Embroidery service"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground text-center mb-10">
              What We Offer
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="bg-surface rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground text-center mb-10">
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
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold mb-3">
              Ready to get your design embroidered?
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Send us your artwork or idea and we&apos;ll provide a free mockup
              and quote.
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
