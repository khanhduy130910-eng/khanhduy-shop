import { useState } from "react";

import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";
import OrderTable from "../../components/admin/OrderTable";
import KeyManagerPage from "./KeyManagerPage";

import useAdminProducts from "../../hooks/useAdminProducts";
import useAdminOrders from "../../hooks/useAdminOrders";

export default function AdminPage() {
  const [tab, setTab] = useState("products");

  const {
    products,
    loading: productLoading,
    refresh: refreshProducts,
  } = useAdminProducts();

  const {
    orders,
    loading: orderLoading,
    refresh: refreshOrders,
  } = useAdminOrders();

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Trang quản trị
      </h1>

      <div className="flex gap-2">

        <button
          onClick={() => setTab("products")}
          className={`rounded-lg px-4 py-2 ${
            tab === "products"
              ? "bg-blue-600"
              : "bg-slate-800"
          }`}
        >
          Sản phẩm
        </button>

        <button
          onClick={() => setTab("orders")}
          className={`rounded-lg px-4 py-2 ${
            tab === "orders"
              ? "bg-blue-600"
              : "bg-slate-800"
          }`}
        >
          Đơn hàng
        </button>

        <button
          onClick={() => setTab("keys")}
          className={`rounded-lg px-4 py-2 ${
            tab === "keys"
              ? "bg-blue-600"
              : "bg-slate-800"
          }`}
        >
          Kho Key
        </button>

      </div>

      {tab === "products" && (
        <>
          <ProductForm />

          <ProductTable
            products={products}
            refresh={refreshProducts}
          />
        </>
      )}

      {tab === "orders" &&
        (orderLoading ? (
          <p>Đang tải...</p>
        ) : (
          <OrderTable
            orders={orders}
            refresh={refreshOrders}
          />
        ))}

      {tab === "keys" && (
        <KeyManagerPage />
      )}

    </div>
  );
}