import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ProductCard } from '@/components/common/ProductCard';
import { motion } from 'framer-motion';

export function AllProductsGrid() {
  const { data: liveProducts, isLoading } = useQuery({
    queryKey: ['all-products'],
    queryFn: async () => {
      const { data } = await api.get('/products?limit=12');
      return data.data || data;
    },
  });

  const products = liveProducts || [];

  const categories = [
    { title: "Signature Series", items: products.slice(0, 3) },
    { title: "New Fragrance Designs", items: products.slice(3, 6) },
    { title: "Popular Perfumes", items: products.slice(6, 9) },
    { title: "Our Special Scents", items: products.slice(9, 12) }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white" id="shop-all">
      <div className="container-premium px-4 sm:px-8">
        {/* Removed Our Collection header to match the section-by-section screenshot */}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full">
                <ProductCard isLoading={true} id="" slug="" name="" price={0} images={[]} colors={[]} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-20">
            {categories.map((category, catIdx) => (
              category.items.length > 0 && (
                <div key={catIdx}>
                  <h2 className="text-center font-bold text-3xl sm:text-4xl text-gold mb-8">
                    {category.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
                    {category.items.map((product: any, idx: number) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
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
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
