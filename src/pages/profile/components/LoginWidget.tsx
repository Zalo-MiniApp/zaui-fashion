import registerIllusRight from '@/assets/images/register-illus-right.svg';
import { useAuth } from 'miniapp-core/src';

export function LoginWidget() {
  const { forceLoginAction } = useAuth();

  const handleLogin = async () => {
    forceLoginAction(async () => {});
  };

  return (
    <button
      className="w-full text-left rounded-lg bg-primary text-white p-4 bg-cover space-y-0.5"
      style={{
        backgroundImage: `url(${registerIllusRight})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom right',
        backgroundSize: 'auto',
      }}
      onClick={handleLogin}
    >
      <div className="text-lg">Đăng nhập</div>
      <div className="text-2xs">Đăng nhập để nhận nhiều ưu đãi</div>
    </button>
  );
}
