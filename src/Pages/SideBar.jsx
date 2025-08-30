import React, { useState } from "react";
import { X, Home, User, Briefcase, Info, Phone, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { name: "Home", icon: <Home size={22} />, path: "/" },
    { name: "Services", icon: <Briefcase size={22} />, path: "/services" },
    { name: "About", icon: <Info size={22} />, path: "/about" },
    { name: "Contact", icon: <Phone size={22} />, path: "/contact" },
    { name: "Profile", icon: <User size={22} />, path: "/profile" }
  ];

  return (
    <div
      className={`relative h-screen bg-white shadow-lg transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between px-3 py-4 border-b">
        <div className="flex items-center">
          {open && <span className="mr-4 text-lg font-bold">Brand</span>}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 bg-blue-600 text-white rounded-md mr-3.5 cursor-pointer"
        >
          {open ? <X  size={20} /> : <Menu  size={20} />}
        </button>
      </div>

      <nav className="mt-6 flex flex-col space-y-4 px-2">
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-800 hover:bg-gray-100 hover:text-blue-600"
              }`
            }
          >
            {item.icon}
            {open && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
