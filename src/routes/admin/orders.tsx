import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/admin/orders')({
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: async () => {
      const response = await api.get('/orders/admin/all');
      return response.data.data || response.data;
    },
  });

  const queryClient = useQueryClient();
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await api.post(`/orders/admin/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      toast.success('Order status updated');
    },
    onError: () => toast.error('Failed to update order status'),
  });

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-charcoal tracking-tight uppercase">Orders</h1>
          <p className="text-sm font-medium text-neutral-500 mt-1 tracking-wide">View and manage customer orders</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-neutral-50/80 border-b border-neutral-100 text-neutral-400 font-black uppercase tracking-[0.15em] text-[10px]">
              <tr>
                <th className="px-6 py-5 whitespace-nowrap">Order ID</th>
                <th className="px-6 py-5 whitespace-nowrap">Customer</th>
                <th className="px-6 py-5 whitespace-nowrap">Date</th>
                <th className="px-6 py-5 whitespace-nowrap">Total</th>
                <th className="px-6 py-5 whitespace-nowrap">Status</th>
                <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500 font-medium">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-2 border-neutral-200 border-t-charcoal rounded-full animate-spin" />
                    </div>
                  </td>
                </tr>
              ) : orders && orders.length > 0 ? (
                orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors group">
                    <td className="px-6 py-4 font-black text-charcoal">{order.id.slice(-8).toUpperCase()}</td>
                    <td className="px-6 py-4 font-bold">{order.user?.firstName} {order.user?.lastName}</td>
                    <td className="px-6 py-4 text-neutral-500 font-medium">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-black text-charcoal">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4">
                      <select 
                        className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-md border outline-none cursor-pointer appearance-none ${order.status === 'PAID' ? 'bg-neutral-100 text-charcoal border-neutral-200' : order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}
                        value={order.status}
                        onChange={(e) => {
                          updateStatus.mutate({ id: order.id, status: e.target.value });
                        }}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="h-9 px-4 font-bold rounded-lg border-neutral-200 text-neutral-600 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">
                        <Eye size={14} className="mr-2" /> View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500 font-medium">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
