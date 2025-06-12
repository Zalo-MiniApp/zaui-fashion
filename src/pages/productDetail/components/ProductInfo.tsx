import { formatPrice } from 'miniapp-core/src';
import { ShareButton } from '@/components/ShareButton';
import { ProductDetailSkeleton } from '@/components/skeleton';

interface ProductInfoProps {
  product: any;
  loading: boolean;
  finalPrice: number;
  productPrice: number;
  hasDiscount: boolean;
  discountPercent: number;
  productName: string;
}

export function ProductInfo({
  product,
  loading,
  finalPrice,
  productPrice,
  hasDiscount,
  discountPercent,
  productName,
}: ProductInfoProps) {
  return (
    <>
      <div>
        <div className="text-xl font-bold text-primary">{formatPrice(finalPrice)}</div>
        {hasDiscount && (
          <div className="text-3xs space-x-0.5 truncate">
            <span className="text-subtitle line-through">{formatPrice(productPrice)}</span>
            <span className="text-danger">-{discountPercent}%</span>
          </div>
        )}
        <div className="text-xm mt-1">{productName}</div>
        {loading && <ProductDetailSkeleton />}
        {!loading && product && (
          <div className="pt-2">
            <ShareButton
              title={product.productName}
              thumbnail={product.imageUrl}
              path={`/product/${product.id}`}
            />
          </div>
        )}
      </div>
    </>
  );
}
