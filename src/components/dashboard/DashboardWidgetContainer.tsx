
import { useState, useEffect } from "react";
// Fix CSS imports by using relative paths from node_modules
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings, Eye, EyeOff } from "lucide-react";
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
}

export function DashboardWidgetContainer({ widgets }: DashboardWidgetContainerProps) {
  // Initialize visibility state from localStorage or defaults
  const [visibleWidgets, setVisibleWidgets] = useState<Record<string, boolean>>(() => {
    const savedVisibility = localStorage.getItem("dashboard-visibility");
    if (savedVisibility) {
      return JSON.parse(savedVisibility);
    }
    // Default: all widgets are visible
    return widgets.reduce((acc, widget) => {
      acc[widget.i] = widget.visible;
      return acc;
    }, {} as Record<string, boolean>);
  });

  // Update localStorage when visibility changes
  useEffect(() => {
    localStorage.setItem("dashboard-visibility", JSON.stringify(visibleWidgets));
  }, [visibleWidgets]);

  // Toggle widget visibility
  const toggleWidgetVisibility = (widgetId: string) => {
    setVisibleWidgets(prev => ({
      ...prev,
      [widgetId]: !prev[widgetId]
    }));
    toast.info(`Widget ${visibleWidgets[widgetId] ? "hidden" : "shown"}`);
  };

  return (
    <div className="relative space-y-4 animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Widget Settings
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Configure Dashboard</SheetTitle>
              <SheetDescription>
                Toggle visibility and customize your dashboard widgets.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {widgets.map((widget) => (
                <div key={widget.i} className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">{widget.title}</span>
                  <div className="flex items-center gap-2">
                    {visibleWidgets[widget.i] ? (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={visibleWidgets[widget.i] || false}
                      onCheckedChange={() => toggleWidgetVisibility(widget.i)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {widgets.map((widget) => (
          visibleWidgets[widget.i] && (
            <div 
              key={widget.i} 
              className="bg-card rounded-lg shadow border border-border"
              style={{
                gridColumn: widget.w > 6 ? "span 2" : "span 1",
                minHeight: `${widget.h * 150}px`
              }}
            >
              <div className="p-4 overflow-auto h-full">
                {widget.component}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
