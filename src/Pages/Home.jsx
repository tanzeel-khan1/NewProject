// import React, { useEffect, useState } from "react";
// import Nav from "./Nav";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("http://localhost:7000/api/auth/fome"); 
//         if (!res.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <>
//       <Nav />

//       <div className="p-4">
        

//         {loading && <p>Loading...</p>}
//         {error && <p className="text-red-500">{error}</p>}

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="p-4 border rounded-lg shadow hover:shadow-lg transition"
//             >
//               <img
//                 src={product.img}
//                 alt={product.name}
//                 className="w-full h-40 object-cover mb-2 rounded"
//               />
//               <h2 className="text-lg font-semibold">{product.name}</h2>
//               <p className="text-gray-600">{product.description}</p>
//               <p className="text-green-600 font-bold">Rs {product.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Search, Filter, ShoppingCart, Star, Heart, Eye, Check } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [addingToCart, setAddingToCart] = useState({});

  // Handle Add to Cart
  const handleAddToCart = async (product) => {
    setAddingToCart(prev => ({ ...prev, [product._id]: true }));
    
    // Simulate API call delay
    setTimeout(() => {
      setAddingToCart(prev => ({ ...prev, [product._id]: false }));
      
      // Show success toast
      toast.success(
        `🎉 ${product.name} added to cart! Delivery expected tomorrow.`,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }, 1000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:7000/api/auth/fome");
        
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

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="text-gray-400 text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
      <p className="text-gray-500">Try adjusting your search or filters</p>
    </div>
  );

  return (
    <>
      <Nav />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 rounded-md">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Discover Amazing Products
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Quality items at unbeatable prices
              </p>
              
              {/* Search and Filter Bar */}
              <div className="max-w-2xl mx-auto bg-white rounded-full p-2 shadow-lg">
                <div className="flex items-center">
                  <div className="flex-1 flex items-center">
                    <Search className="text-gray-400 ml-4" size={20} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 px-4 py-3 text-gray-800 bg-transparent outline-none"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 text-gray-800 bg-gray-50 rounded-lg outline-none"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price">Sort by Price</option>
                    </select>
                    <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                      <Filter size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats Bar */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-wrap items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Our Products
                {!loading && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({filteredProducts.length} items)
                  </span>
                )}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Star className="text-yellow-400 mr-1" size={16} />
                  4.8 Rating
                </span>
                <span>Free Shipping</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {loading && <LoadingSkeleton />}
          {error && <ErrorState />}
          {!loading && !error && filteredProducts.length === 0 && <EmptyState />}

          {/* Products Grid */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="bg-white text-red-500 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Heart size={16} />
                        </button>
                        <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 bg-[#08CB00] text-white px-2 py-1 rounded-full text-sm font-semibold">
                      Rs {product.price}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Rating and Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                      </div>
                      
                      <button 
                        onClick={() => handleAddToCart(product)}
                        disabled={addingToCart[product._id]}
                        className={`
                          cursor-pointer
                          relative overflow-hidden group/btn
                          ${addingToCart[product._id] 
                            ? 'bg-green-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                          } 
                          text-white px-4 py-2 rounded-lg text-sm font-medium 
                          transition-all duration-300 transform hover:scale-105
                          shadow-md hover:shadow-lg
                          min-w-[100px] flex items-center justify-center space-x-2
                        `}
                      >
                        {addingToCart[product._id] ? (
                          <>
                            <div className="cursor-pointer animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>Adding...</span>
                          </>
                        ) : (
                          <>
                            {/* <ShoppingCart size={14} /> */}
                            <span>Add to Cart</span>
                          </>
                        )}
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-pulse transition-opacity duration-500"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105">
                Load More Products
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: '#ffffff',
          color: '#1f2937',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}
      />
    </>
  );
};

export default Home;