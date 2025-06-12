import 'react-loading-skeleton/dist/skeleton.css';
import Section from '@/components/Section';
import { ProductItemSkeleton } from '@/components/skeleton';

export const ProductDetailSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="space-y-4 py-2">
      {/* Title Skeleton */}
      <div className="h-[24px] w-2/3 bg-skeleton animate-pulse rounded-lg" />

      {/* Description Skeleton */}
      <div className="space-y-2">
        <div className="h-[14px] w-full bg-skeleton animate-pulse rounded" />
        <div className="h-[14px] w-4/5 bg-skeleton animate-pulse rounded" />
        <div className="h-[14px] w-3/5 bg-skeleton animate-pulse rounded" />
      </div>

      {/* Section with product grid */}
      <Section title={<div className="h-[18px] w-20 rounded-lg bg-skeleton animate-pulse" />}>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((key) => (
            <ProductItemSkeleton key={key} />
          ))}
        </div>
      </Section>
    </div>
  );
};

// export function ProductItemSkeleton() {
//   return (
//     <div className="flex flex-col">
//       <div className="w-full aspect-square bg-skeleton animate-pulse rounded-t-lg" />
//       <div className="py-2 space-y-0.5">
//         <div className="h-[14px] w-1/5 bg-skeleton animate-pulse rounded-lg" />
//         <div className="h-9 bg-skeleton animate-pulse rounded-lg" />
//         <div className="h-[18px] w-1/2 bg-skeleton animate-pulse rounded-lg" />
//         <div className="h-[14px] w-1/3 bg-skeleton animate-pulse rounded-lg" />
//       </div>
//     </div>
//   );
// }
