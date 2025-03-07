
import { useState, useEffect } from "react";
import { Widget } from "./DashboardContainerModel";

interface DashboardContainerProps {
  visibleWidgets?: Record<string, boolean>;
}

export function DashboardContainer({ visibleWidgets = {} }: DashboardContainerProps) {
  // Import all widgets components
  const [widgets, setWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    // Dynamically import the model to avoid circular dependencies
    const loadWidgets = async () => {
      const { DashboardContainerModel } = await import("./DashboardContainerModel");
      const model = new DashboardContainerModel();
      setWidgets(model.getWidgets());
    };
    
    loadWidgets();
  }, []);

  if (widgets.length === 0) return null;
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((widget) => {
          // Check if widget should be visible
          const isVisible = visibleWidgets[widget.i] !== undefined 
            ? visibleWidgets[widget.i] 
            : widget.visible;

          if (!isVisible) return null;

          // Special case for AI Models Table - make it span full width
          const isAIModelsTable = widget.i === "ai-models-table";
          
          return (
            <div 
              key={widget.i}
              className={`border border-border rounded-lg shadow overflow-hidden ${
                isAIModelsTable ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''
              }`}
            >
              {widget.component}
            </div>
          );
        })}
      </div>
    </div>
  );
}
