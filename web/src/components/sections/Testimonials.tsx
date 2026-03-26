"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

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
  {
    name: "David T.",
    location: "Accra, Ghana",
    rating: 5,
    avatar: "/images/testimonials/customer-2.jpg",
    text: "Amazing customer service and top-notch materials. The custom t-shirts we ordered for our event were a huge hit!",
  },
  {
    name: "Emily R.",
    location: "Toronto, CA",
    rating: 4,
    avatar: "/images/testimonials/customer-1.jpg",
    text: "Great turnaround time and solid printing quality. AtyrePrint is definitely our go-to for corporate gifting now.",
  },
];

export const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 2;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-4 pb-16 md:pt-6 md:pb-20 bg-surface">
      <Container>
        <SectionHeading
          overline="Testimonials"
          title="What Our Customers Say"
          description="Real feedback from people who trust us with their custom orders"
        />

        <div className="relative group/carousel mt-10 px-4 md:px-0">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="flex-none w-[90%] md:w-[45%] lg:w-[calc(33.333%-16px)] snap-start"
              >
                <div className="bg-white rounded-xl p-6 border border-border-light h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-secondary text-secondary"
                        />
                      ))}
                    </div>
                    <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-5">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>
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
                      <p className="text-base md:text-lg font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="text-sm text-text-muted">{item.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-[40%] md:top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-foreground hover:bg-accent hover:text-primary transition-all opacity-0 group-hover/carousel:opacity-100 md:-translate-x-6 group-hover/carousel:translate-x-0"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-[40%] md:top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-foreground hover:bg-accent hover:text-primary transition-all opacity-0 group-hover/carousel:opacity-100 md:translate-x-6 group-hover/carousel:translate-x-0"
            aria-label="Next testimonials"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </Container>
    </section>
  );
};

