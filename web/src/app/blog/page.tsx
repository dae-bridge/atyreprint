import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Calendar, ArrowRight, User2, Tag } from "lucide-react";
import { queryDocuments } from "@/lib/firestore";
import type { BlogPost } from "@/types";
import { getImageUrl } from "@/types";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await queryDocuments<BlogPost>("blog-posts", {
    filters: [{ field: "status", operator: "==", value: "published" }],
    sortBy: "publishedAt",
    sortDirection: "desc",
    pageSize: 50,
  });

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const restPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <>
      <PageHeader
        title="Our Blog"
        subtitle="Tips, guides, and inspiration for custom printing, embroidery, and personalised gifts."
        badge="From the Blog"
      />

      <section className="py-16 md:py-20">
        <Container>
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-secondary text-lg mb-4">
                No articles published yet. Check back soon!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                Back to Home <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block mb-12"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                      <Image
                        src={getImageUrl(featuredPost.coverImage)}
                        alt={featuredPost.coverImage?.alt || featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded">
                        Featured
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-4 text-text-muted text-sm mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          <time>
                            {new Date(
                              featuredPost.publishedAt,
                            ).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </time>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User2 size={14} />
                          {featuredPost.author}
                        </span>
                      </div>
                      <h2 className="font-jost text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                        {featuredPost.title}
                      </h2>
                      <p className="text-text-secondary leading-relaxed mb-4 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      {featuredPost.tags?.length > 0 && (
                        <div className="flex gap-2 flex-wrap mb-4">
                          {featuredPost.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 text-xs bg-gray-100 text-text-secondary px-2 py-1 rounded"
                            >
                              <Tag size={10} /> {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                        Read Article <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Post Grid */}
              {restPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {restPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                        <Image
                          src={getImageUrl(post.coverImage)}
                          alt={post.coverImage?.alt || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-text-muted text-xs mb-2">
                        <Calendar size={13} />
                        <time>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-GB",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}
                        </time>
                      </div>
                      <h3 className="font-jost font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary text-sm line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}
