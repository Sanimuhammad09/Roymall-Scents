import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[80]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[90] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
              <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-charcoal flex items-center gap-2">
                <ShoppingBag size={18} />
                Cart ({totalItems()})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 -mr-2 text-neutral-400 hover:text-charcoal transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-neutral-200 mb-4" />
                  <h3 className="text-lg font-semibold text-charcoal mb-2">Your cart is empty</h3>
                  <p className="text-sm text-neutral-500 mb-8">
                    Discover our premium collections and add your favorites.
                  </p>
                  <Button onClick={closeCart} variant="default">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <Link
                        to={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="w-24 h-28 bg-neutral-100 shrink-0 overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <Link
                            to={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="text-sm font-medium text-charcoal hover:underline line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-neutral-500 mb-2">
                            {item.color} • {item.size}
                          </p>

                          {item.hasEmbroidery && (
                            <div className="mb-2 bg-neutral-50 p-2 rounded-sm border border-neutral-100 text-xs">
                              <p className="font-semibold text-charcoal">Embroidery: "{item.embroideryText}"</p>
                              <p className="text-neutral-500">{item.embroideryFont} • {item.embroideryColor}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-neutral-200">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="p-1.5 text-neutral-400 hover:text-charcoal"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-xs font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="p-1.5 text-neutral-400 hover:text-charcoal"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-charcoal">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="text-neutral-300 hover:text-red-500 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-neutral-100 px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-neutral-500">Subtotal</span>
                  <span className="text-lg font-bold text-charcoal">
                    {formatCurrency(totalPrice())}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mb-4">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="flex flex-col gap-2">
                  <Link to="/checkout" onClick={closeCart}>
                    <Button size="lg" className="w-full flex items-center justify-center gap-2">
                      Checkout <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
