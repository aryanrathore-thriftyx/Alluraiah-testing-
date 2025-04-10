import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { Skeleton } from "@/components/ui/skeleton";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import type { Product } from "@shared/schema";

export default function Shop() {
  const [location] = useLocation();
  const queryParams = new URLSearchParams(location.split("?")[1] || "");
  const initialCategory = queryParams.get("category") || "all";
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Update URL when category changes
  useEffect(() => {
    const newUrl = activeCategory === "all" 
      ? "/shop" 
      : `/shop?category=${activeCategory}`;
    
    window.history.replaceState(null, "", newUrl);
  }, [activeCategory]);

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: [activeCategory === "all" ? '/api/products' : `/api/products?category=${activeCategory}`],
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Shop | Alluraiah Sweets</title>
        <meta name="description" content="Browse our collection of authentic Indian sweets, namkeens, and traditional pickles." />
      </Helmet>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Our Products</h1>
      
      <div className="mb-8">
        <CategoryTabs 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
      </div>
      
      {error ? (
        <div className="text-center text-red-500 py-8">
          Failed to load products. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden custom-shadow">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-24 mb-3" />
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            products?.map((product) => (
              <ProductCard key={product.id} product={product} featured={true} />
            ))
          )}
        </div>
      )}
      
      {!isLoading && products?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
