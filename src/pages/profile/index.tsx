import { Icon } from 'zmp-ui';
import React, { FC, ReactNode } from 'react';
import { LoginWidget, QRWithLogo, UserProfile } from './components';
import Section2 from '@/components/Section2';
import { useAuth, useAuthActions } from 'miniapp-core/src';
import { ConfirmSheet } from '@/components/dialogs/ConfirmSheet';
import {
  CreditCardIcon,
  FavouriteIcon,
  DeliveryTruck01Icon,
  Location04Icon,
  LanguageSkillIcon,
  HelpCircleIcon,
  Logout05Icon,
} from 'hugeicons-react';

interface ActionItem {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
}

const ProfilePage: FC = () => {
  const { isLoggedIn } = useAuth();
  const { logout } = useAuthActions();
  const [showLogoutSheet, setShowLogoutSheet] = React.useState(false);

  const mainActions: ActionItem[] = [
    {
      icon: <CreditCardIcon />,
      label: 'Thẻ thành viên',
      onClick: () => console.log('Navigate to Thẻ thành viên'),
    },
    {
      icon: <FavouriteIcon />,
      label: 'Sản phẩm yêu thích',
      onClick: () => console.log('Navigate to Sản phẩm yêu thích'),
    },
    {
      icon: <DeliveryTruck01Icon />,
      label: 'Lịch sử đơn hàng',
      onClick: () => console.log('Navigate to Lịch sử đơn hàng'),
    },
    {
      icon: <Location04Icon />,
      label: 'Địa chỉ giao hàng',
      onClick: () => console.log('Navigate to Địa chỉ giao hàng'),
    },
    {
      icon: <LanguageSkillIcon />,
      label: 'Ngôn ngữ',
      onClick: () => console.log('Navigate to Ngôn ngữ'),
    },
  ];

  const otherActions: ActionItem[] = [
    {
      icon: <HelpCircleIcon />,
      label: 'Câu hỏi thường gặp',
      onClick: () => console.log('Navigate to FAQ'),
    },
    ...(isLoggedIn
      ? [
          {
            icon: <Logout05Icon className="text-red-500" />,
            label: 'Đăng xuất',
            onClick: () => setShowLogoutSheet(true),
          },
        ]
      : []),
  ];
  const renderActions = (actions: ActionItem[]) =>
    actions.map((item, idx) => (
      <button
        key={idx}
        className="w-full flex justify-between items-center py-2 px-4 space-x-2 cursor-pointer"
        onClick={item.onClick}
      >
        <div className={`flex items-center space-x-2`}>
          {item.icon}
          <div className="text-sm">{item.label}</div>
        </div>
        <Icon icon="zi-chevron-right" />
      </button>
    ));

  return (
    <div className="w-full min-h-screen flex flex-col bg-section p-4">
      {!isLoggedIn && <LoginWidget />}
      {isLoggedIn && <UserProfile />}

      <Section2 title="Tiện ích" className="rounded-lg bg-white mt-4">
        {renderActions(mainActions)}
      </Section2>

      <Section2 title="Khác" className="rounded-lg bg-white mt-4">
        {renderActions(otherActions)}
      </Section2>

      <Section2 title="Chia sẻ" className="rounded-lg bg-white mt-4">
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <QRWithLogo />
        </div>
      </Section2>

      <div className="mt-2 text-center text-xs italic text-gray-400 tracking-wider">
        Powered by
        <span className="ml-1 font-semibold text-gray-700 animate-[pulse_3s_ease-in-out_infinite]">
          MiniApp.VN
        </span>
      </div>

      <ConfirmSheet
        open={showLogoutSheet}
        onClose={() => setShowLogoutSheet(false)}
        onConfirm={async () => {
          try {
            await logout();
          } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
          } finally {
            setShowLogoutSheet(false);
          }
        }}
        title="Xác nhận đăng xuất?"
        message="Bạn có chắc chắn muốn đăng xuất không?"
        confirmText="Đồng ý"
        cancelText="Huỷ"
        confirmButtonType="danger"
      />
    </div>
  );
};

export default ProfilePage;
