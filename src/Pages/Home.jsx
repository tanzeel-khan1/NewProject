
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Search, Filter, ShoppingCart, Star, Heart, Eye, Check, X } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  // Heart state for individual products
  const [likedProducts, setLikedProducts] = useState({});

  const handleHeartClick = (productId) => {
    setLikedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [addingToCart, setAddingToCart] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const handleAddToCart = async (product) => {
    setAddingToCart(prev => ({ ...prev, [product._id]: true }));
    
    setTimeout(() => {
      setAddingToCart(prev => ({ ...prev, [product._id]: false }));
      
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div className="h-40 sm:h-48 bg-gray-200"></div>
          <div className="p-3 sm:p-4">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8 max-w-md w-full">
        <div className="text-red-500 text-4xl sm:text-6xl mb-4">⚠️</div>
        <h3 className="text-lg sm:text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🔍</div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No products found</h3>
      <p className="text-gray-500 text-sm sm:text-base">Try adjusting your search or filters</p>
    </div>
  );

  return (
    <>
      <Nav />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center">
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                Discover Amazing Products
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8">
                Quality items at unbeatable prices
              </p>
              
              {/* Mobile-First Search Bar */}
              <div className="max-w-2xl mx-auto">
                {/* Mobile Search Input */}
                <div className="bg-white rounded-xl sm:rounded-full p-2 shadow-lg mb-4 sm:mb-0">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
                    <div className="flex-1 flex items-center">
                      <Search className="text-gray-400 ml-3 sm:ml-4 flex-shrink-0" size={20} />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-gray-800 bg-transparent outline-none text-sm sm:text-base"
                      />
                    </div>
                    
                    {/* Mobile Filters */}
                    <div className="flex items-center space-x-2 px-2 sm:px-0">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-gray-800 bg-gray-50 rounded-lg outline-none text-sm"
                      >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                      </select>
                      <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="bg-blue-600 text-white p-2 sm:p-3 rounded-full hover:bg-blue-700 transition-colors flex-shrink-0"
                      >
                        {showFilters ? <X size={16} /> : <Filter size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Filters Panel (Mobile) */}
                {showFilters && (
                  <div className="bg-white rounded-xl p-4 shadow-lg sm:hidden">
                    <h3 className="font-semibold text-gray-800 mb-3">Filter Options</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                        <select className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm">
                          <option>All Prices</option>
                          <option>Under Rs 1000</option>
                          <option>Rs 1000 - 5000</option>
                          <option>Above Rs 5000</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm">
                          <option>All Categories</option>
                          <option>Electronics</option>
                          <option>Clothing</option>
                          <option>Home & Garden</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Mobile Optimized */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Products Header - Mobile Friendly */}
          <div className="mb-6 sm:mb-8 bg-white rounded-xl shadow-sm p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Our Products
                {!loading && (
                  <span className="text-xs sm:text-sm font-normal text-gray-500 ml-2 block sm:inline">
                    ({filteredProducts.length} items)
                  </span>
                )}
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                <span className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                  <Star className="text-yellow-400 mr-1" size={14} />
                  4.8 Rating
                </span>
                <span className="bg-gray-50 px-2 py-1 rounded-full">Free Shipping</span>
                <span className="bg-gray-50 px-2 py-1 rounded-full">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Loading, Error, and Empty States */}
          {loading && <LoadingSkeleton />}
          {error && <ErrorState />}
          {!loading && !error && filteredProducts.length === 0 && <EmptyState />}

          {/* Products Grid - Fully Responsive */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                    
                    {/* Desktop Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 items-center justify-center opacity-0 group-hover:opacity-100 hidden sm:flex">
                      <div className="flex space-x-2">
                        <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleHeartClick(product._id)}
                          className={`p-2 rounded-full transition-colors ${
                            likedProducts[product._id] 
                              ? 'bg-red-500 text-white hover:bg-red-600' 
                              : 'bg-white text-red-500 hover:bg-gray-100'
                          }`}
                        >
                          <Heart size={16} fill={likedProducts[product._id] ? "currentColor" : "none"} />
                        </button>
                        <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1 sm:hidden">
                      <button 
                        onClick={() => handleHeartClick(product._id)}
                        className={`p-2 rounded-full transition-colors ${
                          likedProducts[product._id] 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-white text-red-500 hover:bg-gray-100'
                        }`}
                      >
                        <Heart size={16} fill={likedProducts[product._id] ? "currentColor" : "none"} />
                      </button>
                      <button className="bg-white/90 text-gray-800 p-1.5 rounded-full hover:bg-white transition-colors shadow-sm">
                        <Eye size={14} />
                      </button>
                    </div>

                    {/* Price Badge - Mobile Optimized */}
                    <div className="absolute top-2 left-2 bg-[#08CB00] text-white px-2 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-sm">
                      Rs {product.price}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Mobile-First Footer */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                      {/* Rating */}
                      <div className="flex items-center justify-between sm:justify-start">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={`${
                                i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                        </div>
                        
                        {/* Mobile Quick Actions */}
                        <div className="flex items-center space-x-2 sm:hidden">
                          <button className="text-gray-400 hover:text-blue-600 transition-colors">
                            <ShoppingCart size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Add to Cart Button - Mobile Optimized */}
                      <button 
                        onClick={() => handleAddToCart(product)}
                        disabled={addingToCart[product._id]}
                        className={`
                          w-full sm:w-auto
                          relative overflow-hidden group/btn
                          ${addingToCart[product._id] 
                            ? 'bg-green-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                          } 
                          text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium 
                          transition-all duration-300 transform hover:scale-105
                          shadow-md hover:shadow-lg
                          min-h-[36px] sm:min-h-[40px] flex items-center justify-center space-x-2
                        `}
                      >
                        {addingToCart[product._id] ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                            <span className="text-xs sm:text-sm">Adding...</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={14} className="sm:hidden" />
                            <span className="hidden sm:inline">Add to Cart</span>
                            <span className="sm:hidden">Add</span>
                          </>
                        )}
                        
                        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-pulse transition-opacity duration-500"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button - Mobile Optimized */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="text-center mt-8 sm:mt-12 px-4">
              <button className="w-full sm:w-auto bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 sm:px-8 py-3 rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Load More Products
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile-Optimized Toast Container */}
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
          border: '1px solid #e5e7eb',
          fontSize: '14px',
          padding: '12px'
        }}
        className="!w-[95vw] sm:!w-auto !right-2 sm:!right-4 !top-16 sm:!top-4"
      />
    </>
  );
};

export default Home;