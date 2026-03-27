"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { Printer } from "lucide-react";

export default function ScreenPrintingPage() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-32 pb-24 font-jost text-center">
      <Container>
        <div className="max-w-2xl mx-auto py-20">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Printer size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-tight">Screen Printing</h1>
          <p className="text-text-muted text-lg mb-10 leading-relaxed">
            High-quality, durable screen printing for bulk apparel orders, uniforms, and promotional merchandise.
          </p>
          <div className="bg-white p-10 rounded border border-border text-left mb-10">
            <h3 className="font-bold text-xl mb-4">Why choose Screen Printing?</h3>
            <ul className="space-y-2 text-text-muted">
              <li>• Best for large volume orders</li>
              <li>• Vibrant, long-lasting colours</li>
              <li>• Cost-effective for simple designs</li>
              <li>• Works on almost any fabric</li>
            </ul>
          </div>
          <Link 
            href="/contact" 
            className="inline-block px-10 py-4 bg-primary text-white font-bold text-[14px] tracking-widest uppercase hover:bg-black transition-all rounded shadow-lg"
          >
            Get a Quote
          </Link>
        </div>
      </Container>
    </div>
  );
}
