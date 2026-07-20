import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Banknote, Users, ShoppingBag, Eye } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { formatCurrency } from '@/lib/utils';

export const Route = createFileRoute('/admin/analytics')({
  component: AdminAnalyticsPage,
});

// Mock traffic data as backend doesn't support page views yet

const trafficData = [
  { day: 'Mon', visitors: 1200, pageViews: 3400 },
  { day: 'Tue', visitors: 1400, pageViews: 3900 },
  { day: 'Wed', visitors: 1100, pageViews: 3200 },
  { day: 'Thu', visitors: 1600, pageViews: 4100 },
  { day: 'Fri', visitors: 1800, pageViews: 4800 },
  { day: 'Sat', visitors: 2100, pageViews: 5600 },
  { day: 'Sun', visitors: 1900, pageViews: 5200 },
];

const COLORS = ['#111111', '#333333', '#666666', '#999999', '#cccccc'];

function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const { data: analytics } = useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/analytics');
      return data.data || data;
    },
  });

  const { data: revenueData } = useQuery({
    queryKey: ['dashboard-revenue'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/revenue');
      return data.data || data;
    },
  });

  const stats = analytics ? [
    { label: 'Total Revenue', value: formatCurrency(analytics.revenue?.current || 0), change: `${(analytics.revenue?.growth || 0) >= 0 ? '+' : ''}${analytics.revenue?.growth || 0}%`, positive: (analytics.revenue?.growth || 0) >= 0, icon: Banknote, color: 'emerald' },
    { label: 'Total Orders', value: (analytics.orders?.current || 0).toString(), change: `${(analytics.orders?.growth || 0) >= 0 ? '+' : ''}${analytics.orders?.growth || 0}%`, positive: (analytics.orders?.growth || 0) >= 0, icon: ShoppingBag, color: 'blue' },
    { label: 'New Customers', value: (analytics.customers?.current || 0).toString(), change: `${(analytics.customers?.growth || 0) >= 0 ? '+' : ''}${analytics.customers?.growth || 0}%`, positive: (analytics.customers?.growth || 0) >= 0, icon: Users, color: 'indigo' },
    { label: 'Avg Order Value', value: formatCurrency(analytics.orders?.current ? (analytics.revenue?.current || 0) / analytics.orders.current : 0), change: '0%', positive: true, icon: TrendingUp, color: 'orange' },
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-charcoal tracking-tight uppercase">Analytics</h1>
          <p className="text-sm font-medium text-neutral-500 mt-1 tracking-wide">Store performance and insights</p>
        </div>
        <div className="flex items-center bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-1">
          {(['7d', '30d', '90d'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-lg transition-all ${
                period === p ? 'bg-charcoal text-white shadow-sm' : 'text-neutral-500 hover:text-charcoal hover:bg-neutral-50'
              }`}
            >
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colors = getColorClasses(stat.color, stat.positive);
          return (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.15em]">{stat.label}</span>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text}`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-4xl font-black text-charcoal tracking-tight mb-3">{stat.value}</p>
              <div className="flex items-center gap-1">
                {stat.positive ? (
                  <TrendingUp size={16} className={colors.trendBg} />
                ) : (
                  <TrendingDown size={16} className={colors.trendBg} />
                )}
                <span className={`text-[13px] font-black ${colors.trendBg}`}>
                  {stat.change}
                </span>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest ml-2">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h3 className="text-sm font-black text-neutral-400 uppercase tracking-[0.15em] mb-8">Revenue & Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111111" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#111111" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
              <XAxis dataKey="name" stroke="#a3a3a3" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#a3a3a3" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #f5f5f5', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '16px' }}
                itemStyle={{ color: '#111', fontWeight: '900' }}
                labelStyle={{ color: '#a3a3a3', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#111111" fill="url(#colorRevenue)" strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h3 className="text-sm font-black text-neutral-400 uppercase tracking-[0.15em] mb-8">Order Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={analytics?.orderStatusBreakdown || []}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                nameKey="status"
                stroke="none"
              >
                {(analytics?.orderStatusBreakdown || []).map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-8 space-y-4">
            {(analytics?.orderStatusBreakdown || []).map((item: any, index: number) => {
              const totalOrders = analytics?.orderStatusBreakdown.reduce((sum: number, i: any) => sum + i.count, 0) || 1;
              const percentage = Math.round((item.count / totalOrders) * 100);
              return (
                <div key={item.status} className="flex items-center justify-between text-[13px] bg-neutral-50/50 p-3 rounded-xl border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-neutral-500 font-bold uppercase tracking-wider text-[11px]">{item.status.toLowerCase()}</span>
                  </div>
                  <span className="font-black text-charcoal text-sm">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h3 className="text-sm font-black text-neutral-400 uppercase tracking-[0.15em] mb-8">Website Traffic (This Week)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
            <XAxis dataKey="day" stroke="#a3a3a3" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#a3a3a3" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #f5f5f5', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '16px' }}
              itemStyle={{ color: '#111', fontWeight: '900' }}
              labelStyle={{ color: '#a3a3a3', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }} iconType="circle" />
            <Bar dataKey="visitors" name="Unique Visitors" fill="#111111" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="pageViews" name="Page Views" fill="#e5e5e5" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
