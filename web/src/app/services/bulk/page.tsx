"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { Package2 } from "lucide-react";

export default function BulkOrderingPage() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-32 pb-24 font-jost text-center">
      <Container>
        <div className="max-w-2xl mx-auto py-20">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Package2 size={32} className="text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-tight">Bulk Ordering</h1>
          <p className="text-text-muted text-lg mb-10 leading-relaxed">
            Planning an event or outfitting a large team? Save more with our competitive bulk pricing and dedicated support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
             <div className="p-6 bg-white border border-border rounded">
                <h4 className="font-bold mb-2 uppercase tracking-wide">Business & Teams</h4>
                <p className="text-sm text-text-muted">Uniforms, workwear, and corporate gifting with your brand identity.</p>
             </div>
             <div className="p-6 bg-white border border-border rounded">
                <h4 className="font-bold mb-2 uppercase tracking-wide">Events & Promos</h4>
                <p className="text-sm text-text-muted">T-shirts, bags, and accessories for festivals, launches, or giveaways.</p>
             </div>
          </div>
          <Link 
            href="/contact" 
            className="inline-block px-10 py-4 bg-accent text-white font-bold text-[14px] tracking-widest uppercase hover:bg-[#8ba83a] transition-all rounded shadow-lg"
          >
            Contact Bulk Sales
          </Link>
        </div>
      </Container>
    </div>
  );
}
