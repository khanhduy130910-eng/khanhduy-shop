export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-2xl
        bg-slate-900
        border
        border-slate-800
        shadow-lg
        p-5
        ${className}
      `}
    >
      {children}
    </div>
  );
}