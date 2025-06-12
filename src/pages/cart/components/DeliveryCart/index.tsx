import { FC, useEffect } from 'react';
import Section2 from '@/components/Section2';
import HorizontalDivider from '@/components/HorizontalDivider';
import {
  LocationMarkerLineIcon,
  LocationMarkerPackageIcon,
  PlusIcon,
  PackageDeliveryIcon,
  HomeIcon,
} from '@/components/Vectors';
import TransitionLink from '@/components/TransitionLink';
import DeliverySummary from './DeliverySummary';

import {
  useValidCarriers,
  useCarriersLoading,
  useCarriersError,
  useFetchCarriers,
  useSelectedCarrierId,
  useSetSelectedCarrierId,
  useIsCodSelected,
} from 'miniapp-core/src';
import { carrierIconMap } from '@/utils/carrierIconMap';
import { useCurrentDepartmentForCheckout } from 'miniapp-core/src';
import toast from 'react-hot-toast';
import { EmptyDelivery } from '@/components/Empty';
import { ROUTES } from 'miniapp-core/src';
import { CarrierSkeletonList } from '@/components/skeleton/Skeleton';
import { useCurrentSelectedAddress } from 'miniapp-core/src';
import { useAuth } from 'miniapp-core/src';
import { useNavigate } from 'react-router-dom';
import { useManualOrderCalculator } from 'miniapp-core/src';

// Component hiển thị danh sách phương thức giao hàng và địa chỉ nhận hàng
export const DeliveryCart: FC = () => {
  const fetchCarriers = useFetchCarriers(); // Hook gọi API lấy danh sách đơn vị vận chuyển
  const carriers = useValidCarriers(); // Danh sách đơn vị vận chuyển đã được lọc theo VALID_CARRIER_CODES
  const loading = useCarriersLoading(); // Trạng thái loading khi gọi API
  const selectedCarrierId = useSelectedCarrierId(); // ID của đơn vị vận chuyển đang được chọn
  const setSelectedCarrierId = useSetSelectedCarrierId(); // Setter để chọn đơn vị vận chuyển
  const isCodSelected = useIsCodSelected(); // Kiểm tra xem người dùng chọn giao hàng COD
  const { calculate } = useManualOrderCalculator();

  // Gọi API lấy danh sách carrier khi component mount
  useEffect(() => {
    fetchCarriers();
  }, [fetchCarriers]);

  // Hiển thị trạng thái loading nếu chưa có dữ liệu
  if (loading) return <CarrierSkeletonList />;

  // Xử lý khi người dùng chọn carrier
  const handleCarrierSelect = (carrierId: number, carrierName: string, isDisabled: boolean) => {
    if (isDisabled) {
      toast.error(`Phương thức giao hàng "${carrierName}" hiện không khả dụng.`);
      return;
    }
    setSelectedCarrierId(carrierId);
    calculate();
  };

  // Render button cho từng carrier
  const renderCarrierButton = (carrier: any) => {
    const isSelected = selectedCarrierId === carrier.id;
    const isDisabled = carrier.status === 0;
    const icon = carrierIconMap[carrier.code] ?? <PackageDeliveryIcon />;

    return (
      <button
        key={carrier.id}
        className={`flex justify-center items-center space-x-2 text-base font-medium rounded-full h-12 px-1
          ${isSelected ? 'border border-primary text-primary' : ''}
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'bg-background'}`}
        onClick={() => handleCarrierSelect(carrier.id, carrier.name, isDisabled)}
        type="button"
      >
        {icon}
        <span>{carrier.name}</span>
      </button>
    );
  };

  return (
    <Section2 title="Hình thức giao hàng" className="rounded-lg bg-white">
      <div className="p-4 pt-2">
        {carriers.length === 0 ? (
          <EmptyDelivery /> // Nếu không có đơn vị vận chuyển thì hiển thị thông báo trống
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {carriers.map(renderCarrierButton)} {/* Hiển thị danh sách đơn vị vận chuyển */}
            </div>
            <HorizontalDivider /> {/* Đường kẻ phân cách */}
            {isCodSelected ? <ShippingAddressSummary /> : <SelectedStationSummary />}
          </>
        )}
      </div>
    </Section2>
  );
};

// Giao tận nơi
function ShippingAddressSummary() {
  const address = useCurrentSelectedAddress();
  const { forceLoginAction } = useAuth();
  const navigate = useNavigate();

  const handleNavigateAddress = () => {
    forceLoginAction(
      () => Promise.resolve(navigate(ROUTES.address)),
      (error) => {
        console.error('Error navigating to address:', error);
      },
    );
  };

  if (!address) {
    return (
      <button
        onClick={handleNavigateAddress}
        className="flex flex-col space-y-2 justify-center items-center p-4 w-full"
      >
        <LocationMarkerPackageIcon />
        <div className="flex space-x-1 items-center text-center p-2">
          <PlusIcon width={16} height={16} />
          <span className="text-sm font-medium">Thêm địa chỉ nhận hàng</span>
        </div>
      </button>
    );
  }

  return (
    <DeliverySummary
      icon={<LocationMarkerLineIcon />}
      title={address?.fullname || 'Địa chỉ nhận hàng'}
      subtitle={address?.phone || 'Chưa có số điện thoại'}
      description={address.fullAddress || address.address}
      linkTo={ROUTES.address}
    />
  );
}

// Lấy tại cửa hàng
function SelectedStationSummary() {
  // Lấy thông tin địa chỉ đang chọn
  const department = useCurrentDepartmentForCheckout();
  return (
    <DeliverySummary
      icon={<HomeIcon />}
      title="Nhận hàng tại"
      subtitle={department?.name || 'Chọn địa chỉ'}
      description={department?.address || 'Chưa có địa chỉ'}
      linkTo={ROUTES.departments}
    />
  );
}
