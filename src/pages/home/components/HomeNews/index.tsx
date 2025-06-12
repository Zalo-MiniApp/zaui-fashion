import { FC, useEffect } from 'react';
import Section from '@/components/Section';
import {
  useHomeNews,
  useFetchHomeNews,
  useHomeNewsLoading,
  useHomeNewsFetched,
} from 'miniapp-core/src';
import { HomeNewsSkeleton } from '@/components/skeleton';
import { NewsItem } from '@/components/NewsItem';
import { ROUTES } from 'miniapp-core/src';

export const HomeNews: FC = () => {
  const news = useHomeNews();
  const isLoading = useHomeNewsLoading();
  const isFetched = useHomeNewsFetched();
  const fetchProducts = useFetchHomeNews();

  useEffect(() => {
    if (!isFetched) {
      fetchProducts();
    }
  }, [isFetched, fetchProducts]);

  if (isLoading) {
    return <HomeNewsSkeleton />;
  }

  return (
    <Section title="Tin tức nổi bật" viewMoreTo={ROUTES.news}>
      <div className="overflow-auto no-scrollbar flex space-x-4 pb-4 pt-2">
        {news.map((newsItem, i) => (
          <NewsItem key={i} news={newsItem} className="first:ml-4 last:mr-4" />
        ))}
      </div>
    </Section>
  );
};
