
import { cn } from "@/lib/utils";
import { Moon, RefreshCw, Settings, Sun, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "../header/GlobalSearch";

interface HeaderProps {
  title?: string;
  isSidebarCollapsed?: boolean;
  toggleSidebar?: () => void;
  widgets?: { i: string; title: string; visible: boolean }[];
  toggleWidgetVisibility?: (widgetId: string) => void;
  visibleWidgets?: Record<string, boolean>;
}

export function Header({ 
  title = "AI Model Market Dashboard", 
  isSidebarCollapsed = false,
  toggleSidebar,
  widgets = [],
  toggleWidgetVisibility,
  visibleWidgets = {}
}: HeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Check for saved theme preference or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-4 transition-all">
      <div className="flex items-center space-x-3">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      
      <div className="flex-1 max-w-xl mx-4">
        <GlobalSearch />
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button 
          onClick={handleRefresh}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Refresh data"
        >
          <RefreshCw size={18} className={cn(isRefreshing && "animate-spin")} />
        </button>
        <Sheet>
          <SheetTrigger asChild>
            <button 
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Dashboard Settings</SheetTitle>
              <SheetDescription>
                Configure your dashboard preferences.
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
                          onCheckedChange={() => toggleWidgetVisibility && toggleWidgetVisibility(widget.i)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-3">App Settings</h3>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-sm">Dark Mode</span>
                  <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
