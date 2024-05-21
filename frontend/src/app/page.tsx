import ContentRectangle from "@/components/content-rectangle";
import RedRectangle from "@/components/red-rectangle";

export default function Home() {
  return (
    <div className="relative h-screen w-screen bg-red-500 flex overflow-hidden">
      <RedRectangle />
      <ContentRectangle/>
    </div>
  );
}
