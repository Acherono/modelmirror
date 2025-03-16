
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Brain, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AIModelSentiment() {
  const [sentiment, setSentiment] = useState(70);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Calculate rotation for the gauge needle
  const getNeedleRotation = () => {
    // Convert sentiment (0-100) to degrees (0-180)
    return (sentiment / 100) * 180;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Brain className="h-3 w-3 text-white" />
          <div className="text-xs font-semibold text-white">AI Confidence Index</div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-3 w-3 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs w-48">
                AI Confidence Index measures the overall confidence in the capabilities of current AI models.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex flex-col items-center justify-center pt-2">
        <div className="relative w-full max-w-[140px] h-[70px] overflow-hidden mb-2">
          {/* Gauge Background */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-transparent">
            <div className="relative w-full h-full">
              {/* Semi-circle gradient background */}
              <div 
                className="absolute bottom-0 left-0 w-full h-full rounded-t-full overflow-hidden" 
                style={{
                  background: "linear-gradient(to right, #ef4444, #f97316, #f59e0b, #10b981)",
                }}
              />
              
              {/* Needle */}
              <div 
                className="absolute bottom-0 left-1/2 h-[65px] w-1 bg-white z-10 origin-bottom transform -translate-x-1/2"
                style={{ transform: `translateX(-50%) rotate(${getNeedleRotation() - 90}deg)` }}
              >
                <div className="w-3 h-3 rounded-full bg-white absolute -left-1 -top-1.5" />
              </div>
              
              {/* Center point */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black border-2 border-white rounded-full z-20" />
            </div>
          </div>
        </div>
        
        {/* Sentiment Value */}
        <div className="text-3xl font-bold text-[#00e5ff]">
          {sentiment}
        </div>
      </div>
    </div>
  );
}
