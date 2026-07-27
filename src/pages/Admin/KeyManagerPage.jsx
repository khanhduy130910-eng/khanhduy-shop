import { useState } from "react";
import toast from "react-hot-toast";

import { addKey } from "../../services/keyService";

export default function KeyManagerPage() {
  const [productId, setProductId] = useState("");
  const [keys, setKeys] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!productId.trim()) {
      toast.error("Nhập Product ID.");
      return;
    }

    const list = keys
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!list.length) {
      toast.error("Chưa có key.");
      return;
    }

    try {
      setLoading(true);

      for (const key of list) {
        await addKey(productId, key);
      }

      toast.success(`Đã thêm ${list.length} key.`);

      setKeys("");
    } catch (err) {
      console.error(err);
      toast.error("Không thể thêm key.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        Kho Key
      </h2>

      <input
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
        className="mb-4 w-full rounded-xl bg-slate-800 p-3"
      />

      <textarea
        rows={12}
        value={keys}
        onChange={(e) => setKeys(e.target.value)}
        placeholder={`Mỗi dòng là một key

ABCD-EFGH-IJKL
XXXX-YYYY-ZZZZ
1234-5678-ABCD`}
        className="w-full rounded-xl bg-slate-800 p-3"
      />

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="mt-5 rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Đang thêm..." : "Thêm Key"}
      </button>
    </div>
  );
}