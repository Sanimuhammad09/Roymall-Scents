import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export function HeroSection() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-ivory flex items-center justify-center">
      {/* Full-width Background Image */}
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-ivory animate-pulse z-0" />
      )}
      <img
        src="/images/hero_perfume.png"
        alt="Luxury perfume bottle"
        loading="eager"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        } z-0`}
        onLoad={() => setIsImageLoaded(true)}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Text Overlay */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 w-full max-w-4xl mx-auto mt-16 lg:mt-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.04em] text-white uppercase leading-none mb-4 drop-shadow-lg">
          YOUR SIGNATURE SCENT
        </h1>
        
        <p className="text-white text-base sm:text-lg lg:text-xl font-medium tracking-wide max-w-2xl mb-8 drop-shadow-md">
          Discover a curated collection of premium fragrances crafted for every mood. Elegance, confidence, and allure in every bottle.
        </p>

        <a href="#shop-all">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold text-white text-[13px] font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-white hover:text-primary transition-colors duration-300"
          >
            Shop Now
          </motion.button>
        </a>
      </motion.div>
    </section>
  );
}
