import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
}

interface CategoryNavCarouselProps {
  categories: Category[];
  baseUrl?: string;
}

export function CategoryNavCarousel({ categories, baseUrl = '/shop' }: CategoryNavCarouselProps) {
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

  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-12 px-4 md:px-8 max-w-[1600px] mx-auto relative group">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-zinc-900">Shop by Category</h2>
        <div className="hidden md:flex gap-2">
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous categories"
          >
            <ChevronLeft size={20} className="text-zinc-700" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next categories"
          >
            <ChevronRight size={20} className="text-zinc-700" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 pb-4">
          {categories.map((category) => (
            <div key={category.id} className="flex-[0_0_120px] md:flex-[0_0_160px] min-w-0">
              <Link
                to={`${baseUrl}/${category.slug}`}
                className="flex flex-col items-center gap-3 group/item"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-zinc-100 p-2 border border-zinc-200 group-hover/item:border-zinc-400 transition-colors duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={category.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(category.name)}&background=f4f4f5&color=18181b&size=200`}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-center text-zinc-800 uppercase tracking-wider group-hover/item:text-black">
                  {category.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
