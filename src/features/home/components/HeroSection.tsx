import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export function HeroSection() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="relative w-full h-[70vh] min-h-125 overflow-hidden bg-ivory flex items-center justify-center">
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
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Text Overlay - Fastestcakes style */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 w-full max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-tight mb-6">
          Order Amazing Perfumes from Just ₦16,500
        </h1>
        
        <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-gold uppercase leading-tight mb-8">
          Get Fast Shipping and Free Packaging!
        </h2>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link
            to="/collections/all"
            className="bg-gold text-white text-[13px] font-bold tracking-[0.15em] uppercase px-8 py-3 hover:bg-white hover:text-primary transition-colors duration-300"
          >
            Shop Now
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
