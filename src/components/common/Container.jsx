export default function Container({ children }) {
  return (
    <div className="mx-auto w-full max-w-md px-4">
      {children}
    </div>
  );
}