'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="flex items-center bg-black relative overflow-hidden pt-20 lg:pt-20 pb-8 lg:pb-0 lg:min-h-screen"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center py-8 lg:py-0 lg:min-h-[calc(100vh-80px)]">
          {/* Left Content */}
          <div
            className={`space-y-4 lg:space-y-8 z-10 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            {/* Subtitle */}
            <p className="text-white text-xs lg:text-sm uppercase tracking-[0.2em] font-medium">
              FREELANCE SOFTWARE DEVELOPER
            </p>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="text-white block">I'm</span>
              <span className="text-white block">Lord Binary</span>
              <span className="text-[#ff6b6b] block">Software Developer.</span>
              <span className="text-white block">based in Ghana.</span>
            </h1>

            {/* Download CV Button */}
            <div className="pt-2 lg:pt-4">
              <a
                href="/Mujahid__Shahid_Resume.pdf"
                download="Mujahid_Shahid_Resume.pdf"
                className="inline-block px-8 py-3 border-2 border-white text-white font-semibold text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300"
              >
                DOWNLOAD CV
              </a>
            </div>
          </div>

          {/* Right Image - Portrait with Dramatic Lighting */}
          <div
            className={`relative h-full min-h-[400px] md:min-h-[500px] lg:min-h-[800px] flex items-center justify-center lg:justify-end ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative w-full max-w-2xl h-full">
              {/* Portrait Image Container */}
              <div className="absolute inset-0 flex items-center justify-center lg:justify-end pr-0 lg:pr-8">
                <div className="relative w-full max-w-xs md:max-w-md h-[90%] max-h-[500px] md:max-h-[600px] lg:max-h-[700px]">
                  {/* Main Image Background with Background Image */}
                  <div 
                    className="absolute inset-0 rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: 'url(/portrait.jpg)',
                      backgroundColor: '#000000', // Fallback color
                    }}
                  >
                    {/* Red Light Effect from Left */}
                    <div className="absolute left-0 top-0 bottom-0 w-2/5 bg-gradient-to-r from-[#ff6b6b]/50 via-[#ff6b6b]/30 to-transparent z-10"></div>
                    
                    {/* Dark overlay gradient on right */}
                    <div className="absolute right-0 top-0 bottom-0 w-2/5 bg-gradient-to-l from-black/80 to-transparent z-10"></div>
                  </div>
                  
                  {/* Additional Red Glow Effect */}
                  <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-[#ff6b6b]/20 rounded-full blur-3xl -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern/Texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </section>
  );
}
