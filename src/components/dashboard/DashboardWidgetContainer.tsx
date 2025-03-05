
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

  return (
    <div className="relative space-y-4 animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {widgets.map((widget) => (
          effectiveVisibleWidgets[widget.i] && (
            <div 
              key={widget.i} 
              className="bg-card rounded-lg shadow border border-border"
              style={{
                gridColumn: widget.w > 6 ? "span 2" : "span 1",
                minHeight: `${widget.h * 150}px`
              }}
            >
              <div className="p-4 h-full no-scrollbar">
                {widget.component}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
