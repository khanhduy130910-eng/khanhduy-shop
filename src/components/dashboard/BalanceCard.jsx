import { Wallet } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

export default function BalanceCard() {
  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">
            Số dư hiện tại
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            0 đ
          </h2>
        </div>

        <div className="rounded-full bg-blue-600 p-4">
          <Wallet />
        </div>
      </div>

      <Button className="mt-6 w-full">
        Nạp tiền
      </Button>
    </Card>
  );
}