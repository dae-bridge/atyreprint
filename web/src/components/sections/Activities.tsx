"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Scissors, Printer, Palette, Package } from "lucide-react";

const features = [
  {
    title: "Custom Embroidery",
    description: "Precision stitching on clothing, caps & workwear",
    icon: Scissors,
    bgColor: "bg-[#fdf6e7]",
    iconColor: "#f39c12",
  },
  {
    title: "DTG Printing",
    description: "Vibrant full-colour prints on demand",
    icon: Printer,
    bgColor: "bg-[#e7f6fd]",
    iconColor: "#3498db",
  },
  {
    title: "Graphic Design",
    description: "Professional artwork & mockup services",
    icon: Palette,
    bgColor: "bg-[#f2e7fd]",
    iconColor: "#9b59b6",
  },
  {
    title: "Bulk Orders",
    description: "Scalable production for events & businesses",
    icon: Package,
    bgColor: "bg-[#fde7f2]",
    iconColor: "#e91e63",
  },
];

export const Activities = () => {
  return (
    <section className="pt-4 md:pt-6 pb-10 md:pb-12 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 items-center">
          {/* Left: Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none shadow-xl">
            <Image
              src="/images/services/embroidery.jpg"
              alt="AtyrePrint workshop and embroidery machines"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3 md:mb-4 border-b-2 border-accent w-fit pb-1">
              WHY CHOOSE US
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4 md:mb-8 font-jost">
              Quality Craftsmanship, Every Single Order
            </h2>
            <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-8 md:mb-12 max-w-xl">
              From a single personalised mug to thousands of branded uniforms,
              we combine cutting-edge printing technology with traditional
              embroidery craft to deliver results that exceed expectations.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4 group">
                  <div
                    className={`${feature.bgColor} w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
                  >
                    <feature.icon
                      size={24}
                      strokeWidth={1.5}
                      style={{ color: feature.iconColor }}
                      className="md:w-7 md:h-7"
                    />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/50 text-xs md:text-sm leading-snug max-w-[200px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
