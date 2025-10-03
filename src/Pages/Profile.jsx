import React, { useState, useEffect } from "react";
import { LogOut, Settings, BarChart3, Crown, Edit3, User } from "lucide-react";

const usePersistedUsername = () => {
  const [username, setUsername] = useState(() => {
    // reload ke baad bhi localStorage se data mil jaye
    return localStorage.getItem("username") || null;
  });

  const saveUsername = (name) => {
    localStorage.setItem("username", name); // permanent save
    setUsername(name);
  };

  const clearUsername = () => {
    localStorage.removeItem("username"); // remove on logout
    setUsername(null);
  };

  return [username, saveUsername, clearUsername];
};

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (name.trim().length >= 2) {
      setIsLoading(true);
      setTimeout(() => {
        onSignUp(name.trim());
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome!</h2>
          <p className="text-white/80 text-lg">Create your profile to get started</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 text-lg transition-colors"
            />
            <Edit3 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          </div>

          <button
            onClick={handleSubmit}
            disabled={name.trim().length < 2 || isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating...</span>
              </div>
            ) : (
              "Create Profile"
            )}
          </button>

          <div className="text-center">
            <span
              className={`text-sm transition-colors ${
                name.length >= 2 ? "text-green-300" : "text-white/50"
              }`}
            >
              {name.length >= 2 ? "✓ Ready to go" : `${name.length}/2 characters minimum`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [username, saveUsername, clearUsername] = usePersistedUsername();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (name) => saveUsername(name);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      clearUsername();
      setIsLoading(false);
    }, 1000);
  };

  if (!username) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <SignUp onSignUp={handleSignUp} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto mt-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden">
        <div className="text-center p-8 sm:p-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-b border-white/10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
            {username.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">Welcome back,</h1>
          <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-4">
            {username}!
          </p>
        </div>

        {/* Actions */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className=" cursor-not-allowed bg-white/10 hover:bg-white/20 border border-white/30 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3">
              <Settings className="w-6 h-6" />
              <span>Settings</span>
            </button>

            <button className="bg-white/10 cursor-not-allowed hover:bg-white/20 border border-white/30 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3">
              <BarChart3 className="w-6 h-6" />
              <span>Analytics</span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full cursor-pointer bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing out...</span>
              </>
            ) : (
              <>
                <LogOut className="w-6 h-6" />
                <span>Sign Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
