import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getOrder,
  uploadPaymentProof,
} from "../../services/orderService";

import { uploadImage } from "../../services/cloudinaryService";

const STATUS = {
  pending_payment: {
    text: "Chờ thanh toán",
    color: "text-yellow-400",
  },
  pending_review: {
    text: "Chờ xác nhận",
    color: "text-orange-400",
  },
  paid: {
    text: "Đã thanh toán",
    color: "text-green-400",
  },
  completed: {
    text: "Hoàn thành",
    color: "text-green-400",
  },
  cancelled: {
    text: "Đã hủy",
    color: "text-red-400",
  },
};

export default function OrderDetailPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [id]);

  async function loadOrder() {
    try {
      setLoading(true);

      const data = await getOrder(id);

      setOrder(data);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải đơn hàng.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const imageUrl = await uploadImage(file);

      await uploadPaymentProof(id, imageUrl);

      toast.success("Đã gửi ảnh chuyển khoản.");

      await loadOrder();
    } catch (err) {
      console.error(err);
      toast.error("Upload thất bại.");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        Đang tải...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 text-center">
        Không tìm thấy đơn hàng.
      </div>
    );
  }

  const status =
    STATUS[order.status] ||
    STATUS.pending_payment;

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-6 text-2xl font-bold text-white">
        Chi tiết đơn hàng
      </h1>

      <div className="rounded-2xl bg-slate-800 p-5">
        <div className="flex justify-between">
          <span>ID</span>

          <span className="text-blue-400 break-all text-right">
            {order.id}
          </span>
        </div>

        <div className="mt-4 flex justify-between">
          <span>Trạng thái</span>

          <span
            className={`font-bold ${status.color}`}
          >
            {status.text}
          </span>
        </div>

        <div className="mt-4 flex justify-between">
          <span>Tạm tính</span>

          <span>
            {Number(
              order.totalPrice || 0
            ).toLocaleString("vi-VN")}
            ₫
          </span>
        </div>

        <div className="mt-4 flex justify-between">
          <span>Giảm giá</span>

          <span className="text-green-400">
            -
            {Number(
              order.discount || 0
            ).toLocaleString("vi-VN")}
            ₫
          </span>
        </div>

        <div className="mt-4 flex justify-between text-lg font-bold">
          <span>Thành tiền</span>

          <span className="text-green-400">
            {Number(
              order.finalPrice ||
                order.totalPrice ||
                0
            ).toLocaleString("vi-VN")}
            ₫
          </span>
        </div>

        {order.coupon && (
          <div className="mt-4 rounded-xl bg-slate-700 p-3 text-sm">
            Mã giảm giá:{" "}
            <span className="font-semibold text-green-400">
              {order.coupon.code}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl bg-slate-800 p-5">
        <h2 className="mb-4 font-semibold">
          Sản phẩm
        </h2>

        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-slate-700 pb-3"
            >
              <div>
                <p className="font-medium">
                  {item.name}
                </p>

                <p className="text-sm text-slate-400">
                  SL: {item.quantity}
                </p>
              </div>

              <span>
                {(
                  item.price *
                  item.quantity
                ).toLocaleString("vi-VN")}
                ₫
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-800 p-5">
        <h2 className="mb-4 font-semibold">
          Thông tin khách hàng
        </h2>

        <div className="space-y-2 text-sm">
          <p>
            <span className="text-slate-400">
              Họ tên:
            </span>{" "}
            {order.customer?.name}
          </p>

          <p>
            <span className="text-slate-400">
              SĐT:
            </span>{" "}
            {order.customer?.phone}
          </p>

          <p>
            <span className="text-slate-400">
              Telegram:
            </span>{" "}
            {order.customer?.telegram ||
              "-"}
          </p>

          <p>
            <span className="text-slate-400">
              Ghi chú:
            </span>{" "}
            {order.customer?.note || "-"}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-800 p-5">
        <h2 className="mb-4 font-semibold">
          Chuyển khoản
        </h2>

        {!order.paymentProof &&
          order.status ===
            "pending_payment" && (
            <>
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={handleUpload}
                className="w-full rounded-lg bg-slate-700 p-2"
              />

              <p className="mt-3 text-sm text-slate-400">
                Sau khi chuyển khoản,
                vui lòng tải ảnh biên lai
                lên để admin xác nhận.
              </p>
            </>
          )}

        {order.paymentProof && (
          <>
            <img
              src={order.paymentProof}
              alt="Biên lai chuyển khoản"
              className="w-full rounded-xl"
            />

            <div className="mt-4 rounded-lg bg-green-900/30 p-3 text-green-400">
              Đã gửi ảnh chuyển khoản.
              {order.status ===
              "pending_review"
                ? " Đang chờ admin xác nhận."
                : ""}
            </div>
          </>
        )}
      </div>
    </div>
  );
}