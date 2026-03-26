import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services — Embroidery, Printing & Design | AtyrePrint",
  description:
    "Professional embroidery, printing and graphic design services. We personalise clothing, drinkware, accessories and more with your logos, text and artwork.",
};

const services = [
  {
    title: "Embroidery",
    href: "/services/embroidery",
    image: "/images/services/embroidery.jpg",
    description:
      "Personalise fabric items with logos, names, or custom designs. Our precision embroidery adds a premium, professional finish to any garment.",
    features: [
      "Corporate logos & branding",
      "Names & initials",
      "Custom artwork & monograms",
      "Multi-colour thread options",
      "Bulk order discounts",
    ],
  },
  {
    title: "Printing",
    href: "/services/printing",
    image: "/images/services/printing.jpg",
    description:
      "Vibrant, long-lasting prints on clothing, glassware, ceramics, leather and more. From single pieces to bulk runs, we deliver crisp, vivid results.",
    features: [
      "DTG (Direct-to-Garment)",
      "Heat transfer vinyl",
      "Sublimation printing",
      "Full-colour photo prints",
      "Durable wash-resistant finish",
    ],
  },
  {
    title: "Graphic Design",
    href: "/services/design",
    image: "/images/services/design.jpg",
    description:
      "Need help with artwork? Our in-house designers bring your vision to life with stunning graphics, logos and layouts — ready for print or embroidery.",
    features: [
      "Logo creation & refinement",
      "Print-ready artwork",
      "Vectorisation of hand-drawn designs",
      "Mockups & proofs before production",
      "Unlimited revisions on approval",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="From concept to finished product — we handle embroidery, printing and design with expert craftsmanship."
        badge="What We Do"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const isReversed = index % 2 !== 0;

              return (
                <div
                  key={service.title}
                  className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}
                >
                  {/* Image block */}
                  <div className="flex-shrink-0 w-full md:w-2/5">
                    <div className="relative rounded-2xl overflow-hidden aspect-[3/2]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="font-jost text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-foreground"
                        >
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-light transition-colors"
                    >
                      Learn More <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-20 bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="font-jost text-2xl md:text-3xl font-bold mb-3">
              Ready to get started?
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Whether it&apos;s a single cap or 1,000 corporate polo shirts,
              we&apos;re here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/personalise-it"
                className="inline-flex items-center px-6 py-3 bg-secondary text-primary-dark font-semibold rounded-lg hover:bg-secondary-light transition-colors"
              >
                Design Your Own
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
