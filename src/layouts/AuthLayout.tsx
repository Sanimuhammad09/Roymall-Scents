import React from 'react';
import { Outlet, Link } from '@tanstack/react-router';
import { PageTransition } from '@/components/common/PageTransition';
import { ArrowLeft } from 'lucide-react';

export function AuthLayout() {
  const authImage = "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="flex min-h-screen bg-ivory">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-charcoal">
        <img 
          src={authImage} 
          alt="Roymall Scents Luxury Fragrances"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
        <div className="absolute bottom-12 left-12 z-10 text-white max-w-lg">
          <h2 className="heading-display text-4xl mb-4">A PERFECT SCENT <br/>FOR EVERY MOOD</h2>
          <p className="text-white/80 text-lg">Join Roymall Scents to discover your signature fragrance and manage your orders.</p>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="w-full px-4 sm:px-10 py-6 sm:py-8 flex items-center justify-center relative">
          <Link 
            to="/" 
            className="absolute left-4 sm:left-10 text-neutral-400 hover:text-charcoal transition-colors p-2 -ml-2 rounded-full hover:bg-neutral-100 flex items-center justify-center"
            aria-label="Back to Shop"
          >
            <ArrowLeft size={22} strokeWidth={1.5} />
          </Link>
          <Link to="/">
            <img src="/images/logo.jpg" alt="Roymall Scents" className="h-16 w-auto object-contain" />
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 w-full max-w-lg mx-auto">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
