import ContentRectangleGpa from "@/components/content-rectangle-gpa";
import RedRectangle from "@/components/red-rectangle";

export default function GpaCalculator() {
  return (
    <div className="relative h-screen w-screen bg-red-500 flex overflow-hidden">
      <RedRectangle />
      <ContentRectangleGpa />
    </div>
  );
}
