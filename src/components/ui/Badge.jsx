export default function Badge({
  children,
  color = "blue",
}) {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-500 text-black",
  };

  return (
    <span
      className={`
        inline-block
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${colors[color]}
      `}
    >
      {children}
    </span>
  );
}