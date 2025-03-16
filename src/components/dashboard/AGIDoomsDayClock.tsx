
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AGIDoomsDayClock() {
  const [minutes, setMinutes] = useState(50);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(loadTimer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black p-3 flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-semibold text-white">AGI Dooms Day Clock</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-3 w-3 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs w-48">
                This clock represents how close humanity is to potential AGI risks
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex-1 flex justify-between items-center">
        <div className="text-center">
          <div className="text-xs text-blue-400">It's</div>
          <div className="text-sm font-bold text-red-400">{minutes} Minutes</div>
          <div className="text-[10px] text-blue-400">to Midnight...</div>
        </div>
        
        <div className="relative w-20 h-20">
          <img 
            src="/public/lovable-uploads/agidoomsdayclock.png" 
            alt="Clock" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
