import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Banknote, ShoppingCart, Users, Package, ArrowUpRight, ArrowDownRight, TrendingUp, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '@/lib/axios';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/stats');
      return data.data || data;
    },
  });

  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ['dashboard-revenue'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/revenue');
      return data.data || data;
    },
  });

  const { data: recentOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['dashboard-recent-orders'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/recent-orders');
      return data.data || data;
    },
  });

  const statsCards = stats ? [
    { title: 'Total Revenue', value: formatCurrency(stats.totalRevenue || 0), change: `${stats.revenueChange || 0}%`, trend: parseFloat(stats.revenueChange || '0') >= 0 ? 'up' : 'down', icon: Banknote, color: 'emerald' },
    { title: 'Orders', value: (stats.ordersCount || 0).toString(), change: `${stats.ordersChange || 0}%`, trend: parseFloat(stats.ordersChange || '0') >= 0 ? 'up' : 'down', icon: ShoppingCart, color: 'blue' },
    { title: 'Active Customers', value: (stats.customersCount || 0).toString(), change: '+12%', trend: 'up', icon: Users, color: 'indigo' },
    { title: 'Products in Stock', value: (stats.productsInStock || 0).toString(), change: '-2%', trend: 'down', icon: Package, color: 'orange' },
  ] : [];

  const getColorClasses = (color: string, isUp: boolean) => {
    switch (color) {
      case 'emerald': return { bg: 'bg-emerald-500/10', text: 'text-emerald-600', trendBg: isUp ? 'text-emerald-600' : 'text-red-500' };
      case 'blue': return { bg: 'bg-blue-500/10', text: 'text-blue-600', trendBg: isUp ? 'text-emerald-600' : 'text-red-500' };
      case 'indigo': return { bg: 'bg-indigo-500/10', text: 'text-indigo-600', trendBg: isUp ? 'text-emerald-600' : 'text-red-500' };
      case 'orange': return { bg: 'bg-orange-500/10', text: 'text-orange-600', trendBg: isUp ? 'text-emerald-600' : 'text-red-500' };
      default: return { bg: 'bg-gray-500/10', text: 'text-gray-600', trendBg: 'text-gray-500' };
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-charcoal tracking-tight uppercase">Dashboard Overview</h1>
          <p className="text-neutral-500 text-sm mt-1 font-medium tracking-wide">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-lg border border-neutral-200 shadow-sm flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Live System Status</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 animate-pulse">
              <div className="h-4 bg-neutral-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-neutral-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-neutral-200 rounded w-1/3"></div>
            </div>
          ))
        ) : (
          statsCards.map((stat, index) => {
            const Icon = stat.icon;
            const isUp = stat.trend === 'up';
            const colors = getColorClasses(stat.color, isUp);
            
            return (
              <div key={index} className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[12px] font-bold text-neutral-500 uppercase tracking-widest">{stat.title}</h3>
                  <div className={`p-2.5 rounded-lg ${colors.bg}`}>
                    <Icon size={20} className={colors.text} />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="text-4xl font-black text-charcoal tracking-tighter">{stat.value}</h4>
                    <p className={`text-[12px] font-bold mt-3 flex items-center gap-1 ${colors.trendBg} px-2 py-1 bg-neutral-50 rounded-md w-fit`}>
                      {isUp ? <ArrowUpRight size={16} strokeWidth={2.5} /> : <ArrowDownRight size={16} strokeWidth={2.5} />}
                      {stat.change} <span className="text-neutral-400 font-medium ml-1">vs last month</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Charts & Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-neutral-100 h-[420px] flex flex-col">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-charcoal uppercase tracking-wide">Revenue Overview</h3>
              <p className="text-[13px] font-medium text-neutral-500 mt-1">Sales performance over the last 7 months</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/50 rounded-lg border border-blue-100">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Growth +18.2%</span>
            </div>
          </div>
          <div className="flex-1 w-full min-h-0">
            {revenueLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-300"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111111" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#111111" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888', fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888', fontWeight: 500 }} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    itemStyle={{ color: '#111', fontWeight: 'bold' }}
                    formatter={(value: any) => [formatCurrency(value as number), 'Revenue']}
                    labelStyle={{ color: '#666', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#111111" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-neutral-100 h-[420px] flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-charcoal uppercase tracking-wide">Recent Sales</h3>
              <p className="text-[13px] font-medium text-neutral-500 mt-1">Latest transactions</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-1 custom-scrollbar">
            {ordersLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-200"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-neutral-200 rounded w-24"></div>
                      <div className="h-2 bg-neutral-200 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-neutral-200 rounded w-16"></div>
                </div>
              ))
            ) : recentOrders && recentOrders.length > 0 ? (
              recentOrders.map((order: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-xl transition-all duration-200 group cursor-pointer border border-transparent hover:border-neutral-100 hover:shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-charcoal font-black text-sm group-hover:bg-charcoal group-hover:text-white transition-colors shadow-inner">
                      {order.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-charcoal tracking-wide">{order.customer}</p>
                      <p className="text-[12px] font-medium text-neutral-500">{order.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-emerald-600">
                      +{formatCurrency(order.amount)}
                    </p>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Paid</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-neutral-400">
                <CreditCard size={32} className="mb-2 opacity-50" />
                <p className="text-sm font-medium">No recent orders</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
