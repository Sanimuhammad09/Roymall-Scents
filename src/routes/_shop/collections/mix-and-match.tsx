import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Shuffle, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cart.store';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/_shop/collections/mix-and-match')({
  component: MixAndMatchPage,
});

function MixAndMatchPage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
  });

  const products = response?.data || [];
  // Mock grouping for demo since real data might not have clear top/bottom categories yet
  const tops = products.slice(0, Math.ceil(products.length / 2)) || [];
  const bottoms = products.slice(Math.ceil(products.length / 2)) || [];

  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  const addItem = useCartStore((state) => state.addItem);

  const currentTop = tops[topIndex];
  const currentBottom = bottoms[bottomIndex];

  const handleShuffle = () => {
    if (tops.length > 0) setTopIndex(Math.floor(Math.random() * tops.length));
    if (bottoms.length > 0) setBottomIndex(Math.floor(Math.random() * bottoms.length));
  };

  const handleAddBundleToCart = () => {
    if (!currentTop || !currentBottom) return;

    // Pick first available variant for both
    const topVariant = currentTop.variants[0];
    const bottomVariant = currentBottom.variants[0];

    if (topVariant) {
      addItem({
        variantId: topVariant.id,
        productId: currentTop.id,
        name: currentTop.name,
        slug: currentTop.slug,
        color: topVariant.color,
        size: topVariant.size,
        price: currentTop.basePrice + topVariant.priceOffset,
        image: currentTop.images[0]?.url || '',
        quantity: 1,
      });
    }

    if (bottomVariant) {
      addItem({
        variantId: bottomVariant.id,
        productId: currentBottom.id,
        name: currentBottom.name,
        slug: currentBottom.slug,
        color: bottomVariant.color,
        size: bottomVariant.size,
        price: currentBottom.basePrice + bottomVariant.priceOffset,
        image: currentBottom.images[0]?.url || '',
        quantity: 1,
      });
    }

    toast.success('Bundle added to cart!');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-40">
        <div className="w-12 h-12 border-4 border-neutral-200 border-t-charcoal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Mix & Match</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Build your perfect set. Pair our premium tops and bottoms to create a look that's uniquely yours.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Builder Area */}
          <div className="flex-1 flex flex-col gap-6 w-full max-w-md mx-auto relative">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={handleShuffle}
                className="w-12 h-12 bg-charcoal text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                title="Shuffle Look"
              >
                <Shuffle size={20} />
              </button>
            </div>

            {/* Top Selector */}
            <div className="relative aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden group">
              {currentTop ? (
                <>
                  <img src={currentTop.images[0]?.url} alt={currentTop.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-white font-bold text-lg">{currentTop.name}</p>
                    <p className="text-white/80">{formatCurrency(currentTop.basePrice)}</p>
                  </div>
                  
                  <button 
                    onClick={() => setTopIndex((prev) => (prev > 0 ? prev - 1 : tops.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ArrowLeft size={20} className="text-charcoal" />
                  </button>
                  <button 
                    onClick={() => setTopIndex((prev) => (prev < tops.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ArrowRight size={20} className="text-charcoal" />
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-neutral-400">No tops available</div>
              )}
            </div>

            {/* Bottom Selector */}
            <div className="relative aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden group">
              {currentBottom ? (
                <>
                  <img src={currentBottom.images[0]?.url} alt={currentBottom.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-white font-bold text-lg">{currentBottom.name}</p>
                    <p className="text-white/80">{formatCurrency(currentBottom.basePrice)}</p>
                  </div>
                  
                  <button 
                    onClick={() => setBottomIndex((prev) => (prev > 0 ? prev - 1 : bottoms.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ArrowLeft size={20} className="text-charcoal" />
                  </button>
                  <button 
                    onClick={() => setBottomIndex((prev) => (prev < bottoms.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ArrowRight size={20} className="text-charcoal" />
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-neutral-400">No bottoms available</div>
              )}
            </div>

          </div>

          {/* Details Sidebar */}
          <div className="w-full max-w-sm bg-white p-8 rounded-sm shadow-xl border border-neutral-100 sticky top-32">
            <h2 className="text-xl font-bold text-charcoal mb-6 border-b border-neutral-100 pb-4">Your Look</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-1">Top</p>
                <div className="flex justify-between items-start">
                  <p className="font-medium text-charcoal">{currentTop?.name || 'Select a top'}</p>
                  <p className="font-semibold text-charcoal">{currentTop ? formatCurrency(currentTop.basePrice) : '-'}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-1">Bottom</p>
                <div className="flex justify-between items-start">
                  <p className="font-medium text-charcoal">{currentBottom?.name || 'Select a bottom'}</p>
                  <p className="font-semibold text-charcoal">{currentBottom ? formatCurrency(currentBottom.basePrice) : '-'}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-6 mb-8">
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-charcoal">Bundle Total</span>
                <span className="font-bold text-charcoal">
                  {formatCurrency((currentTop?.basePrice || 0) + (currentBottom?.basePrice || 0))}
                </span>
              </div>
            </div>

            <Button 
              className="w-full py-6 flex items-center justify-center gap-2"
              onClick={handleAddBundleToCart}
              disabled={!currentTop || !currentBottom}
            >
              <ShoppingBag size={18} /> Add Set to Cart
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
