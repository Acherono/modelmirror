
import { useState, useEffect } from "react";
import { Widget } from "./DashboardContainerModel";
import { CategorySection } from "./CategorySection";

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
  
  // Filter widgets for the top row
  const topRowWidgets = widgets.filter(widget => 
    ["chat-component", "ai-sentiment", "trending-models", "agi-index", "agi-doomsday-clock"].includes(widget.i)
  );
  
  // Filter widgets for the second row - removing model dominance references
  const secondRowWidgets = widgets.filter(widget => 
    ["gpu-cluster-burning"].includes(widget.i)
  );
  
  // Filter the AI Models Table
  const aiModelsTable = widgets.find(widget => widget.i === "ai-models-table");
  
  // Filter the remaining widgets
  const remainingWidgets = widgets.filter(widget => 
    !["chat-component", "ai-sentiment", "trending-models", "agi-index", "agi-doomsday-clock", 
      "gpu-cluster-burning", "ai-models-table"].includes(widget.i)
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Row - 5 widgets in a row */}
      <div className="grid grid-cols-5 gap-4">
        {topRowWidgets.map((widget) => {
          const isVisible = visibleWidgets[widget.i] !== undefined 
            ? visibleWidgets[widget.i] 
            : widget.visible;

          if (!isVisible) return null;
          
          return (
            <div 
              key={widget.i}
              className="border border-border rounded-lg shadow overflow-hidden bg-sidebar h-[200px]"
            >
              {widget.component}
            </div>
          );
        })}
      </div>
      
      {/* Second Row - GPU Cluster Burning Index only */}
      {secondRowWidgets.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {secondRowWidgets.map((widget) => {
            const isVisible = visibleWidgets[widget.i] !== undefined 
              ? visibleWidgets[widget.i] 
              : widget.visible;

            if (!isVisible) return null;
            
            return (
              <div 
                key={widget.i}
                className="border border-border rounded-lg shadow overflow-hidden bg-sidebar h-[200px]"
              >
                {widget.component}
              </div>
            );
          })}
        </div>
      )}
      
      {/* AI Models Table with Category Section */}
      {aiModelsTable && visibleWidgets[aiModelsTable.i] !== false && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Top AI Models</h2>
            <CategorySection />
          </div>
          <div className="border border-border rounded-lg shadow overflow-hidden bg-sidebar">
            {aiModelsTable.component}
          </div>
        </div>
      )}
      
      {/* Remaining widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {remainingWidgets.map((widget) => {
          const isVisible = visibleWidgets[widget.i] !== undefined 
            ? visibleWidgets[widget.i] 
            : widget.visible;

          if (!isVisible) return null;
          
          return (
            <div 
              key={widget.i}
              className="border border-border rounded-lg shadow overflow-hidden bg-sidebar h-[400px]"
            >
              {widget.component}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper function from utils
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
