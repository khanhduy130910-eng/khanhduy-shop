import { useMemo } from "react";

export default function AdminDashboard({
  products = [],
  orders = [],
  statistics = [],
}) {
  const dashboard = useMemo(() => {
    const revenue = orders
      .filter((o) => o.status === "completed")
      .reduce(
        (sum, o) => sum + Number(o.totalPrice || 0),
        0
      );

    const pending = orders.filter(
      (o) => o.status === "pending_review"
    ).length;

    const paid = orders.filter(
      (o) => o.status === "paid"
    ).length;

    const completed = orders.filter(
      (o) => o.status === "completed"
    ).length;

    const keyRemain = statistics.reduce(
      (sum, item) => sum + item.available,
      0
    );

    return {
      revenue,
      pending,
      paid,
      completed,
      products: products.length,
      keyRemain,
    };
  }, [orders, products, statistics]);

  const cards = [
    {
      title: "Doanh thu",
      value:
        dashboard.revenue.toLocaleString("vi-VN") + "₫",
    },
    {
      title: "Sản phẩm",
      value: dashboard.products,
    },
    {
      title: "Đơn chờ duyệt",
      value: dashboard.pending,
    },
    {
      title: "Đơn đã thanh toán",
      value: dashboard.paid,
    },
    {
      title: "Đơn hoàn thành",
      value: dashboard.completed,
    },
    {
      title: "Key còn lại",
      value: dashboard.keyRemain,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-slate-900 p-5"
        >
          <p className="text-sm text-slate-400">
            {card.title}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}