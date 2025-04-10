import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { useToast } from "@/hooks/use-toast";
import { 
  Star, 
  StarHalf, 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product, Review } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function ProductDetail() {
  const { toast } = useToast();
  const [_, params] = useRoute<{ id: string }>("/product/:id");
  const productId = parseInt(params?.id || "0");

  const [selectedSize, setSelectedSize] = useState<string>("250g");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  // Fetch product details
  const { data: product, isLoading: productLoading, error: productError } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });

  // Fetch product reviews
  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: [`/api/products/${productId}/reviews`],
    enabled: !!productId,
  });

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(current => {
      const newQuantity = increment ? current + 1 : current - 1;
      return Math.max(1, newQuantity); // Ensure quantity is at least 1
    });
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      setAddingToCart(true);
      
      // Add item to cart API request
      await apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity: quantity,
        size: selectedSize
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} (${selectedSize}) has been added to your cart.`,
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="text-primary" fill="#D4AF37" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="text-primary" fill="#D4AF37" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-400" />);
    }
    
    return stars;
  };

  // Calculate current price based on selected size
  const getCurrentPrice = () => {
    if (!product) return 0;
    
    switch (selectedSize) {
      case "250g": return product.price250g;
      case "500g": return product.price500g;
      case "1kg": return product.price1kg;
      default: return product.price250g;
    }
  };

  if (productError) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-red-500">Product not found or an error occurred.</p>
        <Button variant="outline" className="mt-4" asChild>
          <a href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {product && (
        <Helmet>
          <title>{product.name} | Alluraiah Sweets</title>
          <meta name="description" content={product.description} />
        </Helmet>
      )}
      
      {/* Back button */}
      <div className="mb-6">
        <Button variant="outline" asChild>
          <a href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </a>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-card rounded-lg overflow-hidden custom-shadow">
          {productLoading ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            <img 
              src={product?.imageUrl} 
              alt={product?.name} 
              className="w-full h-[400px] object-cover"
            />
          )}
        </div>
        
        {/* Product Details */}
        <div>
          {productLoading ? (
            <>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="flex items-center mb-4">
                <Skeleton className="h-5 w-28 mr-4" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4 mb-6" />
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-4">
                  {product && renderStars(product.rating)}
                </div>
                <span className="text-muted-foreground">
                  {product?.reviewCount} reviews
                </span>
              </div>
              
              <p className="text-muted-foreground mb-6">{product?.description}</p>
              
              <div className="text-2xl font-bold mb-6">
                ₹{getCurrentPrice()}/-
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Size</p>
                <div className="flex space-x-4">
                  <Button 
                    variant={selectedSize === "250g" ? "default" : "outline"} 
                    className={selectedSize === "250g" ? "bg-primary text-primary-foreground" : ""}
                    onClick={() => setSelectedSize("250g")}
                  >
                    250 Gm
                  </Button>
                  <Button 
                    variant={selectedSize === "500g" ? "default" : "outline"} 
                    className={selectedSize === "500g" ? "bg-primary text-primary-foreground" : ""}
                    onClick={() => setSelectedSize("500g")}
                  >
                    1/2 Kg
                  </Button>
                  <Button 
                    variant={selectedSize === "1kg" ? "default" : "outline"} 
                    className={selectedSize === "1kg" ? "bg-primary text-primary-foreground" : ""}
                    onClick={() => setSelectedSize("1kg")}
                  >
                    1 Kg
                  </Button>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <p className="text-sm text-muted-foreground mr-4">Quantity</p>
                <div className="flex items-center border border-input rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleQuantityChange(false)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleQuantityChange(true)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                >
                  <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-6">
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Product Description</h2>
            {productLoading ? (
              <>
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-3/4 mb-2" />
              </>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">{product?.description}</p>
                <h3 className="font-semibold mt-4 mb-2">Ingredients</h3>
                <p className="text-muted-foreground">Premium quality milk, sugar, cardamom, and other traditional ingredients sourced from authentic suppliers.</p>
                <h3 className="font-semibold mt-4 mb-2">Storage Instructions</h3>
                <p className="text-muted-foreground">Store in a cool, dry place. Refrigerate after opening and consume within 7 days for best taste and quality.</p>
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
            
            {reviewsLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="border-b border-border pb-4 mb-4">
                  <div className="flex items-center mb-2">
                    <Skeleton className="h-10 w-10 rounded-full mr-3" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))
            ) : reviews && reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id} className="border-b border-border pb-4 mb-4 last:border-0">
                  <div className="flex items-center mb-2">
                    <img 
                      src={review.imageUrl || "https://randomuser.me/api/portraits/men/32.jpg"} 
                      alt={review.name} 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">This product has no reviews yet.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="shipping" className="mt-6">
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Shipping & Delivery</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Delivery Time</h3>
                <p className="text-muted-foreground">Orders are typically processed within 24 hours and delivered within 2-5 business days, depending on your location.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Shipping Charges</h3>
                <p className="text-muted-foreground">Free shipping on orders above ₹999. A nominal fee of ₹49 is applicable for orders below this amount.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Returns & Refunds</h3>
                <p className="text-muted-foreground">Due to the perishable nature of our products, we do not accept returns. However, if you receive damaged goods, please contact our customer service within 24 hours of delivery.</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
