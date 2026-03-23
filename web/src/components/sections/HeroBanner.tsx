"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/images/hero/hero-1.jpg",
    alt: "Custom printed t-shirts and hoodies",
    overline: "Premium Print-on-Demand & Embroidery",
    title: "Custom Clothing & Gifts",
    highlight: "that Speak for You",
    description:
      "5+ years crafting premium custom products — t-shirts, hoodies, mugs, tote bags & more. Serving the UK, Africa & Europe.",
    cta: { label: "Shop Now", href: "/shop" },
    ctaSecondary: { label: "Personalise It", href: "/personalise-it" },
  },
  {
    image: "/images/hero/hero-2.jpg",
    alt: "Embroidered corporate workwear",
    overline: "Professional Embroidery Services",
    title: "Your Logo, Stitched",
    highlight: "to Perfection",
    description:
      "Premium embroidery for workwear, uniforms, team apparel & personalised gifts. Durable, detailed, and professionally finished.",
    cta: { label: "Our Services", href: "/services" },
    ctaSecondary: { label: "Get a Quote", href: "/contact" },
  },
  {
    image: "/images/hero/hero-3.jpg",
    alt: "Personalised mugs and accessories",
    overline: "Design Your Own",
    title: "Make It Personal,",
    highlight: "Make It Yours",
    description:
      "Use our online design tool to create one-of-a-kind products. Upload your artwork, add text, and preview instantly.",
    cta: { label: "Start Designing", href: "/personalise-it" },
    ctaSecondary: { label: "Browse Products", href: "/shop" },
  },
];

export const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide backgrounds */}
      {slides.map((s, i) => (
        <div
          key={s.alt}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Content */}
      <Container className="relative z-10 py-20">
        <div className="max-w-2xl">
          <p
            key={`overline-${current}`}
            className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 animate-fade-in-up"
          >
            {slide.overline}
          </p>
          <h1
            key={`title-${current}`}
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6 animate-fade-in-up animation-delay-100"
          >
            {slide.title}{" "}
            <span className="text-secondary">{slide.highlight}</span>
          </h1>
          <p
            key={`desc-${current}`}
            className="text-lg text-white/80 max-w-lg mb-8 leading-relaxed animate-fade-in-up animation-delay-200"
          >
            {slide.description}
          </p>
          <div
            key={`cta-${current}`}
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300"
          >
            <Link
              href={slide.cta.href}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-secondary text-primary-dark font-semibold rounded-lg hover:bg-secondary-light transition-colors text-lg"
            >
              {slide.cta.label}
            </Link>
            <Link
              href={slide.ctaSecondary.href}
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors text-lg"
            >
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </Container>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-secondary"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
