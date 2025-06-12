export function ProductItemSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="w-full aspect-square bg-skeleton animate-pulse rounded-t-lg" />
      <div className="py-2 space-y-0.5">
        <div className="h-[14px] w-1/5 bg-skeleton animate-pulse rounded-lg" />
        <div className="h-9 bg-skeleton animate-pulse rounded-lg" />
        <div className="h-[18px] w-1/2 bg-skeleton animate-pulse rounded-lg" />
        <div className="h-[14px] w-1/3 bg-skeleton animate-pulse rounded-lg" />
      </div>
    </div>
  );
}
