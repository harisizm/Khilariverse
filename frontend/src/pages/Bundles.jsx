import React from 'react';
import { Link } from 'react-router-dom';

const Bundles = () => {
  // Dummy bundle data
  const bundles = [
    {
      id: "b1",
      name: "The Pro Starter Pack",
      price: 149.99,
      save: "Save $30",
      description: "Everything you need to start dominating. Includes the K70 Mech Keyboard and M65 Mouse.",
      image: "bg-blue-900/40"
    },
    {
      id: "b2",
      name: "Streamer Ultimate Kit",
      price: 299.99,
      save: "Save $50",
      description: "Studio-grade quality for your audience. Headset, Microphone, and lighting controller.",
      image: "bg-purple-900/40"
    },
    {
      id: "b3",
      name: "Esports Elite Bundle",
      price: 199.00,
      save: "Save $45",
      description: "Ultra-lightweight gear for maximum FPS. Wireless Mouse + TKL Keyboard.",
      image: "bg-pink-900/40"
    }
  ];

  return (
    <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            EXCLUSIVE <span className="text-neon-pink">BUNDLES</span>
          </h1>
          <p className="text-gray-400">Gear up for less. Curated setups for every playstyle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="bg-dark-card rounded-lg overflow-hidden border border-white/10 hover:border-neon-pink/50 transition-all group">
              {/* Dummy Image Area */}
              <div className={`h-64 ${bundle.image} flex items-center justify-center relative`}>
                <span className="text-gray-400 font-display font-bold text-xl uppercase tracking-widest group-hover:scale-110 transition-transform">{bundle.name}</span>
                <span className="absolute top-4 right-4 bg-neon-pink text-white text-xs font-bold px-3 py-1 rounded-full">{bundle.save}</span>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{bundle.name}</h3>
                <p className="text-gray-400 mb-6 text-sm h-12">{bundle.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-neon-blue">${bundle.price}</span>
                  <button className="bg-white text-black font-bold py-2 px-6 rounded hover:bg-neon-pink hover:text-white transition-colors">
                    VIEW DEAL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Bundles;
