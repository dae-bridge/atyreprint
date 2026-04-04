import { z } from "zod";

// ─── Contact Form ────────────────────────────────────────────────────────
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254, "Email must be under 254 characters"),
  subject: z
    .string()
    .max(100, "Subject must be under 100 characters")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be under 5000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── Newsletter ──────────────────────────────────────────────────────────
export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254, "Email must be under 254 characters"),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;
