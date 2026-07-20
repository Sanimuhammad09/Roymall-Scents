import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist, useRemoveFromWishlist } from '@/features/wishlist/api/hooks';
import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/_shop/account/wishlist')({
  component: WishlistPage,
});

function WishlistPage() {
  const { data: wishlist, isLoading } = useWishlist();
  const { mutate: removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist();
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (item: any) => {
    addItem({
      variantId: item.variant.id,
      productId: item.variant.product.id,
      name: item.variant.product.name,
      slug: item.variant.product.slug,
      color: item.variant.color,
      size: item.variant.size,
      price: item.variant.product.basePrice + item.variant.priceOffset,
      image: item.variant.product.images?.[0]?.url || '',
      quantity: 1,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-charcoal rounded-full animate-spin" />
      </div>
    );
  }

  const items = wishlist?.items || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-charcoal">My Wishlist</h2>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-12 rounded-sm shadow-sm border border-neutral-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4 text-neutral-400">
            <Heart size={32} />
          </div>
          <h3 className="text-lg font-bold text-charcoal mb-2">Your wishlist is empty</h3>
          <p className="text-sm text-neutral-500 mb-8">Save items you love here to easily find them later.</p>
          <Link to="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any, index: number) => {
            const product = item.variant.product;
            const price = product.basePrice + item.variant.priceOffset;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-sm shadow-sm border border-neutral-100 overflow-hidden group flex flex-col"
              >
                <Link to={`/products/${product.slug}`} className="block relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {item.variant.inventory <= 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-charcoal text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </Link>
                
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/products/${product.slug}`} className="font-semibold text-charcoal hover:underline line-clamp-2 pr-4">
                      {product.name}
                    </Link>
                    <button 
                      onClick={() => removeFromWishlist(item.variant.id)}
                      disabled={isRemoving}
                      className="text-neutral-400 hover:text-red-500 transition-colors shrink-0"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-neutral-500 mb-3">
                    {item.variant.color} • {item.variant.size}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <p className="font-bold text-charcoal">
                      {formatCurrency(price)}
                    </p>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-2"
                      disabled={item.variant.inventory <= 0}
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart size={14} /> 
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
