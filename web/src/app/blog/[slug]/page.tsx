import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { Container } from "@/components/ui/Container";
import { Calendar, User2, Tag, ArrowLeft } from "lucide-react";
import { queryDocuments } from "@/lib/firestore";
import type { BlogPost } from "@/types";
import { getImageUrl } from "@/types";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const posts = await queryDocuments<BlogPost>("blog-posts", {
    filters: [
      { field: "slug", operator: "==", value: slug },
      { field: "status", operator: "==", value: "published" },
    ],
    pageSize: 1,
  });
  return posts[0] || null;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found | AtyrePrint" };
  return {
    title: post.seo?.metaTitle || `${post.title} | AtyrePrint Blog`,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.seo?.ogImage
        ? [{ url: post.seo.ogImage }]
        : post.coverImage?.url
          ? [{ url: post.coverImage.url }]
          : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Fetch related posts (same tags, excluding current)
  const allPosts = await queryDocuments<BlogPost>("blog-posts", {
    filters: [{ field: "status", operator: "==", value: "published" }],
    sortBy: "publishedAt",
    sortDirection: "desc",
    pageSize: 20,
  });
  const relatedPosts = allPosts
    .filter(
      (p) => p.id !== post.id && p.tags?.some((t) => post.tags?.includes(t)),
    )
    .slice(0, 3);

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary text-white py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            {post.tags?.length > 0 && (
              <div className="flex gap-2 justify-center mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs bg-white/10 text-white/90 px-3 py-1 rounded-full"
                  >
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="font-jost text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <User2 size={14} />
                {post.author}
              </span>
              {publishedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <time>{publishedDate}</time>
                </span>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Cover Image */}
      {post.coverImage?.url && (
        <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-xl">
            <Image
              src={getImageUrl(post.coverImage)}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Render rich text HTML content */}
            <div
              className="prose prose-lg max-w-none text-text-secondary leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />
          </div>
        </Container>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-[#f9f9f9] border-t border-border">
          <Container>
            <h2 className="font-jost text-2xl font-bold text-foreground mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                    <Image
                      src={getImageUrl(related.coverImage)}
                      alt={related.coverImage?.alt || related.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-jost font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-text-secondary text-sm line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-8">
        <Container>
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <ArrowLeft size={16} /> All Articles
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
