import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export function HeroSection() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="relative w-full h-[85vh] min-h-125 overflow-hidden bg-primary flex items-center justify-center">
      {/* Full-width Background Image */}
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-primary animate-pulse z-0" />
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

      {/* Dark overlay for rich contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/70 z-10" />

      {/* Text Overlay - Lattafa style */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 w-full max-w-4xl mx-auto mt-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="font-heading font-normal italic text-xl sm:text-2xl text-accent mb-4 tracking-wide">
          Indulge The Luxury Of Fragrances
        </h2>
        
        <h1 className="font-heading font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-white leading-tight mb-8 drop-shadow-xl">
          Discover The Essence Of Pure Elegance
        </h1>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Link
            to="/collections/all"
            className="border-2 border-accent bg-transparent text-accent text-[14px] font-bold tracking-[0.2em] uppercase px-10 py-4 hover:bg-accent hover:text-primary transition-all duration-300 shadow-premium"
          >
            Explore Collection
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
