
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

          return (
            <div 
              key={widget.i}
              className="bg-card rounded-lg shadow border border-border overflow-hidden"
            >
              <div className="p-1 flex justify-between items-center bg-muted/30 rounded-t-lg">
                <h3 className="text-sm font-medium px-2">{widget.title}</h3>
              </div>
              <div className="p-2 overflow-hidden no-scrollbar" style={{ height: 'calc(100% - 28px)' }}>
                {widget.component}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
