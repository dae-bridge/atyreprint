'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { categoryGroups, getProductsByGroupSlug, ProductData } from '@/lib/products';

// Helper to check if a path is active
const useIsActive = (href: string) => {
  const pathname = usePathname();
  return pathname === href;
};

// --- Mock Data for Visuals ---
const COLORS = [
  { name: 'Blue', slug: 'blue', count: 0 },
  { name: 'Brown', slug: 'brown', count: 0 },
  { name: 'Green', slug: 'green', count: 0 },
  { name: 'Orange', slug: 'orange', count: 0 },
  { name: 'Pink', slug: 'pink', count: 0 },
  { name: 'Purple', slug: 'purple', count: 0 },
  { name: 'Red', slug: 'red', count: 0 },
  { name: 'Yellow', slug: 'yellow', count: 0 },
];

const BRANDS = [
  { name: 'Cartify', count: 2 },
  { name: 'EcomZone', count: 2 },
  { name: 'QuickCart', count: 1 },
  { name: 'SmartShop', count: 2 },
  { name: 'TrendMart', count: 1 },
];

const PRICE_RANGES = [
  { label: 'All', value: 'all' },
  { label: '$0 - $20', value: '0-20' },
  { label: '$20 - $40', value: '20-40' },
  { label: '$40 - $60', value: '40-60' },
];

const RATINGS = [
  { stars: 5, count: 8 },
  { stars: 4, count: 5 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];
// ----------------------------

interface CategorySidebarProps {
  currentCategorySlug?: string;
}

export function CategorySidebar({ currentCategorySlug }: CategorySidebarProps) {
  const [priceRange, setPriceRange] = useState('all');
  
  // Get top deal products (just mock with latest products for now)
  const topDeals = getProductsByGroupSlug('clothing').slice(0, 3) || [];

  return (
    <aside className="w-full lg:w-[260px] flex-shrink-0 space-y-8 font-jost text-[15px]">
      
      {/* 1. Shop By Categories */}
      <div className="bg-white p-5">
        <h3 className="font-bold text-lg mb-4 text-foreground uppercase tracking-wide border-b border-border-light pb-3">
          Shop By Categories
        </h3>
        <ul className="space-y-3">
          {Object.values(categoryGroups).map((group) => (
            <li key={group.name} className="flex flex-col">
              <Link 
                href={`/shop/${Object.keys(categoryGroups).find(k => categoryGroups[k] === group)}`}
                className="text-text hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300 font-medium"
              >
                {group.name}
              </Link>
              {/* Optional: Show sub-categories if active, or keep simple like reference */}
              {group.categories.length > 0 && (
                <ul className="pl-4 mt-2 space-y-2 border-l border-border-light ml-1">
                  {group.categories.map((cat) => (
                    <li key={cat.slug}>
                       <Link 
                        href={`/shop/${Object.keys(categoryGroups).find(k => categoryGroups[k] === group)}/${cat.slug}`}
                        className={`text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 before:content-['-'] before:text-text-muted ${currentCategorySlug === cat.slug ? 'text-primary font-medium' : 'text-text-secondary'}`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Filter By Color */}
      <div className="bg-white p-5">
        <h3 className="font-bold text-lg mb-4 text-foreground uppercase tracking-wide border-b border-border-light pb-3">
          Filter By Color
        </h3>
        <ul className="space-y-2.5 h-[200px] overflow-y-auto pr-2 custom-scrollbar">
          {COLORS.map((color) => (
            <li key={color.name}>
              <button 
                className="flex items-center gap-3 w-full text-left group hover:text-primary transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <div 
                  className="w-4 h-4 rounded-full border border-border shadow-sm group-hover:scale-110 transition-transform" 
                  style={{ backgroundColor: color.slug }} 
                />
                <span className="text-text-secondary group-hover:text-primary transition-colors flex-1">{color.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Brands */}
      <div className="bg-white p-5">
        <h3 className="font-bold text-lg mb-4 text-foreground uppercase tracking-wide border-b border-border-light pb-3">
          Brands
        </h3>
        <ul className="space-y-3">
          {BRANDS.map((brand) => (
             <li key={brand.name}>
             <label className="flex items-center gap-3 cursor-pointer group">
               <input 
                 type="checkbox" 
                 className="w-4 h-4 rounded border-border-light text-primary focus:ring-primary accent-primary" 
               />
               <span className="text-text-secondary group-hover:text-primary transition-colors flex-1">
                  {brand.name} <span className="text-text-muted text-sm ml-1">({brand.count})</span>
               </span>
             </label>
           </li>
          ))}
        </ul>
      </div>

      {/* 4. Price Filter */}
      <div className="bg-white p-5">
        <h3 className="font-bold text-lg mb-4 text-foreground uppercase tracking-wide border-b border-border-light pb-3">
          Price Filter
        </h3>
        <ul className="space-y-2">
           {PRICE_RANGES.map((range) => (
             <li key={range.value}>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio"
                    name="price_range"
                    value={range.value}
                    checked={priceRange === range.value}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary accent-primary" 
                  />
                  <span className={`transition-colors ${priceRange === range.value ? 'text-primary font-medium' : 'text-text-secondary group-hover:text-primary'}`}>
                    {range.label}
                  </span>
                </label>
             </li>
           ))}
        </ul>
      </div>

      {/* 5. Average Rating */}
      <div className="bg-white p-5">
        <h3 className="font-bold text-lg mb-4 text-foreground uppercase tracking-wide border-b border-border-light pb-3">
          Average Rating
        </h3>
        <ul className="space-y-3">
           {RATINGS.map((rating) => (
             <li key={rating.stars}>
               <button className="flex items-center gap-2 group w-full text-left" onClick={(e) => e.preventDefault()}>
                 <div className="flex text-[#ffb503] text-sm">
                   {[...Array(5)].map((_, i) => (
                     <span key={i} className={i < rating.stars ? "opacity-100" : "opacity-30"}>★</span>
                   ))}
                 </div>
                 <span className="text-text-muted text-sm group-hover:text-primary transition-colors">({rating.count})</span>
               </button>
             </li>
           ))}
        </ul>
      </div>
      
      {/* 6. Top Deal Products */}
      {topDeals.length > 0 && (
        <div className="bg-white p-5">
          <h3 className="font-bold text-lg mb-4 text-foreground uppercase tracking-wide border-b border-border-light pb-3">
            Top Deal Products
          </h3>
          <div className="space-y-4">
            {topDeals.map((product) => (
              <Link key={product.id} href={`/shop/product/${product.slug}`} className="flex gap-4 group">
                <div className="w-[70px] h-[70px] flex-shrink-0 relative border border-border-light rounded-sm overflow-hidden p-1">
                   <Image 
                     src={product.images[0]} 
                     alt={product.name} 
                     fill 
                     className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-text-secondary mb-1 truncate group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex text-[#ffb503] text-xs mb-1">
                    {[...Array(5)].map((_, i) => (
                       <span key={i}>★</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">£{product.price.toFixed(2)}</span>
                    {product.compareAtPrice && (
                       <span className="text-xs text-text-muted line-through">£{product.compareAtPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
}
