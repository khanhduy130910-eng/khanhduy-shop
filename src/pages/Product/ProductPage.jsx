import { useParams } from "react-router-dom";

import useProduct from "../../hooks/useProduct";
import ProductDetail from "../../components/shop/ProductDetail";
import ProductLoading from "../../components/shop/ProductLoading";

export default function ProductPage() {
  const { id } = useParams();

  const { product, loading } = useProduct(id);

  if (loading) {
    return <ProductLoading />;
  }

  if (!product) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-white">
          Không tìm thấy sản phẩm
        </h2>

        <p className="mt-2 text-slate-400">
          Sản phẩm có thể đã bị xóa hoặc không tồn tại.
        </p>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}