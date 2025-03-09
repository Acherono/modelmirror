
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
    <div className="h-screen fixed left-0 top-0 z-40 flex flex-col bg-sidebar border-r border-border w-[250px]">
      <div className="flex items-center h-14 px-4 border-b border-border justify-between">
        <span className="font-semibold text-lg">AI Market</span>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Search field */}
      <div className="px-3 py-4 border-b border-border">
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
            to="/playaround"
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
              location.pathname === "/playaround"
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span>Playaround</span>
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

          <Link
            to="/battleground"
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
              location.pathname === "/battleground"
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span>Battleground</span>
          </Link>
        </nav>
        
        {/* Authentication buttons */}
        <div className="px-3 space-y-2 mb-6">
          <Button variant="outline" size="sm" className="w-full gap-1 justify-center">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
          
          <Button size="sm" className="w-full gap-1 justify-center">
            <UserPlus className="h-4 w-4" />
            Sign Up
          </Button>
        </div>
      </div>
      
      {/* Social media icons at the bottom */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center justify-center space-x-4">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter size={18} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
