import React, { FC, useState } from 'react';
import { Box, Text, Button } from 'zmp-ui';
import { Voucher } from 'miniapp-core/src';
import clsx from 'clsx';
import AppLogo from '@/assets/images/logo.jpg';
import { PromoModal } from '@/components/dialogs/PromoModal';
import { useSetCurrentVoucherCode, useCurrentVoucherCode } from 'miniapp-core/src';
import { useNavigate } from 'react-router-dom';
import { useManualOrderCalculator } from 'miniapp-core/src';

interface Props {
  voucher: Voucher;
  className?: string;
  fullWidth?: boolean;
  onUseNow?: () => void;
}

export const VoucherItem: FC<Props> = ({ voucher, className, fullWidth = false, onUseNow }) => {
  const [showPromoModal, setShowPromoModal] = useState(false);
  const setCurrentVoucherCode = useSetCurrentVoucherCode();
  const currentVoucherCode = useCurrentVoucherCode();
  const navigate = useNavigate();
  const { calculate } = useManualOrderCalculator();

  const isCurrentVoucher = currentVoucherCode === voucher.code;

  const containerClass = clsx(
    'bg-white rounded-lg shadow-md overflow-hidden cursor-pointer',
    fullWidth ? 'flex items-center w-full p-3' : 'flex flex-col w-[320px]',
    className,
  );

  const imageClass = clsx(
    'relative bg-gray-100 flex-shrink-0',
    fullWidth ? 'w-24 h-16 rounded-md overflow-hidden' : 'w-full h-44',
  );

  const contentClass = clsx(fullWidth ? 'flex-1 ml-4' : 'px-4 py-3');

  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPromoModal(true);
  };

  const handleUseNow = () => {
    if (isCurrentVoucher) {
      setCurrentVoucherCode('');
      calculate('');
      return;
    } else {
      setCurrentVoucherCode(voucher.code);
      calculate(voucher.code);
    }
    onUseNow?.();
    setShowPromoModal(false);
    navigate(-1);
  };

  return (
    <>
      <div className={containerClass} onClick={handleItemClick}>
        <Box className={imageClass}>
          <img
            loading="lazy"
            src={voucher.imageUrl || AppLogo}
            alt={voucher.code}
            className="w-full h-full object-cover object-center rounded-md"
          />
        </Box>

        <div className={contentClass}>
          <Text className="text-xl font-bold text-gray-800 line-clamp-2">{voucher.code}</Text>
          <Text
            className="text-sm text-gray-500 line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: voucher.description || 'Ưu đãi hấp dẫn đang chờ bạn',
            }}
          />
        </div>

        {fullWidth && (
          <Button
            size="small"
            className={`use-now-button text-xs ml-4 px-3 py-1.5 rounded border 
    ${
      isCurrentVoucher
        ? 'bg-white text-primary border-primary border-solid'
        : 'bg-primary text-white border-transparent'
    }`}
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleUseNow();
            }}
          >
            {isCurrentVoucher ? 'Huỷ' : 'Sử dụng'}
          </Button>
        )}
      </div>

      <PromoModal
        visible={showPromoModal}
        voucher={voucher}
        onClose={() => setShowPromoModal(false)}
        onUseNow={handleUseNow}
      />
    </>
  );
};
