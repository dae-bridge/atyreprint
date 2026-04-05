import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";
import { getImageUrl } from "@/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = getImageUrl(post.coverImage);

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-surface rounded-2xl overflow-hidden hover:shadow-md transition-shadow border border-border/40">
      {/* Featured Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt || post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <PlaceholderImage type="blog" />
        )}
      </div>

      {/* Content Container (padded inside the card) */}
      <div className="flex flex-col flex-grow p-6">
        {/* Categories / Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={tag} className="flex items-center">
                {tag}
                {index < Math.min(post.tags.length, 3) - 1 && (
                  <span className="mx-2 text-text-muted font-normal">|</span>
                )}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-serif text-[22px] font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
          {post.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center gap-1.5 text-text-muted text-[13px] mb-4">
          <span>By {post.author}</span>
          <span>•</span>
          <time>
            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed flex-grow mb-6">
          {post.excerpt}
        </p>

        {/* Read More */}
        <span className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors mt-auto w-max">
          READ MORE <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
