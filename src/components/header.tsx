import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';

import { useRouteHandle } from 'miniapp-core/src';
// import { getTemplate } from '@/utils/common';
// import { loadableUserInfoState } from '@/state';
import { useCurrentDepartment } from 'miniapp-core/src';

import headerIllus from '@/assets/images/bg-header-2.svg';
import SearchBar from './SearchBar';
import TransitionLink from './TransitionLink';
import { Icon } from 'zmp-ui';
import AppLogo from '@/assets/images/logo.jpg';
import { ROUTES } from 'miniapp-core/src';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [handle, match] = useRouteHandle();
  const department = useCurrentDepartment();
  // const userInfo = useAtomValue(loadableUserInfoState);

  // Tiêu đề header
  const title = useMemo(() => {
    if (handle) {
      if (typeof handle.title === 'function') {
        return handle.title({ params: match.params });
      } else {
        return handle.title;
      }
    }
    return null;
  }, [handle, match.params]);

  // Logic hiển thị nút back
  const showBack = location.key !== 'default' && !handle?.noBack;
  const imageSrc = department?.imageUrl || department?.image?.url || AppLogo;

  return (
    <div
      className="w-full flex flex-col px-4 bg-white text-primaryForeground pt-st overflow-hidden bg-no-repeat bg-right-top"
      style={{
        backgroundImage: `url(${headerIllus})`,
      }}
    >
      <div className="w-full min-h-12 pr-[80px] flex py-2 space-x-2 items-center">
        {handle?.logo ? (
          <>
            <img src={imageSrc} className="flex-none w-8 h-8 rounded-full" />
            <TransitionLink to={ROUTES.departments} className="flex-1 overflow-hidden">
              <div className="flex items-center space-x-1">
                <h1 className="text-sm font-bold truncate">{department?.name}</h1>
                <Icon icon="zi-chevron-right" />
              </div>
              <p className="overflow-x-auto whitespace-nowrap text-3xs truncate">
                {department?.fullAddress}
              </p>
            </TransitionLink>
          </>
        ) : (
          <>
            {showBack && (
              <div className="py-1 px-2 cursor-pointer" onClick={() => navigate(-1)}>
                <Icon icon="zi-arrow-left" />
              </div>
            )}
            <div className="text-xl font-medium truncate">{title}</div>
          </>
        )}
      </div>
      {handle?.search && (
        <div className="w-full py-2 flex space-x-2">
          <SearchBar
            onFocus={() => {
              if (location.pathname !== '/search') {
                navigate('/search', { viewTransition: true });
              }
            }}
            inputMode="search"
          />
        </div>
      )}
    </div>
  );
}
