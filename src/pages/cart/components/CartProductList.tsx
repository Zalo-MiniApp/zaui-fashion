import Section2 from '@/components/Section2';
import { useCart } from 'miniapp-core/src';
import { CartItem } from 'miniapp-core/src';
import HorizontalDivider from '@/components/HorizontalDivider';
import { CartItemWidget } from '.';
import { FC } from 'react';

export const CartProductList: FC = () => {
  const cart = useCart();

  function getCartItemPrice(item: CartItem): number {
    const variant = item.selectedChildVariant || item.selectedVariant;
    const price = variant?.reducePrice ?? variant?.price;
    return price ?? item.product.reducePrice ?? item.product.price;
  }

  function getOriginalPrice(item: CartItem): number | undefined {
    const variant = item.selectedChildVariant || item.selectedVariant;
    return variant?.price ?? item.product.price;
  }

  return (
    <Section2
      // title={
      //   <div className="flex items-center space-x-2">
      //     <Icon icon="zi-calendar" />
      //     <div>
      //       <span className="font-normal text-sm">Chi tiết sản phẩm</span>{' '}
      //       {/* <span className="font-medium text-sm">Từ 16h, 20/1/2025</span> */}
      //     </div>
      //   </div>
      // }
      title={'Chi tiết sản phẩm'}
      className="flex-1 overflow-y-auto rounded-lg bg-white"
    >
      <div className="w-full">
        {cart.map((item) => (
          <CartItemWidget
            key={item.id}
            item={item}
            getCartItemPrice={getCartItemPrice}
            getOriginalPrice={getOriginalPrice}
          />
        ))}
      </div>
      <HorizontalDivider />
      <div className="flex items-center px-4 pt-3 pb-2 space-x-4">
        <div className="text-sm font-medium">Ghi chú</div>
        <input
          type="text"
          placeholder="Lưu ý cho người bán..."
          className="text-sm text-right flex-1 focus:outline-none"
        />
      </div>
    </Section2>
  );
};
