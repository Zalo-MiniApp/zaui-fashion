import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import HorizontalDivider from '@/components/HorizontalDivider';

import {
  useAddresses,
  useAddressesLoading,
  useFetchAddresses,
  useCurrentSelectedAddress,
  useSetCurrentSelectedAddress,
} from 'miniapp-core/src';

import { DepartmentSkeleton } from '@/components/skeleton';
import type { Address } from 'miniapp-core/src';
import { useTranslation } from 'react-i18next';
import { EmptyAddress } from '@/components/Empty';
import { Button, Icon } from 'zmp-ui';
import { ROUTES } from 'miniapp-core/src';
import { useManualOrderCalculator } from 'miniapp-core/src';

function AddressItem({
  address,
  onSelect,
  isActive,
}: {
  address: Address;
  onSelect: () => void;
  isActive: boolean;
}) {
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(ROUTES.editAddress.replace(':id', `${address.id}`), { state: { address } });
  };
  return (
    <button
      className={`w-full flex items-center space-x-4 p-4 pr-2 bg-white rounded-lg text-left shadow-md border transition
        ${isActive ? 'border-primary' : 'border-transparent'}
      `}
      onClick={onSelect}
    >
      <div className="flex-1 space-y-0.5 text-left">
        <div className="text-sm">{address.fullname}</div>
        <div className="text-xs text-inactive">{address.fullAddress || address.address}</div>
        {address.isDefault && <div className="text-xs text-primary">Mặc định</div>}
      </div>

      <div className="p-4" onClick={(e) => handleEdit(e)}>
        <Icon icon="zi-post" size={24} className="text-primary" />
      </div>
    </button>
  );
}

function AddressListPage() {
  const fetchAddresses = useFetchAddresses();

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const addresses = useAddresses();
  const currentAddress = useCurrentSelectedAddress();
  const setCurrentAddress = useSetCurrentSelectedAddress();
  const loading = useAddressesLoading();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { calculate } = useManualOrderCalculator();

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <DepartmentSkeleton />
        <DepartmentSkeleton />
        <DepartmentSkeleton />
        <DepartmentSkeleton />
      </div>
    );
  }

  if (!addresses || addresses.length === 0) {
    return (
      <div className="flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
        <EmptyAddress />
        <div className="w-full py-3 px-4 pb-6 bg-white" onClick={() => navigate(ROUTES.addAddress)}>
          <Button className="w-full">Thêm địa chỉ mới</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {addresses.map((address) => (
          <AddressItem
            key={address.id}
            address={address}
            isActive={address.id === currentAddress?.id}
            onSelect={() => {
              setCurrentAddress(address);
              calculate();
              toast.success(t('alerts.addressChanged'));
              navigate(-1);
            }}
          />
        ))}
      </div>
      <HorizontalDivider />
      <div className="w-full py-3 px-4 pb-6 bg-white" onClick={() => navigate(ROUTES.addAddress)}>
        <Button className="w-full">Thêm địa chỉ mới</Button>
      </div>
    </div>
  );
}

export default AddressListPage;
