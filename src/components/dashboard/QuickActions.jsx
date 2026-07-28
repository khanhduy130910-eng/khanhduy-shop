import {
    ShoppingBag,
    Wallet,
    Package,
    User,
    ShieldCheck,
    TicketPercent,
} from "lucide-react";
import { Link } from "react-router-dom";

import Card from "../ui/Card";
import useAuth from "../../hooks/useAuth";

export default function QuickActions() {
    const { user, isAdmin } = useAuth();

    const actions = [
        {
            icon: ShoppingBag,
            title: "Cửa hàng",
            path: "/shop",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: Package,
            title: "Đơn hàng",
            path: "/orders",
            color: "from-violet-500 to-purple-500",
        },
        {
            icon: Wallet,
            title: "Ví",
            path: "/wallet",
            color: "from-emerald-500 to-green-500",
        },
        {
            icon: TicketPercent,
            title: "Coupon",
            path: "/coupon",
            color: "from-orange-500 to-red-500",
        },
        {
            icon: User,
            title: "Hồ sơ",
            path: "/profile",
            color: "from-pink-500 to-rose-500",
        },
    ];

    if (isAdmin) {
        actions.push({
            icon: ShieldCheck,
            title: "Admin",
            path: "/admin",
            color: "from-yellow-500 to-amber-500",
        });
    }

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {actions.map((item) => {
                const Icon = item.icon;

                return (
                    <Link key={item.title} to={item.path}>
                        <Card className="group h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl">

                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}
                            >
                                <Icon
                                    size={28}
                                    className="text-white transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            <h3 className="mt-4 text-base font-semibold text-white">
                                {item.title}
                            </h3>

                            <p className="mt-1 text-sm text-zinc-400">
                                {item.title === "Admin"
                                    ? "Quản trị hệ thống"
                                    : `Đi tới ${item.title.toLowerCase()}`}
                            </p>

                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}