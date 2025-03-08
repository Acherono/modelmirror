
import { AIModel } from "@/types/research";
import { ModelCircle } from "./ModelCircle";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface ModelGroupProps {
  category: string;
  models: AIModel[];
  visibleModels: AIModel[];
  activeModelId?: string;
  onModelSelect: (model: AIModel) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function ModelGroup({ 
  category, 
  models, 
  visibleModels, 
  activeModelId, 
  onModelSelect, 
  onNavigate 
}: ModelGroupProps) {
  const hasPrevious = models.indexOf(visibleModels[0]) > 0;
  const hasNext = models.indexOf(visibleModels[visibleModels.length - 1]) < models.length - 1;

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8">AI Models For {category}</h2>
      
      <div className="flex items-center justify-center gap-8 md:gap-16">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-12 w-12 border border-border/50 hover:bg-background/80 hover:text-primary"
          onClick={() => onNavigate('prev')}
          disabled={!hasPrevious}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <div className="flex gap-8 md:gap-16 items-center justify-center">
          {visibleModels.map((model) => (
            <ModelCircle 
              key={model.id} 
              model={model} 
              isActive={model.id === activeModelId}
              onClick={() => onModelSelect(model)} 
            />
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-12 w-12 border border-border/50 hover:bg-background/80 hover:text-primary"
          onClick={() => onNavigate('next')}
          disabled={!hasNext}
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
