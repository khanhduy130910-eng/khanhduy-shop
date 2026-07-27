import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import RoleBadge from "../common/RoleBadge";

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-50 border-b bg-white">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                <Link
                    to="/"
                    className="text-xl font-bold"
                >
                    Khánh Duy Shop
                </Link>

                <nav className="flex items-center gap-5">

                    <Link
                        to="/"
                        className="font-medium hover:text-blue-600"
                    >
                        Trang chủ
                    </Link>

                    <Link
                        to="/shop"
                        className="font-medium hover:text-blue-600"
                    >
                        Cửa hàng
                    </Link>

                    <Link
                        to="/cart"
                        className="font-medium hover:text-blue-600"
                    >
                        Giỏ hàng
                    </Link>

                    <Link
                        to="/profile"
                        className="font-medium hover:text-blue-600"
                    >
                        Hồ sơ
                    </Link>

                </nav>

                {user ? (
                    <div className="flex items-center gap-3">

                        <img
                            src={
                                user.photoURL ||
                                "https://ui-avatars.com/api/?name=User"
                            }
                            alt="avatar"
                            className="h-10 w-10 rounded-full border object-cover"
                        />

                        <div className="hidden md:block">

                            <div className="text-sm font-semibold">
                                {user.firstName} {user.lastName}
                            </div>

                            <RoleBadge />

                        </div>

                    </div>
                ) : (
                    <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm">
                        Guest
                    </div>
                )}

            </div>

        </header>
    );
}