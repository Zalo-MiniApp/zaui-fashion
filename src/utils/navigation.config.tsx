import { ROUTES } from 'miniapp-core/src';
import {
  Comment02Icon,
  Calendar03Icon,
  ShoppingBag02Icon,
  MenuSquareIcon,
  Home04Icon,
  StoreLocation01Icon,
  UserIcon,
  ShoppingCart01Icon,
} from 'hugeicons-react';
// import { NavActionProps } from 'miniapp-core/src/features/StoreInfo/types';
import { NavActionProps } from 'miniapp-core/src';

export const NAVIGATION_LOOKUP: Record<string, NavActionProps> = {
  home: {
    title: 'Trang chủ',
    path: ROUTES.home,
    icon: Home04Icon,
  },
  products: {
    title: 'Sản phẩm',
    path: ROUTES.products,
    icon: ShoppingBag02Icon,
  },
  services: {
    title: 'Dịch vụ',
    path: ROUTES.services,
    icon: MenuSquareIcon,
  },
  chat: {
    title: 'Chat',
    path: ROUTES.chat,
    icon: Comment02Icon,
    onClick: () => {
      console.log('Chat tab clicked');
    },
  },
  cart: {
    title: 'Giỏ hàng',
    path: ROUTES.cart,
    icon: ShoppingCart01Icon,
  },
  profile: {
    title: 'Cá nhân',
    path: ROUTES.profile,
    icon: UserIcon,
  },
  branches: {
    title: 'Chi nhánh',
    path: ROUTES.branches,
    icon: StoreLocation01Icon,
  },
  booking: {
    title: 'Đặt lịch',
    path: ROUTES.booking,
    icon: Calendar03Icon,
  },
  room: {
    title: 'Đặt phòng',
    path: ROUTES.room,
    icon: Calendar03Icon,
  },
};
