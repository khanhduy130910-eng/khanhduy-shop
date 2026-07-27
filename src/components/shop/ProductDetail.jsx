import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Button from "../ui/Button";
import useCart from "../../hooks/useCart";

export default function ProductDetail({ product }) {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="rounded-2xl bg-slate-800 p-8 text-center">
        <p className="text-slate-400">
          Không tìm thấy sản phẩm.
        </p>
      </div>
    );
  }

  const price = Number(product.price) || 0;

  function handleAddToCart() {
    addToCart(product);
    toast.success("Đã thêm vào giỏ hàng");
  }

  function handleBuyNow() {
    addToCart(product);

    toast.success("Đang chuyển đến giỏ hàng...");

    navigate("/cart");
  }

  return (
    <div className="space-y-6">
      <img
        src={product.image}
        alt={product.name}
        onError={(e) => {
          e.target.src = "https://placehold.co/800x800?text=No+Image";
        }}
        className="h-72 w-full rounded-2xl border border-slate-700 object-cover"
      />

      <div>
        <h1 className="text-3xl font-bold text-white">
          {product.name}
        </h1>

        <p className="mt-3 leading-7 text-slate-400">
          {product.description || "Chưa có mô tả cho sản phẩm này."}
        </p>

        <p className="mt-6 text-3xl font-bold text-blue-400">
          {price.toLocaleString("vi-VN")}₫
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          className="flex-1"
          onClick={handleBuyNow}
        >
          Mua ngay
        </Button>

        <Button
          className="flex-1"
          variant="secondary"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
}