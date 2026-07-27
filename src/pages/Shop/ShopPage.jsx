import { useMemo, useState } from "react";

import SearchBar from "../../components/shop/SearchBar";
import CategoryFilter from "../../components/shop/CategoryFilter";
import ProductGrid from "../../components/shop/ProductGrid";
import EmptyState from "../../components/shop/EmptyState";

import useProducts from "../../hooks/useProducts";

export default function ShopPage() {
  const { products, loading } = useProducts();

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Tất cả");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchKeyword = product.name
        .toLowerCase()
        .includes(keyword.toLowerCase());

      const matchCategory =
        category === "Tất cả" ||
        product.category === category;

      return matchKeyword && matchCategory;
    });
  }, [products, keyword, category]);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Cửa hàng
      </h1>

      <SearchBar
        value={keyword}
        onChange={setKeyword}
      />

      <CategoryFilter
        selected={category}
        onSelect={setCategory}
      />

      {loading ? (
        <p className="text-center text-slate-400">
          Đang tải...
        </p>
      ) : filteredProducts.length ? (
        <ProductGrid
          products={filteredProducts}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
