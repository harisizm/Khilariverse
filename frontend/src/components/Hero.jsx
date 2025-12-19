import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroVideo from '../assets/hero_video.mp4';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-20 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-0 transition-opacity duration-1000"
          onLoadedData={(e) => e.target.classList.remove('opacity-0')}
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay - Faded/Dull Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 -z-10"></div>

      {/* Grid Pattern Overlay (Optional, keeping subtle texture) */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px]"></div>


      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-6 leading-tight animate-[slideUp_0.5s_ease-out_0.2s_both] drop-shadow-lg">
            For Gamers.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-white animate-pulse text-7xl">By Gamers.</span>
          </h1>

          <p className="text-gray-200 text-xl md:text-2xl mb-10 max-w-2xl mx-auto animate-[slideUp_0.5s_ease-out_0.4s_both] drop-shadow-md font-medium">
            Custom-built gaming PCs, designed around your ambition
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center animate-[slideUp_0.5s_ease-out_0.6s_both]">
            <Link to="/products" className="group relative px-8 py-4 bg-neon-pink text-white font-bold text-lg rounded overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,85,0.5)] cursor-pointer">
              <span className="relative z-10 flex items-center gap-2">
                SHOP NOW <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            <Link to="/products" className="px-8 py-4 border border-white/30 text-white font-bold text-lg rounded hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm">
              New Arrivals
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
