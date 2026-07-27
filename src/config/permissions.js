export const ROLES = {
    CUSTOMER: "customer",
    SELLER: "seller",
    ADMIN: "admin",
};

export const PERMISSIONS = {
    ACCESS_ADMIN: "access_admin",
    MANAGE_USERS: "manage_users",
    MANAGE_PRODUCTS: "manage_products",
    MANAGE_KEYS: "manage_keys",
    MANAGE_ORDERS: "manage_orders",
    VIEW_SELLER_PRICE: "view_seller_price",
    BUY_PRODUCT: "buy_product",
    APPROVE_ORDER: "approve_order",
};

const ROLE_PERMISSIONS = {
    customer: [
        PERMISSIONS.BUY_PRODUCT,
    ],

    seller: [
        PERMISSIONS.BUY_PRODUCT,
        PERMISSIONS.VIEW_SELLER_PRICE,
    ],

    admin: [
        PERMISSIONS.ACCESS_ADMIN,
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.MANAGE_PRODUCTS,
        PERMISSIONS.MANAGE_KEYS,
        PERMISSIONS.MANAGE_ORDERS,
        PERMISSIONS.VIEW_SELLER_PRICE,
        PERMISSIONS.BUY_PRODUCT,
        PERMISSIONS.APPROVE_ORDER,
    ],
};

export function getPermissions(role = ROLES.CUSTOMER) {
    return ROLE_PERMISSIONS[role] || [];
}

export function hasPermission(role, permission) {
    return getPermissions(role).includes(permission);
}

export function hasAnyPermission(role, permissions = []) {
    const current = getPermissions(role);

    return permissions.some((permission) =>
        current.includes(permission)
    );
}

export function hasAllPermissions(role, permissions = []) {
    const current = getPermissions(role);

    return permissions.every((permission) =>
        current.includes(permission)
    );
}

export function isAdmin(role) {
    return role === ROLES.ADMIN;
}

export function isSeller(role) {
    return role === ROLES.SELLER;
}

export function isCustomer(role) {
    return role === ROLES.CUSTOMER;
}

export function canAccessAdmin(role) {
    return hasPermission(role, PERMISSIONS.ACCESS_ADMIN);
}

export function canManageUsers(role) {
    return hasPermission(role, PERMISSIONS.MANAGE_USERS);
}

export function canManageProducts(role) {
    return hasPermission(role, PERMISSIONS.MANAGE_PRODUCTS);
}

export function canManageKeys(role) {
    return hasPermission(role, PERMISSIONS.MANAGE_KEYS);
}

export function canManageOrders(role) {
    return hasPermission(role, PERMISSIONS.MANAGE_ORDERS);
}

export function canApproveOrder(role) {
    return hasPermission(role, PERMISSIONS.APPROVE_ORDER);
}

export function canViewSellerPrice(role) {
    return hasPermission(role, PERMISSIONS.VIEW_SELLER_PRICE);
}

export function canBuy(role) {
    return hasPermission(role, PERMISSIONS.BUY_PRODUCT);
}