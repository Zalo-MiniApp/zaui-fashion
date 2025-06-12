import { FC, useEffect } from 'react';
import Section from '@/components/Section';
import {
  useNewsList,
  useFetchNewsList,
  useNewsListLoading,
  useNewsListFetched,
} from 'miniapp-core/src';
import { NewsSkeleton } from '@/components/skeleton';
import { NewsItem } from '@/components/NewsItem';

export default function NewsPage() {
  const news = useNewsList();
  const isLoading = useNewsListLoading();
  const isFetched = useNewsListFetched();
  const fetchProducts = useFetchNewsList();

  useEffect(() => {
    if (!isFetched) {
      fetchProducts();
    }
  }, [isFetched, fetchProducts]);

  if (isLoading) {
    return <NewsSkeleton />;
  }

  return (
    <div className="px-4 space-y-6 pb-4">
      {news.map((newsItem, i) => (
        <NewsItem key={i} news={newsItem} fullWidth />
      ))}
    </div>
  );
}
