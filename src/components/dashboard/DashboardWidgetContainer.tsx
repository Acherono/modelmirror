import { useState } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { toast } from "sonner";

// Create a type for our widget configuration
interface WidgetConfig {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  visible: boolean;
  title: string;
  component: React.ReactNode;
}

interface DashboardWidgetContainerProps {
  widgets: WidgetConfig[];
  visibleWidgets?: Record<string, boolean>;
}

export function DashboardWidgetContainer({ widgets, visibleWidgets = {} }: DashboardWidgetContainerProps) {
  // Use the passed visibleWidgets or initialize default
  const effectiveVisibleWidgets = Object.keys(visibleWidgets).length > 0 
    ? visibleWidgets 
    : widgets.reduce((acc, widget) => {
        acc[widget.i] = widget.visible;
        return acc;
      }, {} as Record<string, boolean>);

  // Common component styling class for consistent appearance
  const componentClass = "w-full h-full rounded-lg overflow-hidden transition-colors duration-200 dark:bg-[#343541] bg-[#EEEFFC]"; // Dark: ChatGPT gray, Light: Claude light color

  return (
    <div className="relative space-y-2 animate-fade-in pb-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {widgets.map((widget) => (
          effectiveVisibleWidgets[widget.i] && (
            <div 
              key={widget.i} 
              className="border border-border"
              style={{
                gridColumn: widget.w > 6 ? "span 2" : "span 1",
                minHeight: `${widget.h * 150}px`
              }}
            >
              <div className={`${componentClass} h-full no-scrollbar p-2`}>
                {widget.component}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
