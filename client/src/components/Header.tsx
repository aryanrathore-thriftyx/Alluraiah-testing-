import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMediaQuery } from "@/hooks/use-mobile";
import { ShoppingBag, User, Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import UserProfileDropdown from "./UserProfileDropdown";
import AuthModal from "./auth/AuthModal";

// Import logo from assets
import logoImg from "@assets/Alluraiah Sweets Logo.png";

export default function Header() {
  const [location] = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1); // This would come from a cart context
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openAuthModal = (tab: 'signin' | 'signup') => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Offers", path: "/offers" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-16">
              <img 
                src={logoImg} 
                alt="Alluraiah Sweets Logo" 
                className="h-full object-contain"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`text-white font-medium py-1 px-1 transition duration-300 ${
                    location === link.path 
                      ? "border-b-2 border-[#D4AF37]" 
                      : "hover:text-[#D4AF37]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            {!isMobile && <SearchBar />}
            
            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="relative text-white hover:text-[#D4AF37] transition duration-300"
            >
              <Link href="/cart">
                <ShoppingBag />
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            </Button>
            
            {/* Auth Buttons removed */}
            
            {/* User Profile Dropdown */}
            <UserProfileDropdown />
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu} 
                className="text-white"
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="bg-black/90 backdrop-blur-md absolute w-full left-0 py-4 shadow-md">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              <SearchBar className="mb-4" />
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-white font-medium py-1 pl-2 transition duration-300 ${
                    location === link.path 
                      ? "border-l-2 border-[#D4AF37]" 
                      : "hover:text-[#D4AF37]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {/* Auth buttons removed from mobile menu */}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultTab={authTab}
      />
    </>
  );
}
