import {
  ShoppingBag,
  Grid3X3,
  User,
  FileText,
  Wrench,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PlaceholderType =
  | "product"
  | "category"
  | "testimonial"
  | "blog"
  | "service"
  | "hero"
  | "general";

interface PlaceholderImageProps {
  type?: PlaceholderType;
  className?: string;
  /** Text to show below the icon (e.g. "No image") */
  label?: string;
}

const config: Record<
  PlaceholderType,
  {
    icon: typeof ShoppingBag;
    gradient: string;
    iconColor: string;
    labelColor: string;
  }
> = {
  product: {
    icon: ShoppingBag,
    gradient: "bg-gradient-to-br from-gray-50 to-gray-100",
    iconColor: "text-gray-300",
    labelColor: "text-gray-400",
  },
  category: {
    icon: Grid3X3,
    gradient: "bg-gradient-to-br from-emerald-50 to-gray-50",
    iconColor: "text-emerald-200",
    labelColor: "text-emerald-400",
  },
  testimonial: {
    icon: User,
    gradient: "bg-gradient-to-br from-amber-50 to-gray-50",
    iconColor: "text-amber-200",
    labelColor: "text-amber-400",
  },
  blog: {
    icon: FileText,
    gradient: "bg-gradient-to-br from-blue-50 to-gray-50",
    iconColor: "text-blue-200",
    labelColor: "text-blue-400",
  },
  service: {
    icon: Wrench,
    gradient: "bg-gradient-to-br from-violet-50 to-gray-50",
    iconColor: "text-violet-200",
    labelColor: "text-violet-400",
  },
  hero: {
    icon: Sparkles,
    gradient: "bg-gradient-to-br from-primary/5 to-accent/5",
    iconColor: "text-primary/20",
    labelColor: "text-primary/40",
  },
  general: {
    icon: ImageIcon,
    gradient: "bg-gradient-to-br from-gray-50 to-gray-100",
    iconColor: "text-gray-300",
    labelColor: "text-gray-400",
  },
};

/**
 * CSS-based placeholder image component.
 * Fills its parent container — use inside a relative-positioned wrapper.
 */
export const PlaceholderImage = ({
  type = "general",
  className,
  label,
}: PlaceholderImageProps) => {
  const { icon: Icon, gradient, iconColor, labelColor } = config[type];

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center",
        gradient,
        className,
      )}
    >
      <Icon size={40} strokeWidth={1} className={iconColor} />
      {label && (
        <span className={cn("text-[11px] font-medium mt-2", labelColor)}>
          {label}
        </span>
      )}
    </div>
  );
};
