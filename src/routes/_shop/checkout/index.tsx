import React, { useState, useEffect, FormEvent } from 'react';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Tag, X, ChevronRight, ShieldCheck, CreditCard, Building } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/_shop/checkout/')({
  component: CheckoutPage,
});

const shippingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address1: z.string().min(5, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
});

type ShippingInput = z.infer<typeof shippingSchema>;


function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, totalItems, clearCart, appliedCoupon, applyCoupon, removeCoupon } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  
  const [step, setStep] = useState<1 | 2>(1); // 1: Shipping, 2: Payment
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer'>('card');
  
  // Payment Intent State
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const { register, formState: { errors }, trigger, getValues } = useForm<ShippingInput>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      country: 'US',
    }
  });

  // Calculate totals
  const subtotal = totalPrice();
  const discount = appliedCoupon?.discountAmount || 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const shippingCost = discountedSubtotal > 50 ? 0 : 8.95;
  const tax = discountedSubtotal * 0.08;
  const total = discountedSubtotal + shippingCost + tax;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    try {
      const response = await api.post('/coupons/validate', {
        code: couponCode,
        orderValue: subtotal,
      });
      applyCoupon(response.data.data.coupon.code, response.data.data.discountAmount);
      setCouponCode('');
      toast.success('Coupon applied!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid coupon');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleContinueToPayment = async () => {
    const isValid = await trigger();
    if (isValid) {
      setIsProcessing(true);
      try {
        const shippingData = getValues();
        
        // 1. Create the Order first in a PENDING state
        const orderResponse = await api.post('/orders', {
          items: items.map(i => ({
            variantId: i.variantId,
            quantity: i.quantity,
            price: i.price
          })),
          shippingAddress: shippingData,
          subtotal,
          tax,
          shippingCost,
          discountAmount: discount,
          couponCode: appliedCoupon?.code,
          total,
        });

        const createdOrderId = orderResponse.data.data.id || orderResponse.data.id;
        setOrderId(createdOrderId);

        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to initialize payment');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleCompleteOrder = async () => {
    if (!orderId) return;
    setIsProcessing(true);
    try {
      const intentResponse = await api.post('/payments/paystack/initialize', {
        orderId,
        amount: total,
        paymentMethod
      });

      const authUrl = intentResponse.data.data?.authorizationUrl || intentResponse.data.authorizationUrl;
      
      if (authUrl) {
         window.location.href = authUrl;
      } else {
         throw new Error('No authorization URL received');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to connect to payment gateway');
      setIsProcessing(false);
    }
  };

  const handleSuccess = () => {
    clearCart();
    toast.success('Order placed successfully!');
    navigate({ 
      to: '/checkout/success',
      search: { orderId: orderId as string }
    });
  };


  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <h2 className="text-3xl font-black font-heading text-charcoal mb-4 uppercase tracking-tight">Your bag is empty</h2>
        <p className="text-neutral-500 mb-8 font-medium">Add some premium perfumes to get started.</p>
        <Link to="/">
          <Button size="lg" className="font-black tracking-widest uppercase">Shop Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-8 pb-20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="mb-10 flex items-center justify-between border-b-2 border-black/5 pb-6">
          <Link to="/" className="font-heading font-black text-3xl tracking-[0.1em] uppercase text-charcoal">
            Roymall Scents
          </Link>
          <div className="flex items-center gap-3 text-[11px] font-black tracking-widest uppercase text-neutral-400">
            <span className={step === 1 ? 'text-black' : ''}>Shipping</span>
            <ChevronRight size={14} />
            <span className={step === 2 ? 'text-black' : ''}>Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Area (Left) */}
          <div className="w-full lg:w-[55%] space-y-8">
            
            {/* Step 1: Shipping Address */}
            <div className={`bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border ${step === 1 ? 'border-charcoal/20' : 'border-neutral-100'}`}>
              <div className="flex items-center justify-between mb-8 border-b-2 border-neutral-100 pb-4">
                <h2 className="text-xl font-black font-heading uppercase tracking-wide text-charcoal flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-neutral-100 text-charcoal flex items-center justify-center text-sm border-2 border-charcoal/10">1</span>
                  Shipping
                </h2>
                {step === 2 && (
                  <button onClick={() => setStep(1)} className="text-[11px] font-black tracking-widest uppercase text-neutral-500 hover:text-black">
                    Edit
                  </button>
                )}
              </div>

              <AnimatePresence>
                {step === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input placeholder="First Name" {...register('firstName')} className={`h-12 ${errors.firstName ? 'border-red-500' : ''}`} />
                        {errors.firstName && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.firstName.message}</span>}
                      </div>
                      <div>
                        <Input placeholder="Last Name" {...register('lastName')} className={`h-12 ${errors.lastName ? 'border-red-500' : ''}`} />
                        {errors.lastName && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.lastName.message}</span>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input placeholder="Email Address" type="email" {...register('email')} className={`h-12 ${errors.email ? 'border-red-500' : ''}`} />
                        {errors.email && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.email.message}</span>}
                      </div>
                      <div>
                        <Input placeholder="Phone Number" type="tel" {...register('phone')} className={`h-12 ${errors.phone ? 'border-red-500' : ''}`} />
                        {errors.phone && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.phone.message}</span>}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Input placeholder="Address Line 1" {...register('address1')} className={`h-12 ${errors.address1 ? 'border-red-500' : ''}`} />
                      {errors.address1 && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.address1.message}</span>}
                    </div>

                    <div>
                      <Input placeholder="Address Line 2 (Optional)" {...register('address2')} className="h-12" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <Input placeholder="City" {...register('city')} className={`h-12 ${errors.city ? 'border-red-500' : ''}`} />
                        {errors.city && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.city.message}</span>}
                      </div>
                      <div className="col-span-1">
                        <Input placeholder="State / Province" {...register('state')} className={`h-12 ${errors.state ? 'border-red-500' : ''}`} />
                        {errors.state && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.state.message}</span>}
                      </div>
                      <div className="col-span-1">
                        <Input placeholder="ZIP / Postal" {...register('zipCode')} className={`h-12 ${errors.zipCode ? 'border-red-500' : ''}`} />
                        {errors.zipCode && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.zipCode.message}</span>}
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-8 py-6 text-[13px] font-black tracking-widest uppercase" 
                      onClick={handleContinueToPayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Initializing Secure Payment...' : 'Continue to Payment'}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[13px] text-neutral-600 bg-neutral-50 p-5 border border-neutral-100 font-medium"
                  >
                    <p className="font-bold text-charcoal mb-1">{getValues().firstName} {getValues().lastName}</p>
                    <p>{getValues().address1} {getValues().address2}</p>
                    <p>{getValues().city}, {getValues().state} {getValues().zipCode}</p>
                    <p className="mt-2 text-neutral-500">{getValues().email} • {getValues().phone}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Step 2: Payment */}
            <div className={`bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border ${step === 2 ? 'border-charcoal/20' : 'border-neutral-100 opacity-50 pointer-events-none'}`}>
              <div className="flex items-center justify-between mb-8 border-b-2 border-neutral-100 pb-4">
                <h2 className="text-xl font-black font-heading uppercase tracking-wide text-charcoal flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${step === 2 ? 'bg-black text-white border-black' : 'bg-neutral-100 text-charcoal border-charcoal/10'}`}>2</span>
                  Payment
                </h2>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-black tracking-widest uppercase">
                  <Lock size={12} strokeWidth={3} /> Secure
                </div>
              </div>

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-bold text-charcoal mb-4">Select Payment Method</h3>
                  
                  <div className="grid gap-4">
                    <label 
                      className={`flex items-center gap-4 p-5 border-2 rounded-sm cursor-pointer transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-black bg-neutral-50' 
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="card" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-black focus:ring-black border-gray-300"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-neutral-200 text-charcoal">
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-charcoal text-[13px]">Card or Mobile Money</p>
                          <p className="text-neutral-500 text-[11px] mt-0.5">Pay securely with any major card</p>
                        </div>
                      </div>
                    </label>

                    <label 
                      className={`flex items-center gap-4 p-5 border-2 rounded-sm cursor-pointer transition-all ${
                        paymentMethod === 'bank_transfer' 
                          ? 'border-black bg-neutral-50' 
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="bank_transfer" 
                        checked={paymentMethod === 'bank_transfer'} 
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="w-4 h-4 text-black focus:ring-black border-gray-300"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-neutral-200 text-charcoal">
                          <Building size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-charcoal text-[13px]">Bank Transfer</p>
                          <p className="text-neutral-500 text-[11px] mt-0.5">Direct transfer to a dedicated account</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <Button 
                    className="w-full mt-6 py-6 text-[13px] font-black tracking-widest uppercase bg-black text-white" 
                    onClick={handleCompleteOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Redirecting...' : `Pay ${formatCurrency(total)} securely`}
                  </Button>
                  
                  <p className="text-[11px] font-bold text-center text-neutral-400 mt-6 flex items-center justify-center gap-1.5 uppercase tracking-wide">
                    <Lock size={12} /> Encrypted via 256-bit SSL by Paystack
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Order Summary Sidebar (Right) */}
          <div className="w-full lg:w-[45%]">
            <div className="bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-neutral-100 lg:sticky lg:top-24">
              <h3 className="font-black font-heading text-xl uppercase tracking-wide text-charcoal mb-6 border-b-2 border-neutral-100 pb-4">Order Summary</h3>
              
              <div className="max-h-[320px] overflow-y-auto mb-6 pr-2 space-y-4 custom-scrollbar">
                {items.map(item => (
                  <div key={item.variantId} className="flex gap-4">
                    <div className="w-20 h-24 bg-neutral-100 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-[13px]">
                      <p className="font-black text-charcoal uppercase tracking-wide leading-tight mb-1">{item.name}</p>
                      <p className="text-neutral-500 font-bold mb-2">{item.color} / {item.size}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400 font-medium tracking-wide">Qty: {item.quantity}</span>
                        <span className="font-black">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-neutral-100 py-6">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-neutral-50 px-4 py-3 border border-neutral-200">
                    <div className="flex items-center gap-2 text-[13px] text-charcoal font-black tracking-widest uppercase">
                      <Tag size={16} className="text-neutral-400" />
                      {appliedCoupon.code}
                    </div>
                    <button onClick={removeCoupon} className="text-neutral-400 hover:text-red-500 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Discount code" 
                      value={couponCode} 
                      onChange={(e) => setCouponCode(e.target.value)} 
                      className="h-12 font-bold tracking-wide placeholder:font-medium placeholder:uppercase placeholder:text-[11px] placeholder:tracking-widest"
                    />
                    <Button 
                      variant="outline" 
                      className="h-12 px-6 text-[11px] font-black tracking-widest uppercase border-2 hover:bg-neutral-50"
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim()}
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-neutral-100 pt-6 space-y-4 text-[13px] font-bold">
                <div className="flex justify-between">
                  <span className="text-neutral-500 uppercase tracking-widest text-[11px]">Subtotal ({totalItems()})</span>
                  <span className="text-charcoal">{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="uppercase tracking-widest text-[11px]">Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-500 uppercase tracking-widest text-[11px]">Shipping</span>
                  <span className="text-charcoal">{shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 uppercase tracking-widest text-[11px]">Estimated Tax</span>
                  <span className="text-charcoal">{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="border-t-4 border-black mt-6 pt-6 flex justify-between items-center">
                <span className="font-black font-heading text-xl uppercase tracking-wide text-charcoal">Total</span>
                <span className="font-black font-heading text-2xl tracking-tight text-charcoal">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
