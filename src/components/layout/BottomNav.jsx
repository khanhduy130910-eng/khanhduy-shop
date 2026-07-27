import { NavLink } from "react-router-dom";
import {
  House,
  ShoppingBag,
  Wallet,
  User,
} from "lucide-react";

const menus = [
  {
    path: "/",
    title: "Trang chủ",
    icon: House,
  },
  {
    path: "/shop",
    title: "Shop",
    icon: ShoppingBag,
  },
  {
    path: "/wallet",
    title: "Ví",
    icon: Wallet,
  },
  {
    path: "/profile",
    title: "Hồ sơ",
    icon: User,
  },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-xs transition ${
                  isActive
                    ? "text-blue-500"
                    : "text-slate-400 hover:text-white"
                }`
              }
            >
              <Icon size={22} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}