import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react';

const Address = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { cartItems, setCartItems, getCartAmount, products, backendUrl, token, currency } = useContext(ShopContext);
  // Assuming token is available in ShopContext or AuthContext. 
  // Usually token is in ShopContext from localstorage, or we get it from AuthContext.
  // Let's use ShopContext token if available, else AuthContext.
  // Checking previous files, ShopContext usually has token. If not, I'll grab it from AuthContext or localStorage.
  // Wait, Address.jsx didn't have token in destructured props in previous read.
  // I will double check imports. I'll import AuthContext just in case.

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare Order Data
    let orderItems = [];
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        const itemInfo = products.find((product) => product._id === items);
        if (itemInfo) {
          itemInfo.quantity = cartItems[items];
          orderItems.push(itemInfo);
        }
      }
    }

    if (orderItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + 0 // + Shipping if any
    }

    setLoading(true);

    // Simulate 3 seconds loading for UX
    setTimeout(async () => {
      try {
        // Determine User ID / Token availability
        // If the user uses the 'token' from ShopContext or we grab it manually
        // Let's assume ShopContext passes 'token'

        let userToken = token || localStorage.getItem('token');

        if (!userToken) {
          toast.error("Please login to place order");
          setLoading(false);
          navigate('/login');
          return;
        }

        const response = await fetch(backendUrl + '/api/order/place', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: userToken
          },
          body: JSON.stringify(orderData)
        })

        const data = await response.json();

        if (data.success) {
          setOrderSuccess(true);
          setCartItems({}); // Clear Local Cart State
          // toast.success("Order Placed Successfully!"); // User requested no popup message, but on page.
        } else {
          toast.error(data.message);
        }

      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }, 3000); // 3 Seconds Delay
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-dark-bg pt-24 px-4 pb-20 flex items-center justify-center">
        <div className="bg-dark-card p-10 rounded-2xl border border-neon-pink/30 shadow-[0_0_50px_rgba(255,0,85,0.2)] text-center max-w-lg w-full animate-[slideUp_0.5s_ease-out]">
          <div className="flex justify-center mb-6">
            <CheckCircle size={80} className="text-neon-pink animate-bounce" />
          </div>
          <h2 className="text-4xl font-display font-bold text-white mb-4">ORDER <span className="text-neon-pink">CONFIRMED</span></h2>
          <p className="text-gray-400 mb-8 text-lg">Thank you for your purchase! Your gear is being prepared for deployment.</p>

          <button
            onClick={() => navigate('/shop')}
            className="w-full bg-neon-pink text-white font-bold py-4 rounded-lg hover:bg-white hover:text-neon-pink transition-all duration-300 shadow-lg hover:shadow-glow-pink flex items-center justify-center gap-2"
          >
            CONTINUE SHOPPING <ArrowRight size={20} />
          </button>
          <p className="mt-4 text-xs text-gray-500 uppercase tracking-widest">Order ID: #{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg pt-24 px-4 pb-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={60} className="text-neon-pink animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-display font-bold text-white tracking-widest animate-pulse">SECURING YOUR GEAR...</h2>
        </div>
      </div>
    )
  }

  // Default Form Return
  return (
    <div className="min-h-screen bg-dark-bg pt-24 px-4 pb-20">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-display font-bold text-white mb-8 text-center uppercase">Checkout <span className="text-neon-pink">Details</span></h1>

        <div className="bg-dark-card p-8 rounded-2xl border border-white/10 shadow-glow hover:border-white/20 transition-all duration-300">
          <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-4">Delivery Information</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon-pink focus:outline-none focus:shadow-glow-pink transition-all" />
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon-pink focus:outline-none focus:shadow-glow-pink transition-all" />
            </div>
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon-pink focus:outline-none focus:shadow-glow-pink transition-all" />
            <input type="text" name="street" placeholder="Street Address" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon-pink focus:outline-none focus:shadow-glow-pink transition-all" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="city" placeholder="City" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon-pink focus:outline-none focus:shadow-glow-pink transition-all" />
              <input type="text" name="state" placeholder="State" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon-pink focus:outline-none focus:shadow-glow-pink transition-all" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="zipcode" placeholder="Zip Code" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon-pink focus:outline-none focus:shadow-glow-pink transition-all" />
              <input type="text" name="country" placeholder="Country" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon-pink focus:outline-none focus:shadow-glow-pink transition-all" />
            </div>
            <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon-pink focus:outline-none focus:shadow-glow-pink transition-all" />

            <div className="mt-8 flex justify-end">
              <button type="submit" className="bg-neon-pink text-white font-bold py-3 px-12 rounded-lg hover:bg-white hover:text-neon-pink transition-all duration-300 shadow-lg hover:shadow-glow-pink">
                PLACE ORDER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
