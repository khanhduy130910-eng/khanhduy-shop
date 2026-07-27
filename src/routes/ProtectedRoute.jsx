import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({
    children,
    roles = [],
    requireAuth = true,
}) {
    const {
        user,
        role,
        loading,
        initialized,
    } = useAuthStore();

    const location = useLocation();

    // Chờ AuthProvider khởi tạo
    if (!initialized || loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-2 text-lg font-semibold">
                        Đang tải...
                    </div>

                    <div className="text-sm text-gray-500">
                        Vui lòng chờ
                    </div>
                </div>
            </div>
        );
    }

    // Chưa đăng nhập
    if (requireAuth && !user) {
        return (
            <Navigate
                to="/"
                replace
                state={{
                    from: location.pathname,
                }}
            />
        );
    }

    // Không yêu cầu role
    if (!roles.length) {
        return children;
    }

    // Sai quyền
    if (!roles.includes(role)) {
        return (
            <Navigate
                to="/403"
                replace
            />
        );
    }

    return children;
}