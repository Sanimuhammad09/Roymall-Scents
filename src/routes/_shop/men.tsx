import { createFileRoute } from '@tanstack/react-router';
import { HeroSection } from '../../features/shop/components/HeroSection';
import { CategoryNavCarousel } from '../../features/shop/components/CategoryNavCarousel';
import { ProductCarousel } from '../../features/shop/components/ProductCarousel';
import { ShopByColor } from '../../features/shop/components/ShopByColor';
import { Product } from '../../features/shop/components/ProductCard';

export const Route = createFileRoute('/_shop/men')({
  component: MenHomePage,
});

const MOCK_CATEGORIES = [
  { id: '1', name: 'Perfume Tops', slug: 'perfume-tops', imageUrl: 'https://images.unsplash.com/photo-1620857321285-8f6fc6e23db9?auto=format&fit=crop&q=80&w=300' },
  { id: '2', name: 'Gift Sets', slug: 'gift-sets', imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=300' },
  { id: '3', name: 'Solid Perfumes', slug: 'solid-perfumes', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=300' },
  { id: '4', name: 'Travel Sizes', slug: 'travel-sizes', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300' },
];

const MOCK_BEST_SELLERS: Product[] = [
  {
    id: 'p1m',
    name: 'Leon™ Signature Scent',
    slug: 'leon-signature-scent',
    basePrice: 38,
    categoryName: 'Perfumes',
    imageUrl: 'https://images.unsplash.com/photo-1620857321285-8f6fc6e23db9?auto=format&fit=crop&q=80&w=600',
    variants: [
      { id: 'v1', color: 'Navy', colorHex: '#0F172A' },
      { id: 'v2', color: 'Ceil Blue', colorHex: '#6484A4' },
    ]
  },
  {
    id: 'p2m',
    name: 'Tansen™ Eau de Parfum',
    slug: 'tansen-eau-de-parfum',
    basePrice: 48,
    categoryName: 'Perfumes',
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600',
    variants: [
      { id: 'v1', color: 'Navy', colorHex: '#0F172A' },
      { id: 'v2', color: 'Ceil Blue', colorHex: '#6484A4' },
      { id: 'v3', color: 'Black', colorHex: '#000000' },
    ]
  },
  {
    id: 'p3m',
    name: 'Mac™ Travel Spray',
    slug: 'mac-travel-spray',
    basePrice: 88,
    categoryName: 'Travel Sizes',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
    variants: [
      { id: 'v1', color: 'Navy', colorHex: '#0F172A' },
    ]
  },
  {
    id: 'p4m',
    name: 'Cairo™ Gift Set',
    slug: 'cairo-gift-set',
    basePrice: 48,
    categoryName: 'Gift Sets',
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600',
    variants: [
      { id: 'v1', color: 'Navy', colorHex: '#0F172A' },
      { id: 'v2', color: 'Black', colorHex: '#000000' },
    ]
  },
];

const MOCK_COLORS = [
  { id: 'c1', name: 'Navy', hex: '#0F172A', imageUrl: 'https://images.unsplash.com/photo-1620857321285-8f6fc6e23db9?auto=format&fit=crop&q=80&w=400' },
  { id: 'c2', name: 'Black', hex: '#000000', imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400' },
  { id: 'c5', name: 'Hunter Green', hex: '#14532D', imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400' },
  { id: 'c6', name: 'Graphite', hex: '#3F3F46', imageUrl: 'https://images.unsplash.com/photo-1620857321285-8f6fc6e23db9?auto=format&fit=crop&q=80&w=400' },
];

function MenHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        title="Men's Core Fragrances"
        subtitle="Uncompromising comfort and utility."
        imageUrl="https://images.unsplash.com/photo-1620857321285-8f6fc6e23db9?auto=format&fit=crop&q=80&w=2000"
        ctaText="Shop All Men's"
        ctaLink="/collections/men"
      />

      {/* Category Navigation */}
      <CategoryNavCarousel categories={MOCK_CATEGORIES} baseUrl="/collections/men" />

      {/* Best Sellers Product Carousel */}
      <ProductCarousel
        title="Best Sellers"
        products={MOCK_BEST_SELLERS}
        viewAllLink="/collections/men"
      />

      <div className="py-8">
        <HeroSection
          title="New Arrivals"
          subtitle="Refresh your rotation."
          imageUrl="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=2000"
          ctaText="Shop New Arrivals"
          ctaLink="/collections/new-arrivals"
        />
      </div>

      <ShopByColor colors={MOCK_COLORS} />

      <ProductCarousel
        title="Top Rated"
        products={[...MOCK_BEST_SELLERS].reverse()}
        viewAllLink="/collections/men"
      />
    </div>
  );
}
