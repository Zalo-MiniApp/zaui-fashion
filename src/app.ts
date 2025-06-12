// Core React & Router
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// Router cấu hình sẵn
import router from '@/router';

// Import các stylesheet (thứ tự quan trọng: thư viện → Tailwind → custom)
import 'zmp-ui/zaui.css'; // CSS từ thư viện giao diện ZaUI
import '@/css/tailwind.scss'; // Tailwind CSS custom
import '@/css/app.scss'; // CSS tùy chỉnh riêng của ứng dụng

// Gắn cấu hình ứng dụng (từ file JSON) vào biến toàn cục
import appConfig from '../app-config.json';

// Import translation
import '@/i18n';

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

// Mount ứng dụng React vào phần tử #app trong HTML
const root = createRoot(document.getElementById('app')!);
root.render(createElement(RouterProvider, { router }));
