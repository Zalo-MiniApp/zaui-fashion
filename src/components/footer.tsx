import TransitionLink from './TransitionLink';
import HorizontalDivider from './HorizontalDivider';
import { NAVIGATION_LOOKUP } from '@/utils/navigation.config';
import { useAppConfig } from 'miniapp-core/src';
import { useRouteHandle } from 'miniapp-core/src';
import { useCart } from 'miniapp-core/src';

export default function Footer() {
  const config = useAppConfig();
  const cart = useCart();
  const [handle] = useRouteHandle();

  const navigationJson = config?.navigation || [];
  const footerActions = navigationJson.map(({ key }) => NAVIGATION_LOOKUP[key]).filter(Boolean);

  if (handle?.noFooter || footerActions.length === 0) {
    return null;
  }

  return (
    <>
      <HorizontalDivider />
      <div
        className="w-full px-4 pt-2 grid"
        style={{
          gridTemplateColumns: `repeat(${footerActions.length}, 1fr)`,
          paddingBottom: `max(16px, env(safe-area-inset-bottom))`,
        }}
      >
        {footerActions.map((item) => {
          const Icon = item.icon;
          const key = item.path?.toLowerCase();

          const renderIcon = (isActive: boolean) => {
            const iconEl = (
              <Icon
                size={24}
                strokeWidth={1}
                style={{ color: isActive ? 'var(--primary)' : undefined }}
              />
            );

            if (key === '/cart') {
              return (
                <div className="relative">
                  {cart.length > 0 && (
                    <div
                      className="absolute left-[18px] h-4 px-1.5 pt-[1.5px] pb-[0.5px] rounded-full
                        bg-[#FF3333] text-white text-[10px] leading-[12px] font-medium shadow-[0_0_0_2px_white]"
                    >
                      {cart.length > 9 ? '9+' : cart.length}
                    </div>
                  )}
                  {iconEl}
                </div>
              );
            }

            return iconEl;
          };

          // Nếu có item.onClick, chỉ chạy hàm và không điều hướng
          if (typeof item.onClick === 'function') {
            return (
              <div
                key={item.title}
                onClick={item.onClick}
                className="flex flex-col items-center space-y-0.5 p-1 pb-0.5 cursor-pointer active:scale-105"
              >
                <div className="w-6 h-6 flex justify-center items-center">
                  <Icon size={24} strokeWidth={1} />
                </div>
                <div className="text-2xs">{item.title}</div>
              </div>
            );
          }

          // Mặc định là tab có điều hướng
          return (
            <TransitionLink
              to={item.path!}
              key={item.path}
              className="flex flex-col items-center space-y-0.5 p-1 pb-0.5 cursor-pointer active:scale-105"
            >
              {({ isActive }) => (
                <>
                  <div className="w-6 h-6 flex justify-center items-center">
                    {renderIcon(isActive)}
                  </div>
                  <div className={`text-2xs ${isActive ? 'text-primary' : ''}`}>{item.title}</div>
                </>
              )}
            </TransitionLink>
          );
        })}
      </div>
    </>
  );
}
