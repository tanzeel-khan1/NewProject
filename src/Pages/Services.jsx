import React from "react";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      title: "Fast Delivery",
      desc: "Get your products delivered quickly and safely at your doorstep.",
      icon: "🚚",
    },
    {
      title: "Secure Payment",
      desc: "Multiple payment options with 100% secure transactions.",
      icon: "💳",
    },
    {
      title: "24/7 Support",
      desc: "Our team is available all the time to help you with your queries.",
      icon: "📞",
    },
    {
      title: "Easy Returns",
      desc: "Hassle-free return and exchange policies for your convenience.",
      icon: "🔄",
    },
  ];

  return (
    <div className="min-h-screen rounded-md bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white p-8">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-400 drop-shadow-lg"
      >
        Our Services
      </motion.h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl hover:shadow-pink-500/40 cursor-pointer text-center border border-white/30"
          >
            <div className="text-6xl mb-4">{service.icon}</div>
            <h2 className="text-2xl font-semibold mb-3 text-white drop-shadow-md">
              {service.title}
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
