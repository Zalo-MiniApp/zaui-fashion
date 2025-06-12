import React from 'react';
import { CartItem as CartItemType } from 'miniapp-core/src';
import { Icon } from 'zmp-ui';
import { useAddToCart } from 'miniapp-core/src';
import QuantityInput from '@/components/QuantityInput';
import { SwipeToDelete } from '@/components/SwipeToDelete';
import { formatPrice } from 'miniapp-core/src';
import { useManualOrderCalculator } from 'miniapp-core/src';
interface CartItemProps {
  item: CartItemType;
  getCartItemPrice: (item: CartItemType) => number;
  getOriginalPrice: (item: CartItemType) => number | undefined;
}

export const CartItemWidget: React.FC<CartItemProps> = ({
  item,
  getCartItemPrice,
  getOriginalPrice,
}) => {
  const { product, selectedVariant, selectedChildVariant } = item;
  const { addToCart, cartQuantity } = useAddToCart(product, selectedVariant, selectedChildVariant);
  const { calculate } = useManualOrderCalculator();

  const handleAddToCart = (qty: number | ((oldQty: number) => number)) => {
    addToCart(qty);
    calculate();
  };

  return (
    <SwipeToDelete onDelete={() => addToCart(0)}>
      <div className="relative after:border-b-[0.5px] after:border-black/10 after:absolute after:left-[88px] after:right-0 after:bottom-0 last:after:hidden">
        <div className="bg-white p-4 flex items-center space-x-4 relative">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="flex-1 space-y-1">
            <div className="text-sm font-medium">{product.productName}</div>

            {/* Tên variant */}
            {(selectedVariant || selectedChildVariant) && (
              <div className="text-xs text-gray-500">
                {selectedVariant?.name}
                {selectedChildVariant ? ` / ${selectedChildVariant.name}` : ''}
              </div>
            )}

            <div className="flex flex-col">
              <div className="text-sm font-bold text-red-500">
                {/* {getCartItemPrice(item).toLocaleString()}₫ */}
                {formatPrice(getCartItemPrice(item))}
              </div>
              {getOriginalPrice(item) !== getCartItemPrice(item) && (
                <div className="line-through text-subtitle text-4xs">
                  {formatPrice(getOriginalPrice(item) || 0)}
                </div>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="p-2 mt-auto">
            {cartQuantity === 0 ? (
              <div className="text-sm font-medium text-gray-800">x{cartQuantity}</div>
            ) : (
              <QuantityInput value={cartQuantity} onChange={handleAddToCart} />
            )}
          </div>
        </div>
      </div>
    </SwipeToDelete>
  );
};
