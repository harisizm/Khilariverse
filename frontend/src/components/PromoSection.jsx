import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Shield, Truck, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromoSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => num.toString().padStart(2, '0');

  return (
    <section className="relative py-32 text-center overflow-hidden bg-dark-bg">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,0,85,0.15)_0%,rgba(0,0,0,0)_70%)] z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4">
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 inline-block mb-6">
          <span className="font-bold text-white tracking-widest uppercase">Limited Time Offer</span>
        </div>

        <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-none text-white">
          ULTIMATE PRO <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-white">BUNDLE</span>
        </h2>

        <p className="text-white text-xl mb-10 max-w-lg">
          Get the full esports arsenal including the Phantom Keyboard, Viper Mouse, and Sonic Headset at an unbeatable price.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-8 mb-20">
          <Link to="/shop" className="px-12 py-4 text-lg font-semibold text-white bg-gradient-to-br from-neon-pink to-[#ff0055] rounded-md shadow-[0_0_20px_rgba(255,0,85,0.3)] hover:shadow-[0_0_30px_rgba(255,0,85,0.6)] transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2">
            Shop Bundles <ArrowRight size={20} />
          </Link>

          <div className="font-mono text-gray-400 text-base">
            Offer ends in <span className="text-white font-bold text-lg ml-2">{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-20 w-full">
          <div className="flex flex-col items-center gap-2">
            <span className="font-display text-4xl font-bold text-neon-pink drop-shadow-[0_0_10px_rgba(255,0,85,0.3)]">50K+</span>
            <span className="text-gray-400 uppercase text-sm tracking-wider">Happy Gamers</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-display text-4xl font-bold text-neon-pink drop-shadow-[0_0_10px_rgba(255,0,85,0.3)]">4.9</span>
            <span className="text-gray-400 uppercase text-sm tracking-wider">Average Rating</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-display text-4xl font-bold text-neon-pink drop-shadow-[0_0_10px_rgba(255,0,85,0.3)]">24/7</span>
            <span className="text-gray-400 uppercase text-sm tracking-wider">Support</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-display text-4xl font-bold text-neon-pink drop-shadow-[0_0_10px_rgba(255,0,85,0.3)]">30-Day</span>
            <span className="text-gray-400 uppercase text-sm tracking-wider">Returns</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
