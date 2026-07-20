import React from 'react';
import { createFileRoute, Link, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { User, Package, MapPin, Heart, Settings, LogOut, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_shop/account/')({
  component: AccountDashboard,
});

function AccountDashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    navigate({ to: '/auth/login' });
    return null;
  }

  return (
    <div className="space-y-10">
      <div className="border border-neutral-200 rounded-[2px] p-8 md:p-10 shadow-sm bg-white">
        <h2 className="text-xl font-black uppercase tracking-[0.1em] text-[#282828] mb-8 pb-4 border-b border-neutral-200">Account Overview</h2>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-8">
          <div>
            <h3 className="text-[12px] font-black tracking-[0.15em] uppercase text-[#525252] mb-5">Profile Information</h3>
            <div className="space-y-3 text-[14px] font-medium tracking-[0.05em] text-[#282828]">
              <p><span className="text-neutral-400 mr-2">Name:</span> <span className="font-bold">{user.firstName} {user.lastName}</span></p>
              <p><span className="text-neutral-400 mr-2">Email:</span> <span className="font-bold">{user.email}</span></p>
            </div>
            <button className="mt-8 px-6 py-3 border-2 border-[#282828] text-[#282828] text-[11px] font-black uppercase tracking-[0.15em] hover:bg-[#282828] hover:text-white transition-colors rounded-[2px]">
              Edit Profile
            </button>
          </div>
          
          <div>
            <h3 className="text-[12px] font-black tracking-[0.15em] uppercase text-[#525252] mb-5">Default Address</h3>
            <div className="text-[14px] font-medium tracking-[0.05em] text-[#525252] bg-[#f9f9f9] p-5 rounded-[2px] border border-neutral-200">
              <p>You haven't set a default address yet.</p>
            </div>
            <button className="mt-8 px-6 py-3 border-2 border-[#282828] text-[#282828] text-[11px] font-black uppercase tracking-[0.15em] hover:bg-[#282828] hover:text-white transition-colors rounded-[2px]">
              Manage Addresses
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="border border-neutral-200 bg-white hover:border-[#282828] p-8 md:p-10 rounded-[2px] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group cursor-pointer" 
          onClick={() => navigate({ to: '/account/orders' })}
        >
          <div className="w-16 h-16 bg-[#f9f9f9] group-hover:bg-[#282828] rounded-full flex items-center justify-center mb-6 text-[#282828] group-hover:text-white transition-colors">
            <Package size={28} />
          </div>
          <h3 className="text-lg font-black uppercase tracking-[0.1em] text-[#282828] mb-3">Recent Orders</h3>
          <p className="text-[13px] font-medium tracking-[0.05em] text-[#525252] mb-8 max-w-[200px] mx-auto">Track, return, or buy items again.</p>
          <button className="mt-auto px-8 py-4 bg-[#282828] text-white text-[11px] font-black uppercase tracking-[0.15em] hover:bg-black transition-colors rounded-[2px] w-full max-w-[220px]">
            View Orders
          </button>
        </div>

        <div 
          className="border border-neutral-200 bg-white hover:border-[#282828] p-8 md:p-10 rounded-[2px] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group cursor-pointer" 
          onClick={() => navigate({ to: '/account/wishlist' })}
        >
          <div className="w-16 h-16 bg-[#f9f9f9] group-hover:bg-[#282828] rounded-full flex items-center justify-center mb-6 text-[#282828] group-hover:text-white transition-colors">
            <Heart size={28} />
          </div>
          <h3 className="text-lg font-black uppercase tracking-[0.1em] text-[#282828] mb-3">Wishlist</h3>
          <p className="text-[13px] font-medium tracking-[0.05em] text-[#525252] mb-8 max-w-[200px] mx-auto">View and manage your saved items.</p>
          <button className="mt-auto px-8 py-4 bg-[#282828] text-white text-[11px] font-black uppercase tracking-[0.15em] hover:bg-black transition-colors rounded-[2px] w-full max-w-[220px]">
            View Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
