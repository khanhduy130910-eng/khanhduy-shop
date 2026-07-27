export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "telegram-mini-app");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/doayztsxy/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Upload ảnh thất bại");
  }

  const data = await response.json();

  return data.secure_url;
}