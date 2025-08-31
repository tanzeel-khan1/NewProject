import React from "react";
import { motion } from "framer-motion";
import Nav from "./Nav";

const About = () => {
  const highlights = [
    {
      title: "🌍 Our Vision",
      desc: "To be a global leader in e-commerce by offering value, trust, and innovation.",
    },
    {
      title: "🤝 Our Promise",
      desc: "Delivering genuine products, fast service, and excellent support.",
    },
    {
      title: "💡 Our Approach",
      desc: "Combining technology, creativity, and customer care to redefine shopping.",
    },
  ];

  return (
    <>
    <Nav/>
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-10 text-center border border-white/30 text-white"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-400 drop-shadow-lg"
        >
          About Us
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg leading-relaxed text-gray-200 mb-8"
        >
          Welcome to <span className="font-bold text-white">E-Shop</span>, your trusted destination for
          quality products at unbeatable prices. We believe in making online shopping{" "}
          <span className="text-yellow-300 font-semibold">simple, secure,</span> and{" "}
          <span className="text-pink-300 font-semibold">enjoyable</span>.  
          Our mission is to provide our customers with a seamless e-commerce experience, 
          offering everything from the latest gadgets to everyday essentials.
        </motion.p>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 + 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              
              className="bg-white/10 rounded-2xl p-6 shadow-lg hover:shadow-pink-500/40 cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-200 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default About;
