
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
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {widgets.map((widget) => {
          // Check if widget should be visible
          const isVisible = visibleWidgets[widget.i] !== undefined 
            ? visibleWidgets[widget.i] 
            : widget.visible;

          if (!isVisible) return null;

          // Special case for AI Models Table - make it span full width
          const isAIModelsTable = widget.i === "ai-models-table";
          const isChartWidget = ["market-share", "company-valuation", "accuracy-rankings", "math-excellence", "gpu-clusters", "users-overview"].includes(widget.i);
          
          const widgetClasses = cn(
            "border border-border rounded-lg shadow overflow-hidden",
            isAIModelsTable ? 'col-span-1 lg:col-span-2' : '',
            isChartWidget ? 'h-[450px]' : '' // Make chart widgets taller
          );
          
          return (
            <div 
              key={widget.i}
              className={widgetClasses}
            >
              {/* For the AI Models Table, we need to ensure the "Last 7 Days" column is properly centered */}
              {widget.i === "ai-models-table" ? (
                <div className="w-full h-full">
                  {widget.component}
                  <style jsx global>{`
                    /* Center the sparkline SVGs in the "Last 7 Days" column */
                    td:last-child svg {
                      margin: 0 auto;
                    }
                  `}</style>
                </div>
              ) : (
                widget.component
              )}
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
