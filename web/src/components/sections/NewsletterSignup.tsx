"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { addDocument } from "@/lib/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { newsletterSchema } from "@/lib/validation";

export const NewsletterSignup = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "exists"
  >("idle");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Honeypot — silently pretend success
    if (honeypot) {
      setStatus("success");
      return;
    }

    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    const trimmed = result.data.email.toLowerCase();
    setStatus("loading");
    try {
      const q = query(
        collection(db, "newsletter-subscribers"),
        where("email", "==", trimmed),
        where("active", "==", true),
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        setStatus("exists");
        return;
      }

      await addDocument("newsletter-subscribers", {
        email: trimmed,
        active: true,
        source: "homepage",
        subscribedAt: new Date(),
        unsubscribedAt: null,
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 bg-primary">
      <Container>
        <ScrollReveal variant="fade-up">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-jost text-2xl md:text-3xl font-bold text-white mb-3">
              Stay in the Loop
            </h2>
            <p className="text-white/70 mb-8">
              Subscribe for exclusive deals, new product drops, and style
              inspiration. No spam — ever.
            </p>

            {status === "success" ? (
              <div className="flex items-center justify-center gap-2 text-white">
                <CheckCircle2 size={20} className="text-secondary" />
                <span className="font-semibold">
                  You&apos;re subscribed! Check your inbox for a welcome
                  surprise.
                </span>
              </div>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                    disabled={status === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-primary-dark font-semibold rounded-lg hover:bg-secondary-light transition-colors disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    Subscribe
                  </button>
                </form>
                {status === "exists" && (
                  <p className="text-secondary text-sm mt-3">
                    You&apos;re already subscribed!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-300 text-sm mt-3">
                    Something went wrong. Please try again.
                  </p>
                )}
                {validationError && (
                  <p className="text-red-300 text-sm mt-3">{validationError}</p>
                )}
              </>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
