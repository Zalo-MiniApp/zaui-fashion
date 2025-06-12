import Section from '../Section';
import HorizontalDivider from '../HorizontalDivider';
import { ProductItemSkeleton } from '.';
import { HTMLAttributes } from 'react';
import Skeleton from 'react-loading-skeleton';

export function CarrierSkeletonList() {
  return (
    <Section title={<div className="h-[18px] w-36 rounded-lg bg-skeleton animate-pulse" />}>
      <div className="grid grid-cols-2 px-4 py-2 gap-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="h-12 rounded-full bg-skeleton animate-pulse flex items-center space-x-2 px-4"
          >
            <div className="h-6 w-6 bg-white/50 rounded-full" />
            <div className="h-4 w-24 bg-white/50 rounded-md" />
          </div>
        ))}{' '}
      </div>
      <HorizontalDivider />
      <div className="py-2 space-y-0.5 px-4">
        <div className="h-[8px] w-1/5 bg-skeleton animate-pulse rounded-lg" />
        <div className="h-9 bg-skeleton animate-pulse rounded-lg" />
        <div className="h-[18px] w-1/2 bg-skeleton animate-pulse rounded-lg" />
        <div className="h-[14px] w-1/3 bg-skeleton animate-pulse rounded-lg" />
      </div>
    </Section>
  );
}

export function SearchResultSkeleton() {
  return (
    <Section title="Kết quả">
      <ProductGridSkeleton />
    </Section>
  );
}

export function ProductGridSkeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={'grid grid-cols-2 px-4 pt-2 pb-8 gap-4 '.concat(className ?? '')} {...props}>
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductItemSkeleton key={i} />
      ))}
    </div>
  );
}

export function DepartmentSkeleton() {
  return (
    <button className="flex items-center space-x-4 p-4 pr-2 bg-section rounded-lg text-left">
      <div className="h-14 w-14 rounded-lg bg-skeleton animate-pulse" />
      <div className="flex-1 space-y-0.5">
        <div className="bg-skeleton animate-pulse rounded-lg inline-block text-transparent text-sm">
          Lorem, ipsum dolor
        </div>
        <div className="bg-skeleton animate-pulse rounded-lg inline-block text-transparent text-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo facilis
        </div>
        <div className="bg-primary opacity-25 animate-pulse rounded-lg inline-block text-transparent text-xs">
          4,3 km
        </div>
      </div>
    </button>
  );
}

export const BannerSkeleton = ({ isHorizontal = true }: { isHorizontal?: boolean }) => {
  return (
    <div className="w-full rounded overflow-hidden">
      <Skeleton
        height={isHorizontal ? undefined : 300}
        baseColor="#e0e0e0"
        highlightColor="#f5f5f5"
        duration={1.5}
        style={{
          aspectRatio: isHorizontal ? '16/9' : '3/4',
        }}
      />
    </div>
  );
};

export const CategorySkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <Section title={<div className="h-[18px] w-36 rounded-lg bg-skeleton animate-pulse" />}>
      <div className="pt-2.5 pb-4 flex space-x-6 overflow-x-auto px-4">
        {[1, 2, 3, 4].map((key) => (
          <div
            key={key}
            className="flex flex-col items-center space-y-2 flex-none basis-[70px] overflow-hidden cursor-pointer"
          >
            <div className="w-[70px] h-[70px] object-cover rounded-full border-[0.5px] border-black/15 bg-skeleton animate-pulse" />
            <div className="w-full h-9">
              <div className="w-full h-[18px] rounded-lg bg-skeleton animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export const TotalPriceSkeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`space-y-1 flex-1 ${className}`}>
      <div className="h-[14px] w-24 bg-skeleton animate-pulse rounded" />
      <div className="h-[20px] w-32 bg-skeleton animate-pulse rounded" />
    </div>
  );
};

export const SummaryPriceSkeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="flex justify-between items-center">
          <div className="h-4 w-24 bg-skeleton animate-pulse rounded" />
          <div className="h-5 w-20 bg-skeleton animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
};
