import { ROLES } from "./permissions";

/**
 * Lấy giá hiển thị theo quyền người dùng
 */
export function getProductPrice(product, user = null) {
    if (!product) return 0;

    const role = user?.role || ROLES.CUSTOMER;

    if (
        role === ROLES.SELLER &&
        typeof product.sellerPrice === "number"
    ) {
        return product.sellerPrice;
    }

    return product.price ?? 0;
}

/**
 * Giá gốc
 */
export function getOriginalPrice(product) {
    return product?.price ?? 0;
}

/**
 * Giá seller
 */
export function getSellerPrice(product) {
    return product?.sellerPrice ?? product?.price ?? 0;
}

/**
 * Tiết kiệm bao nhiêu
 */
export function getSaving(product) {
    const normal = getOriginalPrice(product);
    const seller = getSellerPrice(product);

    return Math.max(0, normal - seller);
}

/**
 * Có được xem giá seller không
 */
export function canShowSellerPrice(user) {
    if (!user) return false;

    return (
        user.role === ROLES.SELLER ||
        user.role === ROLES.ADMIN
    );
}

/**
 * Format tiền VND
 */
export function formatPrice(price = 0) {
    return Number(price).toLocaleString("vi-VN") + "₫";
}

/**
 * Trả về toàn bộ thông tin giá
 */
export function getPriceInfo(product, user = null) {
    const normalPrice = getOriginalPrice(product);

    const sellerPrice = getSellerPrice(product);

    const currentPrice = getProductPrice(product, user);

    return {
        normalPrice,

        sellerPrice,

        currentPrice,

        saving: Math.max(0, normalPrice - sellerPrice),

        isSeller:
            user?.role === ROLES.SELLER,

        isAdmin:
            user?.role === ROLES.ADMIN,

        showSellerPrice:
            canShowSellerPrice(user),
    };
}