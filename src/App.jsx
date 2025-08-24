import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Pages/SideBar";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
// import React, { useState } from "react";

// const Home = () => {
//   const [age, setAge] = useState("");

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Enter Your Age</h1>
//       <input
//         type="number"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//         placeholder="Enter age"
//         style={{ border: "1px solid gray", padding: "5px", borderRadius: "5px" }}
//       />

//       {age && (
//         <div style={{ marginTop: "10px" }}>
//           {age >= 18 ? (
//             <p>You can create an account ✅</p>
//           ) : (
//             <p>Sorry, you must be 18+ to register ❌</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
