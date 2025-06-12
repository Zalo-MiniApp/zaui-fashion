import React, { useState } from 'react';
import { Address } from 'miniapp-core/src';
import { Sheet, Button, Box, Text } from 'zmp-ui';
import { useShowLoading, useHideLoading } from 'miniapp-core/src';

type Props = {
  data: Address | null;
  open: boolean;
  onClose: () => void;
  onDeleteConfirm: () => Promise<void>;
};

export const DeleteAddressSheet: React.FC<Props> = ({ open, data, onClose, onDeleteConfirm }) => {
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      showLoading();
      await onDeleteConfirm();
    } catch (err) {
      console.error('Lỗi khi xoá địa chỉ:', err);
    } finally {
      hideLoading();
      setIsDeleting(false);
    }
  };

  return (
    <Sheet visible={open} onClose={onClose} title="Xác nhận xoá địa chỉ?">
      <Box p={4}>
        <Box className="flex justify-center">
          <Text className="text-base text-gray-700 mb-4 text-center">
            Bạn có chắc chắn muốn xoá địa chỉ này không?
          </Text>
        </Box>{' '}
        <Box className="flex flex-row justify-between">
          <Button
            onClick={handleDelete}
            loading={isDeleting}
            disabled={isDeleting}
            type="danger"
            className="flex-1 ml-2"
          >
            {isDeleting ? 'Đang xoá...' : 'Xoá'}
          </Button>
          <Button
            onClick={onClose}
            variant="tertiary"
            className="flex-1 ml-2 border border-gray-300 text-gray-700"
          >
            Huỷ
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
};
