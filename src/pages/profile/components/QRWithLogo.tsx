import { useEffect, useRef, useCallback } from 'react';
import QRCodeStyling from 'qr-code-styling';
import AppLogo from '@/assets/images/logo.jpg';
import { config } from 'miniapp-core/src';
import { Icon } from 'zmp-ui';
import { openShareSheet, saveImageToGallery } from 'zmp-sdk/apis';
import { blobToBase64 } from 'miniapp-core/src';
import toast from 'react-hot-toast';

const useQRCode = (url: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling({
        width: 180,
        height: 180,
        data: url,
        // image: AppLogo,
        dotsOptions: {
          type: 'dots',
          color: '#1F2937',
        },
        cornersSquareOptions: {
          type: 'rounded',
          color: '#1F2937',
        },
        cornersDotOptions: {
          type: 'extra-rounded',
          color: '#1F2937',
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 6,
          imageSize: 0.3,
        },
        backgroundOptions: {
          color: '#ffffff',
        },
      });
    }

    if (ref.current) {
      ref.current.innerHTML = '';
      qrRef.current.append(ref.current);
    }
  }, [url]);

  return { ref, qrRef };
};

export function QRWithLogo() {
  const qrCodeUrl = `https://zalo.me/s/${config.appId}`;
  const { ref, qrRef } = useQRCode(qrCodeUrl);

  const handleDownload = useCallback(async () => {
    try {
      const blob = await qrRef.current?.getRawData('png');
      if (!blob) throw new Error('Không thể tạo ảnh QR');

      const base64 = await blobToBase64(blob);
      await saveImageToGallery({ imageBase64Data: base64 });
      toast.success('Đã lưu ảnh vào thư viện');
    } catch (error) {
      console.error('Tải ảnh thất bại:', error);
      toast.error('Không thể lưu ảnh');
    }
  }, [qrRef]);

  const shareLink = useCallback(async () => {
    try {
      await openShareSheet({
        type: 'link',
        data: {
          link: qrCodeUrl,
          chatOnly: true,
        },
      });
    } catch (error) {
      console.error('Chia sẻ thất bại:', error);
      toast.error('Không thể chia sẻ');
    }
  }, [qrCodeUrl]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={ref} />

      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-100"
        >
          <Icon icon="zi-download" />
          Tải về
        </button>

        <button
          onClick={shareLink}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-100"
        >
          <Icon icon="zi-share" />
          Chia sẻ
        </button>
      </div>
    </div>
  );
}
