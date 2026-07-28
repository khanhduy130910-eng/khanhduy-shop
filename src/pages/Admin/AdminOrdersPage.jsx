// src/pages/Admin/AdminOrdersPage.jsx

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/orderService";

const STATUS = {
  pending_payment: "Chờ thanh toán",
  pending_review: "Chờ xác nhận",
  paid: "Đã thanh toán",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export default function AdminOrdersPage() {
  const [loading, setLoading] =
    useState(true);

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);

      const data =
        await getAllOrders();

      setOrders(data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Không thể tải đơn hàng."
      );
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(
    id,
    status
  ) {
    try {
      await updateOrderStatus(
        id,
        status
      );

      toast.success(
        "Cập nhật thành công."
      );

      loadOrders();
    } catch (error) {
      console.error(error);

      toast.error(
        "Không thể cập nhật."
      );
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <h1 className="mb-6 text-2xl font-bold text-white">
        Quản lý đơn hàng
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl bg-slate-800 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-white">
                  #{order.id.slice(0, 8)}
                </div>

                <div className="text-sm text-slate-400">
                  {order.customer?.name}
                </div>

                <div className="text-sm text-slate-400">
                  {order.customer?.phone}
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-green-400">
                  {Number(
                    order.finalPrice ||
                      order.totalPrice
                  ).toLocaleString(
                    "vi-VN"
                  )}
                  ₫
                </div>

                <div className="text-sm text-yellow-400">
                  {STATUS[
                    order.status
                  ] || order.status}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name} ×{" "}
                    {item.quantity}
                  </span>

                  <span>
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString(
                      "vi-VN"
                    )}
                    ₫
                  </span>
                </div>
              ))}
            </div>

            {order.paymentProof && (
              <div className="mt-4">
                <img
                  src={order.paymentProof}
                  alt="payment"
                  className="max-h-72 rounded-xl"
                />
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() =>
                  changeStatus(
                    order.id,
                    "paid"
                  )
                }
                className="rounded-lg bg-green-600 px-4 py-2"
              >
                Xác nhận
              </button>

              <button
                onClick={() =>
                  changeStatus(
                    order.id,
                    "completed"
                  )
                }
                className="rounded-lg bg-blue-600 px-4 py-2"
              >
                Hoàn thành
              </button>

              <button
                onClick={() =>
                  changeStatus(
                    order.id,
                    "cancelled"
                  )
                }
                className="rounded-lg bg-red-600 px-4 py-2"
              >
                Hủy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}