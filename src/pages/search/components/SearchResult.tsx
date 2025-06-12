import Section from '@/components/Section';
import ProductGrid from '@/components/ProductGrid';
import { EmptySearchResult } from '@/components/Empty';
import { useSearch } from 'miniapp-core/src';
import { SearchResultSkeleton } from '@/components/skeleton';

export function SearchResult() {
  const { searchResult, loading } = useSearch();

  if (loading) {
    return <SearchResultSkeleton />;
  }

  return (
    <div className="w-full h-full space-y-2 bg-background">
      <Section title={`Kết quả (${searchResult.length})`}>
        {searchResult.length ? <ProductGrid products={searchResult} /> : <EmptySearchResult />}
      </Section>
    </div>
  );
}
