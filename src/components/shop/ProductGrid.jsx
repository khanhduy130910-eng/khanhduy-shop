import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <p className="text-center text-slate-400">
        Chưa có sản phẩm.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}