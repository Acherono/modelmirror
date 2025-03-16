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
  MoreHorizontal,
  BrainCircuit
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

  // Custom active class for sidebar items in dark mode
  const activeClass = isDarkMode 
    ? "bg-white text-black font-semibold" // White background with black text for dark mode
    : "bg-primary text-primary-foreground"; // Original styling for light mode

  return (
    <div className="h-screen fixed left-0 top-0 z-40 flex flex-col bg-sidebar border-r border-border w-[175px]">
      <div className="flex items-center justify-center h-14 px-3 ">
        <img
          src="/lovable-uploads/genrilogo.png"
          alt="GENRI Logo"
          className="h-8 max-w-[160px] object-contain"
        />
      </div>

      <div className="px-2 pt-3 border-t border-border">
        <GlobalSearch />
      </div>

      <div className="flex-1 overflow-y-auto py-4 hide-scrollbar">
        <nav className="space-y-1 px-2 mb-6">
          <Link
            to="/"
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
              location.pathname === "/"
                ? activeClass // Use the custom active class
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
                  ? activeClass // Use the custom active class
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
                location.pathname === "/store" || location.pathname === "/llms" || expandedMenus.modelsStore
                  ? activeClass // Use the custom active class
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
                ? activeClass // Use the custom active class
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
                ? activeClass // Use the custom active class
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
                ? activeClass // Use the custom active class
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span>Statistics</span>
          </Link>
        </nav>
      </div>

      <div className="border-t border-border px-4 py-3">
        {/* Update the sign in / sign up buttons to match the design */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button variant="outline" className="rounded-lg flex items-center gap-2 justify-center py-2 ">
            <span className="font-sm">Sign Up</span>
          </Button>

          <Button className="rounded-lg bg-white hover:bg-white/80 flex items-center gap-2 justify-center py-2">
            <span className="font-medium">Sign In</span>
          </Button>
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-3">
            <a
              href="https://twitter.com/GENRI_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/GENRIML"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </a>
            <a
              href="https://github.com/GENRIML"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </a>
          </div>

          <button
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-secondary transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
            </svg>}
          </button>
        </div>
      </div>
    </div>
  );
}
