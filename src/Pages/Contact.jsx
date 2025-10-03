import { MdOutlinePending } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Nav from "./Nav";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    YourName: "",
    YourEmail: "",
    YourMessage: "",
  });

  // ✅ Check localStorage on page load
  useEffect(() => {
    const isSubmitted = localStorage.getItem("contactSubmitted");
    if (isSubmitted) {
      setSubmitted(true);
    }
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend call (adjust URL if needed)
      const res = await fetch("http://localhost:7000/api/auth/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        localStorage.setItem("contactSubmitted", "true");
        console.log("✅ Message Saved:", data);
      } else {
        console.error("❌ Error:", data);
        alert("Message save failed: " + data.msg);
      }
    } catch (err) {
      console.error("❌ Request Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <Nav />
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
              <div className="flex items-center gap-2 justify-center">
  <MdOutlinePending />

  <span>Your contact request is pending.</span>
</div>

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
                  name="YourName"
                  placeholder="Your Name"
                  value={formData.YourName}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                />
                <input
                  type="email"
                  name="YourEmail"
                  placeholder="Your Email"
                  value={formData.YourEmail}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  required
                />
                <textarea
                  name="YourMessage"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.YourMessage}
                  onChange={handleChange}
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
                  <p className="text-gray-200">
                    123 E-Shop Street, Karachi, Pakistan
                  </p>
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
