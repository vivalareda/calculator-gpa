import ContentRectangleGrade from "@/components/content-rectangle-grade";
import RedRectangle from "@/components/red-rectangle";

export default function GpaCalculator() {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-red-500">
      <RedRectangle />
      <ContentRectangleGrade />
    </div>
  );
}
