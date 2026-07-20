import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { AnnouncementBar } from '@/components/common/AnnouncementBar';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 flex flex-col relative w-full pb-16 sm:pb-24 lg:pb-32">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
