import { Bell, Settings } from "lucide-react";

export default function GreetingCard() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-400">Xin chào 👋</p>

        <h1 className="mt-1 text-3xl font-bold text-white">
          Khánh Duy
        </h1>
      </div>

      <div className="flex gap-3">
        <button className="rounded-xl bg-slate-900 p-3 hover:bg-slate-800">
          <Bell size={20} />
        </button>

        <button className="rounded-xl bg-slate-900 p-3 hover:bg-slate-800">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}