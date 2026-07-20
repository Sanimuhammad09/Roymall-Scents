import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface ProductVariant {
  id: string;
  color: string;
  colorHex?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  imageUrl: string;
  categoryName?: string;
  variants?: ProductVariant[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Try to use a valid hex color, fallback to a predefined map or default
  const renderColorSwatch = (variant: ProductVariant) => {
    let backgroundColor = variant.colorHex || '#E5E7EB';
    // Small hack to handle common named colors if hex isn't provided
    if (!variant.colorHex && typeof variant.color === 'string') {
      const lower = variant.color.toLowerCase();
      if (lower.includes('black')) backgroundColor = '#000000';
      if (lower.includes('navy')) backgroundColor = '#0F172A';
      if (lower.includes('white')) backgroundColor = '#FFFFFF';
      if (lower.includes('burgundy')) backgroundColor = '#7F1D1D';
      if (lower.includes('green')) backgroundColor = '#14532D';
    }

    return (
      <div
        key={variant.id}
        title={variant.color}
        className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <div className="group flex flex-col gap-3">
      <Link to={`/products/${product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-zinc-100 rounded-sm block">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-10">
          <button className="w-full bg-white/90 backdrop-blur-sm text-black py-3 px-4 font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors border border-transparent hover:border-black">
            <ShoppingBag size={16} />
            Quick Add
          </button>
        </div>
      </Link>
      
      <div className="flex flex-col gap-1">
        {product.categoryName && (
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
            {product.categoryName}
          </span>
        )}
        <div className="flex justify-between items-start gap-2">
          <Link to={`/products/${product.slug}`} className="text-sm font-semibold text-zinc-900 group-hover:text-black line-clamp-2">
            {product.name}
          </Link>
          <span className="text-sm font-medium text-zinc-900 shrink-0">
            ${product.basePrice.toFixed(2)}
          </span>
        </div>
        
        {product.variants && product.variants.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {product.variants.slice(0, 5).map(renderColorSwatch)}
            {product.variants.length > 5 && (
              <span className="text-xs text-zinc-500 ml-1 leading-4">
                +{product.variants.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
