import { useParams } from 'react-router-dom';
import ProductGrid from '@/components/ProductGrid';
import Section from '@/components/Section';
import { useProductsByCategory } from 'miniapp-core/src';
import { ProductSkeleton } from '@/components/skeleton/ProductSkeleton';
import { ROUTES } from 'miniapp-core/src';

interface RelatedProductDetailProps {
  categoryId?: number;
}

export const RelatedProductDetail = ({ categoryId }: RelatedProductDetailProps) => {
  const { id: productIdFromParam } = useParams();
  const currentProductId = parseInt(productIdFromParam ?? '', 10);

  if (!categoryId) return null;

  const { products, isLoading, error } = useProductsByCategory(categoryId.toString());

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  // Lọc sản phẩm trừ product đang xem
  const filteredProducts = products.filter((p) => p.id !== currentProductId);

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <Section title="Sản phẩm khác" viewMoreTo={ROUTES.products}>
      <ProductGrid products={filteredProducts} replace />
    </Section>
  );
};
