
import { Button } from "../ui/button";

export function CategorySection() {
  const categories = [
    { id: "llms", label: "LLMs" },
    { id: "image", label: "Image" },
    { id: "video", label: "Video" }
  ];
  
  return (
    <div className="flex items-center gap-2">
      {categories.map(category => (
        <Button
          key={category.id}
          variant="outline"
          size="sm"
          className="text-xs border-white/20 bg-black text-white rounded-full px-4 py-1 h-7"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
