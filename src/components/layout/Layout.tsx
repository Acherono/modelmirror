
import { ReactNode, useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { DashboardContainer } from "@/components/dashboard/DashboardContainer";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Get widget data from DashboardContainer
  const isDashboard = location.pathname === "/";
  const dashboardInstance = isDashboard ? new DashboardContainer() : null;
  const widgets = dashboardInstance?.getWidgets() || [];
  
  // Widget visibility state
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
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div 
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          isSidebarCollapsed ? "ml-[70px]" : "ml-[240px]"
        )}
      >
        <Header 
          isSidebarCollapsed={isSidebarCollapsed} 
          toggleSidebar={toggleSidebar}
          widgets={widgets}
          toggleWidgetVisibility={toggleWidgetVisibility}
          visibleWidgets={visibleWidgets}
        />
        
        <main className="flex-1 p-6">
          {isDashboard ? (
            <DashboardContainer visibleWidgets={visibleWidgets} />
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
