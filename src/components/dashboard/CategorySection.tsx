
import { Button } from "../ui/button";

export function CategorySection() {
  const categories = [
    { id: "llms", label: "LLMs" },
    { id: "image", label: "Image" },
    { id: "vision", label: "Vision" },
    { id: "audio", label: "Audio" },
    { id: "video", label: "Video" }
  ];
  
  return (
    <div className="flex items-center gap-2 justify-end mb-2">
      {categories.map(category => (
        <Button
          key={category.id}
          variant="outline"
          size="sm"
          className="text-xs border-muted-foreground/30 bg-sidebar"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
