import { SearchResult, RecommendedProducts } from './components';
import { useSearch } from 'miniapp-core/src';

export default function SearchPage() {
  const { keyword } = useSearch();

  if (keyword && keyword.trim().length > 0) {
    return <SearchResult />;
  }

  return <RecommendedProducts />;
}
