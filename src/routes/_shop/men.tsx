import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { HeroSection } from '../../features/shop/components/HeroSection';
import { CategoryNavCarousel } from '../../features/shop/components/CategoryNavCarousel';
import { ProductCarousel } from '../../features/shop/components/ProductCarousel';
import { ShopByColor as ShopByScentProfile } from '../../features/home/components/ShopByColor';

export const Route = createFileRoute('/_shop/men')({
  component: MenHomePage,
});

function MenHomePage() {
  // Fetch products under the 'men' collection from the API
  const { data: productsData, isLoading: isProductsLoading } = useQuery({
    queryKey: ['collection-products', 'men'],
    queryFn: async () => {
      const { data } = await api.get('/products?collection=men');
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
        title="Men's Core Fragrances"
        subtitle="Signature scents crafted with premium colognes, rich woods, and warm spices."
        imageUrl="https://images.unsplash.com/photo-1620857321285-8f6fc6e23db9?auto=format&fit=crop&q=80&w=2000"
        ctaText="Shop All Men's Scents"
        ctaLink="/collections/men"
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
          viewAllLink="/collections/men"
        />
      )}

      {/* Secondary Banner - New Arrivals */}
      <div className="py-8">
        <HeroSection
          title="New Arrivals"
          subtitle="Elevate your style with our latest long-lasting masculine scent additions."
          imageUrl="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=2000"
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
          viewAllLink="/collections/men"
        />
      )}
    </div>
  );
}
