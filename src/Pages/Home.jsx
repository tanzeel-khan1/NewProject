// import React from 'react'
// import Nav from "./Nav"
// const Home = () => {
//   return (
//    <>
//         <Nav/>

//    <div className='p-0'>
//      <h1 className='text-red-600'>Home</h1>
//      </div>
//    </>
//   )
// }

// export default Home
import React, { useEffect, useState } from "react";
import Nav from "./Nav";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:7000/api/auth/fome"); // 👈 backend API
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Nav />

      <div className="p-4">
        <h1 className="text-red-600 text-2xl mb-4">Home</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold">Rs {product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
