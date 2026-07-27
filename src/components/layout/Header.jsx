import {
  Bell,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

export default function Header() {
  const navigate = useNavigate();

  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-md items-center justify-between px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20">
            KD
          </div>

          <div className="text-left">
            <h1 className="font-bold text-white">
              KhanhDuy Shop
            </h1>

            <p className="text-xs text-slate-400">
              Telegram Mini App
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <button
            title="Thông báo"
            className="rounded-xl bg-slate-800 p-2 transition hover:bg-slate-700 active:scale-95"
          >
            <Bell size={18} />
          </button>

          <button
            title="Giỏ hàng"
            onClick={() => navigate("/cart")}
            className="relative rounded-xl bg-slate-800 p-2 transition hover:bg-slate-700 active:scale-95"
          >
            <ShoppingCart size={18} />

            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          <button
            title="Cài đặt"
            className="rounded-xl bg-slate-800 p-2 transition hover:bg-slate-700 active:scale-95"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}