'use client';

import React from 'react';

interface CategoryTopbarProps {
  totalResults: number;
  categoryName: string;
}

export function CategoryTopbar({ totalResults, categoryName }: CategoryTopbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white px-5 py-3">
      <div className="flex items-center gap-4">
        <p className="text-sm text-text-secondary font-jost">
          Showing 1–{Math.min(12, totalResults)} of {totalResults} results
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm font-jost">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-text-secondary hidden md:block">Sort by:</label>
          <select 
            id="sort" 
            className="border border-border-light rounded-sm px-3 py-1.5 bg-white text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
            defaultValue="default"
          >
            <option value="default">Default sorting</option>
            <option value="popularity">Sort by popularity</option>
            <option value="rating">Sort by average rating</option>
            <option value="latest">Sort by latest</option>
            <option value="price-low">Sort by price: low to high</option>
            <option value="price-high">Sort by price: high to low</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
           <label htmlFor="show" className="text-text-secondary hidden md:block">Show:</label>
           <select 
             id="show" 
             className="border border-border-light rounded-sm px-3 py-1.5 bg-white text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer w-20"
             defaultValue="12"
           >
             <option value="12">12</option>
             <option value="24">24</option>
             <option value="36">36</option>
           </select>
        </div>
      </div>
    </div>
  );
}
