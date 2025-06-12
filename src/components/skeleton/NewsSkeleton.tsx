import Section from '@/components/Section';
import { NewsItemSkeleton } from '@/components/skeleton';

interface NewsSkeletonProps {
  count?: number;
  showSection?: boolean;
}

export const NewsSkeleton = ({ count = 4, showSection = true }: NewsSkeletonProps) => {
  const content = (
    <div className="flex flex-col space-y-4 px-4 py-2">
      {[...Array(count)].map((_, i) => (
        <NewsItemSkeleton key={i} />
      ))}
    </div>
  );

  if (!showSection) return content;

  return (
    <Section title={<div className="h-[18px] w-32 bg-skeleton animate-pulse rounded-lg" />}>
      {content}
    </Section>
  );
};
