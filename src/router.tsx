import Layout from '@/components/Layout';
import CartPage from '@/pages/cart';
import ProfilePage from '@/pages/profile';
import { createBrowserRouter } from 'react-router-dom';
import { getBasePath } from './utils/zma';
import { SimpleErrorFallback } from 'miniapp-core/src';
import { ROUTES } from 'miniapp-core/src';
import HomePage from '@/pages/home';
import ProductsPage from '@/pages/products';
import CardPage from '@/pages/card';
import VoucherPage from '@/pages/voucher';
import WheelPage from '@/pages/wheel';
import DepartmentsPage from '@/pages/departments';
import { rootLoader } from 'miniapp-core/src';
import ProductDetailPage from '@/pages/productDetail';
import SearchPage from '@/pages/search';
import NewsPage from '@/pages/news';
import NewsDetailPage from '@/pages/newsDetail';
import AddressPage from '@/pages/address/AddressListPage';
import AddAddressPage from '@/pages/address/AddAddressPage';
import EditAddressPage from '@/pages/address/EditAddressPage';
import DeliveryPage from '@/pages/delivery';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <SimpleErrorFallback />,
      loader: rootLoader,
      children: [
        {
          path: '/',
          element: <HomePage />,
          handle: {
            logo: true,
          },
        },
        {
          path: ROUTES.products,
          element: <ProductsPage />,
          handle: {
            title: 'Sản phẩm',
            noBack: true,
            search: true,
          },
        },
        {
          path: ROUTES.cart,
          element: <CartPage />,
          handle: {
            title: 'Giỏ hàng',
            noFloatingCart: true,
            noBack: true,
          },
        },
        {
          path: ROUTES.profile,
          element: <ProfilePage />,
          handle: {
            title: 'Cá nhân',
            // logo: true,
            noFloatingCart: true,
            noBack: true,
          },
        },
        {
          path: ROUTES.card,
          element: <CardPage />,
          handle: {
            title: 'Thẻ',
          },
        },
        {
          path: ROUTES.voucher,
          element: <VoucherPage />,
          handle: {
            title: 'Ưu đãi',
            noFooter: true,
            noFloatingCart: true,
          },
        },
        {
          path: ROUTES.wheel,
          element: <WheelPage />,
          handle: {
            title: 'Vòng quay',
            noFloatingCart: true,
          },
        },
        {
          path: ROUTES.departments,
          element: <DepartmentsPage />,
          handle: {
            title: 'Chi nhánh',
            noBack: false,
            noFooter: true,
            noFloatingCart: true,
          },
        },
        {
          path: ROUTES.productDetail,
          element: <ProductDetailPage />,
          handle: {
            scrollRestoration: 0,
            noFloatingCart: true,
          },
        },
        {
          path: ROUTES.search,
          element: <SearchPage />,
          handle: {
            search: true,
            title: 'Tìm kiếm',
            noFooter: true,
          },
        },
        {
          path: ROUTES.news,
          element: <NewsPage />,
          handle: {
            title: 'Tin tức',
          },
        },
        {
          path: ROUTES.newsDetail,
          element: <NewsDetailPage />,
          handle: {
            title: 'Chi tiết tin tức',
            scrollRestoration: 0,
            noFloatingCart: true,
          },
        },
        {
          path: ROUTES.address,
          element: <AddressPage />,
          handle: {
            title: 'Địa chỉ',
            noFooter: true,
            noFloatingCart: true,
          },
        },
        {
          path: ROUTES.addAddress,
          element: <AddAddressPage />,
          handle: {
            title: 'Thêm địa chỉ',
            noFooter: true,
            noFloatingCart: true,
          },
        },
        {
          path: ROUTES.editAddress,
          element: <EditAddressPage />,
          handle: {
            title: 'Chỉnh sửa địa chỉ',
            noFooter: true,
            noFloatingCart: true,
          },
        },
        {
          path: ROUTES.delivery,
          element: <DeliveryPage />,
          handle: {
            title: 'Lịch sử giao hàng',
            noFooter: true,
            noFloatingCart: true,
          },
        },
      ],
    },
  ],
  { basename: getBasePath() },
);

export default router;
