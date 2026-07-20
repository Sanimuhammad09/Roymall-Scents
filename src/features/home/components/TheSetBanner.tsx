import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export function TheSetBanner() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#c5cbce]">
      <div className="flex flex-col md:flex-row items-center min-h-[500px] lg:min-h-[600px] max-w-[1600px] mx-auto">
        {/* Left: Image of models */}
        <motion.div 
          className="relative w-full md:w-[55%] lg:w-[50%] h-[400px] md:h-[500px] lg:h-[600px] flex items-end justify-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-[#c5cbce] animate-pulse" />
          )}
          {/* We use a cutout image or an image with the same background to blend seamlessly */}
          <img
            src="/images/gift_sets.png"
            alt="Luxury perfume gift sets"
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </motion.div>

        {/* Right: Text Content */}
        <motion.div 
          className="w-full md:w-[45%] lg:w-[50%] flex flex-col justify-center items-center text-center px-8 sm:px-12 py-16 md:py-0 mt-8 md:mt-0"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-[0.02em] uppercase text-black mb-6 leading-none">
            GIFT SETS
          </h2>
          <p className="text-black/80 text-[14px] sm:text-[15px] leading-relaxed max-w-sm mb-10 font-medium">
            The perfect present for any occasion.
            <br />
            Discover our beautifully curated luxury fragrance sets.
          </p>
          <Link
            to="/collections/gifts"
            className="inline-block text-[13px] font-bold tracking-[0.15em] uppercase text-black border-b-2 border-black pb-1 hover:text-neutral-600 hover:border-neutral-600 transition-colors"
          >
            SHOP GIFT SETS
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
