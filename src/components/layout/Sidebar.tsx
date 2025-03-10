
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Moon, Sun, LogIn, UserPlus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { GlobalSearch } from "../header/GlobalSearch";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const location = useLocation();
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
    <div className="h-screen fixed left-0 top-0 z-40 flex flex-col bg-sidebar border-r border-border w-[200px]">
      <div className="flex items-center h-14 px-3 border-b border-border justify-between">
        <span className="font-semibold text-lg">AI Market</span>
      </div>

      {/* Search field - resized to fit sidebar better */}
      <div className="px-2 py-3 border-b border-border">
        <GlobalSearch />
      </div>

      <div className="flex-1 overflow-y-auto py-4 hide-scrollbar">
        <nav className="space-y-1 px-2 mb-6">
          {/* Navigation items */}
          <Link
            to="/"
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
              location.pathname === "/"
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span>Home</span>
          </Link>

          <Link
            to="/testcenter"
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
              location.pathname === "/testcenter"
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span>Test Center</span>
          </Link>

          <Link
            to="/store"
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
              location.pathname === "/store"
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span>Model's Store</span>
          </Link>

          <Link
            to="/research"
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
              location.pathname === "/research"
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span>Research Papers</span>
          </Link>

          <Link
            to="/news"
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
              location.pathname === "/news"
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span>News</span>
          </Link>

          <Link
            to="/statistics"
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
              location.pathname === "/statistics"
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span>Statistics</span>
          </Link>
        </nav>
        
        {/* Authentication buttons - made smaller */}
        <div className="px-2 space-y-2 mb-6">
          <Button variant="outline" size="sm" className="w-full gap-1 justify-center text-xs">
            <LogIn className="h-3 w-3" />
            Sign In
          </Button>
          
          <Button size="sm" className="w-full gap-1 justify-center text-xs">
            <UserPlus className="h-3 w-3" />
            Sign Up
          </Button>
        </div>
      </div>
      
      {/* Social media icons and theme toggle at the bottom */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter size={16} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={16} />
            </a>
          </div>
          
          {/* Theme toggle moved near social icons */}
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-secondary transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
