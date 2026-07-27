const categories = [
  "Tất cả",
  "key",
  "vip",
  "account",
];

export default function CategoryFilter({
  selected,
  onSelect,
}) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-full px-4 py-2 whitespace-nowrap transition ${
            selected === category
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}