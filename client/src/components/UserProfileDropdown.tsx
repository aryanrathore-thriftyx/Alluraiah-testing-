import React, { useState, useRef, useEffect } from 'react';
import { User, ShoppingBag, BookmarkIcon, Bell, Ticket, LogOut, X } from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

// Define menu item type
interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle logout
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    setIsOpen(false);
  };

  // Different menu items based on login state
  const loggedInMenuItems: MenuItem[] = [
    { label: `Login User (${user?.name})`, icon: <User className="w-4 h-4 mr-2" />, href: '/profile' },
    { label: 'Saved Items', icon: <BookmarkIcon className="w-4 h-4 mr-2" />, href: '/saved' },
    { label: 'Notifications', icon: <Bell className="w-4 h-4 mr-2" />, href: '/notifications' },
    { label: 'Coupons', icon: <Ticket className="w-4 h-4 mr-2" />, href: '/coupons' },
    { 
      label: 'Logout', 
      icon: <LogOut className="w-4 h-4 mr-2" />, 
      href: '#',
      onClick: handleLogout
    },
  ];

  const loggedOutMenuItems: MenuItem[] = [
    { label: 'Sign In', icon: <User className="w-4 h-4 mr-2" />, href: '/auth#signin' },
    { label: 'Sign Up', icon: <User className="w-4 h-4 mr-2" />, href: '/auth#signup' },
  ];

  const menuItems = user ? loggedInMenuItems : loggedOutMenuItems;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-full bg-white p-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <User className="w-5 h-5 text-gray-700" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-50 overflow-hidden">
          <div className="py-1 relative">
            <button 
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100" 
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className="py-1 border-b last:border-b-0 border-gray-100">
                  {item.onClick ? (
                    <a 
                      href={item.href} 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={item.onClick}
                    >
                      {item.icon && item.icon}
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      href={item.href} 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon && item.icon}
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}