"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product, Category } from "@/types";

interface SearchResult {
  products: Product[];
  categories: Category[];
}

interface SearchBarProps {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  compact?: boolean;
}

export const SearchBar = ({
  className,
  inputClassName,
  placeholder = "Search products...",
  compact = false,
}: SearchBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = useCallback(async (term: string) => {
    if (!term.trim() || term.length < 2) {
      setResults(null);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(term)}&limit=5`,
      );
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      }
    } catch {
      // Silently fail suggestions
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleClear = () => {
    setQuery("");
    setResults(null);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Cleanup debounce
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <form onSubmit={handleSubmit} className="flex items-center h-full w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (results && query.length >= 2) setIsOpen(true);
          }}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent outline-none text-foreground placeholder-text-muted",
            inputClassName,
          )}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="px-2 text-text-muted hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="submit"
          className={cn(
            "text-text-secondary hover:text-primary transition-colors flex items-center justify-center",
            compact ? "px-3" : "px-5 h-full",
          )}
        >
          {isLoading ? (
            <Loader2 size={compact ? 18 : 22} className="animate-spin" />
          ) : (
            <Search size={compact ? 18 : 22} />
          )}
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {isOpen &&
        results &&
        (results.products.length > 0 || results.categories.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-xl z-50 overflow-hidden max-h-[400px] overflow-y-auto">
            {/* Category suggestions */}
            {results.categories.length > 0 && (
              <div className="p-3 border-b border-border/50">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">
                  Categories
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {results.categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop/${cat.ancestorSlugs?.length > 0 ? [...cat.ancestorSlugs, cat.slug].join("/") : cat.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-1.5 bg-surface text-xs font-medium text-foreground rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Product suggestions */}
            {results.products.length > 0 && (
              <div className="p-2">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-2 mb-1">
                  Products
                </p>
                {results.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/product/${product.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-surface transition-colors"
                  >
                    <div className="relative w-10 h-10 flex-shrink-0 bg-surface rounded overflow-hidden">
                      {product.images?.[0]?.url ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-contain"
                          sizes="40px"
                        />
                      ) : (
                        <div className="w-full h-full bg-surface" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {product.name}
                      </p>
                      <p className="text-xs font-semibold text-accent">
                        £{(product.price.amount / 100).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* View all link */}
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={() => setIsOpen(false)}
              className="block text-center py-3 text-sm font-semibold text-primary hover:bg-surface border-t border-border/50 transition-colors"
            >
              View all results for &ldquo;{query}&rdquo;
            </Link>
          </div>
        )}
    </div>
  );
};
