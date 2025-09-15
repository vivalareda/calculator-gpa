import ContentRectangleGpa from "@/components/content-rectangle-gpa";
import RedRectangle from "@/components/red-rectangle";

export default function GpaCalculator() {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-red-500">
      <RedRectangle />
      <ContentRectangleGpa />
    </div>
  );
}
