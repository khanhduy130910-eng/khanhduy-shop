import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-5">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={20}
      />

      <input
        type="text"
        placeholder="Tìm sản phẩm..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
      />
    </div>
  );
}