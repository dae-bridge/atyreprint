import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { Heart, Globe, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Our Story | AtyrePrint",
  description:
    "Learn about AtyrePrint — 5+ years of premium custom printing and embroidery. Serving the UK, Africa and Europe with quality craftsmanship and passion.",
};

const values = [
  {
    icon: Heart,
    title: "Passion for Quality",
    description:
      "Every stitch, every print — we treat each item as if it were our own. No shortcuts, no compromises.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "From London to Lagos, our products reach customers across the UK, Africa and Europe.",
  },
  {
    icon: Award,
    title: "Expert Craftsmanship",
    description:
      "5+ years of experience refining our techniques to deliver professional, lasting results every time.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Your vision drives our work. We collaborate closely with every client to bring ideas to life.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About AtyrePrint"
        subtitle="Custom clothing & gifts that speak for you — crafted with care in London, shipped worldwide."
        badge="Our Story"
      />

      {/* Story section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/about/team.jpg"
                alt="AtyrePrint team at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                AtyrePrint was born from a simple belief: everyone deserves to
                wear and own products that tell their story. What started as a
                small embroidery workshop in London has grown into a
                full-service custom printing and embroidery business serving
                customers across three continents.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                With over five years of hands-on experience, we specialise in
                transforming blank products into meaningful, personalised items
                — from corporate uniforms and branded merchandise to
                one-of-a-kind gifts and event memorabilia.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed">
                Based in Notting Hill, London, our team combines modern printing
                technology with traditional embroidery craft to deliver results
                that exceed expectations. Every order, whether it&apos;s one mug
                or a thousand t-shirts, receives the same attention to detail.
              </p>
            </div>
          </div>

          {/* Workshop gallery */}
          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="relative rounded-xl overflow-hidden aspect-[3/2]">
              <Image
                src="/images/about/workshop.jpg"
                alt="AtyrePrint production workshop"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 50vw"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-[3/2]">
              <Image
                src="/images/about/products-showcase.jpg"
                alt="AtyrePrint product showcase"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {siteConfig.trustStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-secondary mb-1">
                  {stat.value}
                </p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              What Drives Us
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground mt-2">
              Our Values
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-xl border border-border-light p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-foreground mb-4">
            Let&apos;s Create Something Together
          </h2>
          <p className="text-text-secondary mb-8">
            Have a project in mind? Whether it&apos;s a single item or a bulk
            order, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
