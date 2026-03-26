"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const PurchaseToast = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[60] animate-fade-in-up">
      <div className="bg-white rounded-lg shadow-2xl border border-border/40 p-4 min-w-[320px] relative flex gap-4">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-foreground/30 hover:text-foreground/60 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="relative w-16 h-16 flex-shrink-0 bg-surface rounded-md overflow-hidden p-2">
          <Image
            src="/images/categories/toys.png" // Using a toys placeholder
            alt="Product"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1 pr-4">
          <p className="text-[11px] text-foreground/50 font-medium mb-1">
            Danish just rated 5 star
          </p>
          <h4 className="text-sm font-bold text-foreground leading-tight mb-2 pr-2">
            Featured Fisher-Price Dance & Groove Rockit
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-foreground/40 italic">5 hours ago</span>
            <div className="flex items-center gap-1 text-accent">
              <CheckCircle size={10} fill="currentColor" className="text-white" />
              <span className="text-[10px] uppercase font-bold tracking-tighter">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
