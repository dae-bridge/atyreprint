"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { Tag } from "lucide-react";

export default function DealsPage() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-32 pb-24 font-jost text-center">
      <Container>
        <div className="max-w-2xl mx-auto py-20">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm text-accent">
            <Tag size={32} />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-tight">Today's Deals</h1>
          <p className="text-text-muted text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Grab our exclusive limited-time offers on premium printed and embroidered products.
          </p>
          <div className="bg-white p-12 rounded shadow-sm border border-dashed border-accent mb-10">
             <p className="text-accent font-bold text-xl uppercase tracking-widest mb-2 font-jost">No active deals right now</p>
             <p className="text-text-muted">Sign up for our newsletter to get notified about the next big flash sale!</p>
          </div>
          <Link 
            href="/shop" 
            className="inline-block px-10 py-4 bg-accent text-white font-bold text-[14px] tracking-widest uppercase hover:bg-[#8ba83a] transition-all rounded shadow-lg"
          >
            Browse All Products
          </Link>
        </div>
      </Container>
    </div>
  );
}
