import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Nav from "./Nav";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  // ✅ Check localStorage on page load
  useEffect(() => {
    const isSubmitted = localStorage.getItem("contactSubmitted");
    if (isSubmitted) {
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // backend call yaha kar sakte ho
    setSubmitted(true);

    // ✅ Save permanently in localStorage
    localStorage.setItem("contactSubmitted", "true");
  };

  return (
    <>
    <Nav/>
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-10 text-white border border-white/30"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-400 drop-shadow-lg"
        >
          Contact Us
        </motion.h1>

        {/* Agar submit ho gaya hai */}
        {submitted ? (
          <div className="text-center text-2xl font-semibold text-yellow-200">
            ✅ Your contact request is pending.
            <p className="text-lg mt-3 text-gray-100">
              We will get back to you soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-5"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                required
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="cursor-pointer w-full bg-gradient-to-r from-yellow-400 via-pink-400 to-orange-400 text-black font-bold py-3 rounded-xl shadow-lg"
              >
                Send Message
              </motion.button>
            </motion.form>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="bg-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
                <h2 className="text-xl font-semibold mb-2">📍 Address</h2>
                <p className="text-gray-200">123 E-Shop Street, Karachi, Pakistan</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
                <h2 className="text-xl font-semibold mb-2">📞 Phone</h2>
                <p className="text-gray-200">+92 300 1234567</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
                <h2 className="text-xl font-semibold mb-2">📧 Email</h2>
                <p className="text-gray-200">support@eshop.com</p>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
        </>

  );
};

export default Contact;
