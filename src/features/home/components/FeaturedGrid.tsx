import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ProductCard } from '@/components/common/ProductCard';
import { motion } from 'framer-motion';

export function FeaturedGrid() {
  const { data: liveProducts, isLoading } = useQuery({
    queryKey: ['all-products'],
    queryFn: async () => {
      const { data } = await api.get('/products?limit=24');
      return data.data || data;
    },
  });

  const products = liveProducts || [];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container-premium px-4 sm:px-8">
        <motion.div 
          className="flex justify-between items-end mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading font-black text-3xl sm:text-4xl tracking-wide text-black uppercase">
            Signature Collection
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-full">
                <ProductCard isLoading={true} id="" slug="" name="" price={0} images={[]} colors={[]} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product: any, idx: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <ProductCard 
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={product.basePrice}
                  images={product.images || []}
                  colors={product.variants?.map((v: any) => ({ name: v.color, hex: v.colorHex || '#000000' })) || []}
                  isNew={product.isFeatured}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
