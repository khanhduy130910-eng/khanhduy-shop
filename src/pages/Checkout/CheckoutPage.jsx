import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

import { createOrder } from "../../services/orderService";

import {
  getCouponByCode,
  increaseCouponUsed,
} from "../../services/couponService";

import {
  getWalletBalance,
  deductBalance,
} from "../../services/walletService";

import { calculateCoupon } from "../../utils/coupon";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    items,
    selectedItems,
    selectedTotalPrice,
    selectedQuantity,
    removeSelectedItems,
  } = useCart();

  const [loading, setLoading] =
    useState(false);

  const [
    checkingCoupon,
    setCheckingCoupon,
  ] = useState(false);

  const [couponCode, setCouponCode] =
    useState("");

  const [coupon, setCoupon] =
    useState(null);

  const [discount, setDiscount] =
    useState(0);

  const [finalPrice, setFinalPrice] =
    useState(selectedTotalPrice);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    telegram: user?.telegram || "",
    note: "",
    paymentMethod: "bank",
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    if (selectedItems.length === 0) {
      toast.error(
        "Vui lòng chọn sản phẩm."
      );

      navigate("/cart");
    }
  }, [items, selectedItems, navigate]);

  useEffect(() => {
    if (!coupon) {
      setDiscount(0);
      setFinalPrice(selectedTotalPrice);
      return;
    }

    const calc = calculateCoupon(
      selectedTotalPrice,
      coupon
    );

    if (calc.discount <= 0) {
      toast(
        "Mã giảm giá không còn hợp lệ."
      );

      setCoupon(null);
      setDiscount(0);
      setFinalPrice(selectedTotalPrice);

      return;
    }

    setDiscount(calc.discount);
    setFinalPrice(calc.total);
  }, [coupon, selectedTotalPrice]);

  const canCheckout = useMemo(() => {
    return (
      selectedItems.length > 0 &&
      form.name.trim() &&
      form.phone.trim()
    );
  }, [selectedItems, form]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleApplyCoupon() {
    if (!couponCode.trim()) {
      toast.error("Nhập mã giảm giá.");
      return;
    }

    try {
      setCheckingCoupon(true);

      setCoupon(null);
      setDiscount(0);
      setFinalPrice(selectedTotalPrice);

      const result =
        await getCouponByCode(
          couponCode.trim().toUpperCase()
        );

      if (!result) {
        toast.error(
          "Không tìm thấy mã giảm giá."
        );
        return;
      }

      if (!result.active) {
        toast.error(
          "Mã giảm giá đã bị khóa."
        );
        return;
      }

      if (
        (result.used || 0) >=
        result.quantity
      ) {
        toast.error(
          "Mã giảm giá đã hết lượt."
        );
        return;
      }

      const calc =
        calculateCoupon(
          selectedTotalPrice,
          result
        );
              if (calc.discount <= 0) {
        toast.error(
          `Đơn tối thiểu ${result.minOrder.toLocaleString(
            "vi-VN"
          )}₫`
        );

        return;
      }

      setCoupon(result);
      setDiscount(calc.discount);
      setFinalPrice(calc.total);

      toast.success(
        "Áp dụng mã thành công."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Không thể kiểm tra mã giảm giá."
      );
    } finally {
      setCheckingCoupon(false);
    }
  }

  const handleSubmit = async () => {
    if (!canCheckout) {
      toast.error(
        "Vui lòng nhập đầy đủ thông tin."
      );
      return;
    }

    try {
      setLoading(true);

      let latestCoupon = null;

      if (coupon) {
        latestCoupon =
          await getCouponByCode(
            coupon.code
          );

        if (!latestCoupon) {
          toast.error(
            "Mã giảm giá không còn tồn tại."
          );
          return;
        }

        if (!latestCoupon.active) {
          toast.error(
            "Mã giảm giá đã bị khóa."
          );
          return;
        }

        if (
          (latestCoupon.used || 0) >=
          latestCoupon.quantity
        ) {
          toast.error(
            "Mã giảm giá đã hết lượt."
          );
          return;
        }
      }

      if (
        form.paymentMethod ===
        "wallet"
      ) {
        const balance =
          await getWalletBalance(
            user.uid
          );

        if (balance < finalPrice) {
          toast.error(
            "Số dư không đủ."
          );

          return;
        }

        await deductBalance(
          user.uid,
          finalPrice,
          "Thanh toán đơn hàng"
        );
      }

      const order =
        await createOrder({
          customer: {
            uid: user?.uid ?? "",
            name: form.name,
            phone: form.phone,
            telegram: form.telegram,
            note: form.note,
          },

          items: selectedItems,

          totalPrice:
            selectedTotalPrice,

          discount,

          finalPrice,

          coupon: latestCoupon
            ? {
                id: latestCoupon.id,
                code:
                  latestCoupon.code,
              }
            : null,

          paymentMethod:
            form.paymentMethod,

          status:
            form.paymentMethod ===
            "wallet"
              ? "paid"
              : "pending_payment",
        });

      if (latestCoupon) {
        await increaseCouponUsed(
          latestCoupon
        );
      }

      await removeSelectedItems();

      toast.success(
        "Đặt hàng thành công."
      );

      navigate(`/order/${order.id}`);
    } catch (error) {
      console.error(error);

      toast.error(
        "Không thể tạo đơn hàng."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-6 text-2xl font-bold text-white">
        Thanh toán
      </h1>

      <div className="rounded-2xl bg-slate-800 p-5">
        <div className="flex justify-between">
          <span className="text-slate-400">
            Sản phẩm
          </span>

          <span className="font-semibold text-white">
            {selectedQuantity}
          </span>
        </div>
                <div className="mt-3 flex justify-between">
          <span className="text-slate-400">
            Tạm tính
          </span>

          <span className="font-semibold text-white">
            {selectedTotalPrice.toLocaleString(
              "vi-VN"
            )}
            ₫
          </span>
        </div>

        <div className="mt-5 flex gap-2">
          <input
            value={couponCode}
            onChange={(e) =>
              setCouponCode(
                e.target.value.toUpperCase()
              )
            }
            placeholder="Nhập mã giảm giá"
            className="flex-1 rounded-xl bg-slate-700 p-3 outline-none"
          />

          <button
            onClick={handleApplyCoupon}
            disabled={
              checkingCoupon || loading
            }
            className="rounded-xl bg-green-600 px-4 font-semibold disabled:bg-slate-600"
          >
            {checkingCoupon
              ? "..."
              : "Áp dụng"}
          </button>
        </div>

        {coupon && (
          <div className="mt-4 rounded-xl border border-green-700 bg-green-900/20 p-3">
            <p className="font-semibold text-green-400">
              ✓ Đã áp dụng mã {coupon.code}
            </p>

            <p className="mt-1 text-sm text-slate-300">
              Tiết kiệm{" "}
              {discount.toLocaleString(
                "vi-VN"
              )}
              ₫
            </p>
          </div>
        )}

        <div className="mt-5 space-y-3 border-t border-slate-700 pt-4">
          <div className="flex justify-between">
            <span className="text-slate-400">
              Tạm tính
            </span>

            <span>
              {selectedTotalPrice.toLocaleString(
                "vi-VN"
              )}
              ₫
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">
              Giảm giá
            </span>

            <span className="text-green-400">
              -
              {discount.toLocaleString(
                "vi-VN"
              )}
              ₫
            </span>
          </div>

          <div className="flex justify-between text-xl font-bold">
            <span>Thành tiền</span>

            <span className="text-blue-400">
              {finalPrice.toLocaleString(
                "vi-VN"
              )}
              ₫
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-800 p-5">
        <h2 className="mb-4 font-semibold text-white">
          Thông tin người nhận
        </h2>

        <input
          name="name"
          placeholder="Họ và tên"
          value={form.name}
          onChange={handleChange}
          className="mb-3 w-full rounded-xl bg-slate-700 p-3 outline-none"
        />

        <input
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
          className="mb-3 w-full rounded-xl bg-slate-700 p-3 outline-none"
        />

        <input
          name="telegram"
          placeholder="Telegram Username"
          value={form.telegram}
          onChange={handleChange}
          className="mb-3 w-full rounded-xl bg-slate-700 p-3 outline-none"
        />

        <textarea
          rows={4}
          name="note"
          placeholder="Ghi chú"
          value={form.note}
          onChange={handleChange}
          className="w-full rounded-xl bg-slate-700 p-3 outline-none"
        />
      </div>
            <div className="mt-6 rounded-2xl bg-slate-800 p-5">
        <h2 className="mb-4 font-semibold text-white">
          Phương thức thanh toán
        </h2>

        <label className="mb-3 flex cursor-pointer items-center gap-3">
          <input
            type="radio"
            name="paymentMethod"
            value="bank"
            checked={
              form.paymentMethod === "bank"
            }
            onChange={handleChange}
          />

          <span>Chuyển khoản ngân hàng</span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="radio"
            name="paymentMethod"
            value="wallet"
            checked={
              form.paymentMethod ===
              "wallet"
            }
            onChange={handleChange}
          />

          <span>Số dư ví</span>
        </label>

        {form.paymentMethod ===
          "wallet" && (
          <div className="mt-4 rounded-xl border border-blue-500/40 bg-blue-500/10 p-4">
            <p className="text-sm text-blue-300">
              Thanh toán bằng số dư ví sẽ
              trừ tiền ngay sau khi đặt
              hàng thành công.
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={
          !canCheckout ||
          loading ||
          checkingCoupon
        }
        className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {loading
          ? "Đang tạo đơn..."
          : `Thanh toán ${finalPrice.toLocaleString(
              "vi-VN"
            )}₫`}
      </button>
    </div>
  );
}