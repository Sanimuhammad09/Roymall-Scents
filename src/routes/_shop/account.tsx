import React from 'react';
import { createFileRoute, Outlet, Link, useLocation, useNavigate } from '@tanstack/react-router';
import { User, Package, MapPin, Heart, Settings, LogOut, Bell } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

export const Route = createFileRoute('/_shop/account')({
  component: AccountLayout,
});

function AccountLayout() {
  const { logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  const links = [
    { name: 'Dashboard', path: '/account', icon: User, exact: true },
    { name: 'Orders', path: '/account/orders', icon: Package },
    { name: 'Wishlist', path: '/account/wishlist', icon: Heart },
    { name: 'Addresses', path: '/account/addresses', icon: MapPin },
    { name: 'Notifications', path: '/account/notifications', icon: Bell },
    { name: 'Settings', path: '/account/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white pt-12 pb-24">
      <div className="container-premium max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="mb-12 border-b-2 border-[#282828] pb-6">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[0.1em] text-[#282828]">
            My Account
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          
          {/* Sidebar */}
          <aside className="w-full md:w-[260px] shrink-0">
            <nav className="flex flex-col gap-2">
              {links.map(link => {
                const Icon = link.icon;
                const isActive = link.exact 
                  ? location.pathname === link.path 
                  : location.pathname.startsWith(link.path);
                  
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-4 px-5 py-4 text-[13px] tracking-[0.1em] uppercase transition-colors rounded-[2px] ${
                      isActive 
                        ? 'bg-[#282828] text-white font-black' 
                        : 'font-bold text-[#525252] hover:bg-neutral-100 hover:text-[#282828]'
                    }`}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    {link.name}
                  </Link>
                );
              })}
              <div className="h-px bg-neutral-200 my-2" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-5 py-4 text-[13px] tracking-[0.1em] uppercase font-bold text-red-500 hover:bg-red-50 transition-colors rounded-[2px] text-left w-full"
              >
                <LogOut size={18} strokeWidth={2} />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}
