
import { cn } from "@/lib/utils";
import { Moon, Sun, UserPlus, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
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

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-4 transition-all">
      <div className="flex items-center space-x-3">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      
      <div className="flex-1 max-w-xl mx-4">
        <GlobalSearch />
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <Button variant="outline" size="sm" className="gap-1">
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
        
        <Button size="sm" className="gap-1">
          <UserPlus className="h-4 w-4" />
          Sign Up
        </Button>
      </div>
    </header>
  );
}
