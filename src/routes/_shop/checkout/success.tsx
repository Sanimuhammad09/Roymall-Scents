import React, { useEffect, useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_shop/checkout/success')({
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  const { orderId } = Route.useSearch<{ orderId?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // If no order ID, redirect to home
    if (!orderId) {
      navigate({ to: '/' });
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="min-h-[80vh] bg-ivory flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-8 sm:p-12 text-center rounded-sm shadow-xl"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={40} className="text-green-500" />
        </motion.div>

        <h1 className="heading-display text-3xl text-charcoal mb-4">
          Order Confirmed
        </h1>
        
        <p className="text-neutral-600 mb-8 leading-relaxed">
          Thank you for your purchase! We've received your order and are getting it ready to ship. A confirmation email has been sent to you.
        </p>

        <div className="bg-neutral-50 rounded-sm p-4 mb-8 border border-neutral-100 text-left">
          <p className="text-xs uppercase tracking-widest font-semibold text-neutral-500 mb-1">Order Number</p>
          <p className="font-mono font-bold text-charcoal text-lg">#{orderId.substring(0, 8).toUpperCase()}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/account/orders">
            <Button className="w-full flex justify-center gap-2" size="lg">
              <Package size={18} /> Track Order
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full flex justify-center gap-2" size="lg">
              <ShoppingBag size={18} /> Continue Shopping
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
