import { useMemo } from "react";
import { useAuthStore } from "../store/authStore";
import {
    PERMISSIONS,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessAdmin,
    canManageUsers,
    canManageProducts,
    canManageKeys,
    canManageOrders,
    canApproveOrder,
    canViewSellerPrice,
    canBuy,
} from "../config/permissions";

export default function usePermission() {
    const { role } = useAuthStore();

    const permissions = useMemo(() => {
        return {
            accessAdmin: canAccessAdmin(role),

            manageUsers: canManageUsers(role),

            manageProducts: canManageProducts(role),

            manageKeys: canManageKeys(role),

            manageOrders: canManageOrders(role),

            approveOrder: canApproveOrder(role),

            viewSellerPrice: canViewSellerPrice(role),

            buy: canBuy(role),
        };
    }, [role]);

    const has = (permission) => {
        return hasPermission(role, permission);
    };

    const hasAny = (permissionList = []) => {
        return hasAnyPermission(role, permissionList);
    };

    const hasAll = (permissionList = []) => {
        return hasAllPermissions(role, permissionList);
    };

    return {
        role,

        permissions,

        has,

        hasAny,

        hasAll,

        canAccessAdmin: permissions.accessAdmin,

        canManageUsers: permissions.manageUsers,

        canManageProducts: permissions.manageProducts,

        canManageKeys: permissions.manageKeys,

        canManageOrders: permissions.manageOrders,

        canApproveOrder: permissions.approveOrder,

        canViewSellerPrice: permissions.viewSellerPrice,

        canBuy: permissions.buy,

        PERMISSIONS,
    };
}