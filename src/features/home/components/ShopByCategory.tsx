import React from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { api } from '@/lib/axios';

const mockCategories = [
  {
    name: "WOMEN'S SCENTS",
    image: '/images/perfume_floral.png',
    path: '/collections/women',
    featured: true,
  },
  {
    name: "MEN'S SCENTS",
    image: '/images/perfume_designer.png',
    path: '/collections/men',
    featured: true,
  },
  {
    name: "EAU DE PARFUM",
    image: '/images/perfume_floral.png',
    path: '/collections/eau-de-parfum',
  },
  {
    name: "EAU DE TOILETTE",
    image: '/images/perfume_designer.png',
    path: '/collections/eau-de-toilette',
  },
  {
    name: "GIFT SETS",
    image: '/images/perfume_oud.png',
    path: '/collections/gifts',
  },
  {
    name: "TRAVEL SIZES",
    image: '/images/perfume_luxury.png',
    path: '/collections/travel-sizes',
  },
];

export function ShopByCategory() {
  const { data: liveCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data.data || data;
    },
  });

  const displayCategories = liveCategories && liveCategories.length > 0 ? liveCategories.map((c: any, idx: number) => ({
    name: c.name.toUpperCase(),
    image: c.image || (idx % 2 === 0 ? '/images/perfume_product.png' : '/images/gift_sets.png'),
    path: `/collections/${c.slug}`,
    featured: idx < 2,
  })) : mockCategories;

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container-premium">
        <motion.div 
          className="flex justify-between items-end mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading font-black text-3xl sm:text-4xl tracking-wide text-black uppercase">
            Shop By Category
          </h2>
          <Link to="/collections/women" className="hidden sm:block text-[13px] font-bold tracking-[0.1em] uppercase border-b-2 border-black pb-1 hover:text-neutral-600 hover:border-neutral-600 transition-colors">
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayCategories.map((cat: any, idx: number) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={cat.featured ? 'col-span-2' : 'col-span-1'}
            >
              <Link
                to={cat.path}
                className={`group flex flex-col relative overflow-hidden bg-neutral-100 w-full ${
                  cat.featured ? 'aspect-[4/5] lg:aspect-[3/4]' : 'aspect-square lg:aspect-[3/4]'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
                  <p className={`font-bold tracking-[0.1em] uppercase text-white ${
                    cat.featured ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'
                  }`}>
                    {cat.name}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 sm:hidden flex justify-center">
          <Link to="/collections/women" className="text-[13px] font-bold tracking-[0.1em] uppercase border-b-2 border-black pb-1 hover:text-neutral-600 hover:border-neutral-600 transition-colors">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
