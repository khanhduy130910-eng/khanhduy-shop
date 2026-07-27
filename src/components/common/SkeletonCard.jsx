export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-slate-900 p-4">
      <div className="h-40 rounded-xl bg-slate-800" />

      <div className="mt-4 h-5 w-2/3 rounded bg-slate-800" />

      <div className="mt-3 h-4 rounded bg-slate-800" />

      <div className="mt-2 h-4 w-3/4 rounded bg-slate-800" />

      <div className="mt-6 h-10 rounded-xl bg-slate-800" />
    </div>
  );
}