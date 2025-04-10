import React from 'react';
import taglineImage1 from '@assets/Group 77.png';
import taglineImage2 from '@assets/Group 78.png';
import taglineImage3 from '@assets/Group 79.png';

export default function TaglineBanner() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const images = [taglineImage1, taglineImage2, taglineImage3];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative py-12 overflow-hidden bg-transparent h-[273px]">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={images[activeIndex]} 
          alt="Sweet treats background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          {/* We don't need to add text here because it's already part of the images */}
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === activeIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
