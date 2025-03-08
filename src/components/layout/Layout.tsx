
import { ReactNode, useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { DashboardContainerModel } from "@/components/dashboard/DashboardContainerModel";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  // Widget visibility state
  const [visibleWidgets, setVisibleWidgets] = useState<Record<string, boolean>>(() => {
    const savedVisibility = localStorage.getItem("dashboard-visibility");
    if (savedVisibility) {
      return JSON.parse(savedVisibility);
    }
    
    // Default: all widgets are visible
    const dashboardModel = new DashboardContainerModel();
    const widgets = dashboardModel.getWidgets();
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
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[180px] transition-all duration-300">
        <Header 
          visibleWidgets={visibleWidgets}
          toggleWidgetVisibility={toggleWidgetVisibility}
        />
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
