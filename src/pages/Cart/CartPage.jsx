import useCart from "../../hooks/useCart";
import CartItem from "../../components/shop/CartItem";

export default function CartPage() {
  const {
    items,
    totalPrice,
    clearCart,
  } = useCart();

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-6 text-2xl font-bold text-white">
        Giỏ hàng
      </h1>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-slate-800 p-10 text-center">
          <p className="text-lg text-slate-400">
            🛒 Giỏ hàng đang trống
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Hãy thêm sản phẩm để bắt đầu mua sắm.
          </p>
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

            <button className="mt-3 w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-500">
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
}