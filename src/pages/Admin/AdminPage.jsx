import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";
import useAdminProducts from "../../hooks/useAdminProducts";

export default function AdminPage() {
  const { products, loading, refresh } = useAdminProducts();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Quản lý sản phẩm
      </h1>

      <ProductForm />

      <hr className="border-slate-700" />

      <h2 className="text-2xl font-semibold">
        Danh sách sản phẩm
      </h2>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <ProductTable
          products={products}
          refresh={refresh}
        />
      )}
    </div>
  );
}