import { FC, useEffect } from 'react';
import ProductGrid from '@/components/ProductGrid';
import Section from '@/components/Section';
import {
  useHomeProducts,
  useFetchHomeProducts,
  useHomeProductLoading,
  useHomeProductFetched,
} from 'miniapp-core/src';
import { ProductSkeleton } from '@/components/skeleton/ProductSkeleton';

export const HomeProducts: FC = () => {
  const products = useHomeProducts();
  const isLoading = useHomeProductLoading();
  const isFetched = useHomeProductFetched();
  const fetchProducts = useFetchHomeProducts();

  useEffect(() => {
    if (!isFetched) {
      fetchProducts();
    }
  }, [isFetched, fetchProducts]);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  return (
    <Section title="Sản phẩm nổi bật" viewMoreTo="/flash-sales">
      <ProductGrid products={products} />
    </Section>
  );
};
