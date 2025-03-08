
import { cn } from "@/lib/utils";
import { AIModel } from "@/types/research";
import { Star } from "lucide-react";

interface ModelCircleProps {
  model: AIModel;
  isActive?: boolean;
  onClick?: () => void;
}

export function ModelCircle({ model, isActive = false, onClick }: ModelCircleProps) {
  // Generate a random light color if none provided
  const circleColor = model.logoColor || `bg-green-${Math.floor(Math.random() * 3) + 3}00`;
  
  return (
    <div className="flex flex-col items-center gap-3" onClick={onClick}>
      <div 
        className={cn(
          "w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300",
          circleColor,
          isActive ? "ring-4 ring-primary ring-offset-2 scale-110" : "hover:scale-105"
        )}
      >
        <span className="text-2xl font-bold">{model.title.substring(0, 2)}</span>
      </div>
      
      <div className="text-center max-w-[200px]">
        <h3 className="font-bold">{model.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{model.shortDescription || model.description.substring(0, 60) + "..."}</p>
      </div>
    </div>
  );
}
