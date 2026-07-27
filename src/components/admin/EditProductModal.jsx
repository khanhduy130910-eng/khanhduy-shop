import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { updateProduct } from "../../services/adminQueryService";

export default function EditProductModal({
  product,
  open,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
        image: product.image || "",
      });
    }
  }, [product]);

  if (!open || !product) return null;

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSave() {
    try {
      setSaving(true);

      await updateProduct(product.id, {
        ...form,
        price: Number(form.price),
      });

      alert("Cập nhật thành công.");

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 p-6 space-y-4">
        <h2 className="text-2xl font-bold">Sửa sản phẩm</h2>

        <ImageUploader
          onUploaded={(url) => updateField("image", url)}
        />

        {form.image && (
          <img
            src={form.image}
            alt=""
            className="h-40 w-full rounded-xl object-cover"
          />
        )}

        <input
          className="w-full rounded-xl bg-slate-800 p-3"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Tên sản phẩm"
        />

        <input
          className="w-full rounded-xl bg-slate-800 p-3"
          type="number"
          value={form.price}
          onChange={(e) => updateField("price", e.target.value)}
          placeholder="Giá"
        />

        <input
          className="w-full rounded-xl bg-slate-800 p-3"
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
          placeholder="Danh mục"
        />

        <textarea
          className="w-full rounded-xl bg-slate-800 p-3"
          rows={4}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Mô tả"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-600 px-5 py-2"
          >
            Hủy
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2 disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}