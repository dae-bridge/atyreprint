"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/types";

const defaultSlides = [
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

/** Map CMS HeroSlide[] to internal slide format */
function mapCMSSlides(cmsSlides: HeroSlide[]) {
  return cmsSlides
    .filter((s) => s.active)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((s) => ({
      image: s.image?.url || "/images/hero/hero-1.jpg",
      alt: s.image?.alt || s.title,
      overline: s.overline,
      title: s.title,
      highlight: s.highlight,
      description: s.description,
      cta: s.primaryCta,
      ctaSecondary: s.secondaryCta,
    }));
}

interface HeroBannerProps {
  heroSlides?: HeroSlide[];
}

/* Tile grid config */
const COLS = 8;
const ROWS = 6;
const TRANSITION_MS = 1000;

/** Build a flat list of tile positions with staggered delays (wave from centre) */
const buildTiles = () => {
  const tiles: { col: number; row: number; delay: number }[] = [];
  const cx = (COLS - 1) / 2;
  const cy = (ROWS - 1) / 2;
  let maxDist = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const dist = Math.abs(c - cx) + Math.abs(r - cy);
      if (dist > maxDist) maxDist = dist;
      tiles.push({ col: c, row: r, delay: dist });
    }
  }
  // Normalise delay to 0–400ms range
  const scale = maxDist > 0 ? 400 / maxDist : 0;
  return tiles.map((t) => ({ ...t, delay: Math.round(t.delay * scale) }));
};

const tiles = buildTiles();

export const HeroBanner = ({ heroSlides }: HeroBannerProps) => {
  const slides =
    heroSlides && heroSlides.length > 0
      ? mapCMSSlides(heroSlides)
      : defaultSlides;
  const [current, setCurrent] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const lockedRef = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      if (lockedRef.current || index === current) return;
      lockedRef.current = true;

      setOutgoingIndex(current);
      setCurrent(index);

      setTimeout(() => {
        setOutgoingIndex(null);
        lockedRef.current = false;
      }, TRANSITION_MS + 50);
    },
    [current],
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo],
  );

  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo],
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slide = slides[current];

  /* Memoised tile grid to avoid re-creating 48 divs every render */
  const tileGrid = useMemo(() => {
    if (outgoingIndex === null) return null;
    const tileW = 100 / COLS;
    const tileH = 100 / ROWS;
    return tiles.map((t, i) => (
      <div
        key={`tile-${outgoingIndex}-${i}`}
        className="absolute overflow-hidden animate-tile-away"
        style={{
          left: `${t.col * tileW}%`,
          top: `${t.row * tileH}%`,
          width: `${tileW}%`,
          height: `${tileH}%`,
          animationDelay: `${t.delay}ms`,
          perspective: "600px",
        }}
      >
        {/* Show the FULL outgoing image, positioned so this tile's clip shows the right portion */}
        <div
          className="absolute"
          style={{
            left: `${-t.col * 100}%`,
            top: `${-t.row * 100}%`,
            width: `${COLS * 100}%`,
            height: `${ROWS * 100}%`,
          }}
        >
          <Image
            src={slides[outgoingIndex].image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    ));
  }, [outgoingIndex]);

  return (
    <Container>
      <section
        className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Incoming slide — shifted left for zero overlap with right-aligned text */}
        <div className="absolute inset-0 w-[115%] -left-[15%]">
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover object-left"
            priority
            sizes="115vw"
          />
        </div>

        {/* Tile-switch grid of the outgoing slide */}
        {tileGrid && (
          <div className="absolute inset-0 z-[2] pointer-events-none">
            {tileGrid}
          </div>
        )}

        {/* Multi-layer overlay — flipped for right-aligned text readability */}
        <div className="absolute inset-0 z-[3]">
          {/* Targeted gradient on the right where text sits */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />
          {/* Bottom fade for dots / arrows */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content — Positioned to the right on desktop, centered on mobile */}
        <div className="absolute inset-0 z-10 flex items-center justify-center md:justify-end py-12 md:py-20 pointer-events-none">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center md:justify-end">
            <div className="max-w-xl text-center md:text-left pointer-events-auto">
              <p
                key={`overline-${current}`}
                className="text-secondary font-semibold tracking-wider uppercase text-xs sm:text-[13px] md:text-[15px] mb-3 md:mb-4 animate-fade-in-up drop-shadow-md"
              >
                {slide.overline}
              </p>
              <h1
                key={`title-${current}`}
                className="font-jost text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4 md:mb-6 animate-fade-in-up animation-delay-100 drop-shadow-lg"
              >
                {slide.title}{" "}
                <span className="text-secondary drop-shadow-md">
                  {slide.highlight}
                </span>
              </h1>
              <p
                key={`desc-${current}`}
                className="text-sm sm:text-base md:text-lg text-white/90 max-w-lg mb-6 md:mb-8 leading-relaxed animate-fade-in-up animation-delay-200 drop-shadow-md mx-auto md:mx-0"
              >
                {slide.description}
              </p>
              <div
                key={`cta-${current}`}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animation-delay-300 items-center md:items-start"
              >
                <Link
                  href={slide.cta.href}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 bg-accent text-primary-dark font-semibold rounded-none hover:bg-primary hover:text-white transition-colors text-sm sm:text-base md:text-lg shadow-lg w-full sm:w-auto"
                >
                  {slide.cta.label}
                </Link>
                <Link
                  href={slide.ctaSecondary.href}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-white text-white font-semibold rounded-none hover:bg-white hover:text-primary transition-colors text-sm sm:text-base md:text-lg shadow-lg w-full sm:w-auto"
                >
                  {slide.ctaSecondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all shadow-lg active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all shadow-lg active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Indicator dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 transition-all duration-500 rounded-full ${
                i === current
                  ? "w-8 bg-secondary"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </Container>
  );
};
