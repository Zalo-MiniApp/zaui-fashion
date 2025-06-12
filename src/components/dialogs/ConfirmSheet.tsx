import React, { useState } from 'react';
import { Sheet, Button, Box, Text } from 'zmp-ui';
import { useShowLoading, useHideLoading } from 'miniapp-core/src';

type ConfirmSheetProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonType?: 'danger' | 'primary';
};

export const ConfirmSheet: React.FC<ConfirmSheetProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Xác nhận',
  message = 'Bạn có chắc chắn muốn thực hiện hành động này không?',
  confirmText = 'Đồng ý',
  cancelText = 'Huỷ',
  confirmButtonType = 'primary',
}) => {
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      showLoading();
      await onConfirm();
    } catch (err) {
      console.error('Lỗi trong xác nhận:', err);
    } finally {
      hideLoading();
      setIsLoading(false);
    }
  };

  return (
    <Sheet visible={open} onClose={onClose} title={title}>
      <Box p={4}>
        <Box className="flex justify-center">
          <Text className="text-base text-gray-700 mb-4 text-center">{message}</Text>
        </Box>
        <Box className="flex flex-row justify-between">
          <Button
            onClick={handleConfirm}
            loading={isLoading}
            disabled={isLoading}
            type={confirmButtonType}
            className="flex-1 ml-2"
          >
            {confirmText}
          </Button>
          <Button
            onClick={onClose}
            variant="tertiary"
            className="flex-1 ml-2 border border-gray-300 text-gray-700"
          >
            {cancelText}
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
};
