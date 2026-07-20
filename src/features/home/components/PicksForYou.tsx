import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRight, Heart } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { formatCurrency } from '@/lib/utils';

const mockProducts = [
  {
    id: '1',
    slug: 'aura-eau-de-parfum',
    name: 'Aura Eau de Parfum',
    price: 185.0,
    image: '/images/perfume_floral.png',
  },
  {
    id: '2',
    slug: 'midnight-rose-extrait',
    name: 'Midnight Rose Extrait',
    price: 240.0,
    image: '/images/perfume_luxury.png',
  },
  {
    id: '3',
    slug: 'oud-velvet',
    name: 'Oud Velvet',
    price: 210.0,
    image: '/images/perfume_oud.png',
  },
  {
    id: '4',
    slug: 'citrus-bliss-cologne',
    name: 'Citrus Bliss Cologne',
    price: 150.0,
    image: '/images/perfume_designer.png',
  },
  {
    id: '5',
    slug: 'santal-noir',
    name: 'Santal Noir',
    price: 195.0,
    image: '/images/perfume_luxury.png',
  },
  {
    id: '6',
    slug: 'discovery-set',
    name: 'Discovery Set',
    price: 45.0,
    image: '/images/perfume_oud.png',
  },
];

export function PicksForYou() {
  const { data: liveProducts, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data } = await api.get('/products');
      return data.data || data;
    },
  });

  const displayProducts = liveProducts && liveProducts.length > 0 ? liveProducts.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.basePrice,
    image: p.images?.[0]?.url || '/images/perfume_product.png',
  })) : mockProducts;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [canScrollNext, setCanScrollNext] = useState(true);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <motion.div 
        className="container-premium px-4 sm:px-8 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading font-black text-3xl sm:text-4xl tracking-wide text-black uppercase">
          Picks For You
        </h2>
      </motion.div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6">
            {displayProducts.map((product: any, index: number) => (
              <div
                key={product.id}
                className={`flex-[0_0_75%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_24%] xl:flex-[0_0_20%] min-w-0 group ${
                  index === 0 ? 'ml-4 sm:ml-8 lg:ml-16' : ''
                } ${index === displayProducts.length - 1 ? 'mr-4 sm:mr-8 lg:mr-16' : ''}`}
              >
                <Link to={`/products/${product.slug}`} className="block relative">
                  {/* Image */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-100 mb-4 rounded-none">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Wishlist heart */}
                    <button
                      className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-black/70 hover:text-black transition-colors"
                      aria-label="Add to wishlist"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <Heart size={18} strokeWidth={2} />
                    </button>
                  </div>
                </Link>

                {/* Product info */}
                <Link to={`/products/${product.slug}`} className="block">
                  <p className="text-[13px] sm:text-[14px] font-bold text-black tracking-wide leading-snug line-clamp-2 mb-1 uppercase">
                    {product.name}
                  </p>
                  <p className="text-[13px] sm:text-[14px] text-neutral-600">
                    {formatCurrency(product.price)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll next button */}
        {canScrollNext && (
          <button
            onClick={scrollNext}
            className="absolute right-4 sm:right-8 top-[35%] -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:scale-105 transition-transform border border-neutral-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} strokeWidth={2} />
          </button>
        )}
      </div>
    </section>
  );
}
