import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, Star, Check, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/common/ProductCard';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cart.store';
import { useSEO } from '@/hooks/useSEO';
import toast from 'react-hot-toast';

import { useProduct, useRelatedProducts } from '@/features/products/api/hooks';
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from '@/features/wishlist/api/hooks';

export const Route = createFileRoute('/_shop/products/$slug')({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const { data: product, isLoading } = useProduct(slug);
  const { data: relatedProductsData } = useRelatedProducts(product?.id || '', 4);

  useSEO({
    title: product?.name || 'Product',
    description: product?.description || '',
  });

  const uniqueColors = Array.from(
    new Map(product?.variants?.map((v) => [v.color, { name: v.color, hex: v.colorHex || '#ccc' }]) || []).values()
  );

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'scent_notes' | 'ingredients'>('description');
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  
  // Cross-sell state
  const [crossSellSize, setCrossSellSize] = useState('');

  // Wishlist Hooks
  const { data: wishlist } = useWishlist();
  const { mutate: addToWishlist, isPending: isAddingToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isRemovingFromWishlist } = useRemoveFromWishlist();

  useEffect(() => {
    if (uniqueColors.length > 0 && !selectedColor) {
      setSelectedColor(uniqueColors[0].name);
    }
  }, [uniqueColors, selectedColor]);

  // Handle sticky mobile "Add to Cart" appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPastHero(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const availableSizes = (product?.variants || [])
    .filter((v) => v.color === selectedColor)
    .map((v) => ({ size: v.size, inStock: v.inventory > 0 }));

  const selectedVariant = (product?.variants || []).find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const price = product?.basePrice ? product.basePrice + (selectedVariant?.priceOffset || 0) : 0;

  const isInWishlist = selectedVariant 
    ? wishlist?.items?.some((item: any) => item.variantId === selectedVariant.id)
    : false;

  const handleWishlistToggle = () => {
    if (!selectedVariant) return;
    if (isInWishlist) {
      removeFromWishlist(selectedVariant.id);
    } else {
      addToWishlist(selectedVariant.id);
    }
  };

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      color: selectedVariant.color,
      size: selectedVariant.size,
      price: product.basePrice + selectedVariant.priceOffset,
      image: product.images?.[0]?.url || '',
      quantity,
    });
    toast.success('Added to bag');
  };

  const crossSellProduct = relatedProductsData?.[0];
  const crossSellVariant = crossSellProduct?.variants?.find(v => v.size === crossSellSize) || crossSellProduct?.variants?.[0];
  
  const handleAddCrossSell = () => {
    if (!crossSellProduct || !crossSellVariant) {
        toast.error('Please select a size for the complete collection item');
        return;
    }
    addItem({
      variantId: crossSellVariant.id,
      productId: crossSellProduct.id,
      name: crossSellProduct.name,
      slug: crossSellProduct.slug,
      color: crossSellVariant.color,
      size: crossSellVariant.size,
      price: crossSellProduct.basePrice + crossSellVariant.priceOffset,
      image: crossSellProduct.images?.[0]?.url || '',
      quantity: 1,
    });
    toast.success('Added complete collection item to bag');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-neutral-200 rounded mb-4"></div>
          <div className="h-64 w-64 bg-neutral-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center text-neutral-500 font-bold tracking-widest uppercase">
        Product not found
      </div>
    );
  }

  // Features list for perfumes
  const featuresList = [
    "Long-lasting luxury fragrance",
    "Elegant glass bottle design",
    "Premium spray atomizer",
    "Rich, sophisticated scent profile",
    "Perfect for day or evening use",
    "Cruelty-free ingredients",
    "Expertly crafted by master perfumers",
    "Travel-friendly size options",
    "Luxurious premium packaging",
    "Free of parabens and phthalates"
  ];

  const sizeOrder = ['30ml', '50ml', '100ml', '150ml', '200ml'];
  const sortedSizes = [...availableSizes].sort((a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size));

  // Default to these standard sizes if variant list is empty for styling purposes
  const displaySizes = sortedSizes.length > 0 ? sortedSizes : sizeOrder.map(s => ({ size: s, inStock: true }));

  const mainImage = product.images?.[mainImageIndex]?.url || product.images?.[0]?.url || '';

  return (
    <div className="min-h-screen bg-[#ffffff] pb-24 lg:pb-0 relative text-charcoal">
      {/* Breadcrumbs - Sticky Top Desktop */}
      <div className="hidden lg:block sticky top-0 z-40 bg-[#ffffff] border-b border-neutral-100 py-4 px-10">
        <nav className="flex items-center gap-2 text-[12px] font-bold text-charcoal">
          <Link to="/" className="hover:text-black transition-colors">Fragrances</Link>
          <span className="text-neutral-400">•</span>
          <Link to="/collections/$slug" params={{ slug: product.category.slug || 'all' }} className="hover:text-black transition-colors">
            {product.category.name}
          </Link>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-500">{product.name}</span>
        </nav>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-[2000px] mx-auto bg-[#ffffff]">
        
        {/* Left Side: Image Gallery */}
        <div className="w-full lg:w-[65%] xl:w-[70%] flex flex-col lg:flex-row bg-[#f9f9f9]">
          
          {/* Mobile Breadcrumb */}
          <div className="lg:hidden py-4 px-4 bg-[#ffffff]">
            <nav className="flex items-center gap-2 text-[11px] font-bold text-neutral-500">
              <Link to="/" className="hover:text-black transition-colors">Fragrances</Link>
              <span className="text-neutral-300">•</span>
              <Link to="/collections/$slug" params={{ slug: product.category.slug || 'all' }} className="hover:text-black transition-colors">
                {product.category.name}
              </Link>
            </nav>
          </div>

          {/* Desktop Thumbnail Strip */}
          <div className="hidden lg:flex flex-col gap-3 p-4 w-[110px] shrink-0 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto custom-scrollbar bg-[#ffffff] z-10 border-r border-neutral-100">
            {product.images?.map((image, idx) => (
              <button 
                key={image.id} 
                onClick={() => setMainImageIndex(idx)}
                className={`relative aspect-[3/4] bg-neutral-100 overflow-hidden group border-2 transition-all ${mainImageIndex === idx ? 'border-charcoal' : 'border-transparent hover:border-neutral-200'}`}
              >
                <img
                  src={image.url}
                  alt={image.alt || product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image View */}
          <div className="w-full relative bg-[#f9f9f9] min-h-[50vh] lg:min-h-screen flex items-center justify-center">
             <img src={mainImage} alt={product.name} className="w-full h-auto max-h-screen object-contain" />
             
             {/* Carousel Arrows (Mobile) */}
             <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between lg:hidden pointer-events-none">
                <button 
                  onClick={() => setMainImageIndex(prev => prev > 0 ? prev - 1 : (product.images?.length || 1) - 1)}
                  className="w-10 h-10 bg-[#ffffff] rounded-full flex items-center justify-center shadow-md pointer-events-auto text-charcoal"
                >
                  <ChevronRight size={20} className="rotate-180" />
                </button>
                <button 
                  onClick={() => setMainImageIndex(prev => prev < (product.images?.length || 1) - 1 ? prev + 1 : 0)}
                  className="w-10 h-10 bg-[#ffffff] rounded-full flex items-center justify-center shadow-md pointer-events-auto text-charcoal"
                >
                  <ChevronRight size={20} />
                </button>
             </div>
          </div>
        </div>

        {/* Right Side: Product Details (Sticky) */}
        <div className="w-full lg:w-[35%] xl:w-[30%] bg-[#ffffff] border-l border-neutral-100 relative">
          <div className="lg:sticky lg:top-[60px] px-6 lg:px-12 py-8 lg:py-10 h-fit lg:max-h-[calc(100vh-60px)] overflow-y-auto custom-scrollbar">
            
            {/* Header: Title & Heart */}
            <div className="flex justify-between items-start gap-4 mb-2">
              <h1 className="font-heading font-black text-2xl lg:text-3xl tracking-tight text-charcoal leading-tight">
                {product.name}
              </h1>
              <button 
                onClick={handleWishlistToggle}
                disabled={!selectedVariant || isAddingToWishlist || isRemovingFromWishlist}
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-neutral-200 rounded-full text-charcoal hover:bg-neutral-50 transition-colors"
              >
                <Heart size={18} className={isInWishlist ? 'fill-red-500 text-red-500' : ''} />
              </button>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} className="text-charcoal fill-charcoal" />
                ))}
              </div>
              <span className="text-[12px] font-bold text-neutral-500 underline underline-offset-4">
                ({product.reviews?.length || '3,686'} Reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-lg font-black text-charcoal mb-8">
              {formatCurrency(price)}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] font-bold text-charcoal">Select bottle size:</p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-2 mb-3">
                {displaySizes.map(({ size, inStock }) => (
                  <button
                     key={size}
                     onClick={() => inStock && setSelectedSize(size)}
                     disabled={!inStock}
                     className={`relative py-3 text-[11px] font-bold uppercase transition-all rounded-[2px] ${
                       selectedSize === size
                         ? 'bg-charcoal text-[#ffffff]'
                         : inStock
                           ? 'border border-neutral-300 text-charcoal hover:border-charcoal bg-[#ffffff]'
                           : 'border border-neutral-200 text-neutral-400 cursor-not-allowed bg-neutral-50 overflow-hidden'
                     }`}
                  >
                    {size}
                    {!inStock && <div className="absolute inset-0 w-full h-[1px] bg-neutral-300 rotate-[25deg] top-1/2 left-0 origin-center" />}
                  </button>
                ))}
              </div>
              <p className="text-[12px] text-neutral-500">Available in standard volumes. Cruelty-free & long-lasting.</p>
            </div>

            {/* Add to Bag Button */}
            <div className="mb-10 mt-8">
              <button
                className={`w-full text-[12px] font-bold tracking-widest uppercase py-4 rounded-[2px] transition-all flex items-center justify-center gap-2 ${
                  !selectedSize || (selectedVariant && selectedVariant.inventory <= 0)
                    ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                    : 'bg-charcoal text-[#ffffff] hover:bg-black'
                }`}
                disabled={!selectedSize || (selectedVariant !== undefined && selectedVariant.inventory <= 0)}
                onClick={handleAddToCart}
              >
                {!selectedSize
                  ? 'Select a Size'
                  : selectedVariant?.inventory === 0
                    ? 'Waitlist Me'
                    : `${formatCurrency(price)} • ADD TO BAG`}
              </button>
            </div>

            {/* Free Shipping Notice */}
            <div className="text-center mb-10 pb-10 border-b border-neutral-200">
               <p className="text-[12px] font-bold text-charcoal">Free Shipping for $50+ orders and <span className="underline underline-offset-2">Free Returns</span></p>
               <button className="text-[11px] text-neutral-500 underline underline-offset-2 mt-1">Learn More</button>
            </div>

            {/* Complete The Collection (Inline Widget) */}
            {relatedProductsData && relatedProductsData.length > 0 && (
              <div className="mb-10">
                <h3 className="text-[14px] font-bold text-charcoal mb-4">Complete The Collection</h3>
                <div className="flex gap-4 mb-4">
                  <div className="w-[80px] h-[100px] bg-neutral-100 shrink-0 relative">
                     <img src={relatedProductsData[0].images?.[0]?.url} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                     <p className="font-bold text-[13px] text-charcoal">{relatedProductsData[0].name}</p>
                     <p className="text-[12px] text-neutral-500 mt-1">{relatedProductsData[0].variants?.[0]?.color || 'Eau de Parfum'}</p>
                  </div>
                </div>
                
                <div className="mb-3 w-full">
                   <div className="relative border border-neutral-300 rounded-[2px] bg-[#ffffff] w-full">
                     <select 
                       className="w-full appearance-none bg-transparent py-3 pl-4 pr-10 text-[12px] font-bold text-charcoal outline-none cursor-pointer"
                       value={crossSellSize}
                       onChange={(e) => setCrossSellSize(e.target.value)}
                     >
                       <option value="" disabled>Select a Size</option>
                       {relatedProductsData[0].variants?.map(v => (
                         <option key={v.id} value={v.size}>{v.size}</option>
                       ))}
                     </select>
                     <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal" />
                   </div>
                </div>

                <button 
                  onClick={handleAddCrossSell}
                  className="w-full py-3 border border-charcoal text-charcoal font-bold text-[11px] tracking-widest uppercase hover:bg-neutral-50 transition-colors bg-[#ffffff]"
                >
                  {formatCurrency(relatedProductsData[0].basePrice)} • ADD TO BAG
                </button>
              </div>
            )}

            {/* Description / Scent Notes / Ingredients Pills */}
            <div className="bg-[#f0f0f0] rounded-full p-1 flex mb-6 mt-8">
               {(['description', 'scent_notes', 'ingredients'] as const).map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab as any)}
                   className={`flex-1 py-2 text-[11px] font-bold tracking-widest uppercase rounded-full transition-all ${
                     activeTab === tab ? 'bg-[#ffffff] shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-charcoal' : 'text-neutral-500 hover:text-charcoal'
                   }`}
                 >
                   {tab === 'description' ? 'Description' : tab === 'scent_notes' ? 'Scent Notes' : 'Ingredients'}
                 </button>
               ))}
            </div>

            {/* Tab Content */}
            <div className="text-[13px] text-neutral-600 leading-relaxed font-medium mb-10 min-h-[200px]">
               {activeTab === 'description' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                   <p>Experience the luxurious aura of {product.name}. Carefully blended to create a lasting impression with {featuresList.length} distinct characteristics.</p>
                   <p>Select sizes also available in an <span className="underline underline-offset-4 decoration-neutral-300">exclusive gift set</span> with complimentary engraving.</p>
                   <ul className="space-y-2 mt-4">
                     {featuresList.map((feature, i) => (
                       <li key={i} className="flex gap-2">
                         <span className="text-neutral-400">•</span>
                         <span>{feature}</span>
                       </li>
                     ))}
                   </ul>
                 </motion.div>
               )}
               {activeTab === 'scent_notes' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <p className="font-bold mb-2">Fragrance Notes Hierarchy:</p>
                   <p>{product.fabricDetails || 'Top Notes: Citrus, Floral. Heart Notes: Jasmine, Spice. Base Notes: Wood, Vanilla, Amber.'}</p>
                 </motion.div>
               )}
               {activeTab === 'ingredients' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <p className="font-bold mb-2">Ingredients:</p>
                   <p>Alcohol Denat., Water (Aqua), Fragrance (Parfum), Linalool, Limonene, Citral, Citronellol, Geraniol.</p>
                   <p className="mt-4 font-bold mb-2">Storage & Use:</p>
                   <p>{product.careInstructions || 'Store in a cool, dry place away from direct sunlight. Avoid spraying near open flames.'}</p>
                 </motion.div>
               )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Sticky Add to Bag */}
      <AnimatePresence>
        {isScrolledPastHero && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#ffffff] border-t border-neutral-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-safe"
          >
            <button
              className={`w-full text-[13px] font-bold tracking-widest uppercase py-4 transition-all shadow-md ${
                !selectedSize || (selectedVariant && selectedVariant.inventory <= 0)
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none'
                  : 'bg-charcoal text-[#ffffff] hover:bg-black'
              }`}
              disabled={!selectedSize || (selectedVariant !== undefined && selectedVariant.inventory <= 0)}
              onClick={handleAddToCart}
            >
              {!selectedSize
                ? 'Select a Size'
                : selectedVariant?.inventory === 0
                  ? 'Waitlist Me'
                  : `Add to Bag • ${formatCurrency(price)}`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related Products Section */}
      <section className="border-t border-neutral-200 pt-16 pb-24 bg-[#ffffff] mt-10">
        <div className="max-w-[2000px] mx-auto px-6 lg:px-12">
          <h2 className="font-heading font-black text-2xl lg:text-3xl tracking-tight text-charcoal mb-10">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
            {relatedProductsData?.map((p) => (
              <ProductCard 
                key={p.id} 
                id={p.id}
                slug={p.slug}
                name={p.name}
                price={p.basePrice}
                images={p.images || []}
                colors={[]}
                isNew={p.isFeatured}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
