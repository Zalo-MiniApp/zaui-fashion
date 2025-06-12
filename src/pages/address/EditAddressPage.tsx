import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddressForm from '../address/AddressForm';
import { Address } from 'miniapp-core/src';
import { useDeleteAddress, useUpdateAddress } from 'miniapp-core/src';
import { useSnackbar } from 'zmp-ui';
import { DeleteAddressSheet } from '@/components/dialogs/DeleteAddressSheet';

const EditAddressPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const updateAddress = useUpdateAddress();
  const deleteAddress = useDeleteAddress();
  const { openSnackbar } = useSnackbar();
  const [showDeleteSheet, setShowDeleteSheet] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(null);
  const address: Address | undefined = location.state?.address;

  const handleUpdateAddress = async (data: Address & { isDelete?: boolean }) => {
    try {
      if (data.isDelete) {
        setSelectedAddress(data);
        setShowDeleteSheet(true);
      } else {
        await updateAddress(address?.id, data);
        navigate(-1);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật hoặc xoá địa chỉ:', error);
    }
  };

  return (
    <div className="min-h-full bg-white">
      <AddressForm mode="edit" detail={address} onSubmit={handleUpdateAddress} />
      <DeleteAddressSheet
        open={showDeleteSheet}
        data={selectedAddress}
        onClose={() => setShowDeleteSheet(false)}
        onDeleteConfirm={async () => {
          try {
            if (selectedAddress) {
              await deleteAddress(selectedAddress.id);
              openSnackbar({ text: 'Xóa địa chỉ thành công' });
              navigate(-1);
            }
          } catch (error) {
            console.error('Lỗi khi xoá địa chỉ:', error);
          } finally {
            setShowDeleteSheet(false);
          }
        }}
      />
    </div>
  );
};

export default EditAddressPage;
