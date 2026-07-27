import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { useCartStore } from "../../store/cartStore";

import {
    formatPrice,
    getPriceInfo,
} from "../../config/priceEngine";

export default function ProductDetail({ product }) {
    const navigate = useNavigate();

    const { user } = useAuth();

    const addToCart = useCartStore(
        (state) => state.addToCart
    );

    const price = useMemo(() => {
        if (!product) return null;

        return getPriceInfo(product, user);
    }, [product, user]);

    if (!product) {
        return (
            <div className="flex h-screen items-center justify-center">
                Không tìm thấy sản phẩm
            </div>
        );
    }

    const handleAddCart = () => {
        addToCart({
            ...product,
            price: price.currentPrice,
        });
    };

    const handleBuyNow = () => {
        handleAddCart();
        navigate("/checkout");
    };

    return (
        <div className="mx-auto max-w-7xl p-6">
            <div className="grid gap-10 lg:grid-cols-2">
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-2xl border"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold">
                        {product.name}
                    </h1>

                    <p className="mt-4 text-gray-600">
                        {product.description}
                    </p>

                    <div className="mt-8">
                        <div className="text-4xl font-bold text-red-600">
                            {formatPrice(price.currentPrice)}
                        </div>

                        {price.currentPrice !== price.normalPrice && (
                            <div className="mt-2 text-lg text-gray-400 line-through">
                                {formatPrice(price.normalPrice)}
                            </div>
                        )}

                        {price.showSellerPrice && (
                            <div className="mt-3 rounded-lg bg-orange-50 p-3 text-orange-600">
                                Giá Seller:
                                <strong className="ml-2">
                                    {formatPrice(price.sellerPrice)}
                                </strong>
                            </div>
                        )}

                        {price.saving > 0 && (
                            <div className="mt-3 rounded-lg bg-green-50 p-3 text-green-600">
                                Tiết kiệm{" "}
                                {formatPrice(price.saving)}
                            </div>
                        )}
                    </div>

                    <div className="mt-10 flex gap-4">
                        <button
                            onClick={handleAddCart}
                            className="flex-1 rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Thêm vào giỏ
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className="flex-1 rounded-xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700"
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}