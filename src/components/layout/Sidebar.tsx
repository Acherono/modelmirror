
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Moon, 
  Sun, 
  LogIn, 
  UserPlus, 
  Search,
  ChevronDown,
  ChevronRight,
  Code,
  Calculator,
  Atom,
  FlaskConical,
  Leaf,
  Cpu,
  Image,
  Video,
  Eye,
  Car,
  Mic,
  MoreHorizontal
} from "lucide-react";
import { useEffect, useState } from "react";
import { GlobalSearch } from "../header/GlobalSearch";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    testCenter: false,
    modelsStore: false
  });

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

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

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
      <div className="flex items-center justify-center h-14 px-3 border-b border-border">
        <img 
          src="/lovable-uploads/38f892de-aa3f-4959-8421-738f4a8422ea.png" 
          alt="GENRI Logo" 
          className="h-8 max-w-[160px] object-contain" 
        />
      </div>

      <div className="px-2 py-3 border-b border-border">
        <GlobalSearch />
      </div>

      <div className="flex-1 overflow-y-auto py-4 hide-scrollbar">
        <nav className="space-y-1 px-2 mb-6">
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

          <div>
            <div 
              className={cn(
                "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer",
                location.pathname === "/testcenter" || expandedMenus.testCenter
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              onClick={() => toggleMenu('testCenter')}
            >
              <span>Test Center</span>
              {expandedMenus.testCenter ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </div>
            
            {expandedMenus.testCenter && (
              <div className="ml-4 mt-1 space-y-1">
                <Link
                  to="/testcenter?category=coding"
                  className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Code className="h-3 w-3 mr-2" />
                  <span>Coding</span>
                </Link>
                <Link
                  to="/testcenter?category=math"
                  className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Calculator className="h-3 w-3 mr-2" />
                  <span>Math</span>
                </Link>
                <Link
                  to="/testcenter?category=physics"
                  className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Atom className="h-3 w-3 mr-2" />
                  <span>Physics</span>
                </Link>
                <Link
                  to="/testcenter?category=chemistry"
                  className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <FlaskConical className="h-3 w-3 mr-2" />
                  <span>Chemistry</span>
                </Link>
                <Link
                  to="/testcenter?category=biology"
                  className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Leaf className="h-3 w-3 mr-2" />
                  <span>Biology</span>
                </Link>
              </div>
            )}
          </div>

          <div>
            <div 
              className={cn(
                "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer",
                location.pathname === "/store" || expandedMenus.modelsStore
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              onClick={() => toggleMenu('modelsStore')}
            >
              <span>Model's Store</span>
              {expandedMenus.modelsStore ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </div>
            
            {expandedMenus.modelsStore && (
              <div className="ml-4 mt-1 space-y-1">
                <Link
                  to="/store?category=llms"
                  className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Cpu className="h-3 w-3 mr-2" />
                  <span>LLMs</span>
                </Link>
                <Link
                  to="/store?category=image-video"
                  className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Image className="h-3 w-3 mr-2" />
                  <span>Image & Video</span>
                </Link>
                <Link
                  to="/store?category=vision"
                  className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Eye className="h-3 w-3 mr-2" />
                  <span>Vision</span>
                </Link>
                <Link
                  to="/store?category=fsd"
                  className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Car className="h-3 w-3 mr-2" />
                  <span>FSD</span>
                </Link>
                <Link
                  to="/store?category=voice"
                  className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Mic className="h-3 w-3 mr-2" />
                  <span>Voice</span>
                </Link>
                <Link
                  to="/store?category=more"
                  className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <MoreHorizontal className="h-3 w-3 mr-2" />
                  <span>more...</span>
                </Link>
              </div>
            )}
          </div>

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
