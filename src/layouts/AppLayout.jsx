import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-md px-5 py-6 pb-24">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}