import { Outlet } from 'react-router-dom'; // Dùng để render component con tương ứng với route hiện tại
import Header from './Header'; // Header của trang
import Footer from './Footer'; // Footer của trang
import { Toaster } from 'react-hot-toast'; // Hiển thị toast message
import { ScrollRestoration } from './ScrollRestoration'; // Khôi phục vị trí cuộn khi điều hướng
import FloatingCartPreview from '@/components/FloatingCartPreview';
import { LoadingOverlay } from '@/components/LoadingOverlay'; // Hiển thị overlay khi đang tải dữ liệu
import { useAuthActions } from 'miniapp-core/src';
import { useEffect } from 'react';
import { eventEmitter } from 'miniapp-core/src';
import { TOKEN_EXPIRATION_KEY } from 'miniapp-core/src';
import { useSearchParams } from 'react-router-dom';
import { useAppConfigLoading, useAppConfig } from 'miniapp-core/src';
import { AnimatedSlideUp } from '@/components/AnimatedSlideUp';
import { useAuth } from 'miniapp-core/src';
import PaymentHandler from './PaymentHandler';

export default function Layout() {
  const { logout, setReferralByCode } = useAuthActions();
  const [searchParams] = useSearchParams();
  const config = useAppConfig();
  const loading = useAppConfigLoading();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      eventEmitter.on(TOKEN_EXPIRATION_KEY, logout);
      return () => {
        eventEmitter.off(TOKEN_EXPIRATION_KEY, logout);
      };
    }
    return () => {};
  }, [isLoggedIn, logout]);

  // Lấy mã giới thiệu từ URL nếu có
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralByCode(ref);
    }
  }, [searchParams, setReferralByCode]);

  return (
    <div className="w-screen h-screen flex flex-col bg-background text-foreground">
      {/* Header nằm trên cùng */}
      <Header />

      {/* Phần thân chính của layout, chiếm toàn bộ chiều cao còn lại */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {/* Footer nằm dưới cùng */}
      {!loading && config && (
        <AnimatedSlideUp>
          <Footer />
        </AnimatedSlideUp>
      )}

      <Toaster
        containerClassName="toast-container"
        containerStyle={{
          top: 'calc(50% - 24px)',
        }}
      />

      <FloatingCartPreview />
      <LoadingOverlay />
      <PaymentHandler />
      <ScrollRestoration />
    </div>
  );
}
