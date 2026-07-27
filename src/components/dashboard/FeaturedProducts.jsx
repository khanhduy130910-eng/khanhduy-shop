import { Star } from "lucide-react";

import Card from "../ui/Card";

export default function FeaturedProducts() {
  return (
    <Card className="mt-8">
      <div className="mb-4 flex items-center gap-2">
        <Star className="text-yellow-400" />

        <h2 className="text-xl font-bold">
          Sản phẩm nổi bật
        </h2>
      </div>

      <div className="space-y-3">
        <Card>
          Key Premium Telegram
        </Card>

        <Card>
          VIP Membership
        </Card>

        <Card>
          Digital Account
        </Card>
      </div>
    </Card>
  );
}