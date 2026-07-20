import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const scentProfiles = [
  {
    name: 'FLORAL',
    image: '/images/perfume_floral.png',
    path: '/collections/floral',
    isNew: true,
    bg: '#FDF4CD',
  },
  {
    name: 'WOODY',
    image: '/images/perfume_oud.png',
    path: '/collections/woody',
    isNew: true,
    bg: '#4A3B2C',
  },
  {
    name: 'CITRUS',
    image: '/images/perfume_designer.png',
    path: '/collections/citrus',
    bg: '#FDF1E5',
  },
  {
    name: 'ORIENTAL',
    image: '/images/perfume_oud.png',
    path: '/collections/oriental',
    bg: '#2C1E16',
  },
  {
    name: 'FRESH',
    image: '/images/perfume_luxury.png',
    path: '/collections/fresh',
    bg: '#EAF4F4',
  },
  {
    name: 'SPICY',
    image: '/images/perfume_luxury.png',
    path: '/collections/spicy',
    bg: '#6A2A1A',
  },
  {
    name: 'GOURMAND',
    image: '/images/perfume_floral.png',
    path: '/collections/gourmand',
    bg: '#8B5A2B',
  },
];

export function ShopByColor() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 2,
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
    <section className="bg-white py-12 sm:py-16">
      <div className="container-premium px-4 sm:px-8 mb-8">
        <h2 className="font-heading font-black text-3xl sm:text-4xl tracking-wide text-black uppercase">
          Shop By Scent Profile
        </h2>
      </div>
      
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6 px-4 sm:px-8 lg:px-16">
            {scentProfiles.map((profile) => (
              <Link
                key={profile.name}
                to={profile.path}
                className="flex-[0_0_140px] sm:flex-[0_0_180px] lg:flex-[0_0_220px] group"
              >
                <div
                  className="relative w-full aspect-[4/5] rounded-none overflow-hidden mb-4"
                  style={{ backgroundColor: profile.bg }}
                >
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {profile.isNew && (
                    <span className="absolute top-3 left-3 text-[10px] font-black tracking-widest uppercase bg-white text-black px-3 py-1 shadow-md">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-neutral-200" style={{ backgroundColor: profile.bg }} />
                  <p className="text-[11px] sm:text-[13px] font-bold tracking-[0.1em] uppercase text-black">
                    {profile.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Next button */}
        {canScrollNext && (
          <button
            onClick={scrollNext}
            className="absolute right-4 sm:right-8 top-[40%] -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:scale-105 transition-transform border border-neutral-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} strokeWidth={2} />
          </button>
        )}
      </div>
    </section>
  );
}
