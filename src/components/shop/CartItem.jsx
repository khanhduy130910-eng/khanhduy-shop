import {
    Minus,
    Plus,
    Trash2,
    Check,
} from "lucide-react";

import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

import {
    formatPrice,
    getPriceInfo,
} from "../../config/priceEngine";

export default function CartItem({ item }) {
    const {
        increase,
        decrease,
        removeFromCart,
    } = useCart();

    const { user } = useAuth();

    const price = getPriceInfo(item, user);

    const total =
        price.currentPrice * item.quantity;

    return (
        <article className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:border-blue-500 hover:shadow-xl">

            <div className="flex flex-col gap-5 p-5 sm:flex-row">

                {/* Ảnh */}

                <div className="relative">

                    <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                            e.target.src =
                                "https://placehold.co/300x300?text=No+Image";
                        }}
                        className="h-32 w-32 rounded-2xl object-cover"
                    />

                    <div className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shadow">

                        <Check size={14} />

                    </div>

                </div>

                {/* Nội dung */}

                <div className="flex flex-1 flex-col">

                    <div className="flex flex-col gap-2">

                        <h2 className="text-lg font-bold text-white">
                            {item.name}
                        </h2>

                        <div className="flex flex-wrap items-center gap-3">

                            <span className="text-2xl font-bold text-blue-400">
                                {formatPrice(price.currentPrice)}
                            </span>

                            {price.currentPrice !==
                                price.normalPrice && (
                                <span className="text-sm text-zinc-500 line-through">
                                    {formatPrice(price.normalPrice)}
                                </span>
                            )}

                        </div>

                        {price.showSellerPrice && (
                            <span className="inline-flex w-fit rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-400">
                                Giá Seller:{" "}
                                {formatPrice(
                                    price.sellerPrice
                                )}
                            </span>
                        )}

                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

                        {/* Quantity */}

                        <div className="flex items-center rounded-2xl border border-zinc-700 bg-zinc-950">

                            <button
                                onClick={() =>
                                    decrease(item.id)
                                }
                                className="rounded-l-2xl p-3 transition hover:bg-zinc-800"
                            >
                                <Minus size={18} />
                            </button>

                            <span className="min-w-[60px] text-center text-lg font-bold text-white">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() =>
                                    increase(item.id)
                                }
                                className="rounded-r-2xl p-3 transition hover:bg-zinc-800"
                            >
                                <Plus size={18} />
                            </button>

                        </div>

                        {/* Tổng tiền */}

                        <div className="text-right">

                            <div className="text-sm text-zinc-500">
                                Thành tiền
                            </div>

                            <div className="text-2xl font-extrabold text-green-400">
                                {formatPrice(total)}
                            </div>

                        </div>

                    </div>

                    <div className="mt-5 flex justify-end">

                        <button
                            onClick={() =>
                                removeFromCart(item.id)
                            }
                            className="flex items-center gap-2 rounded-2xl border border-red-500 px-4 py-2 font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                        >
                            <Trash2 size={18} />
                            Xóa
                        </button>

                    </div>

                </div>

            </div>

        </article>
    );
}