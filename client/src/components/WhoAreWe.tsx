import React, { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "wouter";

// Import the button image
import ourJourneyBtn from "@assets/Group 33 (1).png";
import exploreMenuBtn from "@assets/Frame 20 (1).png";

export default function WhoAreWe() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-full max-w-xl mx-auto mb-6">
            <div className="flex items-center justify-center my-2">
              <div className="h-px bg-gray-300 flex-grow"></div>
              <div className="px-4 text-xl text-black font-semibold">
                Who are we
              </div>
              <div className="h-px bg-gray-300 flex-grow"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Video Side */}
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            {/* Video Container */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-900 flex items-center justify-center">
              {isPlaying ? (
                <iframe
                  className="w-full h-[400px]"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Alluraiah Sweets Journey"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-[400px] bg-gray-800 flex items-center justify-center relative">
                  {/* Video Thumbnail */}
                  <img
                    src="https://via.placeholder.com/800x450/333/fff?text=Alluraiah+Sweets+Journey"
                    alt="Video Thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Play Button Overlay - Our Journey */}
                  <button
                    onClick={handlePlayVideo}
                    className="absolute z-10 transition-transform hover:scale-105"
                  >
                    <img
                      src={ourJourneyBtn}
                      alt="Our Journey"
                      className="h-16 cursor-pointer"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Text Side */}
          <div className="who-are-we-text">
            <p className="text-black font-poppins text-lg md:text-xl mb-6 leading-relaxed">
              For over five decades, Alluraiah Sweets has been a name synonymous
              with taste, tradition, and trust. Established with a passion for
              crafting the finest sweets, crispy namkeens, and authentic
              pickles, we have been delighting generations with our time-honored
              recipes and premium-quality ingredients.
            </p>

            <p className="text-black font-poppins text-lg md:text-xl mb-10 leading-relaxed">
              From grand celebrations to simple joys, our sweets add a touch of
              happiness to every occasion. Our namkeens bring the perfect crunch
              to your snack time, while our pickles are crafted with traditional
              techniques to give you a burst of homemade flavors.
            </p>

            {/* Explore our Menu Button */}
            <div className="flex justify-start">
              <Link href="/shop">
                <img
                  src={exploreMenuBtn}
                  alt="Explore our Menu"
                  className="h-12 cursor-pointer hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
