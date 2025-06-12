import { Button } from 'zmp-ui';
import { FC } from 'react';
import { formatPrice } from 'miniapp-core/src';
import { CustomerSupportIcon } from '@/components/Vectors';
import {
  useCalcOrderLoading,
  useCalcOrderError,
  useCalcOrderResult,
  usePaymentMethod,
  useIsCodSelected,
} from 'miniapp-core/src';
import { useCurrentSelectedAddress } from 'miniapp-core/src';
import { TotalPriceSkeleton } from '@/components/skeleton';
import { useManualOrderCreator } from 'miniapp-core/src';
import { CheckoutSDK, events, EventName } from 'zmp-sdk/apis';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const PayWidget: FC = () => {
  const isCalculating = useCalcOrderLoading();
  const paymentMethod = usePaymentMethod();
  const calcOrderResult = useCalcOrderResult();
  const error = useCalcOrderError();
  const navigate = useNavigate();

  const isError = !!error;
  const hasPaymentMethod = !!paymentMethod;
  const isLoading = isCalculating;

  const isCodSelected = useIsCodSelected();
  const currentAddress = useCurrentSelectedAddress();
  const hasAddressId = !isCodSelected || !!currentAddress?.id;

  const canCheckout = hasPaymentMethod && !isLoading && hasAddressId && !isError;

  const finalPrice = calcOrderResult?.finalPrice || 0;

  const { handleCreateOrder } = useManualOrderCreator();

  const onSubmit = async () => {
    try {
      await handleCreateOrder();
      // events.once(EventName.PaymentDone, async (data) => {
      //   const result = await CheckoutSDK.checkTransaction({ data });
      //   console.log('Payment result:', result);

      //   if (result.resultCode >= 0) {
      //     // setCart([]);
      //     // refreshNewOrders();
      //     navigate('/delivery', {
      //       viewTransition: true,
      //     });
      //   }

      //   switch (result.resultCode) {
      //     case 1:
      //       toast.success('Thanh toán thành công. Cảm ơn bạn đã mua hàng!', {
      //         icon: '🎉',
      //         duration: 5000,
      //       });
      //       break;
      //     case 0:
      //       toast('Giao dịch đang xử lý. Cảm ơn bạn đã mua hàng!', {
      //         icon: '⏳',
      //         duration: 5000,
      //       });
      //       break;
      //     case -1:
      //       toast.error('Giao dịch không thành công. Vui lòng thử lại sau.');
      //       break;
      //     case -2:
      //       toast.error('Vui lòng chọn phương thức thanh toán!');
      //       break;
      //     default:
      //       // Giao dịch không hợp lệ, kiểm tra `result.err` & `result.msg` để biết thêm thông tin
      //       console.error(result);
      //       toast.error(result.msg);
      //   }
      // });
    } catch (e) {
      console.error('Error creating order:', e);
    }
  };

  return (
    <div className="flex-none flex items-center py-3 px-4 space-x-2 bg-white">
      {isLoading ? (
        <TotalPriceSkeleton className="w-24 h-12" />
      ) : (
        <div className="space-y-1 flex-1">
          <div className="text-xs text-subtitle">Tổng thanh toán</div>
          <div className="text-[18px] font-medium text-primary">{formatPrice(finalPrice)}</div>
        </div>
      )}
      <div className="w-12 h-12 bg-section justify-center items-center flex text-white rounded-md">
        <CustomerSupportIcon />
      </div>
      <Button disabled={!canCheckout} onClick={onSubmit}>
        Thanh toán
      </Button>
    </div>
  );
};
