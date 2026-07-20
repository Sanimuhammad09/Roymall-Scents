import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Package, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export const Route = createFileRoute('/_shop/account/orders')({
  component: OrdersPage,
});

function OrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', 'mine'],
    queryFn: async () => {
      const response = await api.get('/orders');
      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-charcoal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-charcoal">Order History</h2>
        <Link to="/account" className="text-sm text-neutral-500 hover:text-charcoal transition-colors">
          Back to Dashboard
        </Link>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="bg-white p-12 rounded-sm shadow-sm border border-neutral-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4 text-neutral-400">
            <Package size={32} />
          </div>
          <h3 className="text-lg font-bold text-charcoal mb-2">No orders yet</h3>
          <p className="text-sm text-neutral-500 mb-8">When you place an order, it will appear here.</p>
          <Link to="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any, index: number) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-sm shadow-sm border border-neutral-100 overflow-hidden"
            >
              <div className="bg-neutral-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100">
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  <div>
                    <p className="text-neutral-500 uppercase tracking-wider text-[10px] font-semibold">Order Placed</p>
                    <p className="font-medium text-charcoal">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 uppercase tracking-wider text-[10px] font-semibold">Total</p>
                    <p className="font-medium text-charcoal">{formatCurrency(order.totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 uppercase tracking-wider text-[10px] font-semibold">Order Number</p>
                    <p className="font-medium text-charcoal">#{order.orderNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant={order.status === 'DELIVERED' ? 'default' : 'secondary'}>
                    {order.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    View Details
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="w-24 shrink-0 flex flex-col gap-2">
                      <div className="aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden border border-neutral-100">
                        {item.variant?.product?.images?.[0] ? (
                          <img 
                            src={item.variant.product.images[0].url} 
                            alt={item.variant.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-300">
                            <Package size={24} />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 truncate text-center" title={item.variant?.product?.name}>
                        {item.variant?.product?.name}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-neutral-100 sm:hidden">
                  <Button variant="outline" className="w-full">
                    View Order Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
