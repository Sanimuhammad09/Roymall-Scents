import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/common/ProductCard';
import { Link } from '@tanstack/react-router';
import { useFeaturedProducts } from '@/features/products/api/hooks';



export function NewArrivals() {
  const { data: featuredProducts, isLoading } = useFeaturedProducts(8);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 sm:py-20 bg-neutral-50 overflow-hidden">
      <div className="container-premium">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500 mb-2 block">
              Just Dropped
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-black">
              New Arrivals
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                prevBtnEnabled
                  ? 'border-black text-black hover:bg-black hover:text-white'
                  : 'border-neutral-200 text-neutral-300 cursor-default'
              }`}
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                nextBtnEnabled
                  ? 'border-black text-black hover:bg-black hover:text-white'
                  : 'border-neutral-200 text-neutral-300 cursor-default'
              }`}
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative -mx-4 sm:mx-0">
          <div className="overflow-hidden px-4 sm:px-0" ref={emblaRef}>
            <div className="flex gap-4 md:gap-5">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_23%] min-w-0">
                    <ProductCard isLoading={true} id="" slug="" name="" price={0} images={[]} colors={[]} />
                  </div>
                ))
              ) : (
                featuredProducts?.map((product) => (
                  <div
                    key={product.id}
                    className="flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_23%] min-w-0"
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
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Mobile arrows */}
        <div className="flex sm:hidden justify-center gap-3 mt-6">
          <button
            className={`w-10 h-10 flex items-center justify-center border transition-colors ${
              prevBtnEnabled
                ? 'border-black text-black'
                : 'border-neutral-200 text-neutral-300'
            }`}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className={`w-10 h-10 flex items-center justify-center border transition-colors ${
              nextBtnEnabled
                ? 'border-black text-black'
                : 'border-neutral-200 text-neutral-300'
            }`}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* View All link */}
        <div className="text-center mt-10">
          <Link
            to="/collections/new-arrivals"
            className="text-[12px] font-bold tracking-[0.1em] uppercase text-black underline underline-offset-4 hover:no-underline transition-all"
          >
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
