import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { ArrowRight, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/use-auth';

// Import assets
import googleIcon from '@assets/Group 76.png';
import appleIcon from '@assets/Group 75.png';

// Define form schema
const formSchema = z.object({
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  otp: z.string().min(4, {
    message: 'OTP must be at least 4 digits.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface SignInFormProps {
  onSuccess: () => void;
  switchToSignUp: () => void;
}

export default function SignInForm({ onSuccess, switchToSignUp }: SignInFormProps) {
  const { toast } = useToast();
  const { login, isLoading: authLoading } = useAuth();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      otp: '',
    },
  });

  const handleSendOTP = async () => {
    const phone = form.getValues('phone');
    if (!phone || phone.length < 10) {
      form.setError('phone', { 
        type: 'manual', 
        message: 'Please enter a valid phone number.' 
      });
      return;
    }

    setIsSubmitting(true);
    // In a real app, you would call an API to send OTP
    setTimeout(() => {
      setIsOtpSent(true);
      setIsSubmitting(false);
      toast({
        title: 'OTP Sent',
        description: 'Check your phone for the OTP code.',
      });
    }, 1000);
  };

  const onSubmit = async (data: FormValues) => {
    if (!isOtpSent) {
      await handleSendOTP();
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Call the login function from auth context
      const success = await login(data.phone, data.otp);
      
      if (success) {
        onSuccess();
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'An error occurred during login. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">Sign In</h2>
          <p className="text-gray-300">Into Your Account</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Phone number field with arrow button */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Enter phone number" 
                        {...field} 
                        className="pr-10 rounded-lg bg-white text-black border-none h-12" 
                        disabled={isOtpSent || isLoading}
                      />
                      {!isOtpSent && (
                        <button 
                          type="button"
                          onClick={handleSendOTP}
                          disabled={isLoading}
                          className="absolute right-0 top-0 bottom-0 bg-[#D5A964] text-black font-medium rounded-r-lg w-12 flex items-center justify-center"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* OTP field (only shown after sending OTP) */}
            {isOtpSent && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Enter OTP here" 
                        {...field} 
                        className="rounded-lg bg-white text-black border-none h-12"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            )}

            {/* Sign In Button */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-[#D5A964] hover:bg-[#c69a55] text-black font-medium rounded-lg mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : isOtpSent ? (
                'Sign In'
              ) : (
                'Send OTP'
              )}
            </Button>
          </form>
        </Form>

        {/* Social login options */}
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-3">or sign in with</p>
          <div className="flex justify-center space-x-4">
            <button className="p-2 bg-[#333333] rounded-lg">
              <img src={googleIcon} alt="Google" className="w-6 h-6" />
            </button>
            <button className="p-2 bg-[#333333] rounded-lg">
              <img src={appleIcon} alt="Apple" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Switch to sign up link */}
        <div className="text-center text-sm">
          <p className="text-gray-300">
            Don't have an account?{' '}
            <button 
              onClick={switchToSignUp} 
              className="text-blue-400 hover:underline"
            >
              Signup Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}