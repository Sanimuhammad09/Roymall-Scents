import { createFileRoute } from '@tanstack/react-router';
import { HeroSection } from '../../features/shop/components/HeroSection';
import { CategoryNavCarousel } from '../../features/shop/components/CategoryNavCarousel';
import { ProductCarousel } from '../../features/shop/components/ProductCarousel';
import { ShopByColor } from '../../features/shop/components/ShopByColor';
import { Product } from '../../features/shop/components/ProductCard';

export const Route = createFileRoute('/_shop/women')({
  component: WomenHomePage,
});

// Mock Data for the beautiful presentation
const MOCK_CATEGORIES = [
  { id: '1', name: 'Perfume Tops', slug: 'perfume-tops', imageUrl: 'https://images.unsplash.com/photo-1584820927498-cafe8c1074bf?auto=format&fit=crop&q=80&w=300' },
  { id: '2', name: 'Gift Sets', slug: 'gift-sets', imageUrl: 'https://images.unsplash.com/photo-1584982751601-97d8cb0f66fc?auto=format&fit=crop&q=80&w=300' },
  { id: '3', name: 'Solid Perfumes', slug: 'solid-perfumes', imageUrl: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80&w=300' },
  { id: '4', name: 'Travel Sizes', slug: 'travel-sizes', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300' },
  { id: '5', name: 'Body Oils', slug: 'body-oils', imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=300' },
  { id: '6', name: 'Hair Mists', slug: 'hair-mists', imageUrl: 'https://images.unsplash.com/photo-1584982751601-97d8cb0f66fc?auto=format&fit=crop&q=80&w=300' },
];

const MOCK_BEST_SELLERS: Product[] = [
  {
    id: 'p1',
    name: 'Catarina™ Eau de Parfum',
    slug: 'catarina-eau-de-parfum',
    basePrice: 38,
    categoryName: 'Perfumes',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cafe8c1074bf?auto=format&fit=crop&q=80&w=600',
    variants: [
      { id: 'v1', color: 'Navy', colorHex: '#0F172A' },
      { id: 'v2', color: 'Black', colorHex: '#000000' },
      { id: 'v3', color: 'Burgundy', colorHex: '#7F1D1D' },
      { id: 'v4', color: 'Ceil Blue', colorHex: '#7BA4C7' },
      { id: 'v5', color: 'Hunter Green', colorHex: '#14532D' },
      { id: 'v6', color: 'Graphite', colorHex: '#3F3F46' },
      { id: 'v7', color: 'Royal Blue', colorHex: '#1D4ED8' },
    ]
  },
  {
    id: 'p2',
    name: 'Zamora™ Signature Scent',
    slug: 'zamora-signature-scent',
    basePrice: 48,
    categoryName: 'Perfumes',
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97d8cb0f66fc?auto=format&fit=crop&q=80&w=600',
    variants: [
      { id: 'v1', color: 'Navy', colorHex: '#0F172A' },
      { id: 'v2', color: 'Black', colorHex: '#000000' },
      { id: 'v3', color: 'Burgundy', colorHex: '#7F1D1D' },
      { id: 'v4', color: 'Ceil Blue', colorHex: '#7BA4C7' },
    ]
  },
  {
    id: 'p3',
    name: 'Sydney™ Room Spray',
    slug: 'sydney-room-spray',
    basePrice: 88.00,
    categoryName: 'Room Sprays',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
    variants: [
      { id: 'v1', color: 'Navy', colorHex: '#0F172A' },
      { id: 'v2', color: 'Black', colorHex: '#000000' },
    ]
  },
  {
    id: 'p4',
    name: 'Yola™ Body Oil',
    slug: 'yola-body-oil',
    basePrice: 48.00,
    categoryName: 'Body Oils',
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97d8cb0f66fc?auto=format&fit=crop&q=80&w=600',
    variants: [
      { id: 'v1', color: 'Navy', colorHex: '#0F172A' },
      { id: 'v2', color: 'Black', colorHex: '#000000' },
      { id: 'v3', color: 'Hunter Green', colorHex: '#14532D' },
    ]
  },
];

const MOCK_COLORS = [
  { id: 'c1', name: 'Navy', hex: '#0F172A', imageUrl: 'https://images.unsplash.com/photo-1584820927498-cafe8c1074bf?auto=format&fit=crop&q=80&w=400' },
  { id: 'c2', name: 'Black', hex: '#000000', imageUrl: 'https://images.unsplash.com/photo-1584982751601-97d8cb0f66fc?auto=format&fit=crop&q=80&w=400' },
  { id: 'c3', name: 'Burgundy', hex: '#7F1D1D', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400' },
  { id: 'c4', name: 'Ceil Blue', hex: '#7BA4C7', imageUrl: 'https://images.unsplash.com/photo-1584820927498-cafe8c1074bf?auto=format&fit=crop&q=80&w=400' },
  { id: 'c5', name: 'Hunter Green', hex: '#14532D', imageUrl: 'https://images.unsplash.com/photo-1584982751601-97d8cb0f66fc?auto=format&fit=crop&q=80&w=400' },
  { id: 'c6', name: 'Graphite', hex: '#3F3F46', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400' },
];

function WomenHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        title="Women's Core Fragrances"
        subtitle="Ridiculously Soft. Unbelievably Comfortable. 100% Awesome."
        imageUrl="https://images.unsplash.com/photo-1584820927498-cafe8c1074bf?auto=format&fit=crop&q=80&w=2000"
        ctaText="Shop All Women's"
        ctaLink="/shop/women/all"
      />

      {/* Category Navigation */}
      <CategoryNavCarousel categories={MOCK_CATEGORIES} baseUrl="/shop/women" />

      {/* Best Sellers Product Carousel */}
      <ProductCarousel
        title="Best Sellers"
        products={MOCK_BEST_SELLERS}
        viewAllLink="/shop/women/best-sellers"
      />

      {/* Secondary Banner - E.g. New Arrivals */}
      <div className="py-8">
        <HeroSection
          title="New Arrivals"
          subtitle="Refresh your rotation with our latest styles and limited edition colors."
          imageUrl="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=2000"
          ctaText="Shop New Arrivals"
          ctaLink="/shop/women/new-arrivals"
        />
      </div>

      {/* Shop By Color */}
      <ShopByColor colors={MOCK_COLORS} />

      {/* Top Rated Product Carousel */}
      <ProductCarousel
        title="Top Rated"
        products={[...MOCK_BEST_SELLERS].reverse()} // Mocking top rated with same data reversed
        viewAllLink="/shop/women/top-rated"
      />
    </div>
  );
}
