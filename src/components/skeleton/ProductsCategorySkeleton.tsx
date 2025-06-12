import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProductsCategorySkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="px-3 py-2 overflow-x-auto flex space-x-2">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="h-12 flex-none flex items-center space-x-1 border rounded-lg border-black/15"
          // Bỏ p-1 pr-2 thử xem
        >
          <Skeleton
            circle={false}
            width={40}
            height={40}
            containerClassName="rounded-lg ml-1 mb-1"
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
          />
          <Skeleton width={40} height={14} borderRadius={6} />
        </div>
      ))}
    </div>
  );
};
