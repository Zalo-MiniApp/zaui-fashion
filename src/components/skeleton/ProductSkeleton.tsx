import 'react-loading-skeleton/dist/skeleton.css';
import Section from '@/components/Section';
import { ProductItemSkeleton } from '.';

interface ProductSkeletonProps {
  count?: number;
  showSection?: boolean;
}

export const ProductSkeleton = ({ count = 6, showSection = true }: ProductSkeletonProps) => {
  const content = (
    <div className="grid grid-cols-2 px-4 py-2 gap-4">
      {[...Array(count)].map((_, i) => (
        <ProductItemSkeleton key={i} />
      ))}
    </div>
  );

  if (!showSection) {
    return content;
  }

  return (
    <Section title={<div className="h-[18px] w-20 rounded-lg bg-skeleton animate-pulse" />}>
      {content}
    </Section>
  );
};
