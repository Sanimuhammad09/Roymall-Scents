import { createFileRoute } from '@tanstack/react-router';
import { HeroSection } from '@/features/home/components/HeroSection';
import { FeaturesStats } from '@/features/home/components/FeaturesStats';
import { AllProductsGrid } from '@/features/home/components/AllProductsGrid';
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
      <HeroSection />
      <FeaturesStats />
      <AllProductsGrid />
    </div>
  );
}
