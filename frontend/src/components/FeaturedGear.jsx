import React, { useContext } from 'react';
import { ArrowRight, Star, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';

const FeaturedGear = () => {
  const { products, addToCart, searchQuery } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      (product.category && product.category.toLowerCase().includes(query)) ||
      (product.description && product.description.toLowerCase().includes(query)) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  });

  return (
    <section className="py-24 bg-[#0b0b0b] min-h-[600px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="font-display text-4xl font-bold mb-2 uppercase text-white  ">
              Featured <span className="text-neon-pink">Gear</span>
            </h2>
            <p className="text-gray-400 text-lg">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Hand-picked selections from our pro-tested collection'}
            </p>
          </div>
          <Link to="/shop" className="flex items-center gap-2 text-white font-medium hover:text-neon-pink transition-colors duration-300">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl font-display">
            No gear found matches your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="bg-dark-card rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {user?.role !== 'admin' && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product._id);
                        }}
                        className="bg-neon-pink text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 translate-y-5 transition-transform duration-300 group-hover:translate-y-0 hover:bg-white hover:text-neon-pink transition-colors"
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </button>
                    )}
                  </div>
                  {/* Tags */}
                  {product.tags && (
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded text-xs font-bold uppercase ${tag.includes('%')
                            ? 'bg-neon-pink text-white' // Updated to neon-pink for tags
                            : 'bg-neon-pink/20 text-neon-pink border border-neon-pink/50'
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    {/* Icons removed as requested */}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">{product.brand}</div>
                  <h3 className="font-display text-xl leading-snug mb-4 text-white group-hover:text-neon-pink transition-colors">{product.name}</h3> {/* Added group-hover:text-neon-pink */}

                  {product.specs && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.specs.map((spec, index) => (
                        <span key={index} className="bg-white/5 px-2 py-1 rounded text-xs text-gray-400">{spec}</span>
                      ))}
                    </div>
                  )}

                  {/* Replaced original rating display with the one from the instruction */}
                  <div className="flex items-center gap-2 mb-4 mt-auto">
                    <div className="flex text-neon-pink">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-600"} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                  </div>

                  <div className="font-display text-2xl font-bold flex items-center gap-4">
                    <span className="text-neon-pink">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 text-base line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedGear;
