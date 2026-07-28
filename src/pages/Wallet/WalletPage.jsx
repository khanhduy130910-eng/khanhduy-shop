import { useEffect, useState } from "react";
import { Clock3, Plus, Wallet } from "lucide-react";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

import {
  getWallet,
  getWalletTransactions,
} from "../../services/walletService";

export default function WalletPage() {
  const { user } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [wallet, setWallet] =
    useState({
      balance: 0,
    });

  const [transactions, setTransactions] =
    useState([]);

  useEffect(() => {
    if (user?.uid) {
      loadWallet();
    }
  }, [user]);

  async function loadWallet() {
    try {
      setLoading(true);

      const data = await getWallet(
        user.uid
      );

      setWallet(data);

      try {
        const history =
          await getWalletTransactions(
            user.uid
          );

        setTransactions(history);
      } catch {
        setTransactions([]);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Không thể tải ví."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <h1 className="text-3xl font-bold text-white">
        💳 Ví
      </h1>

      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-6 shadow-xl">
        <p className="text-lg text-blue-100">
          Số dư ví
        </p>

        <h2 className="mt-3 text-5xl font-bold text-white">
          {Number(
            wallet.balance || 0
          ).toLocaleString("vi-VN")}
          ₫
        </h2>

        <p className="mt-2 text-blue-100">
          Ví chính
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={() =>
              toast("Sắp có.")
            }
            className="flex items-center justify-center gap-2 rounded-2xl bg-white py-4 font-semibold text-blue-700 transition hover:scale-[1.02]"
          >
            <Plus size={20} />
            Nạp
          </button>

          <button
            className="flex items-center justify-center gap-2 rounded-2xl bg-blue-900/40 py-4 font-semibold text-white transition hover:bg-blue-900/60"
          >
            <Clock3 size={20} />
            Lịch sử
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-800 p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Lịch sử giao dịch
        </h2>

        {transactions.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-slate-400">
            <Wallet
              size={42}
              className="mb-3"
            />

            <p>
              Chưa có giao dịch nào.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl bg-slate-700 p-4"
              >
                <div>
                  <p className="font-medium text-white">
                    {item.note}
                  </p>

                  <p className="text-sm text-slate-400">
                    {item.type}
                  </p>
                </div>

                <span
                  className={
                    item.type ===
                    "deposit"
                      ? "font-bold text-green-400"
                      : "font-bold text-red-400"
                  }
                >
                  {item.type ===
                  "deposit"
                    ? "+"
                    : "-"}
                  {Number(
                    item.amount
                  ).toLocaleString(
                    "vi-VN"
                  )}
                  ₫
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}