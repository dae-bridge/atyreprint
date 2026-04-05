import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import Link from "next/link";
import { getFAQsWithItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | AtyrePrint",
  description:
    "Find answers to common questions about AtyrePrint's custom printing, embroidery, ordering, shipping and returns.",
};

const fallbackFaqs = [
  {
    category: "Ordering",
    questions: [
      {
        q: "How do I place a custom order?",
        a: 'You can use our "Personalise It" design tool to customise a product online, or contact us directly with your requirements. We\'ll provide a mockup for approval before production begins.',
      },
      {
        q: "Is there a minimum order quantity?",
        a: "No! We happily accept single-item orders. However, bulk orders (10+ items) qualify for discounted pricing.",
      },
      {
        q: "Can I see a proof before production?",
        a: "Absolutely. We provide a digital mockup for every order. Production only begins once you approve the design.",
      },
      {
        q: "What file formats do you accept for artwork?",
        a: "We accept PNG, SVG, PDF, AI and EPS files. For best results, provide vector files (SVG, AI, EPS) or high-resolution images (300 DPI minimum).",
      },
    ],
  },
  {
    category: "Products & Services",
    questions: [
      {
        q: "What products can you customise?",
        a: "We customise t-shirts, hoodies, sweatshirts, caps, tote bags, mugs, glass cans, tumblers, aprons, pillowcases and more. If you don't see what you need, ask — we can likely source it.",
      },
      {
        q: "What's the difference between printing and embroidery?",
        a: "Printing applies designs using ink or heat transfer — ideal for full-colour images and photographs. Embroidery stitches the design directly into fabric — perfect for logos, text and a premium, textured finish.",
      },
      {
        q: "Do you offer graphic design services?",
        a: "Yes. Our in-house designers can create logos, refine artwork, or vectorise hand-drawn designs. Design services are included for bulk orders or available separately.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "How long does production take?",
        a: "Standard production takes 3–5 working days after artwork approval. Rush orders may be available — contact us to discuss your timeline.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes — free UK shipping on all orders over £50. Standard UK delivery is £3.99 for orders under £50.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship across Europe and Africa. International shipping rates are calculated at checkout based on destination and weight.",
      },
    ],
  },
  {
    category: "Returns & Issues",
    questions: [
      {
        q: "What's your returns policy?",
        a: "Because products are custom-made, we cannot accept returns for change of mind. However, if there's a defect or error on our part, we'll reprint or refund — no questions asked.",
      },
      {
        q: "What if my order arrives damaged?",
        a: "Contact us within 48 hours of delivery with photos of the damage. We'll arrange a replacement or full refund promptly.",
      },
    ],
  },
];

export default async function FAQsPage() {
  // Fetch from Firestore, fall back to hardcoded if empty
  let faqSections: {
    category: string;
    questions: { q: string; a: string }[];
  }[];

  try {
    const firestoreFaqs = await getFAQsWithItems();
    if (firestoreFaqs.length > 0) {
      faqSections = firestoreFaqs.map((section) => ({
        category: section.category.name,
        questions: section.items.map((item) => ({
          q: item.question,
          a: item.answer,
        })),
      }));
    } else {
      faqSections = fallbackFaqs;
    }
  } catch {
    faqSections = fallbackFaqs;
  }

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about ordering, printing, embroidery, shipping and more."
        badge="FAQs"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqSections.map((section) => (
            <div key={section.category} className="mb-12 last:mb-0">
              <h2 className="font-jost text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                {section.category}
              </h2>
              <div className="space-y-6">
                {section.questions.map((faq) => (
                  <div key={faq.q}>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 bg-surface rounded-xl p-6 text-center">
            <p className="text-foreground font-medium mb-2">
              Still have questions?
            </p>
            <p className="text-sm text-text-secondary mb-4">
              We&apos;re always happy to help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
