import { VoucherIcon } from '@/components/Vectors';
import { Icon } from 'zmp-ui';
import { FC } from 'react';
import Section2 from '@/components/Section2';
import { formatPrice } from 'miniapp-core/src';
import HorizontalDivider from '@/components/HorizontalDivider';
import { useCalcOrderResult } from 'miniapp-core/src';
import { useCalcOrderLoading, useCalcOrderError } from 'miniapp-core/src';
import { SummaryPriceSkeleton } from '@/components/skeleton';

export const CartSummary: FC = () => {
  const calcOrderResult = useCalcOrderResult();
  const isCalculating = useCalcOrderLoading();
  // const error = useCalcOrderError();
  // const isError = !!error;
  const isLoading = isCalculating;

  const rows = [
    { label: 'Tạm tính', value: calcOrderResult?.totalPrice ?? 0 },
    { label: 'Phí vận chuyển', value: calcOrderResult?.shippingFee ?? 0 },
    {
      label: `Giảm giá thành viên (${calcOrderResult?.discountPercent ?? '0%'})`,
      value: calcOrderResult?.memberDiscountPrice ?? 0,
      show: (calcOrderResult?.discountPercent ?? '0%') !== '0%',
    },
    { label: 'Giảm giá voucher', value: calcOrderResult?.voucherDiscountPrice ?? 0 },
  ];

  return (
    <Section2 title="Thanh toán" className="rounded-lg bg-white pb-2">
      <div className="px-4 py-2 space-y-4">
        {isLoading ? (
          // Show skeleton khi loading hoặc lỗi
          <SummaryPriceSkeleton />
        ) : (
          <table className="table w-full text-sm [&_th]:text-left [&_th]:text-xs [&_th]:text-inactive [&_th]:font-medium [&_td]:text-right">
            <tbody>
              {rows
                .filter((row) => row.value !== 0 && (row.show ?? true))
                .map((row, index) => (
                  <tr key={index}>
                    <th>{row.label}</th>
                    <td>{formatPrice(row.value)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </Section2>
  );
};
