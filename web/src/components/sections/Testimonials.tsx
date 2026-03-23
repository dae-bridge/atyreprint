"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "London, UK",
    rating: 5,
    avatar: "/images/testimonials/customer-1.jpg",
    text: "The embroidery quality on our team hoodies was outstanding. AtyrePrint really went above and beyond with the detail. Will definitely order again!",
  },
  {
    name: "James K.",
    location: "Manchester, UK",
    rating: 5,
    avatar: "/images/testimonials/customer-2.jpg",
    text: "Ordered custom mugs for our office and they turned out brilliantly. The colours are vibrant and the turnaround was incredibly fast.",
  },
  {
    name: "Amara O.",
    location: "Lagos, Nigeria",
    rating: 5,
    avatar: "/images/testimonials/customer-3.jpg",
    text: "I've used AtyrePrint for multiple bulk orders shipped to Africa. The quality is consistent and the communication is always excellent.",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <Container>
        <SectionHeading
          overline="Testimonials"
          title="What Our Customers Say"
          description="Real feedback from people who trust us with their custom orders"
        />

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {testimonials.map((item, index) => (
            <ScrollReveal key={item.name} variant="fade-up" delay={index * 150}>
              <div className="bg-white rounded-xl p-6 border border-border-light">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-muted">{item.location}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
