import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  ArrowLeft,
} from "lucide-react";

import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

import CartItem from "../../components/shop/CartItem";

export default function CartPage() {
  const {
    items,

    selectedItems,
    selectedQuantity,
    selectedTotalPrice,

    toggleSelectAll,

    clearCart,

    getSelectedItems,
  } = useCart();

  const { user } = useAuth();

  const allSelected =
    items.length > 0 &&
    items.every((i) => i.selected);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">

          <ShoppingCart
            size={72}
            className="mx-auto mb-6 text-zinc-600"
          />

          <h2 className="text-3xl font-bold text-white">
            Giỏ hàng đang trống
          </h2>

          <p className="mt-3 text-zinc-400">
            Hãy thêm sản phẩm để tiếp tục mua sắm.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
          >
            <ArrowLeft size={18} />
            Tiếp tục mua sắm
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-extrabold text-white">
            Giỏ hàng
          </h1>

          <p className="mt-2 text-zinc-400">
            {items.length} sản phẩm
          </p>

        </div>

        {user && (
          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            {user.role}
          </span>
        )}

      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

        <section>

          <button
            onClick={toggleSelectAll}
            className="mb-5 rounded-xl border border-zinc-700 px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            {allSelected
              ? "Bỏ chọn tất cả"
              : "Chọn tất cả"}
          </button>

          <div className="space-y-4">

            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}

          </div>

        </section>

        <aside className="sticky top-24 h-fit rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-6 text-xl font-bold text-white">
            Thanh toán
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between text-zinc-400">
              <span>Đã chọn</span>

              <span>
                {selectedQuantity}
              </span>
            </div>

            <div className="flex justify-between text-zinc-400">
              <span>Sản phẩm</span>

              <span>
                {selectedItems.length}
              </span>
            </div>

            <div className="border-t border-zinc-800 pt-4">

              <div className="flex justify-between">

                <span className="text-lg font-semibold text-white">
                  Tổng cộng
                </span>

                <span className="text-3xl font-extrabold text-blue-400">
                  {selectedTotalPrice.toLocaleString(
                    "vi-VN"
                  )}
                  ₫
                </span>

              </div>

            </div>

          </div>

          <Link
            to="/checkout"
            state={{
              items:
                getSelectedItems
                  ? getSelectedItems()
                  : selectedItems,
            }}
            className={`mt-8 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white transition ${
              selectedItems.length
                ? "bg-blue-600 hover:bg-blue-500"
                : "pointer-events-none bg-zinc-700"
            }`}
          >
            <CreditCard size={20} />
            Thanh toán
          </Link>

          <button
            onClick={clearCart}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500 py-4 font-semibold text-red-400 hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={18} />
            Xóa toàn bộ
          </button>

        </aside>

      </div>

    </main>
  );
}