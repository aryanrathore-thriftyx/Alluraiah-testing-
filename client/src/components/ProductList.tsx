import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryTabs from "./CategoryTabs";
import ProductCard from "./ProductCard";
import type { Product } from "@shared/schema";

// Import product images for display
import gulabjamunImage from "@assets/image (2).png";

export default function ProductList() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [activeFeaturedTab, setActiveFeaturedTab] = useState("new-arrivals");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: [
      activeCategory === "all"
        ? "/api/products"
        : `/api/products?category=${activeCategory}`,
    ],
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleProducts(8); // Reset visible products when changing category
  };

  const handleFeaturedTabChange = (tab: string) => {
    setActiveFeaturedTab(tab);
  };

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 8);
  };

  const filteredProducts = products || [];
  const hasMoreProducts = filteredProducts.length > visibleProducts;

  // Helper function to get featured products based on active tab
  const getFeaturedProducts = () => {
    if (!products) return [];

    // In a real app, we would have different properties for each type
    // For demonstration, we'll just use the first 4 products for each tab
    return products.slice(0, 4);
  };

  if (error) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            Failed to load products. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Stats section */}
        <div className="bg-gray-900 rounded-lg p-6 mb-12 grid grid-cols-3 text-center">
          <div className="border-r border-gray-700">
            <div className="text-3xl font-bold text-white">10+</div>
            <div className="text-sm text-gray-400">Awesome Branches</div>
          </div>
          <div className="border-r border-gray-700">
            <div className="text-3xl font-bold text-white">30+</div>
            <div className="text-sm text-gray-400">Expert Chef</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-sm text-gray-400">Years of Experience</div>
          </div>
        </div>

        {/* Featured Products Tabs */}
        <div className="mb-12">
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <Button
              variant={
                activeFeaturedTab === "new-arrivals" ? "default" : "outline"
              }
              className={
                activeFeaturedTab === "new-arrivals"
                  ? "bg-[#D5A964] text-white"
                  : "border-[#D5A964]/30 text-white"
              }
              onClick={() => handleFeaturedTabChange("new-arrivals")}
            >
              New Arrivals
            </Button>
            <Button
              variant={
                activeFeaturedTab === "today-special" ? "default" : "outline"
              }
              className={
                activeFeaturedTab === "today-special"
                  ? "bg-[#D5A964] text-white"
                  : "border-[#D5A964]/30 text-white"
              }
              onClick={() => handleFeaturedTabChange("today-special")}
            >
              Today Special
            </Button>
            <Button
              variant={activeFeaturedTab === "trending" ? "default" : "outline"}
              className={
                activeFeaturedTab === "trending"
                  ? "bg-[#D5A964] text-white"
                  : "border-[#D5A964]/30 text-white"
              }
              onClick={() => handleFeaturedTabChange("trending")}
            >
              Trending
            </Button>
            <Button
              variant={activeFeaturedTab === "seasonal" ? "default" : "outline"}
              className={
                activeFeaturedTab === "seasonal"
                  ? "bg-[#D5A964] text-white"
                  : "border-[#D5A964]/30 text-white"
              }
              onClick={() => handleFeaturedTabChange("seasonal")}
            >
              Seasonal
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-lg overflow-hidden shadow-lg"
                  >
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <div className="flex items-center mb-2">
                        <Skeleton className="h-4 w-20 mr-2" />
                        <Skeleton className="h-4 w-4" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))
              : getFeaturedProducts().map((product) => (
                  <div
                    key={product.id}
                    className="bg-card rounded-lg overflow-hidden shadow-lg"
                  >
                    <div className="relative">
                      <img
                        src={gulabjamunImage}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        {activeFeaturedTab === "new-arrivals"
                          ? "New"
                          : activeFeaturedTab === "today-special"
                            ? "Special"
                            : activeFeaturedTab === "trending"
                              ? "Hot"
                              : "Seasonal"}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg text-white">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${Number(product.rating) >= star ? "text-yellow-400" : "text-gray-400"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-400 text-sm ml-1">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">
                          ₹{product.price250g}/-
                        </span>
                        <Button
                          size="sm"
                          className="bg-[#D5A964] hover:bg-[#D5A964]/90 text-white rounded-full"
                        >
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          <div className="flex justify-center mt-6">
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map((dot) => (
                <span
                  key={dot}
                  className={`block h-2 w-2 rounded-full ${dot === 1 ? "bg-[#D5A964]" : "bg-gray-600"}`}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline Banner */}
        <div className="relative bg-gradient-to-r from-purple-800 to-indigo-900 rounded-lg p-8 mb-12 overflow-hidden text-center">
          <div className="absolute inset-0 bg-[url('@assets/1743149537931.png')] opacity-20 bg-center bg-cover"></div>
          <h3 className="text-xl text-white font-light italic relative z-10">
            Happiness is homemade and dipped in sugar!
          </h3>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              {[1, 2, 3].map((dot) => (
                <span
                  key={dot}
                  className={`block h-2 w-2 rounded-full ${dot === 1 ? "bg-white" : "bg-white/50"}`}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-0">
            <span className="border-b-2 border-primary pb-1">Menu List</span>
          </h2>
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? // Skeleton loading state
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg overflow-hidden custom-shadow"
                >
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </div>
                </div>
              ))
            : // Render available products with a limit
              filteredProducts
                .slice(0, visibleProducts)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
        </div>

        {hasMoreProducts && (
          <div className="text-center mt-10">
            <Button
              onClick={handleShowMore}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
