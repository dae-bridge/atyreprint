"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { addDocument } from "@/lib/firestore";
import { contactFormSchema } from "@/lib/validation";

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot — silently reject bot submissions
    const honeypot = (formData.get("website") as string) || "";
    if (honeypot) {
      setStatus("sent");
      return;
    }

    const raw = {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      subject: (formData.get("subject") as string) || "",
      message: (formData.get("message") as string) || "",
    };

    const result = contactFormSchema.safeParse(raw);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!errs[key]) errs[key] = issue.message;
      }
      setFieldErrors(errs);
      setStatus("idle");
      return;
    }

    try {
      await addDocument("contact-messages", {
        ...result.data,
        status: "new",
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send size={28} className="text-success" />
        </div>
        <h4 className="text-lg font-bold text-foreground mb-2">
          Message Sent!
        </h4>
        <p className="text-text-secondary text-sm">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-primary font-semibold hover:text-primary-light transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users, bots fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            placeholder="John Smith"
          />
          {fieldErrors.name && (
            <p className="text-error text-xs mt-1">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            placeholder="john@example.com"
          />
          {fieldErrors.email && (
            <p className="text-error text-xs mt-1">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white"
        >
          <option value="">Select a topic…</option>
          <option value="quote">Get a Quote</option>
          <option value="order">Existing Order Enquiry</option>
          <option value="custom">Custom Project</option>
          <option value="wholesale">Wholesale / Bulk Orders</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-y"
          placeholder="Tell us about your project or question…"
        />
        {fieldErrors.message && (
          <p className="text-error text-xs mt-1">{fieldErrors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        <Send size={16} />
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-error text-sm mt-2">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
};
