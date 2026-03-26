"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductData } from "@/lib/products";
import { shippingAndReturnInfo } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";
import {
  Minus,
  Plus,
  Heart,
  Share2,
  Check,
  Star,
  Truck,
  RotateCcw,
  Flame,
  X,
  ChevronUp,
  ChevronDown,
  ShieldCheck,
  Coins,
  Eye,
  BarChart2,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

interface ProductDetailClientProps {
  product: ProductData;
}

/* ─── Urgency Ticker ─── */
function UrgencyTicker({ messages }: { messages: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 flex items-center text-[13px] font-medium transition-all duration-700 ease-in-out",
            i === index 
              ? "translate-y-0 opacity-100" 
              : i < index || (index === 0 && i === messages.length - 1)
                ? "-translate-y-full opacity-0"
                : "translate-y-full opacity-0"
          )}
        >
          {msg}
        </div>
      ))}
    </div>
  );
}

/* ─── Star Rating ─── */
const StarRating = ({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={cn(
          star <= Math.round(rating)
            ? "fill-[#ffc107] text-[#ffc107]"
            : "fill-gray-200 text-gray-200"
        )}
      />
    ))}
  </div>
);

/* ─── Payment Icons ─── */
const PaymentIcons = () => (
  <div className="flex items-center gap-1.5 justify-center">
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

/* ─── Tabs ─── */
type TabId = "description" | "additional" | "reviews" | "shipping";

const tabs: { id: TabId; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "additional", label: "Additional Information" },
  { id: "reviews", label: "Reviews" },
  { id: "shipping", label: "Shipping & Return" },
];

