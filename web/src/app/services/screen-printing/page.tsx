import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Screen Printing Services | AtyrePrint",
  description:
    "High-quality screen printing for bulk apparel, uniforms, and promotional merchandise. Vibrant, long-lasting colours at competitive per-unit pricing.",
};

const advantages = [
  {
    title: "Vibrant, Long-Lasting Colours",
    description:
      "Screen printing uses thick layers of ink that sit on the fabric surface, producing bold, vibrant colours that stay bright wash after wash.",
  },
  {
    title: "Cost-Effective at Scale",
    description:
      "Once the screens are set up, each additional print costs very little — making screen printing the most economical option for large orders.",
  },
  {
    title: "Works on Almost Any Fabric",
    description:
      "Cotton, polyester, blends, nylon — screen printing works on nearly every fabric type and garment style.",
  },
  {
    title: "Specialty Inks Available",
    description:
      "Choose from standard, metallic, glow-in-the-dark, puff, and discharge inks for truly unique results.",
  },
];

const bestFor = [
  "T-shirts & hoodies",
  "Uniforms & workwear",
  "Tote bags & aprons",
  "Event merchandise",
  "Sports & teamwear",
  "Promotional giveaways",
];

const process = [
  {
    step: "1",
    title: "Submit Your Design",
    description:
      "Send your artwork or logo. We'll advise on colour separations and screen setup.",
  },
  {
    step: "2",
    title: "Screen Preparation",
    description:
      "We create individual screens for each colour in your design using photo-emulsion techniques.",
  },
  {
    step: "3",
    title: "Printing & Curing",
    description:
      "Ink is pushed through the screens onto each garment, then heat-cured for permanent adhesion.",
  },
  {
    step: "4",
    title: "Quality Check & Delivery",
    description:
      "Every item is inspected for colour accuracy, alignment, and finish before dispatch.",
  },
];

export default function ScreenPrintingPage() {
  return (
    <>
      <PageHeader
        title="Screen Printing"
        subtitle="Bold, vibrant, durable — the gold standard for high-volume custom printing on apparel and accessories."
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
            <span className="text-foreground font-medium">Screen Printing</span>
          </nav>

          {/* Intro */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/services/screen-printing.jpg"
                alt="Screen printing process"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-jost text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Choose Screen Printing?
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Screen printing (also known as silk screening) is the go-to
                method for large-volume apparel orders. It delivers the boldest
                colours, the most durable finish, and the lowest per-unit cost
                for runs of 25 pieces or more.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Each colour in your design is applied through a separate screen,
                building up layers of ink for a rich, textured result that
                simply can&apos;t be matched by digital methods at scale.
              </p>
            </div>
          </div>

          {/* Advantages Grid */}
          <div className="mb-16">
            <h2 className="font-jost text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Advantages of Screen Printing
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {advantages.map((a) => (
                <div
                  key={a.title}
                  className="bg-white border border-border rounded-xl p-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={16} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-jost font-bold text-foreground mb-1">
                        {a.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {a.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best For */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-16">
            <h2 className="font-jost text-2xl font-bold text-foreground mb-6 text-center">
              Screen Printing Is Best For
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {bestFor.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-text-secondary"
                >
                  <Check size={16} className="text-primary shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h2 className="font-jost text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Our Process
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((p) => (
                <div key={p.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
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

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-jost text-2xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-text-secondary mb-6 max-w-xl mx-auto">
              Send us your design and quantity details for a free, no-obligation
              quote. Minimum order: 25 pieces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Get a Quote <ArrowRight size={16} />
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
