import { FC, useEffect } from 'react';
import Section from '@/components/Section';
import TransitionLink from '@/components/TransitionLink';
import { ROUTES } from 'miniapp-core/src';
import {
  useHomeCategories,
  useFetchHomeCategories,
  useHomeCategoryLoading,
  useHomeCategoryFetched,
} from 'miniapp-core/src';
import { CategorySkeleton } from '@/components/skeleton';
import { useSetSelectedCategoryId } from 'miniapp-core/src';

export const HomeCategory: FC = () => {
  const categories = useHomeCategories();
  const isLoading = useHomeCategoryLoading();
  const isFetched = useHomeCategoryFetched();
  const fetchCategories = useFetchHomeCategories();
  const setSelectedCategoryId = useSetSelectedCategoryId();

  useEffect(() => {
    if (!isFetched) {
      fetchCategories();
    }
  }, [isFetched, fetchCategories]);

  if (isLoading) {
    return <CategorySkeleton />;
  }

  return (
    <Section title="Danh mục sản phẩm" viewMoreTo={ROUTES.products}>
      <div className="pt-2.5 pb-4 flex space-x-6 overflow-x-auto px-4 no-scrollbar">
        {categories.map((category) => (
          <TransitionLink
            key={category.id}
            className="flex flex-col items-center space-y-2 flex-none basis-[70px] overflow-hidden cursor-pointer"
            to={`${ROUTES.products}`}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            <img
              src={category.imageUrl}
              // className="w-[70px] h-[70px] object-cover rounded-full border-[0.5px] border-black/15" // Boder
              className="w-[70px] h-[70px] object-cover rounded-full"
              alt={category.name}
            />
            <div className="text-center text-sm w-full line-clamp-2 text-subtitle">
              {category.name}
            </div>
          </TransitionLink>
        ))}
      </div>
    </Section>
  );
};
