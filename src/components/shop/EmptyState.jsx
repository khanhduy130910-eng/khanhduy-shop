import { PackageOpen } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="py-16 text-center">
      <PackageOpen
        size={60}
        className="mx-auto text-slate-600"
      />

      <h2 className="mt-5 text-2xl font-bold">
        Chưa có sản phẩm
      </h2>

      <p className="mt-2 text-slate-400">
        Hãy thêm sản phẩm trong trang Admin.
      </p>
    </div>
  );
}