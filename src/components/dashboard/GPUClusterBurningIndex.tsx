
import { useState, useEffect } from "react";
import { Cpu, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function GPUClusterBurningIndex() {
  const [isLoading, setIsLoading] = useState(true);
  const [burningIndex, setBurningIndex] = useState(66); // Initial value (mid range)

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
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black p-2">
      <div className="text-xs font-medium text-white mb-1 flex justify-between items-center">
        <div>GPU Cluster Burning Index</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-3 w-3 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs w-48">
                Indicates how intensively GPU clusters are being utilized across major AI labs
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="w-full">
        {/* GPU Burning Index Gradient Bar */}
        <div className="relative w-full h-4 rounded-md overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500" 
          />
          
          {/* Value Labels */}
          <div className="absolute inset-0 flex justify-between px-2 text-[10px] text-white font-medium items-center">
            <span>33</span>
            <span>66</span>
            <span>99</span>
          </div>
        </div>
      </div>
    </div>
  );
}
