import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, Star, Filter, ChevronDown, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const Products = () => {
  const { products, addToCart, searchQuery } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const { category: paramCategory } = useParams();

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortType, setSortType] = useState('relevant');

  // Initialize category from URL
  useEffect(() => {
    if (paramCategory) {
      // Simple mapping: Capitalize first letter logic or map specific known URL slugs
      // Assuming the param matches the category data structure roughly.
      // Example: /category/keyboards -> "Keyboards"
      // Example: /category/mice -> "Gaming Mice"
      let match = paramCategory.charAt(0).toUpperCase() + paramCategory.slice(1);
      if (paramCategory.toLowerCase() === 'mice') match = "Gaming Mice";
      if (paramCategory.toLowerCase() === 'keyboards') match = "Keyboards";

      // Check if this category exists in our "known" list or just use it
      setCategoryFilter([match]);
    } else {
      setCategoryFilter([]);
    }
  }, [paramCategory]);

  const toggleCategory = (e) => {
    const val = e.target.value;
    if (categoryFilter.includes(val)) {
      setCategoryFilter(prev => prev.filter(c => c !== val));
    } else {
      setCategoryFilter(prev => [...prev, val]);
    }
  }

  const applyFilter = () => {
    let tempProducts = products.slice();

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      tempProducts = tempProducts.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        (item.category && item.category.toLowerCase().includes(query)) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Category Filter
    if (categoryFilter.length > 0) {
      // We check if the product category matches ANY of the selected filters
      // Handling potential mismatches like "Gaming Mice" vs "Mice"
      tempProducts = tempProducts.filter(item => {
        if (!item.category) return false;
        return categoryFilter.includes(item.category)
      });
    }

    // Price Filter
    if (minPrice !== '') {
      tempProducts = tempProducts.filter(item => item.price >= Number(minPrice));
    }
    if (maxPrice !== '') {
      tempProducts = tempProducts.filter(item => item.price <= Number(maxPrice));
    }

    // Rating Filter
    if (minRating > 0) {
      tempProducts = tempProducts.filter(item => (item.rating || 4.5) >= minRating);
    }

    // Sort
    switch (sortType) {
      case 'low-high':
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        // Relevant/Newest 
        // Using date if available, else standard order
        tempProducts.sort((a, b) => (b.date || 0) - (a.date || 0));
        break;
    }

    setFilterProducts(tempProducts);
  }

  useEffect(() => {
    applyFilter();
  }, [products, categoryFilter, minPrice, maxPrice, minRating, sortType, searchQuery]);


  return (
    <div className="min-h-screen bg-dark-bg pt-24 px-4 pb-20 font-sans">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <div className={`lg:w-1/4 flex-shrink-0 lg:block ${showFilter ? 'block fixed inset-0 z-50 bg-dark-bg p-4 overflow-y-auto' : 'hidden'}`}>
          <div className="flex lg:hidden justify-between items-center mb-6">
            <p className="text-xl font-bold text-white font-display">FILTERS</p>
            <button onClick={() => setShowFilter(false)}><X className="text-white" size={24} /></button>
          </div>

          {/* Filter Container */}
          <div className="bg-dark-card p-6 rounded-lg border border-white/5 space-y-8 h-fit lg:sticky lg:top-24 shadow-lg">

            {/* Categories */}
            <div>
              <p className="mb-4 font-bold text-white uppercase tracking-wider text-sm border-b border-white/10 pb-2">Category</p>
              <div className="flex flex-col gap-3 text-gray-400 text-sm">
                {["Keyboards", "Gaming Mice", "Headsets", "Chairs", "Monitors", "Components"].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors group">
                    <input
                      className="w-4 h-4 accent-neon-pink bg-black border-white/20 rounded focus:ring-neon-pink focus:ring-offset-0"
                      type="checkbox"
                      value={cat}
                      onChange={toggleCategory}
                      checked={categoryFilter.includes(cat)}
                    />
                    <span className={`transition-colors ${categoryFilter.includes(cat) ? 'text-neon-pink font-bold' : ''}`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="mb-4 font-bold text-white uppercase tracking-wider text-sm border-b border-white/10 pb-2">Price Range</p>
              <div className="flex gap-2 items-center">
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                  <input className="w-full bg-black/50 border border-white/10 rounded px-6 py-2 text-white text-sm focus:border-neon-pink outline-none transition-colors" type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                </div>
                <span className="text-gray-400 font-bold">-</span>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                  <input className="w-full bg-black/50 border border-white/10 rounded px-6 py-2 text-white text-sm focus:border-neon-pink outline-none transition-colors" type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <p className="mb-4 font-bold text-white uppercase tracking-wider text-sm border-b border-white/10 pb-2">Minimum Rating</p>
              <div className="flex flex-col gap-2">
                {[4, 3, 2, 1].map((star) => (
                  <label key={star} className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
                    <input type="radio" name="rating" className="accent-neon-pink" onChange={() => setMinRating(star)} checked={minRating === star} />
                    <div className="flex text-neon-pink">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < star ? "currentColor" : "none"} className={i < star ? "" : "text-gray-600"} />
                      ))}
                    </div>
                    <span className="text-xs">& Up</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white mt-1">
                  <input type="radio" name="rating" className="accent-neon-pink" onChange={() => setMinRating(0)} checked={minRating === 0} />
                  <span className="text-sm">All Ratings</span>
                </label>
              </div>
            </div>

            <button onClick={() => { setCategoryFilter([]); setMinPrice(''); setMaxPrice(''); setMinRating(0) }} className="w-full py-2 border border-white/10 rounded text-gray-400 hover:text-white hover:border-white transition-colors text-sm uppercase font-bold">
              Reset Filters
            </button>

          </div>
        </div>


        {/* Right Side: Grid */}
        <div className="lg:w-3/4 flex-grow">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setShowFilter(!showFilter)} className="flex items-center gap-2 lg:hidden text-white bg-dark-card px-4 py-2 rounded border border-white/10 hover:border-neon-pink transition-colors">
              <Filter size={16} /> Filters
            </button>

            <h2 className="text-2xl font-display font-bold text-white uppercase hidden lg:block">
              {categoryFilter.length > 0 ? categoryFilter.join(", ") : "All Gear"} <span className="text-neon-pink text-lg ml-2">({filterProducts.length})</span>
            </h2>

            <div className="relative group">
              <select onChange={(e) => setSortType(e.target.value)} className="bg-dark-card text-white text-sm px-4 py-2 rounded border border-white/10 focus:outline-none focus:border-neon-pink cursor-pointer appearance-none pr-10 min-w-[180px]">
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neon-pink pointer-events-none" size={16} />
            </div>
          </div>


          {/* Grid */}
          {filterProducts.length === 0 ? (
            <div className="text-center py-20 bg-dark-card rounded-lg border border-white/5 flex flex-col items-center">
              <p className="text-xl text-gray-400 mb-4 font-display">No matches found.</p>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
              <button onClick={() => { setCategoryFilter([]); setMinPrice(''); setMaxPrice(''); setMinRating(0) }} className="px-6 py-2 bg-neon-pink text-white rounded font-bold hover:bg-white hover:text-neon-pink transition-colors">Clear All Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="bg-dark-card rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,0,85,0.15)] group border border-white/5 hover:border-neon-pink/50"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
                    <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {user?.role !== 'admin' && (
                        <button onClick={(e) => { e.preventDefault(); addToCart(product._id); }} className="bg-neon-pink text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-neon-pink transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg">
                          <ShoppingCart size={16} /> Add to Cart
                        </button>
                      )}
                    </div>

                    {product.tags && product.tags.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.tags.map((tag, i) => (
                          <span key={i} className="bg-black/60 backdrop-blur-sm border border-white/10 text-white px-2 py-1 rounded text-[10px] font-bold uppercase">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.brand}</div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-neon-pink transition-colors truncate font-display">{product.name}</h3>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-0.5 text-neon-pink">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-bold ml-1 text-white">{product.rating || 4.5}</span>
                      </div>
                      <span className="text-xs text-gray-500 border-l border-white/10 pl-2 ml-1">({product.reviews || 0} reviews)</span>
                    </div>

                    <div className="mt-auto flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5">
                      <span className="text-2xl font-bold text-white">${product.price}</span>
                      <span className="text-xs text-neon-pink font-bold uppercase tracking-wide">In Stock</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Products;
