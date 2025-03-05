
import { cn } from "@/lib/utils";
import { Moon, RefreshCw, Settings, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  title?: string;
  isSidebarCollapsed?: boolean;
  toggleSidebar?: () => void;
}

export function Header({ 
  title = "AI Model Market Dashboard", 
  isSidebarCollapsed = false,
  toggleSidebar
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
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
        <h1 className="text-lg font-semibold">{title}</h1>
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
        <button 
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Settings"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
