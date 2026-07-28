import { Bell, Settings, CalendarDays } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function GreetingCard() {
    const { user } = useAuth();

    const today = new Date().toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-blue-950 p-6 shadow-xl">

            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="relative flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <img
                        src={
                            user?.photoURL ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user?.firstName || "User"
                            )}`
                        }
                        alt="avatar"
                        className="h-16 w-16 rounded-2xl border-2 border-zinc-700 object-cover"
                    />

                    <div>

                        <p className="text-sm text-zinc-400">
                            Xin chào 👋
                        </p>

                        <h1 className="mt-1 text-3xl font-bold text-white">
                            {user
                                ? `${user.firstName} ${user.lastName || ""}`
                                : "Khách"}
                        </h1>

                        <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                            <CalendarDays size={16} />
                            {today}
                        </div>

                    </div>

                </div>

                <div className="flex gap-3">

                    <button className="relative rounded-2xl bg-zinc-800 p-3 text-zinc-300 transition hover:scale-105 hover:bg-zinc-700 hover:text-white">

                        <Bell size={20} />

                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

                    </button>

                    <button className="rounded-2xl bg-zinc-800 p-3 text-zinc-300 transition hover:scale-105 hover:bg-zinc-700 hover:text-white">
                        <Settings size={20} />
                    </button>

                </div>

            </div>

        </div>
    );
}