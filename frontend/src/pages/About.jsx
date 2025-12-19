import React from 'react';

const About = () => {
  return (
    <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg min-h-screen text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple mb-8">
          ABOUT KHILARIVERSE
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed text-lg">
          <p>
            Born in the heart of the digital arena, <span className="text-neon-pink font-bold">KhilariVerse</span> isn't just a brand; it's a manifesto for gamers who refuse to settle for mediocrity.
          </p>

          <p>
            We started with a simple question: "Why does pro-grade gear have to cost a fortune?" The answer was that it doesn't. We engineer high-performance peripherals—from ultra-responsive mechanical keyboards to precision-tuned mice—designed to give you the competitive edge without the markup.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">OUR MISSION</h2>
          <p>
            To democratize esports performance. Whether you're a casual grinder or a ranked demon, you deserve gear that keeps up with your reflexes. We build tools, not toys.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
            <div className="p-6 bg-dark-card border border-white/10 rounded-lg">
              <h3 className="text-3xl font-bold text-neon-blue mb-2">50K+</h3>
              <p className="text-sm text-gray-400">Gamers Equipped</p>
            </div>
            <div className="p-6 bg-dark-card border border-white/10 rounded-lg">
              <h3 className="text-3xl font-bold text-neon-purple mb-2">4.9/5</h3>
              <p className="text-sm text-gray-400">Community Rating</p>
            </div>
            <div className="p-6 bg-dark-card border border-white/10 rounded-lg">
              <h3 className="text-3xl font-bold text-neon-pink mb-2">24/7</h3>
              <p className="text-sm text-gray-400">Support Ops</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
