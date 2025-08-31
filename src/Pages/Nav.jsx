import React, { useState, useEffect } from "react";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      hidden md:fixed md:top-0 md:left-0 md:right-0 md:z-50 md:block
      transition-all duration-300 ease-in-out
      ${isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white shadow-sm'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 lg:h-20">
          <div className={`
            transform transition-all duration-700 ease-out
            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center relative">
              <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                Hi! Welcome to
              </span>
              <span className="ml-2 relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent font-extrabold animate-pulse">
                  Brand
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-purple-600/20 rounded-lg blur opacity-0 animate-pulse"></div>
              </span>
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-70 animate-bounce"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-ping"></div>
            </h1>
            
            {/* Animated underline */}
            <div className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transform scale-x-0 animate-[scale-x_1s_ease-out_0.5s_forwards] origin-center"></div>
          </div>
        </div>
      </div>
      
      {/* Background pattern - removed */}
    </nav>
  );
};

export default Nav;