import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import local category images
import keyboardImg from '../assets/categories/keyboard-category.jpg';
import mouseImg from '../assets/categories/mouse-category.jpg';
import headsetImg from '../assets/categories/headset-category.jpg';
import chairImg from '../assets/categories/chair-category.jpg';
import monitorImg from '../assets/categories/monitor-category.jpg';
import gpuImg from '../assets/categories/gpu-category.jpg';

const categories = [
  {
    id: 1,
    title: 'Keyboards',
    image: keyboardImg,
    desc: 'Immersive sound for tactical advantage',
    link: '/category/keyboards',
    color: 'border-neon-pink'
  },
  {
    id: 2,
    title: 'Gaming Mice',
    image: mouseImg,
    link: '/category/mice',
    color: 'border-neon-pink'
  },
  {
    id: 3,
    title: 'Headsets',
    image: headsetImg,
    link: '/category/headsets',
    color: 'border-neon-pink'
  },
  {
    id: 4,
    title: 'Chairs',
    image: chairImg,
    link: '/category/chairs',
    color: 'border-neon-green'
  },
  {
    id: 5,
    title: 'Monitors',
    image: monitorImg,
    link: '/category/monitors',
    color: 'border-neon-orange'
  },
  {
    id: 6,
    title: 'Components',
    image: gpuImg,
    link: '/category/components',
    color: 'border-neon-red'
  }
];

const CategorySection = () => {
  return (
    <section className="py-24 bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl font-bold mb-4 uppercase text-white">
            Browse by <span className="text-neon-pink">Category</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Essential gear for your battle station
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              to={category.link}
              key={category.id}
              className="group relative h-[300px] rounded-2xl overflow-hidden block bg-dark-card border border-white/5"
            >
              {/* Image Container with Faded Effect */}
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40 transition-opacity"
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>

              {/* Dark Gradient Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Text Overlay - Centered as per "text of name appears on top" interpretation or standard centered overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                <h3 className="font-display text-4xl font-bold uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-300">
                  {category.title}
                </h3>
              </div>

              {/* Hover Border Effect */}
              <div className={`absolute inset-0 border-2 rounded-2xl pointer-events-none transition-colors duration-300 z-20 border-transparent group-hover:${category.color}`}></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
