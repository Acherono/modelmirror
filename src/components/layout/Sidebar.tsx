
import { cn } from "@/lib/utils";
import { 
  BarChart2, 
  FileText, 
  Home, 
  Layers, 
  Layout, 
  Scale, 
  Users 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface SidebarProps {
  isCollapsed?: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: Home,
    label: "Overview",
    path: "/",
  },
  {
    icon: Users,
    label: "User Statistics",
    path: "/users",
  },
  {
    icon: BarChart2,
    label: "Accuracy Rankings",
    path: "/accuracy",
  },
  {
    icon: Scale,
    label: "Math Excellence",
    path: "/math",
  },
  {
    icon: FileText,
    label: "Industry Citations",
    path: "/citations",
  },
  {
    icon: Layers,
    label: "Model Scale",
    path: "/models",
  },
];

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const location = useLocation();

  return (
    <div
      className={cn(
        "h-screen fixed left-0 top-0 z-40 flex flex-col bg-sidebar border-r border-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center h-14 px-4 border-b border-border">
        <Layout className="h-6 w-6 text-primary" />
        {!isCollapsed && (
          <span className="ml-2 font-semibold text-lg">AI Market</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-3")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
