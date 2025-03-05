
import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { GlobalSearch } from "../header/GlobalSearch";
import { DashboardContainer } from "@/components/dashboard/DashboardContainer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Only pass dashboard widget settings when on the dashboard page
  const isDashboard = location.pathname === "/";

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
        />
        <div className="flex-none px-6 py-2 border-b">
          <GlobalSearch />
        </div>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

// Fix the missing import
import { cn } from "@/lib/utils";
