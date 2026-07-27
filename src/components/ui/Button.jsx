export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-white",
    success:
      "bg-green-600 hover:bg-green-700 text-white",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        rounded-xl
        px-4
        py-3
        font-semibold
        transition
        duration-200
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}