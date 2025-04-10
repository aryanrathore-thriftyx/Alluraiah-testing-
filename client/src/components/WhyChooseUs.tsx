import React from 'react';

// Import the icons
import clockIcon from '@assets/pngwing.com (8).png';
import calendarIcon from '@assets/pngwing.com (11).png';
import rocketIcon from '@assets/pngwing.com (1).png';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: clockIcon,
      title: "50 Years of Sweet Legacy",
      description: "With a rich history spanning over five decades, Alluraiah Sweets has been crafting traditional delicacies that stand the test of time. Our commitment to quality and authenticity has made us a trusted name for generations."
    },
    {
      icon: calendarIcon,
      title: "Fresh Daily Preparation",
      description: "We believe in delivering freshness with every bite! Our sweets, namkeens, and pickles are prepared daily using time-honored recipes, ensuring that you always enjoy the freshest and most authentic flavors."
    },
    {
      icon: rocketIcon,
      title: "Taking Tradition Forward",
      description: "While we cherish our heritage, we also embrace innovation! With modern techniques and a customer-first approach, we are bringing the flavors of tradition to a new generation—keeping our legacy alive and thriving."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-[#292929] text-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="w-full max-w-xl mx-auto">
            <div className="flex items-center justify-center my-2">
              <div className="h-px bg-gray-400 flex-grow"></div>
              <div className="px-4 text-xl text-white font-semibold">Why Choose Us</div>
              <div className="h-px bg-gray-400 flex-grow"></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden text-center">
              <div className="bg-[#292929] p-6 shadow-inner">
                <div className="flex justify-center mb-4">
                  <img 
                    src={reason.icon} 
                    alt={reason.title} 
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{reason.title}</h3>
                <p className="text-gray-300 text-sm">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
