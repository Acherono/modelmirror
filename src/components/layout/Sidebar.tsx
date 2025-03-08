
import { cn } from "@/lib/utils";
import { 
  BarChart2, 
  FileText, 
  Home, 
  Layers, 
  Layout, 
  Scale, 
  Users,
  Sparkles,
  ShoppingCart,
  Bot,
  Newspaper,
  Github,
  Twitter,
  Linkedin,
  Menu,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface SidebarProps {
  isCollapsed?: boolean;
  toggleSidebar?: () => void;
  onInteraction?: () => void;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: Home,
    label: "Overview",
    path: "/",
  },
  {
    icon: Sparkles,
    label: "Playaround",
    path: "/playaround",
  },
  {
    icon: ShoppingCart,
    label: "Model's Store",
    path: "/store",
  },
  {
    icon: Bot,
    label: "Agentic",
    path: "/agentic",
  },
  {
    icon: Newspaper,
    label: "Blog",
    path: "/blog",
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

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    url: "https://github.com",
  },
  {
    icon: Twitter,
    label: "X",
    url: "https://x.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    url: "https://linkedin.com",
  },
];

export function Sidebar({ isCollapsed = false, toggleSidebar, onInteraction }: SidebarProps) {
  const location = useLocation();

  const handleInteraction = () => {
    if (onInteraction) {
      onInteraction();
    }
  };

  return (
    <div
      className={cn(
        "h-screen fixed left-0 top-0 z-40 flex flex-col bg-sidebar border-r border-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
      onMouseMove={handleInteraction}
      onMouseOver={handleInteraction}
      onClick={handleInteraction}
    >
      <div className="flex items-center h-14 px-4 border-b border-border justify-between">
        {!isCollapsed && (
          <span className="font-semibold text-lg">AI Market</span>
        )}
        <Layout className={cn("h-6 w-6 text-primary", isCollapsed ? "mx-auto" : "")} />
      </div>

      <div className="flex-1 overflow-y-auto py-4 hide-scrollbar">
        {/* Toggle button above the navigation */}
        <div className="px-2 mb-4">
          <button
            onClick={toggleSidebar}
            className={cn(
              "flex items-center justify-center w-full p-2 rounded-md transition-all duration-200",
              "bg-sidebar-accent/10 hover:bg-sidebar-accent/20"
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

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

      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex",
          isCollapsed ? "justify-center space-y-4 flex-col" : "space-x-4"
        )}>
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sidebar-foreground hover:text-primary transition-colors"
                title={link.label}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
