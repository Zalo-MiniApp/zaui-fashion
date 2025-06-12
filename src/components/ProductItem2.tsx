import { Product, Variant } from 'miniapp-core/src';
import { formatPrice } from 'miniapp-core/src';
import TransitionLink from '@/components/TransitionLink';
import { useState, useMemo, useCallback } from 'react';
import { Button, Icon } from 'zmp-ui';
import { useAddToCart } from 'miniapp-core/src';
import QuantityInput from '@/components/QuantityInput';
import { getCSSVariableValue, getPriceAndReducePrice } from 'miniapp-core/src';
import { ShoppingCartAdd01Icon } from 'hugeicons-react';
import { ImageWithLoader } from '@/components/ImageWithLoader';
export interface ProductItem2Props {
  product: Product;
  replace?: boolean;
}

export default function ProductItem2(props: ProductItem2Props) {
  const { product, replace } = props;

  // State để theo dõi sản phẩm có đang được chọn (clicked) hay không,
  // để sử dụng trong hiệu ứng chuyển đổi hình ảnh (viewTransitionName)
  const [selected, setSelected] = useState(false);

  // Lấy variant đầu tiên của sản phẩm, nếu có
  const firstVariant = product.variants?.[0];
  // Lấy child variant đầu tiên của variant trên, nếu có
  const firstChildVariant = firstVariant?.childs?.[0];

  // Lấy giá theo thứ tự ưu tiên như bạn yêu cầu
  const { productPrice, reducePrice, stock } = getPriceAndReducePrice(
    firstChildVariant,
    firstVariant,
    product,
  );

  // Lấy tên các category (danh mục) của sản phẩm, nối thành chuỗi
  const categoryNames = useMemo(
    () => product.categories?.map((c) => c.name).join(', ') ?? '',
    [product.categories],
  );

  // Lấy tên sản phẩm hoặc rỗng nếu không có
  const productName = useMemo(() => product.productName ?? '', [product.productName]);

  // Lấy ảnh đại diện chính, hoặc rỗng nếu không có
  const imageUrl = useMemo(() => product.imageUrl ?? '', [product.imageUrl]);

  // Lấy danh sách ảnh, nếu không có dùng ảnh đại diện chính làm fallback
  const imagesUrl = useMemo(() => product.imagesUrl ?? [imageUrl], [product.imagesUrl, imageUrl]);

  // Số lượng bán và rating
  const totalSales = product.totalSales ?? '';
  const reviewAvg = product.reviewAvg ?? '';

  // Hook thêm sản phẩm vào giỏ, dựa trên sản phẩm và variants được chọn
  const { addToCart, cartQuantity } = useAddToCart(product, firstVariant, firstChildVariant);

  // Lấy màu chính (primary color) từ CSS variables để dùng trong style nút
  const primaryColor = useMemo(() => getCSSVariableValue('--primary'), []);

  // Hàm thêm số lượng sản phẩm vào giỏ hàng
  // Sử dụng useCallback để tránh tạo lại hàm khi không cần thiết
  const handleAddToCart = useCallback(
    (qty: number | ((oldQty: number) => number)) => {
      addToCart(qty, { toast: true }); // Có hiển thị toast thông báo
    },
    [addToCart],
  );

  // Xử lý click nút "Thêm vào giỏ"
  // Ngăn không cho sự kiện click lan ra phần tử cha (tránh trigger onClick ở div ngoài)
  const onAddToCartClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleAddToCart(1); // Thêm 1 sản phẩm
    },
    [handleAddToCart],
  );

  // Xử lý click vào sản phẩm, set trạng thái selected để kích hoạt animation chuyển ảnh
  const onProductClick = useCallback(() => {
    setSelected(true);
  }, []);

  return (
    <div
      className="flex flex-col cursor-pointer group bg-white rounded-xl shadow-[0_10px_24px_#0D0D0D17] h-full"
      onClick={onProductClick}
    >
      {/* Link chuyển trang sang chi tiết sản phẩm, truyền state để dùng animation */}
      <TransitionLink
        to={`/product/${product.id}`}
        replace={replace}
        className="p-2 pb-0 flex-1"
        state={{
          productName,
          imagesUrl,
          productPrice,
          reducePrice,
        }}
        onClick={onProductClick}
      >
        {() => (
          <>
            {/* Ảnh sản phẩm với hiệu ứng chuyển đổi nếu được chọn */}
            <ImageWithLoader
              src={imageUrl}
              className="w-full aspect-square object-cover rounded-lg"
              style={{
                viewTransitionName: selected ? `product-image-${product.id}` : undefined,
              }}
              alt={productName}
            />

            {/* Thông tin sản phẩm */}
            <div className="pt-2 pb-1.5">
              {/* Tên danh mục */}
              <div className="flex items-center justify-between gap-1">
                <div className="text-3xs text-subtitle truncate font-light min-w-0">
                  {categoryNames}
                </div>

                {reviewAvg != null && reviewAvg != '' ? (
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-xs font-normal mr-1">{reviewAvg}</span>
                    <Icon size={16} icon="zi-star-solid" className="text-yellow-300" />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              {/* Tên sản phẩm, giới hạn 2 dòng */}
              <div className="pt-1 pb-0.5">
                <div className="text-xs h-9 line-clamp-2">{productName}</div>
              </div>

              {/* Hiển thị giá nếu có giá giảm */}
              {reducePrice != null && reducePrice > 0 && reducePrice < productPrice ? (
                <>
                  <div className="mt-0.5 text-sm font-bold text-primary truncate">
                    {formatPrice(reducePrice)}
                  </div>
                  <div className="text-3xs space-x-0.5 truncate">
                    <span className="text-subtitle line-through">{formatPrice(productPrice)}</span>
                    <span className="text-danger">
                      -{100 - Math.round((reducePrice * 100) / productPrice)}%
                    </span>
                  </div>
                </>
              ) : (
                <div className="mt-0.5 text-sm font-bold text-primary truncate">
                  {formatPrice(productPrice)}
                </div>
              )}
            </div>
          </>
        )}
      </TransitionLink>

      {/* Phần nút Thêm vào giỏ hoặc quantity input nếu đã có sản phẩm trong giỏ */}
      <div className="p-2 mt-auto flex items-center justify-between">
        {totalSales ? (
          <span className="text-3xs w-[110px] font-light mr-1 truncate">Đã bán {totalSales}</span>
        ) : (
          <div></div>
        )}

        {/* Bên phải: Nút thêm vào giỏ hoặc QuantityInput */}
        {cartQuantity === 0 ? (
          <Button
            variant="tertiary"
            size="small"
            type="neutral"
            style={{
              color: primaryColor,
              borderColor: primaryColor,
              borderWidth: 1,
              borderStyle: 'solid',
            }}
            onClick={onAddToCartClick}
          >
            <ShoppingCartAdd01Icon className="w-4 h-4" />
          </Button>
        ) : (
          <QuantityInput value={cartQuantity} onChange={handleAddToCart} />
        )}
      </div>
    </div>
  );
}
