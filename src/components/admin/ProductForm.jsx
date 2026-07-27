import { useState } from "react";

import ImageUploader from "./ImageUploader";
import { addProduct } from "../../services/adminService";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "key",
    description: "",
    image: "",
  });

  const [saving, setSaving] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.image) {
      alert("Vui lòng upload ảnh.");
      return;
    }

    if (!form.name.trim()) {
      alert("Vui lòng nhập tên sản phẩm.");
      return;
    }

    if (!form.price) {
      alert("Vui lòng nhập giá.");
      return;
    }

    try {
      setSaving(true);

      await addProduct({
        ...form,
        price: Number(form.price),
      });

      alert("Đã thêm sản phẩm thành công.");

      setForm({
        name: "",
        price: "",
        category: "key",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
      alert("Không thể lưu sản phẩm.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ImageUploader
        onUploaded={(url) => updateField("image", url)}
      />

      {form.image && (
        <img
          src={form.image}
          alt="Preview"
          className="h-40 w-full rounded-xl object-cover"
        />
      )}

      <input
        className="w-full rounded-xl bg-slate-900 p-3"
        placeholder="Tên sản phẩm"
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
      />

      <input
        className="w-full rounded-xl bg-slate-900 p-3"
        type="number"
        placeholder="Giá"
        value={form.price}
        onChange={(e) => updateField("price", e.target.value)}
      />

      <select
        className="w-full rounded-xl bg-slate-900 p-3"
        value={form.category}
        onChange={(e) => updateField("category", e.target.value)}
      >
        <option value="key">Key</option>
        <option value="vip">VIP</option>
        <option value="account">Account</option>
      </select>

      <textarea
        className="w-full rounded-xl bg-slate-900 p-3"
        rows={4}
        placeholder="Mô tả"
        value={form.description}
        onChange={(e) =>
          updateField("description", e.target.value)
        }
      />

      <button
        disabled={saving}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Đang lưu..." : "Lưu sản phẩm"}
      </button>
    </form>
  );
}