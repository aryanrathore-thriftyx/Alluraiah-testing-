import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingCart, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>("250g");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { id, name, imageUrl, rating, price250g, price500g, price1kg } = product;

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      
      // Determine the price based on selected size
      const sizeToPrice = {
        "250g": product.price250g,
        "500g": product.price500g,
        "1kg": product.price1kg
      };
      
      // Add item to cart API request
      await apiRequest("POST", "/api/cart", {
        productId: id,
        quantity: 1,
        size: selectedSize
      });
      
      toast({
        title: "Added to cart",
        description: `${name} (${selectedSize}) has been added to your cart.`,
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Render stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="text-primary text-sm" fill="#D4AF37" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="text-primary text-sm" fill="#D4AF37" />);
    }
    
    return stars;
  };

  return (
    <div className="product-card bg-card rounded-lg overflow-hidden custom-shadow transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Link href={`/product/${id}`}>
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <div className="absolute top-3 right-3">
          <Button 
            variant="secondary" 
            size="icon" 
            className="bg-secondary/80 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition duration-300"
          >
            <Heart size={16} />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/product/${id}`}>
            <h3 className="font-medium text-lg hover:text-primary transition-colors">{name}</h3>
          </Link>
          <div className="flex items-center">
            {renderStars()}
          </div>
        </div>
        
        {featured && (
          <div className="flex flex-wrap gap-2 mb-3">
            <Button 
              variant={selectedSize === "250g" ? "default" : "outline"} 
              size="sm"
              className={`rounded-full text-xs px-3 py-1 h-auto ${
                selectedSize === "250g" 
                  ? "bg-primary/20 hover:bg-primary/30 text-primary" 
                  : "border-primary/30 hover:border-primary/50"
              }`}
              onClick={() => setSelectedSize("250g")}
            >
              250 Gm
            </Button>
            <Button 
              variant={selectedSize === "500g" ? "default" : "outline"} 
              size="sm"
              className={`rounded-full text-xs px-3 py-1 h-auto ${
                selectedSize === "500g" 
                  ? "bg-primary/20 hover:bg-primary/30 text-primary" 
                  : "border-primary/30 hover:border-primary/50"
              }`}
              onClick={() => setSelectedSize("500g")}
            >
              1/2 Kg
            </Button>
            <Button 
              variant={selectedSize === "1kg" ? "default" : "outline"} 
              size="sm"
              className={`rounded-full text-xs px-3 py-1 h-auto ${
                selectedSize === "1kg" 
                  ? "bg-primary/20 hover:bg-primary/30 text-primary" 
                  : "border-primary/30 hover:border-primary/50"
              }`}
              onClick={() => setSelectedSize("1kg")}
            >
              1 Kg
            </Button>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            ₹{selectedSize === "250g" 
                ? price250g 
                : selectedSize === "500g" 
                  ? price500g 
                  : price1kg}/-
          </span>
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-secondary text-primary hover:bg-primary hover:text-primary-foreground transition duration-300"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className="mr-1 h-4 w-4" /> Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
