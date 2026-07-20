import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-charcoal tracking-tight uppercase">Store Settings</h1>
          <p className="text-sm font-medium text-neutral-500 mt-1 tracking-wide">Configure global store preferences</p>
        </div>
        <Button 
          className="flex items-center gap-2 font-bold uppercase tracking-wide bg-charcoal hover:bg-black text-white px-6 h-12 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          onClick={() => toast.error('API not available: Store settings endpoint missing.')}
        >
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h2 className="text-sm font-black text-neutral-400 uppercase tracking-[0.15em] mb-8">General</h2>
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="text-[11px] font-black text-charcoal uppercase tracking-widest block mb-3">Store Name</label>
              <Input defaultValue="Flairvigo" className="h-12 bg-neutral-50 border-neutral-200 rounded-xl font-medium focus-visible:ring-charcoal" />
            </div>
            <div>
              <label className="text-[11px] font-black text-charcoal uppercase tracking-widest block mb-3">Contact Email</label>
              <Input defaultValue="support@flairvigo.com" className="h-12 bg-neutral-50 border-neutral-200 rounded-xl font-medium focus-visible:ring-charcoal" />
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h2 className="text-sm font-black text-neutral-400 uppercase tracking-[0.15em] mb-8">Shipping & Taxes</h2>
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="text-[11px] font-black text-charcoal uppercase tracking-widest block mb-3">Flat Rate Shipping Cost (₦)</label>
              <Input type="number" defaultValue="5000" className="h-12 bg-neutral-50 border-neutral-200 rounded-xl font-medium focus-visible:ring-charcoal" />
            </div>
            <div>
              <label className="text-[11px] font-black text-charcoal uppercase tracking-widest block mb-3">Free Shipping Threshold (₦)</label>
              <Input type="number" defaultValue="50000" className="h-12 bg-neutral-50 border-neutral-200 rounded-xl font-medium focus-visible:ring-charcoal" />
            </div>
            <div>
              <label className="text-[11px] font-black text-charcoal uppercase tracking-widest block mb-3">Base Tax Rate (%)</label>
              <Input type="number" defaultValue="8" className="h-12 bg-neutral-50 border-neutral-200 rounded-xl font-medium focus-visible:ring-charcoal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
