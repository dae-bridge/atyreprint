import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "5 Tips for Choosing the Perfect Custom T-Shirt Design",
    excerpt:
      "From colour selection to print placement — everything you need to know before ordering your custom tee.",
    image: "/images/products/tshirt-1.jpg",
    date: "March 15, 2026",
    slug: "#",
  },
  {
    title: "Embroidery vs Screen Printing: Which Is Right for You?",
    excerpt:
      "We break down the pros and cons of each method so you can make the best choice for your brand or event.",
    image: "/images/services/embroidery.jpg",
    date: "March 8, 2026",
    slug: "#",
  },
  {
    title: "How to Prepare Artwork for Custom Printing",
    excerpt:
      "A quick guide on file formats, resolution, and colour modes to ensure your prints come out perfectly.",
    image: "/images/services/printing.jpg",
    date: "February 28, 2026",
    slug: "#",
  },
];

export const BlogPreview = () => {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          overline="From the Blog"
          title="Our Latest Articles"
          description="Tips, guides, and news from the world of custom printing and embroidery."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <ScrollReveal key={post.title} variant="fade-up" delay={i * 120}>
              <Link href={post.slug} className="group block">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex items-center gap-2 text-text-muted text-xs mb-2">
                  <Calendar size={13} />
                  <time>{post.date}</time>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
