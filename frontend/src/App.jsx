import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Address from './pages/Address';
import Admin from './pages/Admin';
import AdminLogin from './components/admin/AdminLogin';
import Orders from './components/admin/Orders';
import MyOrders from './pages/MyOrders';
import AddProduct from './components/admin/AddProduct';
import ListProduct from './components/admin/ListProduct';
import Software from './pages/Software';
import Support from './pages/Support';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Returns from './pages/Returns';
import Bundles from './pages/Bundles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category/:category" element={<Products />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<Address />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/admin/login" element={<AdminLogin />} /> {/* Admin login remains a separate route */}
          <Route path="/admin" element={<Admin />}>
            <Route path="add" element={<AddProduct />} />
            <Route path="list" element={<ListProduct />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="/software" element={<Software />} />
          <Route path="/support" element={<Support />} />

          {/* Footer & Extra Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/shipping" element={<Returns />} /> {/* Alias for shipping */}
          <Route path="/faq" element={<Support />} /> {/* Alias for FAQ */}
          <Route path="/contact" element={<Support />} /> {/* Alias for Contact */}
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/shop" element={<Products />} /> {/* Alias for shop */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
