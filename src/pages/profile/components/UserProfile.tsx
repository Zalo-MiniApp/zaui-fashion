import headerIllus from '@/assets/images/bg-header-2.svg';
import { useAuth } from 'miniapp-core/src';
import { Barcode } from './barcode';
import { ImageWithLoader } from '@/components/ImageWithLoader';

export function UserProfile() {
  const { auth } = useAuth();

  const avatarUrl = auth?.avatar;
  const fullName = auth?.fullname || 'Chào mừng bạn đến với MiniApp';
  const email = auth?.telephone || 'Bạn chưa đăng nhập';
  const barcodeValue = auth?.telephone || '';

  // Icon URL — thay bằng URL thực tế bạn muốn
  const badgeIconUrl =
    'https://firebasestorage.googleapis.com/v0/b/miniapp-vn-dev.appspot.com/o/img%2Ficon-dong.png?alt=media&token=cace576f-e3f0-41c6-aab4-5bb47b2ebe34';

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative w-full max-w-md">
        {/* Avatar nằm giữa, đè lên 1 phần container phía dưới */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
          <div className="relative w-24 h-24">
            <ImageWithLoader
              src={avatarUrl}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
            />
            {/* Icon nằm chồng lên góc dưới giữa */}
            <ImageWithLoader
              src={badgeIconUrl}
              alt="Badge"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-10 h-10"
            />
          </div>
        </div>

        {/* Thông tin người dùng + mã barcode */}
        <div
          className="mt-2 w-full bg-white rounded-lg overflow-hidden shadow bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${headerIllus})`,
          }}
        >
          <div className="pt-16 px-6 pb-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-gray-800">{fullName}</h2>
            <p className="text-gray-600">{email}</p>
            <Barcode value={barcodeValue} />
          </div>
        </div>
      </div>
    </div>
  );
}
