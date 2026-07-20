import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Download, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/admin/reports')({
  component: AdminReportsPage,
});

const reportTypes = [
  {
    id: 'sales',
    title: 'Sales Report',
    description: 'Revenue, orders, and average order value breakdown.',
    icon: FileText,
  },
  {
    id: 'products',
    title: 'Product Performance',
    description: 'Top sellers, low performers, and inventory turn rate.',
    icon: FileText,
  },
  {
    id: 'customers',
    title: 'Customer Report',
    description: 'New vs returning customers, lifetime value, and retention.',
    icon: FileText,
  },
  {
    id: 'inventory',
    title: 'Inventory Report',
    description: 'Stock levels, reorder alerts, and dead stock identification.',
    icon: FileText,
  },
];

function AdminReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);

  const handleGenerate = (reportId: string) => {
    setGenerating(reportId);
    setTimeout(() => {
      setGenerating(null);
      toast.error('API not available: Backend report generation endpoint missing.', { id: 'report-error' });
    }, 1000);
  };

  // Mock recent reports
  const recentReports = [
    { name: 'sales-report-jul-2026.csv', date: '2026-07-14', size: '45 KB' },
    { name: 'product-performance-jun-2026.csv', date: '2026-06-30', size: '38 KB' },
    { name: 'inventory-report-jun-2026.csv', date: '2026-06-28', size: '22 KB' },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-charcoal tracking-tight uppercase">Reports</h1>
          <p className="text-sm font-medium text-neutral-500 mt-1 tracking-wide">Generate and download store reports</p>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center text-charcoal shrink-0">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-black text-charcoal text-lg tracking-tight uppercase">{report.title}</h3>
                  <p className="text-[13px] text-neutral-500 mt-1 font-medium leading-relaxed">{report.description}</p>
                </div>
              </div>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 h-12 font-bold rounded-xl border-neutral-200 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
                  onClick={() => handleGenerate(report.id)}
                  disabled={generating === report.id}
                >
                  {generating === report.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-neutral-300 border-t-charcoal rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download size={18} /> Generate Report
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Reports */}
      <div className="pt-4">
        <h2 className="text-sm font-black text-neutral-400 uppercase tracking-[0.15em] mb-6">Recent Reports</h2>
        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-neutral-50/80 border-b border-neutral-100 text-neutral-400 font-black uppercase tracking-[0.15em] text-[10px]">
                <tr>
                  <th className="px-6 py-5 whitespace-nowrap">File Name</th>
                  <th className="px-6 py-5 whitespace-nowrap">Date</th>
                  <th className="px-6 py-5 whitespace-nowrap">Size</th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentReports.map((report) => (
                  <tr key={report.name} className="hover:bg-neutral-50/80 transition-colors group">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
                        <FileText size={14} className="text-charcoal" />
                      </div>
                      <span className="font-bold text-charcoal">{report.name}</span>
                    </td>
                    <td className="px-6 py-4 text-neutral-500 font-bold whitespace-nowrap text-[11px] uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-neutral-400" /> {report.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-500 font-medium">{report.size}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="h-9 gap-2 px-4 font-bold rounded-lg border-neutral-200 text-neutral-600 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm opacity-0 group-hover:opacity-100" onClick={() => toast.error('API not available: File download endpoint missing.', { id: 'dl-error' })}>
                        <Download size={14} /> Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
