import { EmptyBoxIcon, SearchIconLarge, ShipperIcon, VoucherIcon } from './Vectors';
import { FC } from 'react';

export function EmptySearchResult() {
  return (
    <div className="flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <SearchIconLarge />
      <div className="text-inactive text-center text-2xs">Không có sản phẩm bạn tìm kiếm</div>
    </div>
  );
}

export function EmptyDelivery() {
  return (
    <div className="h-full flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <ShipperIcon />
      <div className="text-inactive text-center text-2xs">Không có hình thức giao hàng nào</div>
    </div>
  );
}

export function EmptyAddress() {
  return (
    <div className="h-full flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <ShipperIcon />
      <div className="text-inactive text-center text-2xs">Không có địa chỉ nào</div>
    </div>
  );
}

interface ErrorVoucherProps {
  message?: string | null;
}

export const ErrorVoucher: FC<ErrorVoucherProps> = ({ message }) => {
  return (
    <div className="h-full flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <EmptyBoxIcon />
      <div className="text-inactive text-center text-2xs">{message || 'Không thể tải voucher'}</div>
    </div>
  );
};

export function EmptyVoucherResult() {
  return (
    <div className="flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <VoucherIcon />
      <div className="text-inactive text-center text-2xs">Không có voucher nào</div>
    </div>
  );
}
