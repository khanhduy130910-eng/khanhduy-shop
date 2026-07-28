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
        title: "Home",
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
        title: "Tôi",
        icon: User,
    },
];

export default function BottomNav() {
    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">

            <nav className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur-xl">

                <div className="flex items-center justify-around">

                    {menus.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group flex w-20 flex-col items-center justify-center rounded-2xl py-2 transition-all duration-300 ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                            : "text-zinc-400 hover:bg-zinc-900 hover:text-white active:scale-95"
                                    }`
                                }
                            >
                                <Icon
                                    size={22}
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />

                                <span className="mt-1 text-[11px] font-medium">
                                    {item.title}
                                </span>

                            </NavLink>
                        );
                    })}

                </div>

            </nav>

        </div>
    );
}