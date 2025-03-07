
import { DashboardContainer } from "@/components/dashboard/DashboardContainer";
import { Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { DashboardContainerModel } from "@/components/dashboard/DashboardContainerModel";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const Index = () => {
  const [widgets, setWidgets] = useState<any[]>([]);
  
  // Widget visibility state
  const [visibleWidgets, setVisibleWidgets] = useState<Record<string, boolean>>(() => {
    const savedVisibility = localStorage.getItem("dashboard-visibility");
    if (savedVisibility) {
      return JSON.parse(savedVisibility);
    }
    
    // Default: all widgets are visible
    return {};
  });

  useEffect(() => {
    // Load widgets for settings panel
    const dashboardModel = new DashboardContainerModel();
    setWidgets(dashboardModel.getWidgets());
    
    // Initialize visibility state if empty
    if (Object.keys(visibleWidgets).length === 0) {
      const initialVisibility = dashboardModel.getWidgets().reduce((acc, widget) => {
        acc[widget.i] = widget.visible;
        return acc;
      }, {} as Record<string, boolean>);
      
      setVisibleWidgets(initialVisibility);
      localStorage.setItem("dashboard-visibility", JSON.stringify(initialVisibility));
    }
  }, []);

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
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Overview</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-4 w-4" />
              Customize Dashboard
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Dashboard Settings</SheetTitle>
              <SheetDescription>
                Configure which widgets appear on your dashboard.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-3">Widget Visibility</h3>
                <div className="space-y-3">
                  {widgets.map((widget) => (
                    <div key={widget.i} className="flex items-center justify-between py-2">
                      <span className="font-medium text-sm">{widget.title}</span>
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
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {
                  // Reset to defaults
                  const dashboardModel = new DashboardContainerModel();
                  const defaultVisibility = dashboardModel.getWidgets().reduce((acc, widget) => {
                    acc[widget.i] = widget.visible;
                    return acc;
                  }, {} as Record<string, boolean>);
                  
                  setVisibleWidgets(defaultVisibility);
                }}>
                  Reset
                </Button>
                <SheetTrigger asChild>
                  <Button>Apply</Button>
                </SheetTrigger>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <DashboardContainer visibleWidgets={visibleWidgets} />
    </div>
  );
};

export default Index;
