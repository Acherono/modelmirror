
import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { GlobalSearch } from "../header/GlobalSearch";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div 
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[70px]" : "ml-[240px]"
        }`}
      >
        <Header isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <div className="flex-none px-6 py-2 border-b">
          <GlobalSearch />
        </div>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
