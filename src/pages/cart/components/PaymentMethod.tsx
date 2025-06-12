import { PaymentMethodIcon } from '@/components/Vectors';
import { Icon } from 'zmp-ui';
import { FC } from 'react';
import Section2 from '@/components/Section2';
import { Payment } from 'zmp-sdk';
import { usePaymentMethod, useSetPaymentMethod } from 'miniapp-core/src';

export const PaymentMethod: FC = () => {
  const paymentMethod = usePaymentMethod();
  const setPaymentMethod = useSetPaymentMethod();

  const handleSelectPaymentMethod = () => {
    Payment.selectPaymentMethod({
      success: (data) => {
        // Lựa chọn phương thức thành công
        const { logo, displayName, method } = data;
        console.log('Selected payment method:', data);
        setPaymentMethod({
          id: 0,
          name: displayName || '',
          code: method || '',
          status: 1,
          icon: logo || '',
        });
      },
      fail: (err) => {
        console.log(err);
      },
    });
  };

  const logo = paymentMethod?.icon || '';
  return (
    <Section2 title="Hình thức thanh toán" className="rounded-lg bg-white">
      <button
        className="w-full flex justify-between items-center py-2 px-4 space-x-2 cursor-pointer"
        onClick={handleSelectPaymentMethod}
      >
        <div className="flex items-center space-x-2">
          {logo ? (
            <img src={logo} alt="Payment Method Icon" className="w-6 h-6 rounded-full" />
          ) : (
            <PaymentMethodIcon />
          )}
          <div className="text-sm flex-1">{paymentMethod?.name || 'Vui lòng chọn'}</div>
        </div>
        <div className="flex items-center space-x-1">
          {/* <div className="text-sm font-medium">Chọn</div> */}
          <Icon icon="zi-chevron-right" />
        </div>
      </button>
    </Section2>
  );
};
