import { Minus, Plus, Trash2 } from "lucide-react";

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
    <div className="flex gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-4 transition-all duration-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20">

      <img
        src={item.image}
        alt={item.name}
        onError={(e) => {
          e.target.src =
            "https://placehold.co/200x200?text=No+Image";
        }}
        className="h-24 w-24 rounded-xl object-cover"
      />

      <div className="flex flex-1 flex-col justify-between">

        <div>

          <h2 className="line-clamp-2 text-base font-semibold text-white">
            {item.name}
          </h2>

          <div className="mt-3">

            <p className="text-sm text-slate-400">
              Đơn giá
            </p>

            <p className="text-xl font-bold text-blue-400">
              {formatPrice(price.currentPrice)}
            </p>

            {price.currentPrice !==
              price.normalPrice && (
              <p className="text-sm text-slate-500 line-through">
                {formatPrice(price.normalPrice)}
              </p>
            )}

            {price.showSellerPrice && (
              <div className="mt-2 inline-flex rounded-lg bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
                Giá Seller:{" "}
                {formatPrice(price.sellerPrice)}
              </div>
            )}

          </div>

          <div className="mt-4">

            <p className="text-sm text-slate-400">
              Thành tiền
            </p>

            <p className="text-xl font-bold text-green-400">
              {formatPrice(total)}
            </p>

          </div>

        </div>

        <div className="mt-5 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <button
              onClick={() => decrease(item.id)}
              className="rounded-lg bg-slate-700 p-2 transition hover:bg-slate-600 active:scale-95"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-[40px] text-center text-lg font-bold text-white">
              {item.quantity}
            </span>

            <button
              onClick={() => increase(item.id)}
              className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-500 active:scale-95"
            >
              <Plus size={16} />
            </button>

          </div>

          <button
            onClick={() =>
              removeFromCart(item.id)
            }
            className="rounded-lg bg-red-600 p-2 transition hover:bg-red-500 active:scale-95"
            title="Xóa sản phẩm"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}