export const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name ?? ""
  );
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    for (const v of product.variants) {
      initial[v.label] = v.options[0] ?? "";
    }
    return initial;
  });
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      variants: selectedVariants,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleClearColor = () => {
    setSelectedColor(product.colors[0]?.name ?? "");
  };

  return (
    <div>
      {/* ════════════════════════════════════════════════
          TOP SECTION — Image Gallery + Product Info
         ════════════════════════════════════════════════ */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
        
        {/* ─── Image Gallery & Trust Badges ─── */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-6 lg:gap-8">
            {/* Vertical Thumbnails */}
            <div className="hidden md:flex flex-col w-[110px] shrink-0">
              {/* Removed flex-1 wrapper so arrows sit flush with thumbs */}
              <button
                className="w-full h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors shrink-0"
                onClick={() => setSelectedImage((prev) => Math.max(0, prev - 1))}
                aria-label="Previous image"
              >
                <ChevronUp size={20} className="font-light" />
              </button>
              <div className="flex flex-col gap-3 py-1 overflow-y-auto scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative aspect-square overflow-hidden border transition-all p-1 bg-white shrink-0",
                      i === selectedImage
                        ? "border-[#a9cb5b] shadow-sm"
                        : "border-gray-200 hover:border-gray-400"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes="110px"
                    />
                  </button>
                ))}
              </div>
              <button
                className="w-full h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors shrink-0"
                onClick={() =>
                  setSelectedImage((prev) =>
                    Math.min(product.images.length - 1, prev + 1)
                  )
                }
                aria-label="Next image"
              >
                <ChevronDown size={20} className="font-light" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative flex-1 aspect-square overflow-hidden bg-white border border-gray-100/50 rounded-sm">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain object-top transition-opacity duration-300"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Mobile Thumbnails */}
            <div className="md:hidden grid grid-cols-4 gap-2 mt-3 w-full">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative aspect-square overflow-hidden border transition-all p-1 bg-white",
                    i === selectedImage ? "border-[#a9cb5b]" : "border-gray-200"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Trust Badges Bar */}
          <div className="hidden md:flex items-stretch text-[11px] xl:text-[12px] font-bold text-[#354562] bg-[#f8fbff] rounded border border-[#e4ecf6]">
            <div className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 border-r border-[#e4ecf6]">
              <Truck size={20} className="text-[#3b5998] shrink-0" /> 
              <span className="leading-snug text-left lg:text-center">Estimated Delivery : Up to 4 business days</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4">
              <RotateCcw size={20} className="text-[#3b5998] shrink-0" /> 
              <span className="leading-snug text-left lg:text-center">Free Shipping & Returns : On all orders over $200</span>
            </div>
          </div>
        </div>

        {/* ─── Product Info ─── */}
        <div>
          {/* Brand */}
          <p className="text-[13px] text-text-muted mb-1.5 flex gap-1">
            Brand:{" "}
            <span className="text-[#a9cb5b] hover:underline cursor-pointer font-medium">AtyrePrint</span>
          </p>

          {/* Title */}
          <h1 className="font-jost text-[26px] leading-tight font-semibold text-foreground mb-4">
            {product.name}
          </h1>

          {/* Price + Rating on same line */}
          <div className="flex items-center flex-wrap gap-4 mb-4">
            <span className="text-2xl font-bold text-[#1a1a1a]">
              £{product.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-1.5">
              <StarRating rating={product.rating} size={13} />
              <span className="text-[13px] text-[#a9cb5b] font-medium hover:underline cursor-pointer">
                ({product.reviewCount}{" "}
                {product.reviewCount === 1 ? "review" : "reviews"})
              </span>
            </div>
          </div>

          {/* ─── Urgency Ticker ─── */}
          <div className="h-[24px] overflow-hidden mb-6 flex items-center gap-2 text-[#ef4444]">
            <Flame size={15} className="shrink-0" />
            <div className="relative h-full flex-1">
              <UrgencyTicker messages={[
                `${Math.floor(Math.random() * 20) + 5} products sold in last 10 hours`,
                `${Math.floor(Math.random() * 50) + 15} people are viewing this right now`,
                "Hurry! Only a few items left in stock",
                "Flash Sale: Limited time offer!"
              ]} />
            </div>
          </div>

          {/* Short Description */}
          <p className="text-text-secondary leading-relaxed mb-6 text-[14px]">
            {product.description}
          </p>

          {/* ─── Color Picker (Image-based swatches) ─── */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-bold text-foreground mb-3">Color</p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, idx) => (
                  <div key={color.name} className="relative group/swatch">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover/swatch:opacity-100 absolute -top-[34px] left-1/2 -translate-x-1/2 bg-[#222] text-white text-[11px] px-2.5 py-1 rounded whitespace-nowrap before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-[5px] before:border-transparent before:border-t-[#222] shadow-sm z-10 transition-opacity pointer-events-none font-medium">
                      {color.name}
                    </div>
                    {/* Swatch Image */}
                    <button
                      onClick={() => {
                        setSelectedColor(color.name);
                        setSelectedImage(color.imageIndex);
                      }}
                      className={cn(
                        "w-[60px] h-[60px] border-[2px] overflow-hidden transition-all relative block bg-white",
                        selectedColor === color.name
                          ? "border-[#a9cb5b]"
                          : "border-gray-200 hover:border-gray-400"
                      )}
                      aria-label={`Select color ${color.name}`}
                    >
                      <Image
                        src={product.images[color.imageIndex]}
                        alt={color.name}
                        fill
                        className="object-cover p-1"
                        sizes="60px"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Variant Selectors ─── */}
          {product.variants.map((variant) => (
            <div key={variant.label} className="mb-6">
              <p className="text-sm font-bold text-foreground mb-3">
                {variant.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() =>
                      setSelectedVariants((prev) => ({
                        ...prev,
                        [variant.label]: opt,
                      }))
                    }
                    className={cn(
                      "px-4 py-2 border text-[13px] font-medium transition-all min-w-[40px]",
                      selectedVariants[variant.label] === opt
                        ? "border-[#222] bg-[#222] text-white"
                        : "border-gray-300 text-foreground hover:border-foreground"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* ─── Stock Status ─── */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="inline-block text-[13px] font-medium text-[#2d6a4f] bg-[#e8f5e9] px-3 py-1.5 rounded-sm">
                421 in stock
              </span>
            ) : (
              <span className="inline-block text-[13px] font-medium text-red-700 bg-red-50 px-3 py-1.5 rounded-sm">
                Out of stock
              </span>
            )}
          </div>

          {/* ─── Quantity, Add to Cart & Buy Now ─── */}
          <div className="flex items-center gap-3 mb-6">
            {/* Quantity Selector */}
            <div className="flex items-center bg-[#f5f5f5] h-[46px] min-w-[100px] rounded-sm">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-foreground hover:bg-gray-200 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-semibold text-sm text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-foreground hover:bg-gray-200 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={cn(
                "flex-[1.5] h-[46px] flex items-center justify-center font-bold transition-colors text-sm tracking-widest uppercase rounded-sm",
                addedToCart
                  ? "bg-[#1a3014] text-white"
                  : "bg-[#a9cb5b] text-white hover:bg-[#8ba83a]"
              )}
            >
              {addedToCart ? "ADDED!" : "ADD TO CART"}
            </button>
            
            {/* Buy Now Button */}
            <button className="flex-[1.5] h-[46px] bg-[#222] text-white flex items-center justify-center font-bold text-sm tracking-widest uppercase hover:bg-black transition-colors rounded-sm">
              BUY NOW
            </button>
          </div>

          {/* Action Links & Payment Methods */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mt-8 mb-8 border-t border-b border-gray-100 py-6">
            <div className="flex items-center flex-wrap gap-6 text-[12px] font-bold text-gray-800 tracking-wide">
              <button className="inline-flex items-center gap-1.5 hover:text-[#a9cb5b] transition-colors uppercase whitespace-nowrap">
                <Heart size={18} className="text-[#333]" /> Add to Wishlist
              </button>
              <button className="inline-flex items-center gap-1.5 hover:text-[#a9cb5b] transition-colors uppercase whitespace-nowrap">
                <Share2 size={18} className="text-[#333]" /> Share
              </button>
            </div>
            <PaymentIcons />
          </div>
        </div>
      </div>
      {/* ════════════════════════════════════════════════
          TABBED CONTENT
         ════════════════════════════════════════════════ */}
      <div className="mt-12 border-t border-gray-200">
        {/* Tab Headers */}
        <div className="flex flex-wrap border-b border-gray-200 justify-start gap-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-5 text-[15px] font-bold uppercase tracking-widest transition-all duration-300 relative group",
                activeTab === tab.id
                  ? "text-black"
                  : "text-gray-400 hover:text-black"
              )}
            >
              {tab.label}
              {tab.id === "reviews" && (
                <span className="ml-1 text-[11px] opacity-70">
                  ({product.reviewCount})
                </span>
              )}
              {/* Active Indicator Bar */}
              <span 
                className={cn(
                  "absolute bottom-[-1px] left-0 right-0 h-[2.5px] bg-[#e91e63] transition-all duration-300 origin-center scale-x-0 group-hover:scale-x-100",
                  activeTab === tab.id && "scale-x-100"
                )} 
              />
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-10">
          {/* ─── Description Tab ─── */}
          {activeTab === "description" && (
            <div className="max-w-7xl">
              <h3 className="font-jost text-[22px] font-bold text-foreground mb-6">
                About This Product
              </h3>
              <div className="space-y-4 mb-8">
                {product.longDescription.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[15px] text-text-secondary leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <h4 className="font-jost text-lg font-bold text-foreground mt-10 mb-5">
                Key Features
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[14px] text-text-secondary py-1"
                  >
                    <Check
                      size={18}
                      className="text-[#3b8c5e] mt-0.5 shrink-0"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ─── Additional Information Tab ─── */}
          {activeTab === "additional" && (
            <div className="max-w-4xl">
              <table className="w-full text-sm border border-gray-200">
                <tbody>
                  {product.additionalInfo.map((info, i) => (
                    <tr
                      key={info.label}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-3 px-4 font-semibold text-foreground w-1/3 border-b border-gray-200">
                        {info.label}
                      </td>
                      <td className="py-3 px-4 text-text-secondary border-b border-gray-200">
                        {info.value}
                      </td>
                    </tr>
                  ))}
                  {product.colors.length > 0 && (
                    <tr
                      className={
                        product.additionalInfo.length % 2 === 0
                          ? "bg-gray-50"
                          : "bg-white"
                      }
                    >
                      <td className="py-3 px-4 font-semibold text-foreground border-b border-gray-200">
                        Colours
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <div className="flex gap-2">
                          {product.colors.map((c) => (
                            <span
                              key={c.name}
                              className="inline-flex items-center gap-1.5 text-sm text-text-secondary"
                            >
                              {c.name}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ─── Reviews Tab ─── */}
          {activeTab === "reviews" && (
            <div className="max-w-4xl border border-gray-100 p-8 rounded-sm">
              {/* Summary */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="text-center">
                  <p className="text-5xl font-bold text-foreground">
                    {product.rating.toFixed(1)}
                  </p>
                  <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">
                    out of 5
                  </p>
                </div>
                <div>
                  <StarRating rating={product.rating} size={18} />
                  <p className="text-[13px] text-text-muted mt-2 font-medium">
                    Based on {product.reviewCount} {" "}
                    {product.reviewCount === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </div>

              {/* Review List */}
              <h3 className="font-jost text-xl font-bold text-foreground mb-6">
                {product.reviewCount}{" "}
                {product.reviewCount === 1 ? "review" : "reviews"} for{" "}
                {product.name}
              </h3>
              <div className="space-y-6">
                {product.reviews.map((review, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-foreground shrink-0 border border-gray-200">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <StarRating rating={review.rating} size={12} />
                        </div>
                        <p className="text-sm font-bold text-foreground">
                          {review.author}{" "}
                          <span className="font-medium text-text-muted text-xs">
                            – {review.date}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed ml-[60px]">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h4 className="font-jost text-2xl font-bold text-foreground mb-2">
                  Add a Review
                </h4>
                <p className="text-sm text-text-muted mb-6">
                  Your email address will not be published. Required fields are
                  marked *
                </p>
                <form className="space-y-5">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-semibold text-foreground">
                      Your Rating *
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={18}
                          className="text-gray-300 hover:fill-[#ffc107] hover:text-[#ffc107] cursor-pointer transition-colors"
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                      Your Review *
                    </label>
                    <textarea
                      className="w-full border border-gray-300 p-3 text-sm min-h-[120px] focus:outline-none focus:border-black transition-colors"
                      placeholder="Write your review here..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="save-info"
                      className="w-4 h-4 mt-0.5 accent-[#e91e63]"
                    />
                    <label
                      htmlFor="save-info"
                      className="text-sm text-text-muted"
                    >
                      Save my name, email, and website in this browser for the
                      next time I comment.
                    </label>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      className="bg-[#222] text-white px-8 py-3.5 text-sm font-bold uppercase tracking-widest hover:bg-[#e91e63] transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ─── Shipping & Return Tab ─── */}
          {activeTab === "shipping" && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h3 className="font-jost text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Truck size={24} className="text-[#3b8c5e]" /> Shipping Policy
                </h3>
                {shippingAndReturnInfo.shipping
                  .split("\n\n")
                  .map((paragraph, i) => (
                    <div
                      key={i}
                      className="text-sm text-text-secondary leading-relaxed mb-3"
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(
                            /^- (.*)/gm,
                            '<li class="ml-4 list-disc">$1</li>'
                          ),
                      }}
                    />
                  ))}
              </div>
              <div>
                <h3 className="font-jost text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <RotateCcw size={24} className="text-[#3b8c5e]" /> Returns
                  Policy
                </h3>
                {shippingAndReturnInfo.returns
                  .split("\n\n")
                  .map((paragraph, i) => (
                    <div
                      key={i}
                      className="text-sm text-text-secondary leading-relaxed mb-3"
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(
                            /^\d+\. (.*)/gm,
                            '<li class="ml-4 list-decimal">$1</li>'
                          ),
                      }}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
