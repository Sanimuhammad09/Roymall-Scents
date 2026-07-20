import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Mail, UserX, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/axios';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/admin/customers')({
  component: AdminCustomersPage,
});

function AdminCustomersPage() {
  const { data: responseData, isLoading } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const response = await api.get('/users?limit=50');
      return response.data.data || response.data;
    },
  });

  const customers = responseData?.items || responseData || [];

  const queryClient = useQueryClient();
  const toggleStatus = useMutation({
    mutationFn: async ({ id, isBanned }: { id: string; isBanned: boolean }) => {
      // Toggle status based on current state. If we assume backend expects 'status' field:
      // Actually backend expects 'BANNED' or 'ACTIVE' or similar, let's pass { status: isBanned ? 'ACTIVE' : 'BANNED' }
      // Or maybe { isBanned: !isBanned } depending on the schema.
      await api.put(`/users/admin/${id}/status`, { status: isBanned ? 'ACTIVE' : 'BANNED' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('Customer status updated');
    },
    onError: () => toast.error('Failed to update customer status'),
  });

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-charcoal tracking-tight uppercase">Customers</h1>
          <p className="text-sm font-medium text-neutral-500 mt-1 tracking-wide">Manage user accounts and history</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <Input placeholder="Search customers..." className="pl-12 h-12 bg-white border-neutral-200 rounded-xl shadow-sm focus-visible:ring-charcoal font-medium" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-neutral-50/80 border-b border-neutral-100 text-neutral-400 font-black uppercase tracking-[0.15em] text-[10px]">
              <tr>
                <th className="px-6 py-5 whitespace-nowrap">Name</th>
                <th className="px-6 py-5 whitespace-nowrap">Email</th>
                <th className="px-6 py-5 whitespace-nowrap">Orders</th>
                <th className="px-6 py-5 whitespace-nowrap">Total Spent</th>
                <th className="px-6 py-5 whitespace-nowrap">Joined</th>
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
              ) : customers && customers.length > 0 ? (
                customers.map((c: any) => (
                  <tr key={c.id} className="hover:bg-neutral-50/80 transition-colors group">
                    <td className="px-6 py-4 font-bold text-charcoal">{c.firstName} {c.lastName}</td>
                    <td className="px-6 py-4 text-neutral-500 font-medium">{c.email}</td>
                    <td className="px-6 py-4">
                      <span className="font-black text-charcoal bg-neutral-100 px-3 py-1 rounded-md">{c._count?.orders || c.orders || 0}</span>
                    </td>
                    <td className="px-6 py-4 font-black text-charcoal text-base">{formatCurrency(c.spent || 0)}</td>
                    <td className="px-6 py-4 text-neutral-400 font-bold text-[11px] uppercase tracking-wider">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" 
                          title="Email Customer"
                          onClick={() => toast.error('API not available: Email endpoint missing.')}
                        >
                          <Mail size={16} />
                        </button>
                        <button 
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                          title={c.status === 'BANNED' ? 'Unblock User' : 'Block User'}
                          onClick={() => toggleStatus.mutate({ id: c.id, isBanned: c.status === 'BANNED' })}
                        >
                          <UserX size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500 font-medium">
                    No customers found.
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
