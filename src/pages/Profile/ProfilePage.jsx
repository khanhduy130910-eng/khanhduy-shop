import UserCard from "../../components/common/UserCard";
import useAuth from "../../hooks/useAuth";

export default function Profile() {
    const {
        user,
        loading,
    } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Đang tải...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">

                    <h2 className="mb-2 text-xl font-bold">
                        Chưa đăng nhập
                    </h2>

                    <p className="text-gray-500">
                        Vui lòng mở ứng dụng từ Telegram.
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl p-5">

            <UserCard />

            <div className="mt-6 rounded-2xl border bg-white p-5">

                <h2 className="mb-4 text-xl font-bold">
                    Thông tin tài khoản
                </h2>

                <div className="grid gap-4">

                    <Info
                        title="Họ"
                        value={user.firstName}
                    />

                    <Info
                        title="Tên"
                        value={user.lastName}
                    />

                    <Info
                        title="Username"
                        value={user.username}
                    />

                    <Info
                        title="Telegram ID"
                        value={user.telegramId}
                    />

                    <Info
                        title="Vai trò"
                        value={user.role}
                    />

                    <Info
                        title="Seller Level"
                        value={user.sellerLevel}
                    />

                    <Info
                        title="Trạng thái"
                        value={
                            user.isActive
                                ? "Hoạt động"
                                : "Đã khóa"
                        }
                    />

                </div>

            </div>

        </div>
    );
}

function Info({
    title,
    value,
}) {
    return (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">

            <span className="text-gray-500">
                {title}
            </span>

            <span className="font-semibold">
                {value ?? "-"}
            </span>

        </div>
    );
}