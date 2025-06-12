import { FC, useEffect } from 'react';
import ProductGrid from '@/components/ProductGrid';
import Section from '@/components/Section';
import {
  useProducts,
  useProductsLoading,
  useAutoFetchProducts,
  useHasFetchedCurrentCategory,
} from 'miniapp-core/src';
import { ProductSkeleton } from '@/components/skeleton';

export const ProductList: FC = () => {
  const products = useProducts();
  const isLoading = useProductsLoading();
  const hasFetched = useHasFetchedCurrentCategory();
  const autoFetch = useAutoFetchProducts();

  useEffect(() => {
    if (!hasFetched) {
      autoFetch();
    }
  }, [hasFetched, autoFetch]);

  if (isLoading) {
    return <ProductSkeleton showSection={false} />;
  }

  return <ProductGrid products={products} />;
};
