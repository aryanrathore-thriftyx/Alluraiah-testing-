import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from "lucide-react";

// Import logo
import logoImg from "@assets/Alluraiah Sweets Logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="h-20 mb-4">
              <img 
                src={logoImg} 
                alt="Alluraiah Sweets Logo" 
                className="h-full object-contain"
              />
            </div>
            <p className="text-muted-foreground mb-4">
              Authentic Indian sweets and snacks, crafted with traditional recipes and premium ingredients since 1992.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-primary/80 transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary/80 transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary/80 transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary/80 transition duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition duration-300">Home</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition duration-300">Shop</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition duration-300">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition duration-300">Contact</Link></li>
              <li><Link href="/faqs" className="text-muted-foreground hover:text-primary transition duration-300">FAQs</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/shop?category=Sweets" className="text-muted-foreground hover:text-primary transition duration-300">Sweets</Link></li>
              <li><Link href="/shop?category=Namkeens" className="text-muted-foreground hover:text-primary transition duration-300">Namkeens</Link></li>
              <li><Link href="/shop?category=Pickles" className="text-muted-foreground hover:text-primary transition duration-300">Pickles</Link></li>
              <li><Link href="/shop?category=Gift Boxes" className="text-muted-foreground hover:text-primary transition duration-300">Gift Boxes</Link></li>
              <li><Link href="/shop?category=Specials" className="text-muted-foreground hover:text-primary transition duration-300">Festival Specials</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-primary mt-1 mr-2 flex-shrink-0" size={18} />
                <span className="text-muted-foreground">123 Sweet Street, Hyderabad, Telangana, India - 500001</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-primary mr-2 flex-shrink-0" size={18} />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-primary mr-2 flex-shrink-0" size={18} />
                <span className="text-muted-foreground">info@alluraiahsweets.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="text-primary mr-2 flex-shrink-0" size={18} />
                <span className="text-muted-foreground">Open Daily: 9AM - 9PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-muted pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {currentYear} Alluraiah Sweets. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition duration-300">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition duration-300">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition duration-300">Shipping & Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
