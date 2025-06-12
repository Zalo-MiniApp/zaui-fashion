import { FC, useEffect } from 'react';
import Section from '@/components/Section';
import {
  useVouchersList,
  useVouchersListLoading,
  useForceFetchVouchersList,
  useVouchersListError,
} from 'miniapp-core/src';
import { DepartmentSkeleton } from '@/components/skeleton';
import { VoucherItem } from '@/components/VoucherItem';
import { ErrorVoucher, EmptyVoucherResult } from '@/components/Empty';

export default function VoucherPage() {
  const vouchers = useVouchersList();
  const isLoading = useVouchersListLoading();
  const error = useVouchersListError();
  const fetchVouchers = useForceFetchVouchersList();

  useEffect(() => {
    fetchVouchers();
  }, []);

  if (isLoading) {
    return <DepartmentSkeleton />;
  }

  if (error) {
    return <ErrorVoucher message={error} />;
  }

  if (!vouchers || vouchers.length === 0) {
    return <EmptyVoucherResult />;
  }

  return (
    <div className="px-4 space-y-6 pb-4">
      {vouchers.map((voucherItem, i) => (
        <VoucherItem key={voucherItem.id} voucher={voucherItem} fullWidth />
      ))}
    </div>
  );
}
