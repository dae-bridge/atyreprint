"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function AccessoriesPage() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-32 pb-24 font-jost text-center">
      <Container>
        <div className="max-w-2xl mx-auto py-20">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm text-primary">
            <ShoppingBag size={32} />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-tight">Accessories</h1>
          <p className="text-text-muted text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Discover our collection of premium customisable accessories, from tote bags to caps and more.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
             <Link href="/shop/accessories/tote-bags" className="p-10 bg-white border border-border rounded hover:border-accent hover:shadow-md transition-all font-bold uppercase tracking-widest text-sm">Tote Bags</Link>
             <Link href="/shop/accessories/caps" className="p-10 bg-white border border-border rounded hover:border-accent hover:shadow-md transition-all font-bold uppercase tracking-widest text-sm">Caps & Hats</Link>
          </div>
          <Link 
            href="/shop" 
            className="inline-block px-10 py-4 border-2 border-primary text-primary font-bold text-[14px] tracking-widest uppercase hover:bg-primary hover:text-white transition-all rounded"
          >
            Back to Shop
          </Link>
        </div>
      </Container>
    </div>
  );
}
