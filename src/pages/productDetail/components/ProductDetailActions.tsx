import { Product, Variant } from 'miniapp-core/src';
import { useAddToCart } from 'miniapp-core/src';
import { ROUTES } from 'miniapp-core/src';
import { useNavigate } from 'react-router-dom';
import { Button } from 'zmp-ui';
import QuantityInput from '@/components/QuantityInput';

interface ProductDetailActionsProps {
  product: Product;
  selectedVariant?: Variant;
  selectedChildVariant?: Variant;
}

export function ProductDetailActions({
  product,
  selectedVariant,
  selectedChildVariant,
}: ProductDetailActionsProps) {
  // Hook custom để thêm sản phẩm vào giỏ và lấy số lượng hiện có trong giỏ
  const { addToCart, cartQuantity } = useAddToCart(product, selectedVariant, selectedChildVariant);

  // Dùng để chuyển hướng sang trang giỏ hàng
  const navigate = useNavigate();

  /**
   * Xử lý thêm sản phẩm vào giỏ hàng với số lượng truyền vào
   * Có thể nhận số lượng mới hoặc hàm cập nhật số lượng cũ
   * Toast hiển thị khi thêm thành công
   */
  const handleAddToCart = (qty: number | ((oldQuantity: number) => number)) => {
    addToCart(qty, { toast: true });
  };

  /**
   * Xử lý khi người dùng bấm "Mua ngay"
   * Nếu giỏ đang trống, thêm 1 sản phẩm trước
   * Sau đó điều hướng đến trang giỏ hàng
   */
  const handleBuyNow = () => {
    if (cartQuantity === 0) {
      // Nếu chưa có sản phẩm trong giỏ thì thêm 1
      addToCart(1);
    }
    // Điều hướng sang trang giỏ hàng kèm hiệu ứng chuyển cảnh nếu có
    navigate(ROUTES.cart, { viewTransition: true });
  };

  return (
    <div className="flex-none grid grid-cols-2 gap-2 py-3 px-4 bg-white">
      {/* Nếu chưa có sản phẩm trong giỏ thì hiện nút "Thêm vào giỏ" */}
      {cartQuantity === 0 ? (
        <Button variant="tertiary" onClick={() => handleAddToCart(1)}>
          Thêm vào giỏ
        </Button>
      ) : (
        // Nếu có sản phẩm rồi thì hiển thị bộ chọn số lượng
        <div className="h-full flex pr-8">
          {/* QuantityInput gọi trực tiếp addToCart để cập nhật số lượng */}
          <QuantityInput value={cartQuantity} onChange={addToCart} />
        </div>
      )}

      {/* Nút "Mua ngay" luôn hiện, hiển thị số lượng hiện có */}
      <Button onClick={handleBuyNow}>Mua ngay</Button>
    </div>
  );
}
