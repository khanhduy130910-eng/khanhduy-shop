import { useState } from "react";

import { updateOrderStatus } from "../../services/orderService";
import { deliverKeys } from "../../services/keyService";

export default function OrderTable({
  orders,
  refresh,
}) {
  const [processing, setProcessing] = useState("");

  async function handleApprove(id) {
    try {
      setProcessing(id);

      await updateOrderStatus(id, "paid");

      alert("Đã xác nhận thanh toán.");

      refresh();
    } catch (err) {
      console.error(err);
      alert("Không thể duyệt đơn.");
    } finally {
      setProcessing("");
    }
  }

  async function handleComplete(order) {
    try {
      setProcessing(order.id);

      await deliverKeys(order);

      alert("Đã giao key thành công.");

      refresh();
    } catch (err) {
      console.error(err);
      alert(err.message || "Không thể giao key.");
    } finally {
      setProcessing("");
    }
  }

  if (!orders.length) {
    return (
      <div className="rounded-xl bg-slate-900 p-6 text-center">
        Chưa có đơn hàng.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-slate-900">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="p-3 text-left">Mã đơn</th>
            <th className="p-3 text-left">Khách hàng</th>
            <th className="p-3 text-left">Telegram</th>
            <th className="p-3 text-left">Tổng tiền</th>
            <th className="p-3 text-left">Biên lai</th>
            <th className="p-3 text-left">Trạng thái</th>
            <th className="p-3 text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-slate-800"
            >
              <td className="p-3 font-mono text-xs">
                {order.id}
              </td>

              <td className="p-3">
                {order.customer?.name}
              </td>

              <td className="p-3">
                {order.customer?.telegram || "-"}
              </td>

              <td className="p-3">
                {Number(order.totalPrice).toLocaleString("vi-VN")}₫
              </td>

              <td className="p-3">
                {order.paymentProof ? (
                  <a
                    href={order.paymentProof}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Xem ảnh
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td className="p-3">
                {order.status}
              </td>

              <td className="p-3">
                <div className="flex justify-center gap-2">

                  {order.status === "pending_review" && (
                    <button
                      disabled={processing === order.id}
                      onClick={() => handleApprove(order.id)}
                      className="rounded-lg bg-green-600 px-4 py-2 hover:bg-green-700 disabled:opacity-50"
                    >
                      Duyệt
                    </button>
                  )}

                  {order.status === "paid" && (
                    <button
                      disabled={processing === order.id}
                      onClick={() => handleComplete(order)}
                      className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
                    >
                      Giao key
                    </button>
                  )}

                  {order.status === "completed" && (
                    <span className="rounded-lg bg-emerald-700 px-3 py-2 text-sm">
                      Đã giao
                    </span>
                  )}

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}