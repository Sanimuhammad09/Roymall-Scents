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
    { title: "Top Sellers", items: products.slice(0, 4) },
    { title: "New Fragrance Designs", items: products.slice(4, 8) },
    { title: "Signature Scents", items: products.slice(8, 12) }
  ];

  return (
    <section className="py-32 sm:py-40 bg-white" id="shop-all">
      <div className="container-premium px-4 sm:px-8 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full">
                <ProductCard isLoading={true} id="" slug="" name="" price={0} images={[]} colors={[]} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-32">
            {categories.map((category, catIdx) => (
              category.items.length > 0 && (
                <div key={catIdx}>
                  <h2 className="text-center font-heading font-normal text-3xl sm:text-4xl text-primary mb-12 tracking-wider">
                    {category.title}
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
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
