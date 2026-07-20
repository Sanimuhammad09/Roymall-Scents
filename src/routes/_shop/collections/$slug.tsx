import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { X, ChevronDown, Plus } from 'lucide-react';
import { ProductCard } from '@/components/common/ProductCard';
import { useProducts } from '@/features/products/api/hooks';
import { useSEO } from '@/hooks/useSEO';

export const Route = createFileRoute('/_shop/collections/$slug')({
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['CATEGORY']);

  const collectionTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useSEO({
    title: `${collectionTitle} Perfumes`,
    description: `Shop our ${collectionTitle} collection of premium luxury fragrances and perfumes.`,
  });

  const isCollection = ['women', 'men'].includes(slug.toLowerCase());
  const queryFilters = isCollection ? { collection: slug } : { category: slug };

  const { data: productsData, isLoading } = useProducts(queryFilters);
  const products = productsData?.data || [];
  const totalProducts = productsData?.meta?.total || 0;

  const filters = [
    { name: 'CATEGORY', options: ['Eau de Parfum', 'Eau de Toilette', 'Travel Sizes', 'Gift Sets', 'Solid Perfumes'] },
    { name: 'SCENT PROFILE', options: ['Floral', 'Woody', 'Citrus', 'Spicy', 'Fresh'] },
    { name: 'SIZE', options: ['30ml', '50ml', '100ml', 'Travel', 'Sample'] },
    { name: 'GENDER', options: ['Unisex', 'Feminine', 'Masculine'] },
    { name: 'AVAILABILITY', options: ['In Stock', 'New Arrivals', 'Best Sellers'] },
  ];

  const toggleFilter = (name: string) => {
    setExpandedFilters((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <div className="w-full relative bg-neutral-100 aspect-[4/3] sm:aspect-[21/9] lg:aspect-[21/7] overflow-hidden flex items-end sm:items-center justify-center p-8 sm:p-12 text-center group">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt={`${collectionTitle} Collection Banner`}
            className="w-full h-full object-cover object-top opacity-80"
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 group-hover:bg-black/20" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading uppercase tracking-[0.05em] text-white drop-shadow-md mb-3 md:mb-6 leading-none">
            {collectionTitle}
          </h1>
          <p className="text-[13px] md:text-[15px] text-white font-medium tracking-wide max-w-xl mx-auto drop-shadow-md hidden sm:block">
            Curated luxury fragrances. Available 24/7, 365 days a year.
          </p>
        </div>
      </div>

      <div className="flex px-4 sm:px-8 xl:px-12 py-8 lg:py-12 max-w-[1800px] mx-auto">
        {/* Desktop Sticky Sidebar */}
        <aside className="hidden lg:block w-[260px] flex-shrink-0 pr-12 sticky top-[100px] h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-8 pb-1 border-b-2 border-black">
            <span className="text-[13px] font-bold font-heading tracking-[0.1em] uppercase">Filter</span>
            <button className="text-[11px] text-neutral-500 font-bold hover:text-black transition-colors uppercase tracking-widest">
              Clear All
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            {filters.map((filter) => {
              const isExpanded = expandedFilters.includes(filter.name);
              return (
                <div key={filter.name} className="pb-4 border-b border-neutral-100 mb-2">
                  <button 
                    className="w-full flex items-center justify-between text-[12px] font-bold font-heading tracking-[0.1em] uppercase text-black hover:text-neutral-600 transition-colors py-2"
                    onClick={() => toggleFilter(filter.name)}
                  >
                    {filter.name}
                    {isExpanded ? (
                      <span className="text-xl leading-none font-light block pb-1">−</span>
                    ) : (
                      <span className="text-xl leading-none font-light block pb-1">+</span>
                    )}
                  </button>
                  
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-col gap-3 pt-3 overflow-hidden"
                    >
                      {filter.options.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative w-4 h-4 border border-neutral-300 flex items-center justify-center transition-colors group-hover:border-black group-active:border-black">
                            {/* Checkbox state can be bound here */}
                          </div>
                          <span className="text-[13px] text-neutral-600 font-medium group-hover:text-black transition-colors">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 w-full">
          {/* Mobile Filter Toggle & Sort */}
          <div className="flex items-center justify-between mb-8 pb-4 lg:pb-0 border-b border-neutral-100 lg:border-none">
            <button 
              className="lg:hidden flex items-center gap-2 text-[12px] font-bold font-heading tracking-[0.1em] uppercase border border-neutral-200 px-5 py-2.5 hover:border-black transition-colors"
              onClick={() => setShowMobileFilters(true)}
            >
              Filter / Sort <Plus size={14} />
            </button>
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-neutral-500">Sort By:</span>
              <button className="flex items-center gap-1.5 text-[12px] font-bold font-heading tracking-[0.1em] uppercase text-black hover:text-neutral-600 transition-colors">
                Recommended <ChevronDown size={14} />
              </button>
            </div>
            <div className="text-[12px] font-bold font-heading tracking-[0.1em] text-neutral-500 uppercase">
              {totalProducts} Results
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-12 sm:gap-x-6 sm:gap-y-16">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <ProductCard key={i} isLoading={true} id="" slug="" name="" price={0} images={[]} colors={[]} />
              ))
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                >
                  <ProductCard 
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    price={product.basePrice}
                    images={product.images || []}
                    colors={product.variants?.map(v => ({ name: v.color, hex: v.colorHex || '#000000' })) || []}
                    isNew={product.isFeatured}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center flex flex-col items-center">
                <p className="text-[14px] font-bold text-neutral-500 mb-6 tracking-wide">No products found in this collection.</p>
                <button className="px-8 py-4 bg-black text-white text-[12px] font-bold font-heading tracking-[0.1em] uppercase hover:bg-neutral-800 transition-colors">
                  Shop All Fragrances
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalProducts > 0 && (
            <div className="flex flex-col items-center justify-center gap-4 mt-20 border-t border-neutral-100 pt-16">
              <span className="text-[12px] font-bold font-heading tracking-[0.1em] uppercase text-neutral-500">
                Viewing {products.length} of {totalProducts} Products
              </span>
              <div className="w-full max-w-[200px] h-1 bg-neutral-100 mt-2">
                <div 
                  className="h-full bg-black transition-all duration-500" 
                  style={{ width: `${Math.min(100, (products.length / totalProducts) * 100)}%` }}
                />
              </div>
              <button className="mt-8 px-10 py-4 border border-black text-black text-[12px] font-bold font-heading tracking-[0.1em] uppercase hover:bg-black hover:text-white transition-colors">
                Load More
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-[90%] max-w-[400px] bg-white z-50 lg:hidden overflow-y-auto flex flex-col shadow-2xl"
          >
            <div className="h-[64px] px-6 flex items-center justify-between border-b-2 border-black shrink-0">
              <h3 className="text-[13px] font-bold font-heading tracking-[0.1em] uppercase">
                Filter & Sort
              </h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 -mr-2 text-neutral-400 hover:text-black transition-colors">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex-1 p-6 flex flex-col overflow-y-auto">
              <div className="pb-8 border-b border-neutral-100 mb-6">
                <span className="text-[11px] font-bold font-heading tracking-[0.1em] uppercase text-neutral-500 mb-4 block">Sort By</span>
                <select className="w-full border border-neutral-200 p-4 text-[13px] font-bold tracking-wide outline-none focus:border-black appearance-none bg-white rounded-none cursor-pointer">
                  <option>Recommended</option>
                  <option>Newest Arrivals</option>
                  <option>Price (Low to High)</option>
                  <option>Price (High to Low)</option>
                </select>
              </div>

              {filters.map((filter) => {
                const isExpanded = expandedFilters.includes(filter.name);
                return (
                  <div key={filter.name} className="border-b border-neutral-100 pb-2 mb-2">
                    <button 
                      className="w-full flex items-center justify-between text-[12px] font-bold font-heading tracking-[0.1em] uppercase text-black hover:text-neutral-600 transition-colors py-4"
                      onClick={() => toggleFilter(filter.name)}
                    >
                      {filter.name}
                      {isExpanded ? (
                        <span className="text-xl leading-none font-light block pb-1">−</span>
                      ) : (
                        <span className="text-xl leading-none font-light block pb-1">+</span>
                      )}
                    </button>
                    {isExpanded && (
                      <div className="flex flex-col gap-4 pb-4">
                        {filter.options.map(opt => (
                           <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                             <div className="relative w-5 h-5 border border-neutral-300 flex items-center justify-center transition-colors group-hover:border-black group-active:border-black"></div>
                             <span className="text-[14px] text-neutral-600 font-medium group-hover:text-black transition-colors">
                               {opt}
                             </span>
                           </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="shrink-0 p-6 border-t border-neutral-100 bg-white grid grid-cols-2 gap-4">
              <button className="py-4 border border-black text-black text-[12px] font-bold font-heading tracking-[0.1em] uppercase hover:bg-neutral-50 transition-colors">
                Clear All
              </button>
              <button className="py-4 bg-black text-white text-[12px] font-bold font-heading tracking-[0.1em] uppercase hover:bg-neutral-800 transition-colors" onClick={() => setShowMobileFilters(false)}>
                View Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
