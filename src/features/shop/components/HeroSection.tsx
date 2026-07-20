import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
}

export function HeroSection({
  title,
  subtitle,
  imageUrl,
  ctaText = 'Shop Now',
  ctaLink = '/shop',
}: HeroSectionProps) {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for text readability */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl font-medium mb-8 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to={ctaLink}
            className="inline-block bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors duration-300"
          >
            {ctaText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
