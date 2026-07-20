import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { HeroSection } from '../../features/shop/components/HeroSection';
import { CategoryNavCarousel } from '../../features/shop/components/CategoryNavCarousel';
import { ProductCarousel } from '../../features/shop/components/ProductCarousel';
import { ShopByColor as ShopByScentProfile } from '../../features/home/components/ShopByColor';

export const Route = createFileRoute('/_shop/women')({
  component: WomenHomePage,
});

function WomenHomePage() {
  // Fetch products under the 'women' collection from the API
  const { data: productsData, isLoading: isProductsLoading } = useQuery({
    queryKey: ['collection-products', 'women'],
    queryFn: async () => {
      const { data } = await api.get('/products?collection=women');
      return data.data || data;
    },
  });

  // Fetch categories from the API
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data.data || data;
    },
  });

  const products = productsData || [];
  const categories = categoriesData || [];

  // Map products to the structure required by ProductCard (excluding variants to hide color swatches)
  const mappedProducts = products.map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    basePrice: p.basePrice,
    imageUrl: p.images?.[0]?.url || '/images/perfume_product.png',
    categoryName: p.category?.name || 'Perfumes',
    variants: [], // Empty array hides color swatches
  }));

  // Filter out top-level gender categories for the nav carousel
  const displayCategories = categories
    .filter((c: any) => !['womens-fragrances', 'mens-fragrances'].includes(c.slug))
    .map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      imageUrl: c.image || '/images/perfume_product.png',
    }));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        title="Women's Core Fragrances"
        subtitle="Immersive scent profiles. Luxury ingredients. 100% Captivating."
        imageUrl="https://images.unsplash.com/photo-1584820927498-cafe8c1074bf?auto=format&fit=crop&q=80&w=2000"
        ctaText="Shop All Women's Scents"
        ctaLink="/collections/women"
      />

      {/* Category Navigation */}
      {displayCategories.length > 0 && (
        <CategoryNavCarousel categories={displayCategories} baseUrl="/collections" />
      )}

      {/* Best Sellers Product Carousel */}
      {!isProductsLoading && mappedProducts.length > 0 && (
        <ProductCarousel
          title="Best Sellers"
          products={mappedProducts}
          viewAllLink="/collections/women"
        />
      )}

      {/* Secondary Banner - New Arrivals */}
      <div className="py-8">
        <HeroSection
          title="New Arrivals"
          subtitle="Discover our latest luxury perfumes and limited edition scent profiles."
          imageUrl="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=2000"
          ctaText="Shop New Arrivals"
          ctaLink="/collections/new-arrivals"
        />
      </div>

      {/* Shop By Scent Profile (adapted from homepage's ShopByColor) */}
      <ShopByScentProfile />

      {/* Top Rated Product Carousel */}
      {!isProductsLoading && mappedProducts.length > 0 && (
        <ProductCarousel
          title="Top Rated"
          products={[...mappedProducts].reverse()}
          viewAllLink="/collections/women"
        />
      )}
    </div>
  );
}
