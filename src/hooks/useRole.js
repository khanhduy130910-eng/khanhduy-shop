import { useMemo } from "react";
import { useAuthStore } from "../store/authStore";

export default function useRole() {
    const { user, role } = useAuthStore();

    const isGuest = useMemo(() => {
        return !user;
    }, [user]);

    const isCustomer = useMemo(() => {
        return role === "customer";
    }, [role]);

    const isSeller = useMemo(() => {
        return role === "seller";
    }, [role]);

    const isAdmin = useMemo(() => {
        return role === "admin";
    }, [role]);

    const sellerLevel = useMemo(() => {
        return user?.sellerLevel ?? 0;
    }, [user]);

    const isActive = useMemo(() => {
        return user?.isActive ?? false;
    }, [user]);

    const roleLabel = useMemo(() => {
        switch (role) {
            case "admin":
                return "Admin";

            case "seller":
                return "Seller";

            case "customer":
                return "Customer";

            default:
                return "Guest";
        }
    }, [role]);

    const hasRole = (targetRole) => {
        return role === targetRole;
    };

    const hasAnyRole = (roles = []) => {
        return roles.includes(role);
    };

    return {
        user,

        role,

        roleLabel,

        sellerLevel,

        isGuest,

        isCustomer,

        isSeller,

        isAdmin,

        isActive,

        hasRole,

        hasAnyRole,
    };
}