import React, { useState, useEffect, useContext, useRef } from 'react';
import { Search, User, ShoppingCart, Menu, X, Gamepad2, LogOut, Package } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const { getCartCount, searchQuery, setSearchQuery } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
      // Auto-focus input when search opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100); // Small delay to allow transition/render
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'SOFTWARE', path: '/software' },
    { name: 'SUPPORT', path: '/support' },
  ];

  const handleUserIconClick = () => {
    if (user) {
      // If logged in, maybe go to profile or simple logout confirmation?
      // For now, let's just do nothing or maybe toggle a dropdown (simplified: just log out button appears)
    } else {
      navigate('/login');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/products');
    setShowSearch(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-dark-bg/95 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold tracking-widest text-white uppercase z-[51]">
          <Gamepad2 className="text-neon-pink" size={32} />
          <span>KHILARI<span className="text-neon-pink">VERSE</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex gap-12 transition-opacity duration-300`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-base font-medium tracking-wide uppercase relative py-2 transition-colors duration-300 ${location.pathname === link.path ? 'text-neon-pink' : 'text-gray-400 hover:text-neon-pink'
                } group`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-neon-pink shadow-[0_0_10px_rgba(255,0,85,1)] transition-all duration-300 ${location.pathname === link.path ? 'width-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </Link>
          ))}
          {/* Admin Link if User is Admin */}
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-base font-medium tracking-wide uppercase py-2 text-neon-pink hover:text-white transition-colors">
              ADMIN DASHBOARD
            </Link>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-8 z-[51]">

          {/* Search Component */}
          <div className="relative flex items-center" ref={searchRef}>
            {/* Sliding Input */}
            <div className={`absolute right-full mr-4 transition-all duration-300 ease-in-out ${showSearch ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search gear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-card border border-neon-pink/50 text-white pl-4 pr-10 py-2 rounded-full focus:outline-none focus:shadow-glow text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neon-pink transition-colors cursor-pointer"
                >
                  <Search size={16} />
                </button>
              </form>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`text-gray-400 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer ${showSearch ? 'text-neon-pink' : ''}`}
              aria-label="Search"
            >
              <Search size={22} />
            </button>
          </div>

          <div className="relative group">
            <button
              onClick={handleUserIconClick}
              className={`text-gray-400 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer ${user ? 'text-neon-pink' : ''}`}
              aria-label="User Account"
            >
              <User size={22} />
            </button>
            {/* Simple Dropdown for Logout */}
            {user && (
              <div className="absolute right-0 top-full pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                <div className="bg-dark-card border border-white/10 rounded shadow-glow flex flex-col p-2">
                  <p className="px-3 py-2 text-sm text-neon-pink font-display font-bold border-b border-white/10 truncate">
                    Hello, {user.name}
                  </p>
                  {user.role !== 'admin' && (
                    <Link to="/orders" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md w-full text-left transition-colors cursor-pointer mt-1">
                      <Package size={16} /> Orders
                    </Link>
                  )}
                  <button onClick={logout} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md w-full text-left transition-colors cursor-pointer mt-1">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {user?.role !== 'admin' && (
            <Link to="/cart" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-200 relative" aria-label="Cart">
              <ShoppingCart size={20} />
              <span className="absolute -top-1.5 -right-2 bg-neon-pink text-dark-bg text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-dark-bg flex flex-col justify-center items-center gap-8 z-40 animate-[slideIn_0.3s_ease]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="font-display text-3xl font-bold text-white uppercase hover:text-neon-pink transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="font-display text-2xl font-bold text-neon-pink uppercase">Logout</button>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="font-display text-2xl font-bold text-white uppercase hover:text-neon-pink">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
