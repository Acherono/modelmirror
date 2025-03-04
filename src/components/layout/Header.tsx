
import { cn } from "@/lib/utils";
import { RefreshCw, Settings } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  title?: string;
  isSidebarCollapsed?: boolean;
}

export function Header({ title = "AI Model Market Dashboard", isSidebarCollapsed = false }: HeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-4 transition-all">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center space-x-2">
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
