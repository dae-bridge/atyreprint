import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const PageHeader = ({ title, description, children }: PageHeaderProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {description && (
        <p className="text-sm text-text-secondary mt-1">{description}</p>
      )}
    </div>
    {children && <div className="flex items-center gap-3">{children}</div>}
  </div>
);

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ className, children }: CardProps) => (
  <div
    className={cn(
      "bg-white rounded-xl border border-border shadow-sm",
      className,
    )}
  >
    {children}
  </div>
);

export const CardHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "flex items-center justify-between px-6 py-4 border-b border-border",
      className,
    )}
  >
    {children}
  </div>
);

export const CardBody = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn("px-6 py-4", className)}>{children}</div>;

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export const StatCard = ({
  label,
  value,
  icon,
  trend,
  className,
}: StatCardProps) => (
  <Card className={cn("p-6", className)}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-text-secondary">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        {trend && (
          <p
            className={cn(
              "text-xs font-medium mt-2",
              trend.positive ? "text-success" : "text-error",
            )}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </p>
        )}
      </div>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </div>
  </Card>
);

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info" | "secondary";
  children: React.ReactNode;
  className?: string;
}

const badgeVariants = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  error: "bg-red-50 text-red-700",
  info: "bg-blue-50 text-blue-700",
  secondary: "bg-secondary/10 text-secondary",
};

export const Badge = ({
  variant = "default",
  children,
  className,
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
      badgeVariants[variant],
      className,
    )}
  >
    {children}
  </span>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const buttonVariants = {
  primary: "bg-primary text-white hover:bg-primary-light",
  secondary: "bg-secondary text-primary-dark hover:bg-secondary-light",
  outline:
    "bg-white border border-border text-foreground hover:bg-gray-50",
  ghost: "bg-transparent text-text-secondary hover:bg-gray-100",
  danger: "bg-error text-white hover:bg-red-600",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-sm",
};

export const Button = ({
  variant = "primary",
  size = "md",
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed",
      buttonVariants[variant],
      buttonSizes[size],
      className,
    )}
    disabled={disabled || loading}
    {...props}
  >
    {loading && (
      <svg
        className="animate-spin h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-25"
        />
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          className="opacity-75"
        />
      </svg>
    )}
    {children}
  </button>
);

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-text-muted mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
    <p className="text-sm text-text-secondary max-w-sm mb-6">{description}</p>
    {action}
  </div>
);
