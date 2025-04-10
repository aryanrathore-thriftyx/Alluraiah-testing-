import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowLeft, 
  ArrowRight,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/products";
import { apiRequest } from "@/lib/queryClient";
import type { CartItem, Product } from "@shared/schema";

// Extended cart item with product info
type CartItemWithProduct = CartItem & { 
  product: Product 
};

export default function Cart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  
  // Fetch cart items
  const { data: cartItems, isLoading, error } = useQuery<CartItemWithProduct[]>({
    queryKey: ['/api/cart'],
  });
  
  // Update cart item quantity
  const updateCartMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      return apiRequest("PATCH", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update cart. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Remove cart item
  const removeCartMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Update item quantity
  const handleUpdateQuantity = (itemId: number, currentQty: number, increment: boolean) => {
    const newQuantity = increment ? currentQty + 1 : Math.max(1, currentQty - 1);
    if (newQuantity !== currentQty) {
      updateCartMutation.mutate({ id: itemId, quantity: newQuantity });
    }
  };
  
  // Remove item from cart
  const handleRemoveItem = (itemId: number) => {
    removeCartMutation.mutate(itemId);
  };
  
  // Apply coupon code
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, you'd validate the coupon with the backend
    if (couponCode.toUpperCase() === "SWEET10") {
      setCouponApplied(true);
      toast({
        title: "Coupon applied",
        description: "10% discount has been applied to your order.",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired.",
        variant: "destructive",
      });
    }
  };
  
  // Calculate order summary
  const calculateOrderSummary = () => {
    if (!cartItems || cartItems.length === 0) {
      return { subtotal: 0, discount: 0, shipping: 0, total: 0 };
    }
    
    // Calculate subtotal based on product price and size
    const subtotal = cartItems.reduce((sum, item) => {
      let itemPrice;
      switch (item.size) {
        case "250g": itemPrice = item.product.price250g; break;
        case "500g": itemPrice = item.product.price500g; break;
        case "1kg": itemPrice = item.product.price1kg; break;
        default: itemPrice = item.product.price250g;
      }
      return sum + (Number(itemPrice) * item.quantity);
    }, 0);
    
    // Apply discount if coupon is applied
    const discountRate = couponApplied ? 0.1 : 0; // 10% discount
    const discount = subtotal * discountRate;
    
    // Calculate shipping (free for orders over ₹999)
    const shipping = subtotal > 999 ? 0 : 49;
    
    // Calculate total
    const total = subtotal - discount + shipping;
    
    return { subtotal, discount, shipping, total };
  };
  
  const { subtotal, discount, shipping, total } = calculateOrderSummary();
  const isCartEmpty = !cartItems || cartItems.length === 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Your Cart | Alluraiah Sweets</title>
        <meta name="description" content="Review and checkout your selected sweet treats from Alluraiah Sweets." />
      </Helmet>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Button variant="outline" asChild>
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
      </div>
      
      {error ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted" />
          <h2 className="text-2xl font-medium mb-2">Error Loading Cart</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't load your cart items. Please try again later.
          </p>
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      ) : isLoading ? (
        // Loading skeleton
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg p-4 flex items-center gap-4">
                <Skeleton className="h-20 w-20 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div>
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            ))}
          </div>
          <div>
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      ) : isCartEmpty ? (
        // Empty cart state
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted" />
          <h2 className="text-2xl font-medium mb-2">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any sweet treats to your cart yet.
          </p>
          <Button asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        // Cart with items
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-card rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4 relative">
                {/* Product Image */}
                <Link href={`/product/${item.productId}`}>
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="h-20 w-20 object-cover rounded-md"
                  />
                </Link>
                
                {/* Product Info */}
                <div className="flex-1 text-center sm:text-left">
                  <Link href={`/product/${item.productId}`}>
                    <h3 className="font-medium hover:text-primary transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                  <p className="font-medium">
                    {formatPrice(
                      item.size === "250g" 
                        ? item.product.price250g 
                        : item.size === "500g" 
                          ? item.product.price500g 
                          : item.product.price1kg
                    )}
                  </p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity, false)}
                    disabled={item.quantity <= 1 || updateCartMutation.isPending}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity, true)}
                    disabled={updateCartMutation.isPending}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                {/* Item Total */}
                <div className="text-right">
                  <p className="font-bold">
                    {formatPrice(
                      (item.size === "250g" 
                        ? Number(item.product.price250g) 
                        : item.size === "500g" 
                          ? Number(item.product.price500g) 
                          : Number(item.product.price1kg)) * item.quantity
                    )}
                  </p>
                </div>
                
                {/* Remove Button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 absolute top-2 right-2"
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={removeCartMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            {/* Coupon Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter coupon code" 
                  className="flex-1 px-3 py-2 rounded-l-md bg-background border border-input focus:outline-none focus:ring-1 focus:ring-primary"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                />
                <Button 
                  variant={couponApplied ? "secondary" : "default"}
                  disabled={couponApplied}
                  onClick={handleApplyCoupon}
                >
                  {couponApplied ? "Applied" : "Apply"}
                </Button>
              </div>
              {couponApplied && (
                <p className="text-green-500 text-sm mt-1">Coupon "SWEET10" applied successfully!</p>
              )}
            </div>
            
            {/* Summary Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              {couponApplied && (
                <div className="flex justify-between text-green-500">
                  <span>Discount (10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping > 0 ? formatPrice(shipping) : "Free"}</span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              {subtotal < 999 && shipping > 0 && (
                <p className="text-sm text-muted-foreground">
                  Add items worth {formatPrice(999 - subtotal)} more for free shipping!
                </p>
              )}
            </div>
            
            {/* Checkout Button */}
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
            </Button>
            
            {/* Continue Shopping */}
            <div className="mt-4 text-center">
              <Link href="/shop" className="text-primary hover:underline inline-flex items-center text-sm">
                <ArrowRight className="mr-1 h-3 w-3" /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
