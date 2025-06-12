import React from 'react';
import { Modal } from 'zmp-ui';
import { Voucher } from 'miniapp-core/src';
import AppLogo from '@/assets/images/logo.jpg';

interface Props {
  visible: boolean;
  voucher: Voucher;
  onClose: () => void;
  onUseNow?: () => void;
}

export const PromoModal: React.FC<Props> = ({ visible, voucher, onClose, onUseNow }) => {
  return (
    <Modal
      visible={visible}
      title="Thông tin ưu đãi"
      // description={`Bạn có muốn sử dụng mã ${voucher.code}?`}
      children={
        <div className="text-center">
          <h3 className="text-4xl font-semibold text-gray-800 inline-block border-2 border-dashed border-primary px-4 py-2 rounded m-2">
            {voucher.code}
          </h3>
          <p
            className="text-sm text-gray-600 mt-2"
            dangerouslySetInnerHTML={{
              __html: voucher.description || 'Ưu đãi hấp dẫn đang chờ bạn',
            }}
          />
        </div>
      }
      coverSrc={voucher.imageUrl || AppLogo}
      zIndex={1200}
      actions={[
        {
          text: 'Dùng ngay',
          highLight: true,
          close: true,
          onClick: onUseNow,
        },
        {
          text: 'Đóng',
          onClick: onClose,
        },
      ]}
    />
  );
};
