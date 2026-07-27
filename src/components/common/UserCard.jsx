import useAuth from "../../hooks/useAuth";
import RoleBadge from "./RoleBadge";

export default function UserCard() {
    const { user } = useAuth();

    if (!user) return null;

    const fullName =
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        "Unknown User";

    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm">

            <div className="flex items-center gap-4">

                <img
                    src={
                        user.photoURL ||
                        "https://ui-avatars.com/api/?name=User"
                    }
                    alt={fullName}
                    className="h-16 w-16 rounded-full object-cover border"
                />

                <div className="flex-1">

                    <h2 className="text-lg font-bold">
                        {fullName}
                    </h2>

                    <p className="text-sm text-gray-500">
                        @{user.username || "unknown"}
                    </p>

                    <div className="mt-2">
                        <RoleBadge />
                    </div>

                </div>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-lg bg-gray-100 p-3">

                    <div className="text-xs text-gray-500">
                        Telegram ID
                    </div>

                    <div className="font-semibold">
                        {user.telegramId}
                    </div>

                </div>

                <div className="rounded-lg bg-gray-100 p-3">

                    <div className="text-xs text-gray-500">
                        Seller Level
                    </div>

                    <div className="font-semibold">
                        {user.sellerLevel || 0}
                    </div>

                </div>

            </div>

        </div>
    );
}