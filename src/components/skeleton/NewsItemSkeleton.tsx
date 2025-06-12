export const NewsItemSkeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative h-44 bg-skeleton animate-pulse rounded-lg" />
      <div className="mt-2 space-y-2">
        <div className="h-[16px] w-3/4 bg-skeleton animate-pulse rounded" />
        <div className="h-[16px] w-1/2 bg-skeleton animate-pulse rounded" />
      </div>
    </div>
  );
};
