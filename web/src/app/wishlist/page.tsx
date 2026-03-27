"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-32 pb-24 font-jost">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Heart size={32} className="text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-tight">Your Wishlist</h1>
          <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto">
            You haven't saved any items to your wishlist yet. Start browsing our shop and click the heart icon to save your favourites!
          </p>
          <Link 
            href="/shop" 
            className="inline-block px-10 py-4 bg-primary text-white font-bold text-[14px] tracking-widest uppercase hover:bg-black transition-colors rounded shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </Container>
    </div>
  );
}
