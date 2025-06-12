import { ROUTES } from 'miniapp-core/src';
import { QuickActionProps } from 'miniapp-core/src';
import Card from '@/assets/images/the.png';
import Product from '@/assets/images/sanpham.png';
import VoucherPath from '@/assets/images/uudai.png';
import WheelPath from '@/assets/images/Minigame.png';

export const QUICK_ACTION_LOOKUP: Record<string, QuickActionProps> = {
  card: {
    title: 'Thẻ',
    path: ROUTES.card,
    icon: Card,
  },
  notification: {
    title: 'Thông báo',
    path: ROUTES.notification,
    icon: Card,
  },
  news: {
    title: 'Tin tức',
    path: ROUTES.news,
    icon: Card,
  },
  branches: {
    title: 'Chi nhánh',
    path: ROUTES.branches,
    icon: Card,
  },
  products: {
    title: 'Sản phẩm',
    path: ROUTES.products,
    icon: Product,
  },
  booking: {
    title: 'Đặt lịch',
    path: ROUTES.booking,
    icon: Card,
  },
  room: {
    title: 'Đặt phòng',
    path: ROUTES.room,
    icon: Card,
  },
  history: {
    title: 'Lịch sử mua hàng',
    path: ROUTES.history,
    icon: Card,
  },
  voucher: {
    title: 'Voucher',
    path: ROUTES.voucher,
    icon: VoucherPath,
  },
  contact: {
    title: 'Liên hệ',
    path: ROUTES.contact,
    icon: Card,
  },
  wheel: {
    title: 'Vòng quay',
    path: ROUTES.wheel,
    icon: WheelPath,
  },
  affiliate: {
    title: 'Affiliate',
    path: ROUTES.affiliate,
    icon: Card,
  },
};
