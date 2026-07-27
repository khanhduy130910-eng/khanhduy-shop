import { Minus, Plus, Trash2 } from "lucide-react";
import useCart from "../../hooks/useCart";

export default function CartItem({ item }) {
  const {
    increase,
    decrease,
    removeFromCart,
  } = useCart();

  const total = item.price * item.quantity;

  return (
    <div className="flex gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-4 transition-all duration-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20">
      <img
        src={item.image}
        alt={item.name}
        onError={(e) => {
          e.target.src = "https://placehold.co/200x200?text=No+Image";
        }}
        className="h-24 w-24 rounded-xl object-cover"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="line-clamp-2 text-base font-semibold text-white">
            {item.name}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Đơn giá
          </p>

          <p className="font-bold text-blue-400">
            {item.price.toLocaleString("vi-VN")}₫
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Thành tiền
          </p>

          <p className="font-bold text-green-400">
            {total.toLocaleString("vi-VN")}₫
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => decrease(item.id)}
              className="rounded-lg bg-slate-700 p-2 transition hover:bg-slate-600 active:scale-95"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-[36px] text-center text-lg font-bold">
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
            onClick={() => removeFromCart(item.id)}
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