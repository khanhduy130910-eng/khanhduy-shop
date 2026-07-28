import GreetingCard from "../../components/dashboard/GreetingCard";
import BalanceCard from "../../components/dashboard/BalanceCard";
import QuickActions from "../../components/dashboard/QuickActions";
import FeaturedProducts from "../../components/dashboard/FeaturedProducts";

export default function HomePage() {
    return (
        <main className="mx-auto max-w-7xl space-y-8 px-4 py-6">

            <GreetingCard />

            <BalanceCard />

            <QuickActions />

            <FeaturedProducts />

            <div className="h-24" />

        </main>
    );
}