import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Software = () => {
  return (
    <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple mb-6 animate-pulse">
            KHILARIVERSE COMMAND CENTER
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Unleash the full potential of your gear. Customize RGB lighting, macro keys, and performance settings with our unified software suite.
          </p>
          <button className="bg-neon-pink hover:bg-neon-pink/80 text-white font-bold py-3 px-8 rounded-full shadow-glow-pink transition-all transform hover:scale-105">
            DOWNLOAD NOW (v2.4.0)
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-dark-card p-8 rounded-lg border border-white/10 hover:border-neon-blue/50 transition-colors shadow-lg">
            <h3 className="text-2xl font-display font-bold text-neon-blue mb-4">Sync Your RGB</h3>
            <p className="text-gray-400 mb-4">
              Synchronize lighting effects across all your KhilariVerse peripherals. Choose from 16.8 million colors.
            </p>
            <div className="h-48 bg-gray-800 rounded flex items-center justify-center border border-white/5">
              <span className="text-gray-600 font-display">RGB OVERVIEW IMAGE</span>
            </div>
          </div>
          <div className="bg-dark-card p-8 rounded-lg border border-white/10 hover:border-neon-purple/50 transition-colors shadow-lg">
            <h3 className="text-2xl font-display font-bold text-neon-purple mb-4">Macro Customization</h3>
            <p className="text-gray-400 mb-4">
              Record complex macros and remap keys to gain the competitive edge in your favorite MOBA or MMO.
            </p>
            <div className="h-48 bg-gray-800 rounded flex items-center justify-center border border-white/5">
              <span className="text-gray-600 font-display">MACRO INTERFACE IMAGE</span>
            </div>
          </div>
        </div>

        {/* System Requirements */}
        <div className="bg-dark-card p-8 rounded-lg border border-white/10">
          <h3 className="text-xl font-display font-bold text-white mb-6 border-b border-white/10 pb-4">System Requirements</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
              Windows 10 or Windows 11 (64-bit)
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
              200 MB available hard disk space
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
              Internet connection for software installation
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Software;
