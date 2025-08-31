// import React, { useEffect, useState } from "react";
// import SignUp from "./SignUp";

// const Profile = () => {
//   const [username, setUsername] = useState(localStorage.getItem("username"));
//   useEffect(() => {
//     const handleStorage = () => {
//       setUsername(localStorage.getItem("username"));
//     };
//     window.addEventListener("storage", handleStorage);
//     return () => window.removeEventListener("storage", handleStorage);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     setUsername(null);
//   };

//   if (!username) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
//         <SignUp />
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 rounded-md">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
//         <div className="flex justify-center mb-4">
//           <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
//             {username.charAt(0).toUpperCase()}
//           </div>
//         </div>
//         <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
//         <p className="text-lg text-gray-600 mt-1">{username} 🎉</p>
//         <div className="mt-6">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow transition cursor-pointer"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SignUp from "./SignUp";

// Function jo localStorage se username fetch karega
const getUsername = async () => {
  return localStorage.getItem("username");
};

const Profile = () => {
  const queryClient = useQueryClient();

  // Query: localStorage se username fetch
  const { data: username } = useQuery({
    queryKey: ["username"],
    queryFn: getUsername,
  });

  const handleLogout = () => {
    localStorage.removeItem("username");
    queryClient.invalidateQueries(["username"]); // dubara refresh hoga
  };

  if (!username) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
        <SignUp />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 rounded-md">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {username.charAt(0).toUpperCase()}
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
        <p className="text-lg text-gray-600 mt-1">{username} 🎉</p>
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
