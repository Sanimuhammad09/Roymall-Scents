import { createFileRoute } from '@tanstack/react-router';
import { HeroSection } from '@/features/home/components/HeroSection';
import { DeliveryCounter } from '@/features/home/components/DeliveryCounter';
import { ShopByColor } from '@/features/home/components/ShopByColor';
import { ShopByCategory } from '@/features/home/components/ShopByCategory';
import { TheSetBanner } from '@/features/home/components/TheSetBanner';
import { PicksForYou } from '@/features/home/components/PicksForYou';
import { useSEO } from '@/hooks/useSEO';

export const Route = createFileRoute('/_shop/')({
  component: HomePage,
});

function HomePage() {
  useSEO({
    title: 'Roymall Scents — A perfect perfume for every mood',
    description: 'Discover our exclusive collection of luxury fragrances for men and women. Shop premium perfumes, colognes, and curated gift sets.',
  });

  return (
    <div className="flex flex-col min-h-screen">
      <ShopByColor />
      <HeroSection />
      <DeliveryCounter />
      <ShopByCategory />
      <TheSetBanner />
      <PicksForYou />
    </div>
  );
}
