# 📁 File & Folder Naming Conventions

Áp dụng cho tất cả các project React/TypeScript sử dụng component-based architecture (React, Next.js, Vite, v.v.).

---

## 🔠 File Naming Rules

### 1. Component Files (`.tsx`)
- Dùng `PascalCase`.
- Nếu là biến thể hoặc bản mở rộng, có thể thêm hậu tố rõ ràng như `AbcDev.tsx`, `UserCardTest.tsx`, v.v.

✅ Ví dụ:

components/
Button/
Button.tsx
UserProfile/
UserProfileDev.tsx

---

### 2. Logic, Hooks, Helpers (`.ts`)
- Dùng `camelCase`.
- Các custom hook nên bắt đầu bằng `use`.

✅ Ví dụ:

hooks/
useCart.ts
useUserAuth.ts
utils/
formatPrice.ts
dateUtils.ts

---

## 📁 Folder Naming Rules

### 1. Component Folders
- Dùng `PascalCase` để đồng bộ với tên component chính trong thư mục.
- Có thể chứa:
  - Component chính (`Abc.tsx`)
  - Subcomponents
  - Style file
  - `index.ts` (optional)

✅ Ví dụ:

components/
Skeleton/
Skeleton.tsx
index.ts
ProductCard/
ProductCard.tsx
ProductPrice.tsx
styles.module.css

---

### 2. Logic / Helper Folders
- Dùng `camelCase`.
- Chứa logic xử lý hoặc hook, không chứa UI component.

✅ Ví dụ:

hooks/
useRouteHandle.ts
useScrollLock.ts

utils/
stringUtils.ts
priceUtils.ts

---

### 3. Page Folders
- Dùng `PascalCase`.
- Mỗi folder là một route.
- Tập tin chính thường là `index.tsx`.

✅ Ví dụ:

pages/
Home/
index.tsx
ProductDetail/
index.tsx

---

## ✅ Tổng kết

| Loại                | Quy tắc        | Ví dụ                                |
|---------------------|----------------|---------------------------------------|
| Component file       | `PascalCase`   | `UserProfile.tsx`                    |
| Logic file (hook, util) | `camelCase`    | `useAuth.ts`, `formatPrice.ts`        |
| Component folder     | `PascalCase`   | `components/Skeleton/`               |
| Logic/helper folder  | `camelCase`    | `utils/`, `hooks/`                   |
| Page folder          | `PascalCase`   | `pages/ProductDetail/`              |

---

> ⚠️ Áp dụng quy ước đặt tên nhất quán giúp codebase rõ ràng, dễ maintain, dễ onboard team mới, và tránh lỗi casing (nhất là trên hệ thống file phân biệt hoa thường như Linux/macOS).
