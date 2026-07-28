import { useMemo, useState } from "react";
import {
    SlidersHorizontal,
    Sparkles,
} from "lucide-react";

import SearchBar from "../../components/shop/SearchBar";
import CategoryFilter from "../../components/shop/CategoryFilter";
import ProductGrid from "../../components/shop/ProductGrid";
import EmptyState from "../../components/shop/EmptyState";

import useProducts from "../../hooks/useProducts";

export default function ShopPage() {
    const { products, loading } = useProducts();

    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [sort, setSort] = useState("newest");

    const filteredProducts = useMemo(() => {
        const list = products.filter((product) => {
            const matchKeyword = product.name
                .toLowerCase()
                .includes(keyword.toLowerCase());

            const matchCategory =
                category === "Tất cả" ||
                product.category === category;

            return matchKeyword && matchCategory;
        });

        switch (sort) {
            case "price-asc":
                return [...list].sort((a, b) => a.price - b.price);

            case "price-desc":
                return [...list].sort((a, b) => b.price - a.price);

            case "name":
                return [...list].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

            default:
                return list;
        }
    }, [products, keyword, category, sort]);

    return (
        <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">

            {/* Banner */}

            <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">

                <div className="flex items-center justify-between">

                    <div>

                        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur">

                            <Sparkles size={16} />

                            Khuyến mãi hôm nay

                        </div>

                        <h1 className="text-4xl font-extrabold">
                            Cửa hàng
                        </h1>

                        <p className="mt-2 text-blue-100">
                            Khám phá các sản phẩm mới nhất.
                        </p>

                    </div>

                </div>

            </section>

            {/* Search */}

            <SearchBar
                value={keyword}
                onChange={setKeyword}
            />

            {/* Category */}

            <CategoryFilter
                selected={category}
                onSelect={setCategory}
            />

            {/* Toolbar */}

            <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:flex-row md:items-center md:justify-between">

                <div className="flex items-center gap-2 text-zinc-300">

                    <SlidersHorizontal size={18} />

                    <span>
                        {filteredProducts.length} sản phẩm
                    </span>

                </div>

                <select
                    value={sort}
                    onChange={(e) =>
                        setSort(e.target.value)
                    }
                    className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none"
                >
                    <option value="newest">
                        Mới nhất
                    </option>

                    <option value="price-asc">
                        Giá tăng dần
                    </option>

                    <option value="price-desc">
                        Giá giảm dần
                    </option>

                    <option value="name">
                        Tên A-Z
                    </option>

                </select>

            </div>

            {/* Product */}

            {loading ? (
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">

                    {Array.from({
                        length: 8,
                    }).map((_, index) => (
                        <div
                            key={index}
                            className="h-80 animate-pulse rounded-3xl bg-zinc-800"
                        />
                    ))}

                </div>
            ) : filteredProducts.length ? (
                <ProductGrid
                    products={filteredProducts}
                />
            ) : (
                <EmptyState />
            )}

        </main>
    );
}