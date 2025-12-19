import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

  const [cartItems, setCartItems] = useState(() => {
    // Lazy initialization for guest cart persistence
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState("$");
  const [delivery_fee, setDeliveryFee] = useState(10);
  const [token, setToken] = useState(localStorage.getItem('token') || ""); // Managed locally here or via AuthContext, likely AuthContext manages it but easy to read here too or simple check. 
  // Wait, AuthContext manages token. I should probably get it from there or just read localStorage for simplicity in API calls if not passed. 
  // Or better, listen to localStorage changes or keep a local state that syncs.
  // Actually, AuthContext passes user/token. But ShopContext is usually above or sibling. 
  // Let's assume standard behavior: check localStorage for token for API calls.

  const navigate = useNavigate();

  const addToCart = async (itemId) => {

    if (!localStorage.getItem('token')) {
      toast.info("Please create an account to start shopping", { autoClose: 3000 });
      navigate('/signup');
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    if (localStorage.getItem('token')) {
      try {
        await fetch(backendUrl + '/api/cart/add', {
          method: 'POST',
          headers: { token: localStorage.getItem('token'), 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId })
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      delete cartData[itemId];
    }
    setCartItems(cartData);

    if (localStorage.getItem('token')) {
      try {
        await fetch(backendUrl + '/api/cart/remove', {
          method: 'POST',
          headers: { token: localStorage.getItem('token'), 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId })
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }

  const getUserCart = async (token) => {
    try {
      const response = await fetch(backendUrl + '/api/cart/get', {
        method: 'POST',
        headers: { token: token }
      });
      const data = await response.json();
      if (data.success) {
        setCartItems(data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // Load Cart and Products
  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await fetch(backendUrl + '/api/product/list');
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProductsData();
  }, []);

  // Sync Cart when Auth token changes (Login/Logout)
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Check local storage directly for token to ensure persistence on refresh
    const localToken = localStorage.getItem('token');

    if (localToken) {
      setToken(localToken);
      getUserCart(localToken);
    } else {
      // Only clear if explicitly no token (Guest)
      // And we might want to keep guest cart from local storage!
      // Don't wipe cartItems here blindly. 
      // If we are guest, cartItems is already initialized from localStorage.
      setToken("");
    }
  }, [user]); // user dependency ensures we re-check on login/logout

  // Save Cart to localStorage 
  // Strategy: Always save to localStorage as a backup/cache for guest. 
  // If logged in, backend is source of truth, but local updates mirror it.
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save Products to localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);


  // Helper for components to trigger a reload if needed (e.g. after login)
  const syncCart = () => {
    const token = localStorage.getItem('token');
    if (token) getUserCart(token);
  }

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);

    if (localStorage.getItem('token')) {
      try {
        await fetch(backendUrl + '/api/cart/update', {
          method: 'POST',
          headers: { token: localStorage.getItem('token'), 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId, quantity })
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }

  // Admin function to add products
  const addProduct = (newProduct) => {
    // Ensure image is an array for consistency
    const imageArray = Array.isArray(newProduct.image) ? newProduct.image : [newProduct.image];
    setProducts(prev => [...prev, { ...newProduct, image: imageArray, _id: Date.now().toString() }]);
  };

  // Admin function to remove products
  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p._id !== id));
  }

  const value = {
    products, setProducts,
    cartItems, setCartItems,
    addToCart, removeFromCart, updateQuantity, getCartCount, getCartAmount,
    searchQuery, setSearchQuery,
    currency, delivery_fee,
    backendUrl,
    addProduct, removeProduct,
    syncCart,
    token, setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
