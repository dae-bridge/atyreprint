import {
  Package,
  ShoppingBag,
  FileText,
  MessageSquare,
  Tag,
  Image as ImageIcon,
  Star,
  Megaphone,
  Grid3X3,
  Palette,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type EmptyVariant =
  | "products"
  | "categories"
  | "blog"
  | "testimonials"
  | "deals"
  | "banners"
  | "services"
  | "designs"
  | "general";

interface EmptyStateProps {
  variant?: EmptyVariant;
  title?: string;
  description?: string;
  /** Optional CTA */
  action?: { label: string; href: string };
  /** Override icon */
  icon?: LucideIcon;
  className?: string;
  /** Compact mode for inline/section use */
  compact?: boolean;
}

const defaults: Record<
  EmptyVariant,
  { icon: LucideIcon; title: string; description: string }
> = {
  products: {
    icon: ShoppingBag,
    title: "No products yet",
    description: "Products will appear here once they're added to the store.",
  },
  categories: {
    icon: Grid3X3,
    title: "No categories yet",
    description:
      "Product categories will appear here once they're set up in the admin.",
  },
  blog: {
    icon: FileText,
    title: "No articles published yet",
    description: "Blog posts will appear here once they're published.",
  },
  testimonials: {
    icon: Star,
    title: "No testimonials yet",
    description: "Customer reviews will appear here once they're added.",
  },
  deals: {
    icon: Tag,
    title: "No active deals",
    description: "Special offers and deals will appear here when available.",
  },
  banners: {
    icon: Megaphone,
    title: "No promotions set up",
    description: "Promotional banners will display here once configured.",
  },
  services: {
    icon: Package,
    title: "No services listed",
    description: "Service offerings will appear here once they're added.",
  },
  designs: {
    icon: Palette,
    title: "No saved designs",
    description: "Your custom designs will appear here after you create them.",
  },
  general: {
    icon: ImageIcon,
    title: "Nothing here yet",
    description: "Content will appear here once it's been added.",
  },
};

export const EmptyState = ({
  variant = "general",
  title,
  description,
  action,
  icon,
  className,
  compact = false,
}: EmptyStateProps) => {
  const d = defaults[variant];
  const Icon = icon || d.icon;
  const heading = title || d.title;
  const desc = description || d.description;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "py-8 px-4" : "py-16 px-6",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-full bg-surface flex items-center justify-center mb-4",
          compact ? "w-14 h-14" : "w-20 h-20",
        )}
      >
        <Icon
          size={compact ? 24 : 36}
          strokeWidth={1.2}
          className="text-text-muted"
        />
      </div>
      <h3
        className={cn(
          "font-semibold text-foreground",
          compact ? "text-base mb-1" : "text-xl mb-2",
        )}
      >
        {heading}
      </h3>
      <p
        className={cn(
          "text-text-secondary max-w-sm",
          compact ? "text-sm" : "text-base mb-4",
        )}
      >
        {desc}
      </p>
      {action && (
        <Link
          href={action.href}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
};
