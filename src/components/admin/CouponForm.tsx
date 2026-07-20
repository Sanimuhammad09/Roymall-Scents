import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const couponSchema = z.object({
  code: z.string().min(1, 'Code is required').max(20),
  type: z.enum(['percentage', 'fixed']),
  value: z.number().min(1, 'Value must be greater than 0'),
});

export type CouponFormData = z.infer<typeof couponSchema>;

interface CouponFormProps {
  onSubmit: (data: CouponFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CouponForm({ onSubmit, onCancel, isLoading }: CouponFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: '',
      type: 'percentage',
      value: 10,
    },
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-neutral-100 flex flex-col overflow-hidden">
        <div className="bg-white/90 backdrop-blur-md border-b border-neutral-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-charcoal tracking-tight uppercase">Create Coupon</h2>
          </div>
          <button onClick={onCancel} className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-charcoal hover:bg-neutral-100 rounded-full transition-colors">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Coupon Code</label>
              <Input {...register('code')} placeholder="e.g. SUMMER20" className="uppercase h-12 bg-neutral-50 border-neutral-200 rounded-xl focus-visible:ring-1 focus-visible:ring-charcoal" />
              {errors.code && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.code.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Discount Type</label>
                <select {...register('type')} className="w-full px-4 h-12 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-charcoal text-sm transition-all appearance-none">
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₦)</option>
                </select>
                {errors.type && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.type.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Value</label>
                <Input type="number" step="1" {...register('value', { valueAsNumber: true })} placeholder="10" className="h-12 bg-neutral-50 border-neutral-200 rounded-xl focus-visible:ring-1 focus-visible:ring-charcoal" />
                {errors.value && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.value.message}</p>}
              </div>
            </div>
          </div>

          <div className="bg-neutral-50/50 border-t border-neutral-100 p-6 flex items-center justify-end gap-3 rounded-b-2xl">
            <Button type="button" variant="outline" onClick={onCancel} className="h-11 px-6 font-bold rounded-xl text-neutral-600 hover:text-black border-neutral-200 shadow-sm hover:bg-neutral-50 transition-colors">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="h-11 px-8 font-black uppercase tracking-widest bg-black text-white hover:bg-neutral-800 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md">
              {isLoading ? 'Creating...' : 'Create Coupon'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
