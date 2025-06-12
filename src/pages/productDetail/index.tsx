import { useLocation, useParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { useProductDetail } from 'miniapp-core/src';
import {
  ProductImageSlider,
  ProductInfo,
  ProductDescription,
  RelatedProductDetail,
  ProductDetailActions,
  VariantPicker,
} from './components';
import { ImageViewer } from 'zmp-ui';
import { Variant } from 'miniapp-core/src';
import { AnimatedSlideUp } from '@/components/AnimatedSlideUp';

export default function ProductDetailPage() {
  // Lấy product id từ URL param
  const { id } = useParams<{ id: string }>();

  // Lấy thông tin location để dùng fallback khi dữ liệu API chưa kịp về
  const location = useLocation();

  // Hook lấy chi tiết sản phẩm theo id
  const { product, loading } = useProductDetail(id);

  // Dữ liệu fallback để preview khi chuyển trang nhanh,
  // dữ liệu API chưa kịp về hoặc đang load
  const fallback = useMemo(
    () => ({
      imagesUrl: location.state?.imagesUrl ?? [],
      name: location.state?.productName ?? '',
      price: location.state?.productPrice ?? 0,
      reducePrice: location.state?.reducePrice,
    }),
    [location.state],
  );

  // State lưu variant cha (ví dụ: màu)
  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(undefined);

  // State lưu variant con (ví dụ: size)
  const [selectedChildVariant, setSelectedChildVariant] = useState<Variant | undefined>(undefined);

  /**
   * Tính toán dữ liệu hiển thị sản phẩm, kết hợp:
   * - Dữ liệu API
   * - Fallback khi chưa có API
   * - Giá và variant được chọn (chọn cha, chọn con)
   */
  const productData = useMemo(() => {
    const imagesUrl = product?.imagesUrl ?? fallback.imagesUrl;
    const productName = product?.productName ?? fallback.name;

    // Giá gốc chưa giảm, ưu tiên lấy từ product rồi đến fallback
    let currentPrice = product?.price ?? fallback.price;

    // Giá giảm (nếu có), mặc định fallback hoặc 0
    let currentReducePrice = product?.reducePrice ?? fallback.reducePrice ?? 0;

    // Nếu có variant cha được chọn, override giá
    if (selectedVariant && typeof selectedVariant.price === 'number') {
      currentPrice = selectedVariant.price;
      currentReducePrice = selectedVariant.reducePrice ?? 0;
    }

    // Nếu có variant con được chọn, override giá (ưu tiên hơn variant cha)
    if (selectedChildVariant && typeof selectedChildVariant.price === 'number') {
      currentPrice = selectedChildVariant.price;
      currentReducePrice = selectedChildVariant.reducePrice ?? 0;
    }

    // Kiểm tra xem có giảm giá hay không
    const hasDiscount = currentReducePrice > 0 && currentReducePrice < currentPrice;

    // Giá hiển thị cuối cùng (giá giảm nếu có)
    const finalPrice = hasDiscount ? currentReducePrice : currentPrice;

    // Tính phần trăm giảm giá, làm tròn
    const discountPercent = hasDiscount
      ? 100 - Math.round((currentReducePrice * 100) / currentPrice)
      : 0;

    return {
      imagesUrl,
      productName,
      productPrice: currentPrice, // Giá gốc trước giảm
      reducePrice: currentReducePrice, // Giá sau giảm (nếu có)
      hasDiscount,
      finalPrice,
      discountPercent,
    };
  }, [product, fallback, selectedVariant, selectedChildVariant]);

  // State quản lý popup xem ảnh lớn
  const [visible, setVisible] = useState(false);

  // State lưu chỉ số ảnh đang xem trong popup
  const [activeIndex, setActiveIndex] = useState(0);

  // Khi product được tải xong, tự động set variant mặc định
  useEffect(() => {
    if (product?.variants?.length) {
      const initialParentVariant = product.variants[0];
      setSelectedVariant(initialParentVariant);

      if (initialParentVariant.childs?.length) {
        setSelectedChildVariant(initialParentVariant.childs[0]);
      } else {
        setSelectedChildVariant(undefined);
      }
    } else {
      // Nếu không có variant thì reset hết
      setSelectedVariant(undefined);
      setSelectedChildVariant(undefined);
    }
  }, [product]);

  // Khi chọn variant cha, cập nhật variant con tương ứng
  const handleParentVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
    if (variant.childs?.length) {
      setSelectedChildVariant(variant.childs[0]);
    } else {
      setSelectedChildVariant(undefined);
    }
  };

  // Biến kiểm tra có thể render UI chính của sản phẩm
  const shouldRenderProductUI = !loading && !!product;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Khu vực scroll chính chứa slider ảnh, info, variant, mô tả, sản phẩm liên quan */}
      <div className="flex-1 overflow-y-auto">
        {/* Slider ảnh sản phẩm */}
        <ProductImageSlider
          imagesUrl={productData.imagesUrl}
          productName={productData.productName}
          id={id || ''}
          onImageClick={(index) => {
            setActiveIndex(index);
            setVisible(true); // Mở popup xem ảnh lớn khi click ảnh nhỏ
          }}
        />

        {/* Thông tin sản phẩm (giá, tên, nút chia sẻ) */}
        <div className="w-full p-4 pb-2 space-y-4">
          <ProductInfo
            product={product}
            loading={loading}
            finalPrice={productData.finalPrice}
            productPrice={productData.productPrice}
            hasDiscount={productData.hasDiscount}
            discountPercent={productData.discountPercent}
            productName={productData.productName}
          />
        </div>

        {/* Chỉ render phần variant, mô tả, liên quan khi dữ liệu đã load xong */}
        {shouldRenderProductUI && product && (
          <>
            {/* Variant cha (ví dụ: màu) */}
            {product.variants && product.variants.length > 0 && (
              <VariantPicker<Variant>
                title="Chọn phân loại"
                variants={product.variants}
                value={selectedVariant!}
                onChange={handleParentVariantChange}
              />
            )}

            {/* Divider giữa variant cha và variant con */}
            {product.variants &&
              product.variants.length > 0 &&
              selectedVariant?.childs &&
              selectedVariant.childs.length > 0 && (
                <div className="h-[0.5px] bg-black/10 mx-4 my-2" />
              )}

            {/* Variant con (ví dụ: size) */}
            {selectedVariant?.childs && selectedVariant.childs.length > 0 && (
              <VariantPicker<Variant>
                title="Chọn kích thước"
                variants={selectedVariant.childs}
                value={selectedChildVariant!}
                onChange={setSelectedChildVariant}
              />
            )}

            {/* Divider giữa thông tin và mô tả */}
            <div className="bg-section h-2 w-full" />

            {/* Mô tả sản phẩm */}
            <ProductDescription description={product.description} />

            {/* Divider giữa mô tả và sản phẩm liên quan */}
            <div className="bg-section h-2 w-full" />

            {/* Sản phẩm liên quan dựa trên category đầu tiên */}
            <RelatedProductDetail categoryId={product.categoriesId?.[0]} />
          </>
        )}
      </div>

      {/* Nút hành động đặt hàng, thêm giỏ, ... */}
      {!loading && product && (
        <AnimatedSlideUp>
          <ProductDetailActions
            product={product}
            selectedVariant={selectedVariant}
            selectedChildVariant={selectedChildVariant}
          />
        </AnimatedSlideUp>
      )}
      {/* Popup xem ảnh lớn */}
      <ImageViewer
        onClose={() => setVisible(false)}
        activeIndex={activeIndex}
        images={productData.imagesUrl.map((src) => ({
          src,
          productName: productData.productName,
        }))}
        visible={visible}
      />
    </div>
  );
}
