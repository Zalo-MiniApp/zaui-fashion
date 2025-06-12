import HorizontalDivider from '@/components/HorizontalDivider';
import { EmptyBoxIcon } from '@/components/Vectors';
import { useCart } from 'miniapp-core/src';
import {
  DeliveryCart,
  ApplyVoucher,
  CartSummary,
  PaymentMethod,
  PayWidget,
  CartProductList,
} from './components';
import Button from '@/components/Button';
import TransitionLink from '@/components/TransitionLink';
import { ROUTES } from 'miniapp-core/src';

export default function CartPage() {
  // Gọi auto-calculate hook nếu cần
  // useAutoCalculateOrder();

  const cart = useCart();

  if (!cart.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
        <EmptyBoxIcon />
        <div className="text-2xs text-inactive text-center">Không có sản phẩm trong giỏ hàng</div>
        <TransitionLink to={ROUTES.products} className="cursor-pointer">
          <Button className="text-white">Tiếp tục mua sắm</Button>
        </TransitionLink>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-section">
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        <DeliveryCart />
        <CartProductList />
        <ApplyVoucher />
        <PaymentMethod />
        <CartSummary />
      </div>
      <HorizontalDivider />
      <PayWidget />
    </div>
  );
}
