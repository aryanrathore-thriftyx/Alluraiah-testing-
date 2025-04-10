import { 
  Product, InsertProduct, 
  CartItem, InsertCartItem,
  User, InsertUser, 
  Review, InsertReview,
  ProductCategory
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: ProductCategory): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart methods
  getCartItems(userId: number): Promise<(CartItem & { product: Product })[]>;
  addCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: number): Promise<boolean>;
  
  // Review methods
  getProductReviews(productId: number): Promise<Review[]>;
  addReview(review: InsertReview): Promise<Review>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private reviews: Map<number, Review>;
  private currentUserId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentReviewId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.reviews = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentReviewId = 1;
    
    // Initialize with some sample products
    this.initializeProducts();
    this.initializeReviews();
  }

  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Gulab Jamun",
        category: ProductCategory.SWEETS,
        description: "Soft, spongy and melt-in-mouth gulab jamuns soaked in sugar syrup flavored with cardamom and rose water.",
        imageUrl: "https://images.unsplash.com/photo-1575793966773-7aa7033a2da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
        price250g: "199",
        price500g: "349",
        price1kg: "499",
        featured: true,
        rating: "5",
        reviewCount: 24
      },
      {
        name: "Kaju Katli",
        category: ProductCategory.SWEETS,
        description: "A popular Indian sweet made with cashew nuts and sugar, topped with edible silver foil.",
        imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
        price250g: "299",
        price500g: "449",
        price1kg: "599",
        featured: true,
        rating: "4.5",
        reviewCount: 36
      },
      {
        name: "Mysore Pak",
        category: ProductCategory.SWEETS,
        description: "A rich sweet made with generous amounts of ghee, sugar and gram flour. A specialty from Mysore.",
        imageUrl: "https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
        price250g: "249",
        price500g: "399",
        price1kg: "549",
        featured: true,
        rating: "5",
        reviewCount: 18
      },
      {
        name: "Jalebi",
        category: ProductCategory.SWEETS,
        description: "Crispy, pretzel-shaped sweets made from deep-fried batter soaked in sugar syrup. A popular Indian dessert.",
        imageUrl: "https://images.unsplash.com/photo-1601499979807-622c7c1704fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
        price250g: "179",
        price500g: "299",
        price1kg: "399",
        featured: true,
        rating: "4",
        reviewCount: 29
      },
      {
        name: "Rasgulla",
        category: ProductCategory.SWEETS,
        description: "Soft, spongy balls made from cottage cheese and semolina, soaked in light sugar syrup.",
        imageUrl: "https://images.unsplash.com/photo-1619420567276-380febe9d37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price250g: "199",
        price500g: "349",
        price1kg: "450",
        featured: false,
        rating: "4.5",
        reviewCount: 24
      },
      {
        name: "Kaju Burfi",
        category: ProductCategory.SWEETS,
        description: "A rich Indian fudge made with cashew nuts, sugar, and cardamom.",
        imageUrl: "https://images.unsplash.com/photo-1610508500445-a4592435e27e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price250g: "299",
        price500g: "499",
        price1kg: "650",
        featured: false,
        rating: "5",
        reviewCount: 36
      },
      {
        name: "Milk Cake",
        category: ProductCategory.SWEETS,
        description: "A dense, sweet cake made by slowly cooking milk and sugar together until they caramelize.",
        imageUrl: "https://images.unsplash.com/photo-1615280825886-070bc98d4d68?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price250g: "249",
        price500g: "399",
        price1kg: "550",
        featured: false,
        rating: "4",
        reviewCount: 18
      },
      {
        name: "Aloo Bhujia",
        category: ProductCategory.NAMKEENS,
        description: "A crispy, spicy Indian snack made with potatoes, besan (gram flour) and spices.",
        imageUrl: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price250g: "149",
        price500g: "249",
        price1kg: "350",
        featured: false,
        rating: "4.5",
        reviewCount: 29
      },
      {
        name: "Mango Pickle",
        category: ProductCategory.PICKLES,
        description: "A spicy, tangy pickle made with raw mangoes, spices and oil. Perfect accompaniment to Indian meals.",
        imageUrl: "https://images.unsplash.com/photo-1596042100322-62c28764ef0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price250g: "179",
        price500g: "299",
        price1kg: "399",
        featured: false,
        rating: "4.5",
        reviewCount: 16
      },
      {
        name: "Besan Ladoo",
        category: ProductCategory.SWEETS,
        description: "Sweet balls made from roasted gram flour, ghee and sugar, flavored with cardamom.",
        imageUrl: "https://images.unsplash.com/photo-1590690731758-7ead2c57a838?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        price250g: "199",
        price500g: "349",
        price1kg: "499",
        featured: false,
        rating: "4.5",
        reviewCount: 22
      }
    ];

    sampleProducts.forEach(product => this.createProduct(product));
  }

  private initializeReviews() {
    const sampleReviews: InsertReview[] = [
      {
        productId: 1,
        name: "Rajesh Kumar",
        rating: 5,
        comment: "Absolutely love the sweets from Alluraiah! Their Gulab Jamun brings back memories of my childhood. The quality and taste never disappoint.",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        productId: 2,
        name: "Vikram Singh",
        rating: 4,
        comment: "I ordered a box of assorted sweets for Diwali, and everyone was impressed! The packaging was beautiful, and the sweets tasted incredibly fresh.",
        imageUrl: "https://randomuser.me/api/portraits/men/75.jpg"
      }
    ];

    sampleReviews.forEach(review => this.addReview(review));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    // Ensure all required fields are set properly
    const productData = {
      ...insertProduct,
      featured: insertProduct.featured ?? false,
      reviewCount: insertProduct.reviewCount ?? 0
    };
    const product: Product = { ...productData, id };
    this.products.set(id, product);
    return product;
  }

  // Cart methods
  async getCartItems(userId: number): Promise<(CartItem & { product: Product })[]> {
    const cartItems = Array.from(this.cartItems.values()).filter(
      (item) => item.userId === userId
    );
    
    return cartItems.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
      }
      return { ...item, product };
    });
  }

  async addCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if the product exists
    const product = this.products.get(insertCartItem.productId);
    if (!product) {
      throw new Error(`Product with id ${insertCartItem.productId} not found`);
    }
    
    // Check if item already in cart with same size
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.userId === insertCartItem.userId && 
             item.productId === insertCartItem.productId &&
             item.size === insertCartItem.size
    );
    
    if (existingItem) {
      // Update quantity instead of adding a new item
      const newQuantity = existingItem.quantity + (insertCartItem.quantity || 1);
      return this.updateCartItem(existingItem.id, newQuantity) as Promise<CartItem>;
    }
    
    // Add new item with default quantity if not specified
    const id = this.currentCartItemId++;
    const cartItem: CartItem = { 
      ...insertCartItem, 
      quantity: insertCartItem.quantity || 1,
      id 
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedCartItem: CartItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedCartItem);
    return updatedCartItem;
  }

  async removeCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  // Review methods
  async getProductReviews(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.productId === productId
    );
  }

  async addReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    // Ensure imageUrl is null if not provided
    const reviewData = {
      ...insertReview,
      imageUrl: insertReview.imageUrl || null
    };
    const review: Review = { ...reviewData, id };
    this.reviews.set(id, review);
    
    // Update product review count and rating
    const product = this.products.get(insertReview.productId);
    if (product) {
      const productReviews = await this.getProductReviews(insertReview.productId);
      const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / productReviews.length;
      
      const updatedProduct: Product = { 
        ...product, 
        reviewCount: productReviews.length,
        rating: String(averageRating.toFixed(1)) // Convert to string with 1 decimal place
      };
      
      this.products.set(product.id, updatedProduct);
    }
    
    return review;
  }
}

export const storage = new MemStorage();
