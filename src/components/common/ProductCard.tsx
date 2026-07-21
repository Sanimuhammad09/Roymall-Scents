import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Heart, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cart.store';
import toast from 'react-hot-toast';

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
        <div className="w-full aspect-square bg-neutral-100 animate-pulse" />
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
      <div className="relative w-full aspect-square overflow-hidden bg-neutral-50 mb-6 block">
        <Link to={`/products/${slug}`} className="absolute inset-0 z-10" />

        {/* Wishlist */}
        <button
          className="absolute top-4 right-4 z-30 hover:scale-110 transition-transform duration-200"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart size={22} strokeWidth={1.5} className="text-neutral-900 hover:fill-neutral-900 transition-colors" />
        </button>

        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
          {isNew && (
            <span className="bg-white px-3 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase text-black shadow-sm">
              New
            </span>
          )}
          {isBestseller && (
            <span className="bg-white px-3 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase text-black shadow-sm">
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
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-3 px-1 items-start">
        <p className="text-[12px] font-medium text-neutral-500 mb-1">
           {colors && colors.length > 0 ? colors[activeColorIndex].name : 'Eau de Parfum'}
        </p>

        <Link
          to={`/products/${slug}`}
          className="text-xl font-bold text-primary hover:text-gold transition-colors leading-snug"
        >
          {name}
        </Link>
        
        <div className="flex items-center gap-2 mt-1">
          {originalPrice && originalPrice > price && (
            <span className="text-sm font-bold text-neutral-400 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
          <span className="text-lg font-black text-black">
            {formatCurrency(price)}
          </span>
        </div>

        {/* Direct Add to Cart Button */}
        <button
          className="mt-8 px-8 py-3.5 bg-gold text-black text-[13px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 rounded-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            useCartStore.getState().addItem({
              variantId: `${id}-default`,
              productId: id,
              name: name,
              slug: slug,
              color: colors?.[activeColorIndex]?.name || 'Default',
              size: '50ml',
              price: price,
              image: primaryImage,
              quantity: 1
            });
            useCartStore.getState().openCart();
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
