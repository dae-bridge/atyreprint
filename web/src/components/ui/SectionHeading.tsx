import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  overline?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading = ({
  overline,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn("mb-12", align === "center" && "text-center", className)}
    >
      {overline && (
        <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-2">
          {overline}
        </p>
      )}
      <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
