import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { EmptyState } from "@/components/ui/EmptyState";
import { Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";
import { getImageUrl } from "@/types";

interface BlogPreviewProps {
  posts?: BlogPost[];
}

export const BlogPreview = ({ posts }: BlogPreviewProps) => {
  const hasPosts = posts && posts.length > 0;

  if (!hasPosts) {
    return (
      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            overline="From the Blog"
            title="Our Latest Articles"
            description="Tips, guides, and news from the world of custom printing and embroidery."
          />
          <EmptyState variant="blog" compact />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          overline="From the Blog"
          title="Our Latest Articles"
          description="Tips, guides, and news from the world of custom printing and embroidery."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, i) => {
            const imageUrl = getImageUrl(post.coverImage);
            return (
              <ScrollReveal key={post.id} variant="fade-up" delay={i * 120}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.coverImage?.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <PlaceholderImage type="blog" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-text-muted text-xs mb-2">
                    <Calendar size={13} />
                    <time>
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
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
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
};
