import { Link } from "react-router-dom";
import {
    ShoppingBag,
    Tag,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import {
    getPriceInfo,
    formatPrice,
} from "../../config/priceEngine";

export default function ProductCard({ product }) {
    const { user } = useAuth();

    const {
        currentPrice,
        normalPrice,
        sellerPrice,
        saving,
        showSellerPrice,
    } = getPriceInfo(product, user);

    const salePercent =
        normalPrice > currentPrice
            ? Math.round(
                  ((normalPrice - currentPrice) / normalPrice) * 100
              )
            : 0;

    return (
        <div className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-blue-500/20">

            <Link
                to={`/product/${product.id}`}
                className="relative block overflow-hidden"
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {salePercent > 0 && (
                    <div className="absolute left-3 top-3 rounded-xl bg-red-500 px-3 py-1 text-sm font-bold text-white shadow-lg">
                        -{salePercent}%
                    </div>
                )}

                <div className="absolute right-3 top-3 rounded-xl bg-zinc-950/80 p-2 backdrop-blur">
                    <Tag
                        size={18}
                        className="text-yellow-400"
                    />
                </div>

            </Link>

            <div className="space-y-3 p-4">

                <h2 className="line-clamp-2 min-h-[56px] text-lg font-bold text-white">
                    {product.name}
                </h2>

                <p className="line-clamp-2 text-sm text-zinc-400">
                    {product.description}
                </p>

                <div>

                    <div className="text-2xl font-extrabold text-red-500">
                        {formatPrice(currentPrice)}
                    </div>

                    {currentPrice !== normalPrice && (
                        <div className="text-sm text-zinc-500 line-through">
                            {formatPrice(normalPrice)}
                        </div>
                    )}

                    {saving > 0 && (
                        <div className="mt-1 inline-flex items-center rounded-lg bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-400">
                            Tiết kiệm {formatPrice(saving)}
                        </div>
                    )}

                    {showSellerPrice && (
                        <div className="mt-2 rounded-xl bg-orange-500/10 p-2 text-sm text-orange-300">
                            Giá Seller:
                            <span className="ml-1 font-bold">
                                {formatPrice(sellerPrice)}
                            </span>
                        </div>
                    )}

                </div>

                <Link
                    to={`/product/${product.id}`}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 active:scale-95"
                >
                    <ShoppingBag size={18} />
                    Xem chi tiết
                </Link>

            </div>

        </div>
    );
}