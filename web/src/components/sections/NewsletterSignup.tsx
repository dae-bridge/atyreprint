"use client";

import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Send } from "lucide-react";

export const NewsletterSignup = () => {
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
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-primary-dark font-semibold rounded-lg hover:bg-secondary-light transition-colors"
              >
                <Send size={16} />
                Subscribe
              </button>
            </form>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
