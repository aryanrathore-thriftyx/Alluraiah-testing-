import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Review } from "@shared/schema";

export default function Testimonials() {
  // We're using a generic review endpoint here, but you could customize this
  const { data: reviews, isLoading, error } = useQuery<Review[]>({
    queryKey: ['/api/products/1/reviews'],
  });

  if (error) {
    return null; // Don't show section if there's an error
  }

  // Hardcoded testimonials to match the design
  const testimonials = [
    {
      name: "Rajesh Kumar",
      text: "Authentic taste that reminds me of my childhood!",
      avatar: "/avatars/avatar-1.jpg"
    },
    {
      name: "Ramesh Kumar",
      text: "Authentic taste that reminds me of my childhood!",
      avatar: "/avatars/avatar-2.jpg"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="w-full max-w-xl mx-auto">
            <div className="flex items-center justify-center my-2">
              <div className="h-px bg-gray-400 flex-grow"></div>
              <div className="px-4 text-xl font-semibold text-black">Hear from Customer</div>
              <div className="h-px bg-gray-400 flex-grow"></div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="max-w-md bg-white shadow-lg rounded-full px-8 py-6 flex items-center">
                <Skeleton className="w-16 h-16 rounded-full mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))
          ) : (
            // Use the first two actual reviews if available, otherwise use hardcoded testimonials
            (reviews && reviews.length >= 2 ? 
              reviews.slice(0, 2).map((review, index) => (
                <div key={index} className="max-w-md bg-white shadow-lg rounded-full px-8 py-6 flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src={review.imageUrl || "https://randomuser.me/api/portraits/men/32.jpg"} 
                        alt={review.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 italic">"{review.comment}"</p>
                    <p className="text-gray-900 font-semibold mt-1">-{review.name}</p>
                  </div>
                </div>
              ))
              : 
              testimonials.map((testimonial, index) => (
                <div key={index} className="max-w-md bg-white shadow-lg rounded-full px-8 py-6 flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src={index === 0 ? "https://randomuser.me/api/portraits/men/32.jpg" : "https://randomuser.me/api/portraits/men/33.jpg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 italic">"{testimonial.text}"</p>
                    <p className="text-gray-900 font-semibold mt-1">-{testimonial.name}</p>
                  </div>
                </div>
              ))
            )
          )}
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D5A964]"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
        </div>
      </div>
    </section>
  );
}
