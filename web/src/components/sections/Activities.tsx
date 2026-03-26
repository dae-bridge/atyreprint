"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Blocks, Palette, Brain, Music } from "lucide-react";

const features = [
  {
    title: "Early Learning",
    description: "Contrary popular belief lorem Ipsum",
    icon: Blocks,
    bgColor: "bg-[#fdf6e7]", // Cream/Yellowish
    iconColor: "#f39c12",
  },
  {
    title: "Creative Learning",
    description: "Contrary popular belief lorem Ipsum",
    icon: Palette,
    bgColor: "bg-[#e7f6fd]", // Light Blue
    iconColor: "#3498db",
  },
  {
    title: "Brain Learning",
    description: "Contrary popular belief lorem Ipsum",
    icon: Brain,
    bgColor: "bg-[#f2e7fd]", // Light Purple
    iconColor: "#9b59b6",
  },
  {
    title: "Music Learning",
    description: "Contrary popular belief lorem Ipsum",
    icon: Music,
    bgColor: "bg-[#fde7f2]", // Light Pink
    iconColor: "#e91e63",
  },
];

export const Activities = () => {
  return (
    <section className="pt-4 md:pt-6 pb-10 md:pb-12 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          
          {/* Left: Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none shadow-xl">
            <Image
              src="/images/sections/activities-child.jpg"
              alt="Child playing with toy camera"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 border-b-2 border-accent w-fit pb-1">
              OUR BEST ACTIVITIES
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-8 font-jost">
              Let Us Know About Reading And Cultural
            </h2>
            <p className="text-foreground/60 text-base leading-relaxed mb-12 max-w-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry of standard dummy text ever since the type and scrambled it to make a type specimen book.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div 
                    className={`${feature.bgColor} w-16 h-16 flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
                  >
                    <feature.icon size={28} strokeWidth={1.5} style={{ color: feature.iconColor }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/50 text-sm leading-snug max-w-[160px]">
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
