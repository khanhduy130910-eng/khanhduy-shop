import { useState } from "react";

import ImageUploader from "../../components/admin/ImageUploader";

export default function TestUploadPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Test Upload Cloudinary
      </h1>

      <ImageUploader
        onUploaded={setImageUrl}
      />

      {imageUrl && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Upload thành công
          </h2>

          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full rounded-2xl"
          />

          <textarea
            readOnly
            value={imageUrl}
            className="h-28 w-full rounded-xl bg-slate-900 p-3 text-sm"
          />
        </div>
      )}
    </div>
  );
}