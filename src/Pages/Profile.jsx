import React, { useEffect, useState } from "react";
import { LogOut, Settings, BarChart3, Crown } from "lucide-react";
import Nav from "./Nav";

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onSignUp(name.trim());
    }
  };

  return (
    <>
    <div className="mt-4 w-full max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
            <span className="text-3xl text-white font-bold">👤</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome</h2>
          <p className="text-white/80">Enter your name to continue</p>
        </div>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
          />

          <button
            onClick={handleSubmit}
            className="w-full cursor-pointer bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
        </>

  );
};

const Profile = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const handleStorage = () => {
      setUsername(localStorage.getItem("username"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleSignUp = (name) => {
    localStorage.setItem("username", name);
    setUsername(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
  };

  if (!username) {
    return (
      <div className="mt-3 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <SignUp onSignUp={handleSignUp} />
      </div>
    );
  }

  return (
    <>
        <Nav/>

    <div className="mt-3 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative text-center p-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-b border-white/10">
            <div className="relative mx-auto mb-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white text-5xl font-bold shadow-xl transform rotate-6 hover:rotate-0 transition-all duration-500">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="absolute -top-3 -right-3 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg animate-pulse"></span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Hello,</h1>
            <p className="text-2xl text-purple-200 font-semibold">{username} 🎉</p>
            <div className="inline-block mt-3 bg-gradient-to-r from-yellow-400 via-pink-400 to-orange-400 text-black px-4 py-1 rounded-full text-sm font-bold shadow-md">
              <Crown className="inline w-4 h-4 mr-1" /> Premium Member
            </div>
          </div>

          {/* Stats - FLEX */}
          <div className="flex flex-col sm:flex-row gap-5 p-8">
            <div className="flex-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-5 rounded-2xl border border-blue-400/30 shadow-lg hover:scale-105 transition-all text-center">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-white font-bold text-lg">Level 1</p>
              <p className="text-white/70 text-sm">Achievements</p>
            </div>
            <div className="flex-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-5 rounded-2xl border border-pink-400/30 shadow-lg hover:scale-105 transition-all text-center">
              <div className="text-4xl mb-2">⭐</div>
              <p className="text-white font-bold text-lg">4.9</p>
              <p className="text-white/70 text-sm">Rating</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4 px-8 pb-8">
            <button className="w-full cursor-not-allowed bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-md transition-all flex items-center justify-center space-x-3">
              <Settings className="w-6 h-6" />
              <span>Edit Profile</span>
            </button>
            <button className="cursor-not-allowed w-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-md transition-all flex items-center justify-center space-x-3">
              <BarChart3 className="w-6 h-6" />
              <span>View Stats</span>
            </button>
            <button
              onClick={handleLogout}
              className="cursor-pointer w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-3"
            >
              <LogOut className="w-6 h-6" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
