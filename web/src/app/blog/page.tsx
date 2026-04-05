import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";
import { queryDocuments } from "@/lib/firestore";
import type { BlogPost } from "@/types";
import { BlogCard } from "@/components/sections/BlogCard";
import { BlogSidebar } from "@/components/sections/BlogSidebar";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await queryDocuments<BlogPost>("blog-posts", {
      filters: [{ field: "status", operator: "==", value: "published" }],
      sortBy: "publishedAt",
      sortDirection: "desc",
      pageSize: 50,
    });
  } catch (error) {
    console.error("[BlogPage Debug] Error fetching posts:", error);
  }

  return (
    <>
      <PageHeader
        title="Our Blog"
        subtitle="Tips, guides, and inspiration for custom printing, embroidery, and personalised gifts."
        badge="From the Blog"
      />

      <section className="py-16 md:py-24">
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
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Main Content Grid */}
              <div className="w-full lg:w-3/4">
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-14">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-1/4">
                <BlogSidebar posts={posts} />
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
