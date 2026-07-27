import { useState } from "react";
import { uploadImage } from "../../services/cloudinaryService";

export default function ImageUploader({ onUploaded }) {
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      const url = await uploadImage(file);

      onUploaded(url);
    } catch (error) {
      console.error(error);
      alert("Upload ảnh thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {loading && (
        <p className="text-blue-400">
          Đang upload...
        </p>
      )}
    </div>
  );
}