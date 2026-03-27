import React from "react";
import { cn } from "@/lib/utils";

export const PaymentIcons = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-1.5 justify-center", className)}>
    {/* Visa */}
    <div className="w-[50px] h-[32px] bg-[#1a1f71] rounded-sm flex items-center justify-center">
      <span className="text-white font-bold italic tracking-tighter text-[15px]">VISA</span>
    </div>
    {/* Mastercard */}
    <div className="w-[50px] h-[32px] bg-white rounded-sm border border-gray-200 flex items-center justify-center">
      <svg viewBox="0 0 36 24" className="w-[28px] h-[18px]">
        <circle cx="13" cy="12" r="8" fill="#eb001b" />
        <circle cx="23" cy="12" r="8" fill="#f79e1b" style={{ mixBlendMode: "multiply" }} />
      </svg>
    </div>
    {/* PayPal */}
    <div className="w-[50px] h-[32px] bg-white rounded-sm flex items-center justify-center">
      <span className="text-[#003087] font-bold italic text-[12px] tracking-tighter">Pay</span>
      <span className="text-[#0079c1] font-bold italic text-[12px] tracking-tighter">Pal</span>
    </div>
    {/* Apple Pay */}
    <div className="w-[50px] h-[32px] bg-white rounded-sm border-[1.5px] border-black flex items-center justify-center gap-[1px]">
      <svg viewBox="0 0 384 512" className="w-[11px] h-[11px] fill-black mb-[1px]">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <span className="text-black font-semibold text-[11px]">Pay</span>
    </div>
  </div>
);
