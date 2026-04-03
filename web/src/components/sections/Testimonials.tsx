"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { EmptyState } from "@/components/ui/EmptyState";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Testimonial as FirestoreTestimonial } from "@/types";
import { getImageUrl } from "@/types";

interface TestimonialsProps {
  testimonials?: FirestoreTestimonial[];
}

export const Testimonials = ({
  testimonials: firestoreTestimonials,
}: TestimonialsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Map Firestore testimonials to display shape
  const displayItems =
    firestoreTestimonials && firestoreTestimonials.length > 0
      ? firestoreTestimonials.map((t) => ({
          name: t.name,
          location: t.location,
          rating: t.rating,
          avatar: getImageUrl(t.avatar),
          text: t.text,
        }))
      : [];

  if (displayItems.length === 0) {
    return (
      <section className="pt-4 pb-16 md:pt-6 md:pb-20 bg-surface">
        <Container>
          <EmptyState variant="testimonials" compact />
        </Container>
      </section>
    );
  }

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
            {displayItems.map((item, index) => (
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
                      {item.avatar ? (
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : (
                        <PlaceholderImage type="testimonial" />
                      )}
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
