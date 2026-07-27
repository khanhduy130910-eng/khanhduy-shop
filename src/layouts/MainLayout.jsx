import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <Header />

        <main
          className="
            flex-1
            px-5
            py-6
            pb-24
            animate-in
            fade-in
            duration-300
          "
          style={{
            paddingTop: "max(1.5rem, env(safe-area-inset-top))",
            paddingBottom: "max(6rem, env(safe-area-inset-bottom))",
          }}
        >
          <Outlet />
        </main>

        <BottomNav />
      </div>
    </div>
  );
}