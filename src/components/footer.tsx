import { useMatches, useNavigate } from "react-router-dom";
import { CartIcon, CategoryIcon, HomeIcon, ProfileIcon } from "./vectors";
import HorizontalDivider from "./horizontal-divider";
import { useAtomValue } from "jotai";
import { cartState } from "state";

const NAV_ITEMS = [
  {
    name: "Trang chủ",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Danh mục",
    path: "/categories",
    icon: CategoryIcon,
  },
  {
    name: "Giỏ hàng",
    path: "/cart",
    icon: (props) => {
      const cart = useAtomValue(cartState);

      return (
        <div className="relative">
          {cart.length > 0 && (
            <div className="absolute top-0 left-[18px] h-4 px-1.5 pt-[1.5px] pb-[0.5px] rounded-full bg-[#FF3333] text-white text-[10px] leading-[14px] font-medium shadow-[0_0_0_2px_white]">
              {cart.length > 9 ? "9+" : cart.length}
            </div>
          )}
          <CartIcon {...props} />
        </div>
      );
    },
  },
  {
    name: "Thành viên",
    path: "/profile",
    icon: ProfileIcon,
  },
];

export default function Footer() {
  const navigate = useNavigate();
  const matches = useMatches();

  return (
    <>
      <HorizontalDivider />
      <div
        className="w-full px-4 pt-2 grid"
        style={{
          gridTemplateColumns: `repeat(${NAV_ITEMS.length}, 1fr)`,
          paddingBottom: `max(16px, env(safe-area-inset-bottom)`,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            matches.length > 1 && matches[1].pathname === item.path;
          return (
            <div
              key={item.path}
              className="flex flex-col items-center space-y-0.5 p-1 pb-0.5 cursor-pointer active:scale-105"
              onClick={() => {
                navigate(item.path);
              }}
            >
              <div className="w-6 h-6 flex justify-center items-center">
                <item.icon active={isActive} />
              </div>
              <div className={`text-2xs ${isActive ? "text-primary" : ""}`}>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
