import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Twitter, Instagram, Youtube, Facebook, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 md:gap-16 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 font-display text-2xl font-bold text-white uppercase">
              <Gamepad2 className="text-neon-pink" size={32} />
              <span>KHILARI<span className="text-neon-pink">VERSE</span></span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[0.95rem]">
              Premium gaming peripherals engineered for competitive players.
              Dominate the server.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 transition-all duration-200 hover:text-neon-pink hover:-translate-y-0.5"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 transition-all duration-200 hover:text-neon-pink hover:-translate-y-0.5"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 transition-all duration-200 hover:text-neon-pink hover:-translate-y-0.5"><Youtube size={20} /></a>
              <a href="#" className="text-gray-400 transition-all duration-200 hover:text-neon-pink hover:-translate-y-0.5"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-xl font-bold mb-6 text-white uppercase">Shop</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-neon-pink transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/category/keyboards" className="text-gray-400 hover:text-neon-pink transition-colors">Keyboards</Link>
              </li>
              <li>
                <Link to="/category/mice" className="text-gray-400 hover:text-neon-pink transition-colors">Mice</Link>
              </li>
              <li>
                <Link to="/category/headsets" className="text-gray-400 hover:text-neon-pink transition-colors">Headsets</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-xl font-bold mb-6 text-white uppercase">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-neon-pink transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-neon-pink transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-neon-pink transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-neon-pink transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/bundles" className="text-gray-400 hover:text-neon-pink transition-colors text-neon-blue font-bold">Exclusive Bundles</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-xl font-bold mb-6 text-white uppercase">Stay in the Loop</h4>
            <p className="text-gray-400 mb-6">Subscribe for exclusive drops, pro tips, and special offers.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-dark-bg border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-neon-pink w-full"
              />
              <button
                type="submit"
                className="bg-neon-pink text-white p-2 rounded hover:bg-neon-pink/80 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} KHILARIVERSE. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-neon-pink transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-neon-pink transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
