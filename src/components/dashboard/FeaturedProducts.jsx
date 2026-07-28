import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        name: "Key Premium Telegram",
        price: "99.000 ₫",
        image: "https://placehold.co/600x600/2563eb/ffffff?text=Telegram",
        badge: "HOT",
    },
    {
        id: 2,
        name: "VIP Membership",
        price: "199.000 ₫",
        image: "https://placehold.co/600x600/9333ea/ffffff?text=VIP",
        badge: "NEW",
    },
    {
        id: 3,
        name: "Digital Account",
        price: "299.000 ₫",
        image: "https://placehold.co/600x600/ea580c/ffffff?text=Account",
        badge: "SALE",
    },
];

const badgeColor = {
    HOT: "bg-red-500",
    NEW: "bg-green-500",
    SALE: "bg-orange-500",
};

export default function FeaturedProducts() {
    return (
        <section className="space-y-5">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                    <Star
                        size={22}
                        className="text-yellow-400"
                    />

                    <h2 className="text-2xl font-bold text-white">
                        Sản phẩm nổi bật
                    </h2>

                </div>

                <Link
                    to="/shop"
                    className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
                >
                    Xem tất cả
                    <ArrowRight size={18} />
                </Link>

            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                {products.map((item) => (
                    <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
                    >

                        <div className="relative overflow-hidden">

                            <img
                                src={item.image}
                                alt={item.name}
                                className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
                            />

                            <span
                                className={`absolute left-3 top-3 rounded-xl px-3 py-1 text-xs font-bold text-white ${badgeColor[item.badge]}`}
                            >
                                {item.badge}
                            </span>

                        </div>

                        <div className="space-y-3 p-4">

                            <h3 className="line-clamp-2 text-lg font-semibold text-white">
                                {item.name}
                            </h3>

                            <div className="text-2xl font-bold text-red-500">
                                {item.price}
                            </div>

                            <button className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500">
                                Xem chi tiết
                            </button>

                        </div>

                    </Link>
                ))}

            </div>

        </section>
    );
}