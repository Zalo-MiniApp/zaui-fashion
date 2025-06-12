import { VoucherIcon } from '@/components/Vectors';
import { Icon } from 'zmp-ui';
import { FC } from 'react';
import Section2 from '@/components/Section2';
import { ROUTES } from 'miniapp-core/src';
import { useAuth } from 'miniapp-core/src';
import { useNavigate } from 'react-router-dom';
import { useCurrentVoucherCode } from 'miniapp-core/src';

export const ApplyVoucher: FC = () => {
  const { forceLoginAction } = useAuth();
  const navigate = useNavigate();
  const currentVoucherCode = useCurrentVoucherCode();

  const handleNavigate = () => {
    forceLoginAction(
      () => Promise.resolve(navigate(ROUTES.voucher)),
      (error) => {
        console.error('Error navigating to voucher:', error);
      },
    );
  };

  return (
    <Section2 title="Chọn mã giảm giá" className="rounded-lg bg-white">
      <button
        className="w-full flex justify-between items-center py-2 px-4 space-x-2 cursor-pointer"
        onClick={handleNavigate}
      >
        <div className="flex items-center space-x-2">
          <VoucherIcon />
          <div className="text-sm flex-1">{currentVoucherCode || 'Mã giảm giá'}</div>
        </div>
        <div className="flex items-center space-x-1">
          {/* <div className="text-sm font-medium">Chọn</div> */}
          <Icon icon="zi-chevron-right" />
        </div>
      </button>
    </Section2>
  );
};
