import type { Product, ProductCategory } from "@shared/schema";

/**
 * Format price to Indian Rupee format
 */
export function formatPrice(price: number | string): string {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

/**
 * Get price based on selected size
 */
export function getPriceBySize(product: Product, size: string): number {
  switch (size) {
    case "250g":
      return Number(product.price250g);
    case "500g":
      return Number(product.price500g);
    case "1kg":
      return Number(product.price1kg);
    default:
      return Number(product.price250g);
  }
}

/**
 * Filter products by category
 */
export function filterProductsByCategory(products: Product[], category: string): Product[] {
  if (category === "all") {
    return products;
  }
  return products.filter(product => product.category === category);
}

/**
 * Sort products by various criteria
 */
export function sortProducts(products: Product[], sortBy: string): Product[] {
  const productsCopy = [...products];
  
  switch (sortBy) {
    case "price-asc":
      return productsCopy.sort((a, b) => Number(a.price250g) - Number(b.price250g));
    case "price-desc":
      return productsCopy.sort((a, b) => Number(b.price250g) - Number(a.price250g));
    case "rating-desc":
      return productsCopy.sort((a, b) => Number(b.rating) - Number(a.rating));
    case "name-asc":
      return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return productsCopy;
  }
}

/**
 * Get product categories for display
 */
export function getProductCategories(): { id: string; name: string }[] {
  return [
    { id: "all", name: "All" },
    { id: ProductCategory.SWEETS, name: "Sweets" },
    { id: ProductCategory.NAMKEENS, name: "Namkeens" },
    { id: ProductCategory.PICKLES, name: "Pickles" },
    { id: ProductCategory.SPECIALS, name: "Specials" }
  ];
}

/**
 * Calculate discount percentage between original and discounted price
 */
export function calculateDiscountPercentage(original: number, discounted: number): number {
  if (original <= 0) return 0;
  const discount = ((original - discounted) / original) * 100;
  return Math.round(discount);
}

/**
 * Get related products based on current product category
 */
export function getRelatedProducts(products: Product[], currentProduct: Product, limit = 4): Product[] {
  return products
    .filter(product => 
      product.id !== currentProduct.id && product.category === currentProduct.category
    )
    .slice(0, limit);
}
