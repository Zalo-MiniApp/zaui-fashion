import { FC, useEffect } from 'react';
import {
  useProductsCategories,
  useProductsCategoryLoading,
  useProductsCategoryFetched,
  useFetchProductsCategories,
  useSelectedCategoryId,
  useSetSelectedCategoryId,
} from 'miniapp-core/src';
import { ProductsCategorySkeleton } from '@/components/skeleton';
import clsx from 'clsx';

export const ProductsCategory: FC = () => {
  const categories = useProductsCategories();
  const isLoading = useProductsCategoryLoading();
  const isFetched = useProductsCategoryFetched();
  const fetchCategories = useFetchProductsCategories();

  const selectedCategoryId = useSelectedCategoryId();
  const setSelectedCategoryId = useSetSelectedCategoryId();

  useEffect(() => {
    if (!isFetched) {
      fetchCategories();
    }
  }, [isFetched, fetchCategories]);

  if (isLoading) {
    return <ProductsCategorySkeleton />;
  }

  return (
    <div className="px-3 py-2 overflow-x-auto flex space-x-2 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategoryId(category.id)}
          className={clsx(
            'h-12 flex-none p-1 pr-2 flex items-center space-x-1 border rounded-lg transition-colors duration-200',
            selectedCategoryId === category.id
              ? 'border-primary text-primary'
              : 'border-black/15 text-black',
          )}
        >
          <img
            src={category.imageUrl}
            alt={category.name}
            className={clsx(
              'w-10 h-10 object-cover bg-skeleton border rounded-lg transition-colors duration-200',
              selectedCategoryId === category.id ? 'border-primary' : 'border-black/15',
            )}
          />
          <p className="text-xs whitespace-nowrap">{category.name}</p>
        </button>
      ))}
    </div>
  );
};
