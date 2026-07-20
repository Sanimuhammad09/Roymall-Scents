import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, ProductCard } from './ProductCard';
import { Link } from '@tanstack/react-router';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export function ProductCarousel({ title, products, viewAllLink }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
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

  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-zinc-900 mb-2">{title}</h2>
          {viewAllLink && (
            <Link to={viewAllLink} className="text-sm font-semibold uppercase tracking-widest text-zinc-500 hover:text-black border-b border-transparent hover:border-black transition-colors pb-1">
              Shop All
            </Link>
          )}
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="p-3 rounded-full bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous products"
          >
            <ChevronLeft size={20} className="text-zinc-700" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="p-3 rounded-full bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next products"
          >
            <ChevronRight size={20} className="text-zinc-700" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden -mx-4 px-4 md:mx-0 md:px-0" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 pb-8">
          {products.map((product) => (
            <div key={product.id} className="flex-[0_0_240px] md:flex-[0_0_300px] min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
