import React, { useState, useEffect } from "react";
import { X, Home, User, Briefcase, Info, Phone, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md breakpoint in Tailwind
      // Close sidebar by default on mobile
      if (window.innerWidth < 768) {
        setOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    { name: "Home", icon: <Home size={22} />, path: "/" },
    { name: "Services", icon: <Briefcase size={22} />, path: "/services" },
    { name: "About", icon: <Info size={22} />, path: "/about" },
    { name: "Contact", icon: <Phone size={22} />, path: "/contact" },
    { name: "Profile", icon: <User size={22} />, path: "/profile" }
  ];

  // Mobile overlay to close sidebar when clicking outside
  const MobileOverlay = () => (
    isMobile && open ? (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={() => setOpen(false)}
      />
    ) : null
  );

  return (
    <>
      <MobileOverlay />
      
      {/* Mobile Top Bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white  px-4 py-3 flex items-center justify-between md:hidden">
          <span className="text-lg font-bold">Brand</span>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 bg-blue-600 text-white rounded-md"
          >
            <Menu size={20} />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isMobile ? 'fixed' : 'relative'} 
          ${isMobile ? 'top-0 left-0 right-0' : 'h-screen'} 
          ${isMobile ? (open ? 'translate-y-0' : '-translate-y-full') : ''} 
          ${!isMobile ? (open ? 'w-64' : 'w-20') : 'w-full'} 
          ${isMobile ? 'h-auto' : 'h-screen'} 
          ${isMobile ? 'pt-16' : ''} 
          bg-white  transition-all duration-300 z-50
          ${isMobile ? 'md:relative md:translate-y-0 md:w-64 md:h-screen md:pt-0' : ''}
        `}
      >
        {/* Desktop Header */}
        {!isMobile && (
          <div className="flex items-center justify-between px-3 py-4 border-b">
            <div className="flex items-center">
              {open && <span className="mr-4 text-lg font-bold">Brand</span>}
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 bg-blue-600 text-white rounded-md mr-3.5 cursor-pointer"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        )}

        {/* Mobile Header with Close Button */}
        {isMobile && open && (
          <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
            <span className="text-lg font-bold">Brand</span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 bg-blue-600 text-white rounded-md"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className={`${isMobile ? 'bg-white' : ''} ${isMobile ? 'pb-4' : 'mt-6'} flex flex-col space-y-4 px-2`}>
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              onClick={() => isMobile && setOpen(false)} // Close sidebar on mobile after click
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              {item.icon}
              {(open || isMobile) && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;