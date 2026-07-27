import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getPriceInfo, formatPrice } from "../../config/priceEngine";

export default function ProductCard({ product }) {
    const { user } = useAuth();

    const {
        currentPrice,
        normalPrice,
        sellerPrice,
        saving,
        showSellerPrice,
    } = getPriceInfo(product, user);

    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg">

            <Link to={`/product/${product.id}`}>

                <img
                    src={product.image}
                    alt={product.name}
                    className="h-60 w-full object-cover"
                />

            </Link>

            <div className="p-4">

                <h2 className="line-clamp-2 text-lg font-bold">
                    {product.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {product.description}
                </p>

                <div className="mt-4">

                    <div className="text-2xl font-bold text-red-600">
                        {formatPrice(currentPrice)}
                    </div>

                    {showSellerPrice && (
                        <div className="mt-1 text-sm text-orange-600">
                            Giá Seller: {formatPrice(sellerPrice)}
                        </div>
                    )}

                    {saving > 0 && (
                        <div className="mt-1 text-sm text-green-600">
                            Tiết kiệm {formatPrice(saving)}
                        </div>
                    )}

                    {currentPrice !== normalPrice && (
                        <div className="text-sm text-gray-400 line-through">
                            {formatPrice(normalPrice)}
                        </div>
                    )}

                </div>

                <Link
                    to={`/product/${product.id}`}
                    className="mt-5 block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                    Xem chi tiết
                </Link>

            </div>

        </div>
    );
}