import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Truck, Shield, Minus, Plus } from 'lucide-react';
import Footer from '../components/Footer';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const { id } = useParams();
  const { products, addToCart, updateQuantity } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find(p => p._id === id);
      setProduct(foundProduct);
      if (foundProduct && foundProduct.image) {
        setActiveImage(Array.isArray(foundProduct.image) ? foundProduct.image[0] : foundProduct.image);
      }
    }
  }, [id, products]);

  if (!product) {
    return <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center pt-24">Loading Product...</div>;
  }

  // Handling dummy specs if not in context data yet (using defaults or safe usage)
  const colors = product.colors || [
    { id: 'black', label: 'Black', hex: '#000000' },
    { id: 'white', label: 'White', hex: '#ffffff' }
  ];

  const specs = product.specs || ['No specs available'];

  return (
    <div className="pt-24 min-h-screen bg-dark-bg">
      {/* Navbar is in App Layout, so we just have content here */}
      <div className="container mx-auto px-4">

        {/* Breadcrumb / Back */}
        <div className="mb-8 text-gray-400 text-sm cursor-pointer hover:text-neon-pink transition-colors">
          <Link to="/" className="back-link">&lt; Back to Products</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left: Gallery */}
          <div className="product-gallery flex flex-col gap-4">
            <div className="bg-dark-card rounded-2xl aspect-square relative flex items-center justify-center p-8 overflow-hidden group border border-white/5">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full max-w-[500px] z-10 transition-transform duration-300 group-hover:scale-105 object-contain h-full"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(255,0,85,0.15)_0%,rgba(0,0,0,0)_70%)] blur-[60px] z-0"></div>
            </div>

            {/* Thumbnails - Only show if more than 1 image */}
            {product.image && product.image.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.image.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`bg-dark-card rounded-lg aspect-square p-2 cursor-pointer border transition-all duration-200 ${activeImage === img ? 'border-neon-pink shadow-[0_0_10px_rgba(255,0,85,0.3)]' : 'border-white/10 hover:border-white/30'
                      }`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="product-info">
            <div className="text-neon-pink font-bold uppercase tracking-widest text-xl mb-2">{product.brand || 'Khilari'}</div>
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-4 text-white">{product.name}</h1>

            <div className="flex items-center gap-4 mb-8 text-gray-400 text-sm">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={16} className="text-neon-pink fill-neon-pink" />
                ))}
              </div>
              <span className="text-white font-semibold">{product.rating || 5.0}</span>
              <span className="text-gray-400">({(product.reviews || 100).toLocaleString()} reviews)</span>
            </div>

            <div className="mb-6">
              <span className="font-display text-5xl font-bold text-neon-pink">${product.price}</span>
            </div>

            <p className="text-gray-400 leading-relaxed text-lg mb-10">{product.description}</p>

            <div className="bg-[#111] border border-white/5 rounded-lg p-6 mb-10">
              <div className="text-xs font-bold uppercase text-white mb-6 tracking-widest">KEY SPECIFICATIONS</div>
              <div className="grid grid-cols-2 gap-6">
                {specs.map((spec, idx) => (
                  <div key={idx} className="flex flex-col">
                    {typeof spec === 'string' ? (
                      <div className="font-semibold text-white">{spec}</div>
                    ) : (
                      <>
                        <div className="text-gray-400 text-xs mb-1">{spec.label}</div>
                        <div className="font-semibold text-white">{spec.value}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="text-xs font-bold uppercase text-gray-400 mb-4">COLOR: <span className="text-neon-pink ml-2">{selectedColor.toUpperCase()}</span></div>
              <div className="flex gap-4">
                {colors.map(color => (
                  <button
                    key={color.id}
                    className={`px-6 py-2 border rounded-md text-white text-sm transition-all duration-200 cursor-pointer ${selectedColor === color.id ? 'border-neon-pink bg-neon-pink/10 text-neon-pink' : 'border-white/10 hover:border-white/30'}`}
                    onClick={() => setSelectedColor(color.id)}
                  >
                    {color.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Actions - Hidden for Admin */}
            {user?.role !== 'admin' && (
              <div className="flex gap-4 mb-12">
                <div className="flex items-center bg-[#1a1a1a] rounded-md p-1">
                  <button className="p-3 text-white flex items-center justify-center hover:bg-white/5 rounded cursor-pointer" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                  <span className="w-10 text-center font-semibold text-white">{quantity}</span>
                  <button className="p-3 text-white flex items-center justify-center hover:bg-white/5 rounded cursor-pointer" onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product._id);
                    toast.success("Added to Cart!");
                  }}
                  className="flex-grow bg-neon-pink text-white font-bold rounded-md text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] cursor-pointer"
                >
                  <ShoppingCart size={20} /> ADD TO CART
                </button>
              </div>
            )}

            <div className="flex gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2"><Truck size={18} /> Free Shipping</div>
              <div className="flex items-center gap-2"><Shield size={18} /> 2-Year Warranty</div>
            </div>
          </div>
        </div>
        {/* Similar Products Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-display font-bold text-white mb-8">SIMILAR GEAR</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.category === product.category && p._id !== product._id).slice(0, 4).map((item) => (
              <Link to={`/product/${item._id}`} key={item._id} className="bg-dark-card rounded-xl overflow-hidden border border-white/5 hover:border-neon-pink/50 transition-all group">
                <div className="h-48 bg-[#1a1a1a] overflow-hidden relative">
                  <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold truncate group-hover:text-neon-pink transition-colors">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                  <div className="text-neon-pink font-bold">${item.price}</div>
                </div>
              </Link>
            ))}
            {products.filter(p => p.category === product.category && p._id !== product._id).length === 0 && (
              <p className="text-gray-500">No similar products found.</p>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-display font-bold text-white mb-8">REVIEWS ({product.reviews || 0})</h2>
          <div className="flex flex-col gap-6">
            {/* Dummy Review 1 */}
            <div className="bg-dark-card p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-purple-600 flex items-center justify-center font-bold text-white">AG</div>
                <div>
                  <div className="text-white font-bold">Alex G.</div>
                  <div className="flex text-neon-pink text-xs">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
                <span className="ml-auto text-gray-500 text-sm">2 days ago</span>
              </div>
              <p className="text-gray-300">Absolute game changer. The response time is instant and the build quality feels premium. Highly recommend for any competitive player.</p>
            </div>

            {/* Dummy Review 2 */}
            <div className="bg-dark-card p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white">SK</div>
                <div>
                  <div className="text-white font-bold">Sarah K.</div>
                  <div className="flex text-neon-pink text-xs">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill={i < 5 ? "currentColor" : "none"} />)}
                  </div>
                </div>
                <span className="ml-auto text-gray-500 text-sm">1 week ago</span>
              </div>
              <p className="text-gray-300">Great value for the price. I love the RGB customization options in the software.</p>
            </div>
          </div>
          <button className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white font-bold transition-colors">
            WRITE A REVIEW
          </button>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
