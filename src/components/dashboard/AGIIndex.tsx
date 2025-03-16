import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Brain, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AGIIndex() {
  const [overallIndex, setOverallIndex] = useState(40);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

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
    <div className="bg-background w-full h-full p-3 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-semibold dark:text-white text-foreground">AGI Index</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-3 w-3 dark:text-gray-400 text-gray-600" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs w-48">
                The AGI Index measures progress toward Artificial General Intelligence
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full px-4 mb-4">
          <div className="relative h-4 dark:bg-blue-900/30 bg-blue-300/50 rounded-full overflow-hidden flex items-center">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${overallIndex}%` }}
            />
            <div className="absolute inset-x-0 flex justify-between px-1 z-10">
              <span className="text-[9px] dark:text-white text-gray-800">0</span>
              <span className="text-[9px] dark:text-white text-gray-800">50</span>
              <span className="text-[9px] dark:text-white text-gray-800">100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
