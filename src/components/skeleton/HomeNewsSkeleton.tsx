import Section from '@/components/Section';

interface HomeNewsSkeletonProps {
  count?: number;
  showSection?: boolean;
}

export const HomeNewsSkeleton = ({ count = 4, showSection = true }: HomeNewsSkeletonProps) => {
  const content = (
    <div className="overflow-auto no-scrollbar flex space-x-4 pb-4">
      {[...Array(count)].map((_, i) => (
        <HomeNewsItemSkeleton key={i} className="first:ml-4 last:mr-4" />
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

export const HomeNewsItemSkeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex-shrink-0 w-[300px] ${className}`}>
      <div className="relative h-44 bg-skeleton animate-pulse rounded-lg" />
      <div className="mt-2 space-y-2">
        <div className="h-[16px] w-3/4 bg-skeleton animate-pulse rounded" />
        <div className="h-[16px] w-1/2 bg-skeleton animate-pulse rounded" />
      </div>
    </div>
  );
};

export const QuickActionsSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="py-6 grid grid-rows-1 grid-cols-4 gap-4 bg-white">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center flex-col flex-1">
          <div className="bg-skeleton animate-pulse rounded-2xl w-12 h-12 flex items-center justify-center" />
          <div className="mt-1 h-[12px] w-10 bg-skeleton animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
};
