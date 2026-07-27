export default function Section({
  title,
  children,
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-bold">
        {title}
      </h2>

      {children}
    </section>
  );
}