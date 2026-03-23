import { cn } from "@/lib/utils";
import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
}

export const Card = ({ children, className, href, hover = true }: CardProps) => {
  const classes = cn(
    "bg-white rounded-xl border border-border-light overflow-hidden",
    hover && "hover:shadow-lg transition-shadow duration-300",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, "block")}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
};

export const CardImage = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>{children}</div>
  );
};

export const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("p-5", className)}>{children}</div>;
};
