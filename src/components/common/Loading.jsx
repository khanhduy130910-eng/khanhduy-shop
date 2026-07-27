import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center py-12">
      <LoaderCircle
        className="animate-spin text-blue-500"
        size={40}
      />
    </div>
  );
}