import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Brain, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ClaudeDominance() {
  const [dominanceValue, setDominanceValue] = useState(11);
  const [maxValue, setMaxValue] = useState(100);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-3 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-semibold dark:text-white text-foreground">Claude Dominance</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-3 w-3 dark:text-gray-400 text-gray-600" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs w-48">
                Claude Dominance measures Anthropic's model influence in the AI market
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-2xl font-bold dark:text-white text-foreground">
          {dominanceValue} <span className="text-xs dark:text-gray-400 text-gray-500">/ {maxValue}</span>
        </div>
        
        <div className="w-full mt-2">
          <div className="relative w-full h-2 dark:bg-gray-800 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
              style={{ width: `${(dominanceValue / maxValue) * 100}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
