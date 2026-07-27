import {
  ShoppingBag,
  Wallet,
  Package,
  User,
} from "lucide-react";

import Card from "../ui/Card";

const actions = [
  {
    icon: ShoppingBag,
    title: "Cửa hàng",
  },
  {
    icon: Package,
    title: "Đơn hàng",
  },
  {
    icon: Wallet,
    title: "Ví",
  },
  {
    icon: User,
    title: "Hồ sơ",
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <Icon size={30} />

            <p className="mt-3 font-semibold">
              {item.title}
            </p>
          </Card>
        );
      })}
    </div>
  );
}