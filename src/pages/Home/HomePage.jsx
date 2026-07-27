import GreetingCard from "../../components/dashboard/GreetingCard";
import BalanceCard from "../../components/dashboard/BalanceCard";
import QuickActions from "../../components/dashboard/QuickActions";
import FeaturedProducts from "../../components/dashboard/FeaturedProducts";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <GreetingCard />

      <BalanceCard />

      <QuickActions />

      <FeaturedProducts />
    </div>
  );
}