import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const stockUpdateSchema = z.object({
  inventory: z.number().min(0, 'Inventory must be positive'),
});

type StockUpdateData = z.infer<typeof stockUpdateSchema>;

interface StockEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  currentStock: number;
  variantId: string;
  onUpdate: (variantId: string, data: StockUpdateData) => void;
  isLoading?: boolean;
}

export function StockEditModal({ 
  isOpen, 
  onClose, 
  productName, 
  currentStock, 
  variantId,
  onUpdate,
  isLoading 
}: StockEditModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StockUpdateData>({
    resolver: zodResolver(stockUpdateSchema),
    defaultValues: { inventory: currentStock },
  });

  const onSubmit = (data: StockUpdateData) => {
    onUpdate(variantId, data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-neutral-100 flex flex-col overflow-hidden">
        <div className="bg-white/90 backdrop-blur-md border-b border-neutral-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-charcoal tracking-tight uppercase">Update Stock</h2>
            <p className="text-sm font-medium text-neutral-500 mt-1">{productName}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-charcoal hover:bg-neutral-100 rounded-full transition-colors">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Current Stock</span>
                <span className="text-sm font-black text-charcoal bg-neutral-100 px-3 py-1 rounded-md">{currentStock}</span>
              </div>
              <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">
                New Stock Level
              </label>
              <Input
                type="number"
                min="0"
                {...register('inventory', { valueAsNumber: true })}
                className="h-14 text-lg font-bold bg-neutral-50 border-neutral-200 rounded-xl focus-visible:ring-1 focus-visible:ring-charcoal text-center"
                placeholder="Enter new quantity"
              />
              {errors.inventory && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 text-center">{errors.inventory.message}</p>
              )}
            </div>

            <div className="bg-neutral-50/50 border border-neutral-100 rounded-xl p-4">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide mb-3">
                Quick Add
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset({ inventory: currentStock + 10 })}
                  className="h-10 font-bold border-neutral-200 hover:border-charcoal hover:bg-neutral-50 transition-colors"
                >
                  +10
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset({ inventory: currentStock + 50 })}
                  className="h-10 font-bold border-neutral-200 hover:border-charcoal hover:bg-neutral-50 transition-colors"
                >
                  +50
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset({ inventory: currentStock + 100 })}
                  className="h-10 font-bold border-neutral-200 hover:border-charcoal hover:bg-neutral-50 transition-colors"
                >
                  +100
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50/50 border-t border-neutral-100 p-6 flex items-center justify-end gap-3 rounded-b-2xl">
            <Button type="button" variant="outline" onClick={onClose} className="h-11 px-6 font-bold rounded-xl text-neutral-600 hover:text-black border-neutral-200 shadow-sm hover:bg-neutral-50 transition-colors">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="h-11 px-8 font-black uppercase tracking-widest bg-black text-white hover:bg-neutral-800 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md flex items-center gap-2">
              <Save size={16} />
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
