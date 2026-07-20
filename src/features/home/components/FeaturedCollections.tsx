import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

const collections = [
  {
    id: '1',
    title: "Women's",
    subtitle: 'Shop the Collection',
    image: '/images/hero.png',
    link: '/collections/women',
  },
  {
    id: '2',
    title: "Men's",
    subtitle: 'Shop the Collection',
    image: '/images/banner.png',
    link: '/collections/men',
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-premium">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={collection.link}
              className="group relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden block bg-neutral-100"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              {/* Light gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-10">
                <motion.h3
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="font-heading font-black text-white text-3xl sm:text-4xl lg:text-5xl tracking-[0.06em] uppercase"
                >
                  {collection.title}
                </motion.h3>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                  className="mt-3 text-white/90 text-[13px] font-medium tracking-wide underline underline-offset-4 decoration-white/60 group-hover:decoration-white transition-all"
                >
                  {collection.subtitle}
                </motion.span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
