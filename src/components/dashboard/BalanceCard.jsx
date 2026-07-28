import {
    Wallet,
    Eye,
    ArrowDownCircle,
    ArrowUpCircle,
    History,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";

export default function BalanceCard() {
    const { user } = useAuth();

    const balance =
        user?.wallet?.toLocaleString("vi-VN") || "0";

    return (
        <Card className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 text-white shadow-xl">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-blue-100">
                        Số dư ví
                    </p>

                    <h2 className="mt-2 text-4xl font-extrabold tracking-wide">
                        {balance} ₫
                    </h2>

                    <div className="mt-3 flex items-center gap-2 text-sm text-blue-100">
                        <Eye size={16} />
                        Ví chính
                    </div>

                </div>

                <div className="rounded-3xl bg-white/20 p-5 backdrop-blur">

                    <Wallet
                        size={36}
                        className="text-white"
                    />

                </div>

            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">

                <Button className="flex items-center justify-center gap-2 rounded-2xl bg-white text-blue-700 hover:bg-slate-100">

                    <ArrowDownCircle size={18} />

                    Nạp

                </Button>

                <Button className="flex items-center justify-center gap-2 rounded-2xl bg-blue-800 text-white hover:bg-blue-900">

                    <ArrowUpCircle size={18} />

                    Rút

                </Button>

                <Button className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-700 text-white hover:bg-cyan-800">

                    <History size={18} />

                    Lịch sử

                </Button>

            </div>

        </Card>
    );
}