import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const openDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className="overflow-hidden p-0">
      <img
        src={product.image}
        alt={product.name}
        className="h-44 w-full cursor-pointer object-cover"
        onClick={openDetail}
      />

      <div className="p-4">
        <h3
          className="cursor-pointer text-lg font-semibold text-white hover:text-blue-400"
          onClick={openDetail}
        >
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-slate-400">
          {product.description}
        </p>

        <p className="mt-3 text-xl font-bold text-blue-400">
          {product.price.toLocaleString("vi-VN")}₫
        </p>

        <Button className="mt-4 w-full" onClick={openDetail}>
          Xem chi tiết
        </Button>
      </div>
    </Card>
  );
}