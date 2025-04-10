import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'wouter';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AuthPage() {
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  // Extract tab from URL hash if present
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'signup') {
      setActiveTab('signup');
    } else if (hash === 'signin') {
      setActiveTab('signin');
    }
  }, []);

  // Change URL hash when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value as 'signin' | 'signup');
    window.location.hash = value;
  };

  const handleAuthSuccess = () => {
    // Navigate to home page on successful authentication
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Sweet image */}
          <div className="w-full md:w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(@assets/image_1744206208863.png)' }}>
            <div className="h-40 md:h-full"></div>
          </div>
          
          {/* Right side - Auth forms */}
          <div className="w-full md:w-1/2 p-8 bg-[#333333] text-white">
            <div className="mb-6 flex justify-between items-center">
              <button 
                onClick={() => setLocation('/')}
                className="text-white hover:text-[#D5A964] flex items-center"
              >
                <img src="@assets/Back.png" alt="Back" className="w-6 h-6 mr-1" />
                Back
              </button>
              <img 
                src="@assets/Alluraiah Sweets Logo 1.png" 
                alt="Alluraiah Sweets" 
                className="h-12"
              />
            </div>
            
            {activeTab === 'signin' ? (
              <SignInForm 
                onSuccess={handleAuthSuccess} 
                switchToSignUp={() => handleTabChange('signup')}
              />
            ) : (
              <SignUpForm 
                onSuccess={handleAuthSuccess} 
                switchToSignIn={() => handleTabChange('signin')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}