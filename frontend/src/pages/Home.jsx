import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import FeaturedGear from '../components/FeaturedGear';
import PromoSection from '../components/PromoSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <CategorySection />
      <FeaturedGear />
      <PromoSection />
      <Footer />
    </div>
  );
};

export default Home;
