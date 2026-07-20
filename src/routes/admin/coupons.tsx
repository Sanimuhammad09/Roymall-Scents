import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { formatCurrency } from '@/lib/utils';
import { CouponForm, CouponFormData } from '@/components/admin/CouponForm';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/admin/coupons')({
  component: AdminCouponsPage,
});

function AdminCouponsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ['admin-coupons'],
    queryFn: async () => {
      const { data } = await api.get('/coupons');
      return data.data || data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CouponFormData) => {
      // API expects uppercase code
      const res = await api.post('/coupons', { ...data, code: data.code.toUpperCase() });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Coupon created successfully');
      setIsFormOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create coupon');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/coupons/${id}`);
    },
    onSuccess: () => {
      toast.success('Coupon deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete coupon');
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      deleteMutation.mutate(id);
    }
  };

  const coupons = response?.data || [];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-charcoal tracking-tight uppercase">Coupons</h1>
          <p className="text-sm font-medium text-neutral-500 mt-1 tracking-wide">Manage discount codes and promotions</p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 font-bold uppercase tracking-wide bg-charcoal hover:bg-black text-white px-6 h-11 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={18} /> Create Coupon
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-neutral-50/80 border-b border-neutral-100 text-neutral-400 font-black uppercase tracking-[0.15em] text-[10px]">
              <tr>
                <th className="px-6 py-5 whitespace-nowrap">Code</th>
                <th className="px-6 py-5 whitespace-nowrap">Type</th>
                <th className="px-6 py-5 whitespace-nowrap">Value</th>
                <th className="px-6 py-5 whitespace-nowrap">Status</th>
                <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500 font-medium">Loading...</td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500 font-medium">No coupons found.</td></tr>
              ) : coupons.map((coupon: any) => (
                <tr key={coupon.id} className="hover:bg-neutral-50/80 transition-colors group">
                  <td className="px-6 py-4 font-black tracking-wider text-charcoal">{coupon.code}</td>
                  <td className="px-6 py-4 capitalize font-medium">{coupon.type}</td>
                  <td className="px-6 py-4 font-black text-charcoal text-base">{coupon.type === 'percentage' ? `${coupon.value}%` : formatCurrency(coupon.value)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-md ${coupon.isActive ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-200'}`}>
                      {coupon.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => toast.error('Edit coupon not fully implemented')}
                        className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(coupon.id)}
                        disabled={deleteMutation.isPending}
                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <CouponForm
          onSubmit={(data) => createMutation.mutate(data)}
          onCancel={() => setIsFormOpen(false)}
          isLoading={createMutation.isPending}
        />
      )}
    </div>
  );
}
