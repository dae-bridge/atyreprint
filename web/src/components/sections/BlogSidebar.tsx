import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types";
import { getImageUrl } from "@/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface BlogSidebarProps {
  posts: BlogPost[];
}

export function BlogSidebar({ posts }: BlogSidebarProps) {
  // Extract 4 most recent posts
  const recentPosts = posts.slice(0, 4);

  // Compute tag frequencies from all provided posts
  const tagsCount = new Map<string, number>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagsCount.set(tag, (tagsCount.get(tag) || 0) + 1);
    });
  });

  // Sort tags by frequency (descending) then alphabetically
  const tagsList = Array.from(tagsCount.entries()).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });

  return (
    <aside className="w-full space-y-12">
      {/* Search Layout Extension (Optional, usually common in these sidebars) */}
      <div className="bg-surface rounded-xl p-6">
        <h4 className="font-bold uppercase tracking-wider text-foreground mb-4">
          Search
        </h4>
        <div className="h-0.5 w-10 bg-primary mb-6" />
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full bg-white border border-border/60 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-shadow"
          />
        </div>
      </div>

      {/* Recent Posts Widget */}
      {recentPosts.length > 0 && (
        <div className="bg-surface rounded-xl p-6">
          <h4 className="font-bold uppercase tracking-wider text-foreground mb-4">
            Recent Posts
          </h4>
          <div className="h-0.5 w-10 bg-primary mb-6" />
          
          <div className="space-y-6">
            {recentPosts.map((post) => {
              const imageUrl = getImageUrl(post.coverImage);
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex gap-4 items-center"
                >
                  <div className="relative shrink-0 w-20 h-20 rounded-md overflow-hidden bg-white">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.coverImage?.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="80px"
                      />
                    ) : (
                      <PlaceholderImage type="blog" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h5 className="font-serif font-bold text-[15px] leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1.5">
                      {post.title}
                    </h5>
                    <time className="text-text-muted text-[13px]">
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Tags Cloud Widget */}
      {tagsList.length > 0 && (
        <div className="bg-surface rounded-xl p-6">
          <h4 className="font-bold uppercase tracking-wider text-foreground mb-4">
            Tags
          </h4>
          <div className="h-0.5 w-10 bg-primary mb-6" />
          
          <div className="flex flex-wrap gap-2.5">
            {tagsList.map(([tag, count]) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 bg-white border border-border/50 text-text-secondary hover:text-primary hover:border-primary px-4 py-2 rounded-full text-sm transition-colors cursor-pointer"
              >
                {tag} <span className="text-xs text-text-muted">({count})</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
