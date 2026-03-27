"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-32 pb-24 font-jost text-center">
      <Container>
        <div className="max-w-2xl mx-auto py-20">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <BookOpen size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-tight">Our Blog</h1>
          <p className="text-text-muted text-lg mb-10 leading-relaxed uppercase tracking-wide text-sm font-bold">
            Coming Soon
          </p>
          <p className="text-text-muted mb-10">
            We are currently crafting some amazing articles about custom apparel trends, embroidery techniques, and design tips. Check back later!
          </p>
          <Link 
            href="/" 
            className="inline-block px-10 py-4 border-2 border-primary text-primary font-bold text-[14px] tracking-widest uppercase hover:bg-primary hover:text-white transition-all rounded"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </div>
  );
}
