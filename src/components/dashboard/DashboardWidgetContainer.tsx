
import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-grid-layout/css/draggable.css";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings, Eye, EyeOff, X, Save, Undo } from "lucide-react";
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

const ResponsiveGridLayout = WidthProvider(Responsive);

export function DashboardWidgetContainer({ widgets }: DashboardWidgetContainerProps) {
  // Initialize state from localStorage or defaults
  const [layouts, setLayouts] = useState(() => {
    const savedLayouts = localStorage.getItem("dashboard-layouts");
    return savedLayouts ? JSON.parse(savedLayouts) : { lg: widgets.map(({ i, x, y, w, h, minW, minH }) => ({ i, x, y, w, h, minW, minH })) };
  });

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

  const [originalLayout, setOriginalLayout] = useState(layouts.lg);
  const [hasChanges, setHasChanges] = useState(false);

  // Update localStorage when layouts change
  useEffect(() => {
    localStorage.setItem("dashboard-layouts", JSON.stringify(layouts));
  }, [layouts]);

  // Update localStorage when visibility changes
  useEffect(() => {
    localStorage.setItem("dashboard-visibility", JSON.stringify(visibleWidgets));
  }, [visibleWidgets]);

  // Handle layout change
  const onLayoutChange = (layout: any, allLayouts: any) => {
    setLayouts(allLayouts);
    setHasChanges(true);
  };

  // Toggle widget visibility
  const toggleWidgetVisibility = (widgetId: string) => {
    setVisibleWidgets(prev => ({
      ...prev,
      [widgetId]: !prev[widgetId]
    }));
    setHasChanges(true);
  };

  // Save layout changes
  const saveChanges = () => {
    localStorage.setItem("dashboard-layouts", JSON.stringify(layouts));
    localStorage.setItem("dashboard-visibility", JSON.stringify(visibleWidgets));
    setOriginalLayout(layouts.lg);
    setHasChanges(false);
    toast.success("Dashboard layout saved successfully");
  };

  // Reset to original layout
  const resetLayout = () => {
    setLayouts({ lg: originalLayout });
    setVisibleWidgets(
      widgets.reduce((acc, widget) => {
        acc[widget.i] = widget.visible;
        return acc;
      }, {} as Record<string, boolean>)
    );
    setHasChanges(false);
    toast.info("Dashboard layout reset to default");
  };

  return (
    <div className="relative space-y-4 animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex gap-2">
          {hasChanges && (
            <>
              <Button variant="default" size="sm" onClick={saveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Layout
              </Button>
              <Button variant="outline" size="sm" onClick={resetLayout}>
                <Undo className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </>
          )}
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
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={150}
        onLayoutChange={onLayoutChange}
        isDraggable
        isResizable
        useCSSTransforms
      >
        {widgets.map((widget) => (
          visibleWidgets[widget.i] && (
            <div key={widget.i} className="bg-card rounded-lg shadow border border-border">
              <div className="p-1 flex justify-end cursor-move bg-muted/30 rounded-t-lg">
                <button 
                  className="text-muted-foreground hover:text-foreground p-1 rounded-full"
                  onClick={() => toggleWidgetVisibility(widget.i)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-2 overflow-hidden h-[calc(100%-28px)]">
                {widget.component}
              </div>
            </div>
          )
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
