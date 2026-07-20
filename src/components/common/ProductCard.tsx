import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Heart, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: { url: string; alt?: string }[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  isBestseller?: boolean;
  isLoading?: boolean;
}

export function ProductCard({
  id,
  slug,
  name,
  price,
  originalPrice,
  images,
  colors,
  isNew,
  isBestseller,
  isLoading = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full aspect-[3/4] bg-neutral-100 animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-3/4 bg-neutral-100 animate-pulse" />
          <div className="h-4 w-1/4 bg-neutral-100 animate-pulse" />
        </div>
      </div>
    );
  }

  const primaryImage = images?.[0]?.url || '/images/product-top.png';
  const secondaryImage = images?.[1]?.url || primaryImage;

  return (
    <div
      className="group flex flex-col w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-50 mb-4 block">
        <Link to={`/products/${slug}`} className="absolute inset-0 z-10" />

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 z-30 hover:scale-110 transition-transform duration-200"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart size={20} strokeWidth={1.5} className="text-neutral-900 hover:fill-neutral-900 transition-colors" />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
          {isNew && (
            <span className="bg-white px-2 py-1 text-[10px] font-bold tracking-[0.1em] uppercase text-black">
              New
            </span>
          )}
          {isBestseller && (
            <span className="bg-white px-2 py-1 text-[10px] font-bold tracking-[0.1em] uppercase text-black">
              Best Seller
            </span>
          )}
        </div>

        {/* Images */}
        {!isImageLoaded && (
          <div className="absolute inset-0 z-0 bg-neutral-100 animate-pulse" />
        )}
        <div className="relative w-full h-full">
          <img
            src={primaryImage}
            alt={name}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            loading="lazy"
          />
          <img
            src={secondaryImage}
            alt={`${name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        </div>

        {/* Quick Add Slider */}
        <div 
          className={`absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm p-4 transform transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex flex-col gap-2 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-center w-full block text-black mb-1">
            Quick Add
          </span>
          <div className="flex items-center justify-center gap-2">
            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
              <button 
                key={size}
                className="w-10 h-10 flex items-center justify-center text-[12px] font-bold uppercase border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all bg-white text-black"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle Add to Cart
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1.5 px-0.5">
        <div className="flex justify-between items-start gap-4">
          <Link
            to={`/products/${slug}`}
            className="text-[13px] font-bold text-black hover:text-neutral-600 transition-colors leading-snug font-heading tracking-wide"
          >
            {name}
          </Link>
          <div className="flex items-center gap-1.5 text-right flex-shrink-0">
            {originalPrice && originalPrice > price && (
              <span className="text-[13px] font-bold text-neutral-400 line-through tracking-wide">
                {formatCurrency(originalPrice)}
              </span>
            )}
            <span className="text-[13px] font-bold text-black tracking-wide">
              {formatCurrency(price)}
            </span>
          </div>
        </div>

        <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mt-0.5">
          {colors && colors.length > 0 ? colors[activeColorIndex].name : 'Deep Purple'}
        </p>

        {/* Color Swatches */}
        {colors && colors.length > 0 && (
          <div className="flex items-center gap-2.5 mt-2">
            {colors.slice(0, 5).map((color, index) => (
              <button
                key={color.name}
                className={`relative w-4 h-4 rounded-full flex items-center justify-center transition-all outline-none ${
                  activeColorIndex === index
                    ? 'ring-1 ring-black ring-offset-2'
                    : 'ring-1 ring-neutral-200 hover:ring-neutral-400'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveColorIndex(index);
                }}
                title={color.name}
              >
                <span
                  className="block w-full h-full rounded-full absolute inset-0"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            ))}
            {colors.length > 5 && (
              <span className="text-[10px] font-bold text-neutral-500 ml-1 hover:text-black transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                +{colors.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
