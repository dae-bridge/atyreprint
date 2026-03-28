import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format pence to currency string: 1999 → "£19.99" */
export function formatMoney(amountInPence: number, currency = "GBP"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
  }).format(amountInPence / 100);
}

/** Timestamp or Date → readable string */
export function formatDate(
  date: { toDate?: () => Date } | Date | string,
): string {
  const d =
    typeof date === "string"
      ? new Date(date)
      : "toDate" in date && date.toDate
        ? date.toDate()
        : (date as Date);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/** Timestamp or Date → relative time "2 hours ago" */
export function timeAgo(
  date: { toDate?: () => Date } | Date | string,
): string {
  const d =
    typeof date === "string"
      ? new Date(date)
      : "toDate" in date && date.toDate
        ? date.toDate()
        : (date as Date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(d);
}

/** Generate a URL-safe slug from text */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Generate order number: AP-20260328-XXXX */
export function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AP-${dateStr}-${random}`;
}

/** Truncate string with ellipsis */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1) + "…";
}
