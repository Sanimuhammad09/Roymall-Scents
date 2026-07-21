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
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-50 block border border-border">
        <Link to={`/products/${slug}`} className="absolute inset-0 z-10" />

        {/* Wishlist */}
        <button
          className="absolute top-4 right-4 z-30 p-2 bg-white/80 backdrop-blur-sm shadow-soft rounded-full hover:scale-110 transition-transform duration-200"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart size={18} strokeWidth={1.5} className="text-primary hover:fill-primary transition-colors" />
        </button>

        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
          {isNew && (
            <span className="bg-primary px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-white shadow-soft">
              New
            </span>
          )}
          {isBestseller && (
            <span className="bg-accent px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-primary shadow-soft">
              Best Seller
            </span>
          )}
        </div>

        {/* Images */}
        {!isImageLoaded && (
          <div className="absolute inset-0 z-0 bg-neutral-100 animate-pulse" />
        )}
        <div className="relative w-full h-full p-6 flex items-center justify-center">
          <img
            src={primaryImage}
            alt={name}
            className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-700 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            loading="lazy"
          />
          <img
            src={secondaryImage}
            alt={`${name} alternate view`}
            className={`absolute inset-0 w-full h-full object-contain object-center transition-all duration-700 scale-105 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2 pt-5 items-center text-center">
        <p className="text-[11px] font-bold tracking-widest text-accent uppercase mb-1">
           {colors && colors.length > 0 ? colors[activeColorIndex].name : 'Eau de Parfum'}
        </p>

        <Link
          to={`/products/${slug}`}
          className="font-heading text-lg md:text-xl font-normal text-primary hover:text-accent transition-colors leading-tight"
        >
          {name}
        </Link>
        
        <div className="flex items-center justify-center gap-3 mt-1 mb-4">
          {originalPrice && originalPrice > price && (
            <span className="text-sm font-medium text-neutral-400 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
          <span className="text-lg font-bold text-primary">
            {formatCurrency(price)}
          </span>
        </div>

        {/* Direct Add to Cart Button - Structured Lattafa Style */}
        <button
          className="w-full py-3.5 border border-primary bg-transparent text-primary text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all duration-300"
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
