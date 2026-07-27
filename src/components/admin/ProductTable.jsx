import { useState } from "react";
import {
  deleteProduct,
} from "../../services/adminQueryService";
import EditProductModal from "./EditProductModal";

export default function ProductTable({
  products,
  refresh,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  async function handleDelete(id) {
    const ok = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");

    if (!ok) return;

    try {
      await deleteProduct(id);

      alert("Đã xóa sản phẩm.");

      refresh();
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại.");
    }
  }

  function handleEdit(product) {
    setSelectedProduct(product);
    setOpen(true);
  }

  if (!products.length) {
    return (
      <div className="rounded-xl bg-slate-900 p-6 text-center">
        Chưa có sản phẩm.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl bg-slate-900">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-3 text-left">Ảnh</th>
              <th className="p-3 text-left">Tên</th>
              <th className="p-3 text-left">Giá</th>
              <th className="p-3 text-left">Danh mục</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-800"
              >
                <td className="p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </td>

                <td className="p-3">{item.name}</td>

                <td className="p-3">
                  {Number(item.price).toLocaleString("vi-VN")}₫
                </td>

                <td className="p-3">
                  {item.category}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
                    >
                      Sửa
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditProductModal
        open={open}
        product={selectedProduct}
        onClose={() => setOpen(false)}
        onUpdated={refresh}
      />
    </>
  );
}