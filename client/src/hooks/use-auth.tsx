import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define the User type
interface User {
  id: number;
  name: string;
  phone: string;
  otp: string; // Store OTP for validation
}

// Define the Auth Context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (phone: string, otp: string) => Promise<boolean>;
  register: (name: string, phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
  users: User[]; // All registered users
}

// Storage keys
const USERS_STORAGE_KEY = 'alluraiah_users';
const CURRENT_USER_KEY = 'alluraiah_current_user';

// Default OTP code for testing
const DEFAULT_OTP = '1234';

// Create the context with default values
const AuthContext = createContext<AuthContextType | null>(null);

// Create the Auth Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize with sample users
  const initializeUsers = (): User[] => {
    return [
      {
        id: 1,
        name: "Aryan",
        phone: "9876543210",
        otp: DEFAULT_OTP
      },
      {
        id: 2,
        name: "Riya",
        phone: "9876501234",
        otp: DEFAULT_OTP
      }
    ];
  };

  // Load users and current user on initial load
  useEffect(() => {
    // Load all registered users
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error('Failed to parse stored users:', error);
        // Initialize with sample users if parsing fails
        const initialUsers = initializeUsers();
        setUsers(initialUsers);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
      }
    } else {
      // Initialize with sample users if none exist
      const initialUsers = initializeUsers();
      setUsers(initialUsers);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    }
    
    // Load current user session
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    
    setIsLoading(false);
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
  }, [users]);

  // Save current user whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  // Login function
  const login = async (phone: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user with matching phone number
      const foundUser = users.find(u => u.phone === phone);
      
      if (!foundUser) {
        toast({
          title: "Login failed",
          description: "No account found with this phone number. Please register.",
          variant: "destructive",
        });
        return false;
      }
      
      // Validate OTP
      if (foundUser.otp !== otp) {
        toast({
          title: "Login failed",
          description: "Incorrect OTP. Please try again.",
          variant: "destructive",
        });
        return false;
      }
      
      // Save to state
      setUser(foundUser);
      
      toast({
        title: "Success!",
        description: `Welcome back, ${foundUser.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Unable to log in. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, phone: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if user with this phone already exists
      const existingUser = users.find(u => u.phone === phone);
      
      if (existingUser) {
        toast({
          title: "Registration failed",
          description: "An account with this phone number already exists.",
          variant: "destructive",
        });
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now(), // Generate a unique ID
        name: name,
        phone: phone,
        otp: DEFAULT_OTP // Set default OTP for testing
      };
      
      // Add user to users array
      setUsers(prevUsers => [...prevUsers, newUser]);
      
      // Log user in
      setUser(newUser);
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "Unable to create your account. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, users, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}