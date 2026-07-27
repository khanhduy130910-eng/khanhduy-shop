import { Link } from "react-router-dom";

import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

import CartItem from "../../components/shop/CartItem";

export default function CartPage() {
  const {
    items,
    totalPrice,
    totalQuantity,
    clearCart,
  } = useCart();

  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-md p-4">

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-white">
          Giỏ hàng
        </h1>

        {user && (
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            {user.role}
          </span>
        )}

      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-slate-800 p-10 text-center">

          <p className="text-lg text-slate-400">
            🛒 Giỏ hàng đang trống
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Hãy thêm sản phẩm để bắt đầu mua sắm.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Tiếp tục mua sắm
          </Link>

        </div>
      ) : (
        <>

          <div className="space-y-4">

            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}

          </div>

          <div className="mt-8 rounded-2xl bg-slate-800 p-5">

            <div className="mb-4 flex items-center justify-between">

              <span className="text-slate-400">
                Số sản phẩm
              </span>

              <span className="font-semibold text-white">
                {totalQuantity}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-400">
                Tổng tiền
              </span>

              <span className="text-2xl font-bold text-blue-400">
                {totalPrice.toLocaleString("vi-VN")}₫
              </span>

            </div>

            <button
              onClick={clearCart}
              className="mt-5 w-full rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-500"
            >
              Xóa toàn bộ giỏ hàng
            </button>

            <Link
              to="/checkout"
              className="mt-3 flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Thanh toán
            </Link>

          </div>

        </>
      )}

    </div>
  );
}