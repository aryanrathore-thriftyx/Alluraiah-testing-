import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import carousel images from assets
import homeImage1 from "@assets/Home Image 1.png";
import homeImage2 from "@assets/Home Image 2.png";
import homeImage3 from "@assets/Home Image 3.png";
import homeImage4 from "@assets/Home Image 4.png";
import materialIcon1 from "@assets/image.png";
import materialIcon2 from "@assets/image (1).png";
import materialIcon3 from "@assets/image (2).png";

interface CarouselSlide {
  id: number;
  imageUrl: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    imageUrl: homeImage1,
  },
  {
    id: 2,
    imageUrl: homeImage2,
  },
  {
    id: 3,
    imageUrl: homeImage3,
  },
  {
    id: 4,
    imageUrl: homeImage4,
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const startAutoSlide = () => {
    intervalRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
    stopAutoSlide();
    startAutoSlide();
  };

  return (
    <div className="relative">
      <div className="w-full overflow-hidden">
        <div
          className="flex w-full transition-transform duration-700"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 relative h-screen max-h-[800px]"
            >
              <img
                src={slide.imageUrl}
                alt="Authentic Indian sweets"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 flex items-center justify-end">
                <div className="container px-6 md:px-12">
                  <div className="w-full md:w-3/5 lg:w-1/2 text-right ml-auto">
                    <h1 className="geizer-font text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white hero-title">
                      <span className="block">INDULGE IN SWEETNESS,</span>
                      <div className="flex justify-end items-center mt-1">
                        <span className="text-white">SAVOR THE</span>
                        <span className="text-[#D4AF37] ml-2">SPICE!</span>
                      </div>
                    </h1>
                    <p className="mt-4 text-lg text-white/90 max-w-xl ml-auto">
                      Authentic Sweets, Crispy Namkeens, and Traditional Pickles
                      – Crafted with Love!
                    </p>
                    <div className="flex justify-end mt-6 items-center gap-4">
                      <div className="flex items-center space-x-1">
                        <div className="flex -space-x-3">
                          <img
                            src={materialIcon1}
                            alt="Material 1"
                            className="h-8 w-8 rounded-full object-cover material-icon-shadow-1"
                          />
                          <img
                            src={materialIcon2}
                            alt="Material 2"
                            className="h-8 w-8 rounded-full object-cover material-icon-shadow-2"
                          />
                          <img
                            src={materialIcon3}
                            alt="Material 3"
                            className="h-8 w-8 rounded-full object-cover material-icon-shadow-3"
                          />
                        </div>
                        <span className="text-white text-sm ml-2">
                          200+ Materials
                        </span>
                      </div>
                      <Button
                        asChild
                        className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black rounded-md py-2 px-4 flex items-center"
                      >
                        <Link href="/shop">
                          <ArrowRight className="mr-2 h-4 w-4" /> Order Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-0 right-0">
          <div className="flex justify-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-12 h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white w-14" : "bg-white/50"
                }`}
                onClick={() => handleIndicatorClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
