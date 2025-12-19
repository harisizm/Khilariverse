import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, cartItems, updateQuantity, removeFromCart, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          const tempProduct = products.find((product) => product._id === items);
          if (tempProduct) {
            tempData.push({
              ...tempProduct,
              quantity: cartItems[items]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const totalAmount = getCartAmount();

  if (cartData.length === 0) {
    return (
      <div className="min-h-screen bg-dark-bg pt-24 text-center">
        <h2 className="text-3xl text-white font-display mb-4">Your Cart is Empty</h2>
        <Link to="/shop" className="text-neon-pink underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-24 px-4 pb-20">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-display font-bold text-white mb-10 text-center uppercase">Your <span className="text-neon-pink">Gear</span></h1>

        <div className="flex flex-col gap-4">
          {cartData.map((item, index) => (
            <div key={index} className="bg-dark-card p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/5 shadow-glow hover:border-white/20 transition-all">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-24 h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase mb-1">{item.brand}</p>
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  <p className="text-neon-pink font-bold mt-1">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center bg-black/50 rounded-lg p-1 border border-white/10">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-2 text-white hover:bg-white/10 rounded disabled:opacity-50" disabled={item.quantity <= 1}><Minus size={16} /></button>
                  <span className="w-8 text-center text-white font-mono">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-2 text-white hover:bg-white/10 rounded"><Plus size={16} /></button>
                </div>
              </div>
              <div className="text-white font-bold w-20 text-right text-lg">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button onClick={() => removeFromCart(item._id)} className="text-gray-500 hover:text-red-500 p-2 cursor-pointer transition-colors hover:scale-110"><Trash2 size={20} /></button>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <div className="w-full max-w-md bg-dark-card p-8 rounded-xl border border-white/10 shadow-glow-purple">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-4">Order Summary</h2>
            <div className="flex justify-between mb-4 text-gray-400">
              <span>Subtotal</span>
              <span className="text-white font-bold text-lg">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-400">
              <span>Shipping</span>
              <span className="text-neon-blue font-bold">Free</span>
            </div>
            <div className="h-px bg-white/10 my-6"></div>
            <div className="flex justify-between mb-8 text-2xl font-bold">
              <span className="text-white">Total</span>
              <span className="text-neon-pink text-glow">${totalAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate('/place-order')}
              className="w-full bg-neon-pink text-white font-bold py-4 rounded-lg hover:bg-white hover:text-neon-pink transition-all duration-300 shadow-lg hover:shadow-glow-pink"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
