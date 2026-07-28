import { Link, useLocation } from "react-router-dom";
import {
    Search,
    ShoppingCart,
    Bell,
    Wallet,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import RoleBadge from "../common/RoleBadge";

export default function Header() {
    const { user } = useAuth();
    const { cart } = useCart();

    const location = useLocation();

    const cartCount =
        cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    const wallet =
        user?.wallet?.toLocaleString("vi-VN") || "0";

    const isActive = (path) =>
        location.pathname === path;

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center gap-2"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                        K
                    </div>

                    <div className="hidden md:block">

                        <div className="text-lg font-bold text-white">
                            Khánh Duy Shop
                        </div>

                        <div className="text-xs text-zinc-400">
                            Telegram Mini App
                        </div>

                    </div>
                </Link>

                {/* Search */}

                <div className="mx-6 hidden flex-1 lg:block">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                        />

                        <input
                            type="text"
                            placeholder="Tìm sản phẩm..."
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-4 text-white outline-none transition focus:border-blue-500"
                        />

                    </div>

                </div>

                {/* Menu */}

                <nav className="hidden items-center gap-5 lg:flex">

                    <Link
                        to="/"
                        className={`transition ${
                            isActive("/")
                                ? "text-blue-500"
                                : "text-zinc-300 hover:text-white"
                        }`}
                    >
                        Trang chủ
                    </Link>

                    <Link
                        to="/shop"
                        className={`transition ${
                            isActive("/shop")
                                ? "text-blue-500"
                                : "text-zinc-300 hover:text-white"
                        }`}
                    >
                        Cửa hàng
                    </Link>

                    <Link
                        to="/profile"
                        className={`transition ${
                            isActive("/profile")
                                ? "text-blue-500"
                                : "text-zinc-300 hover:text-white"
                        }`}
                    >
                        Hồ sơ
                    </Link>

                </nav>

                {/* Right */}

                <div className="flex items-center gap-3">

                    <button className="rounded-xl bg-zinc-900 p-2 text-zinc-300 transition hover:bg-zinc-800">
                        <Bell size={20} />
                    </button>

                    <div className="hidden items-center gap-2 rounded-xl bg-zinc-900 px-3 py-2 lg:flex">

                        <Wallet
                            size={18}
                            className="text-green-400"
                        />

                        <span className="text-sm font-semibold text-white">
                            {wallet}₫
                        </span>

                    </div>

                    <Link
                        to="/cart"
                        className="relative rounded-xl bg-zinc-900 p-2 transition hover:bg-zinc-800"
                    >
                        <ShoppingCart
                            size={20}
                            className="text-white"
                        />

                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                                {cartCount}
                            </span>
                        )}

                    </Link>

                    {user ? (
                        <div className="flex items-center gap-3 rounded-xl bg-zinc-900 px-3 py-2">

                            <img
                                src={
                                    user.photoURL ||
                                    `https://ui-avatars.com/api/?name=${user.firstName}`
                                }
                                alt="avatar"
                                className="h-10 w-10 rounded-full border border-zinc-700 object-cover"
                            />

                            <div className="hidden md:block">

                                <div className="text-sm font-semibold text-white">
                                    {user.firstName} {user.lastName}
                                </div>

                                <RoleBadge />

                            </div>

                        </div>
                    ) : (
                        <div className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                            Guest
                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}