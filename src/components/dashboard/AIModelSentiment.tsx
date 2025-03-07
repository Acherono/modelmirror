
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Brain } from "lucide-react";

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

  // Calculate color based on sentiment value
  const getColor = () => {
    if (sentiment < 30) return "#ef4444"; // Red
    if (sentiment < 50) return "#f97316"; // Orange
    if (sentiment < 70) return "#f59e0b"; // Amber
    return "#10b981"; // Green
  };

  // Calculate rotation for the gauge needle
  const getNeedleRotation = () => {
    // Convert sentiment (0-100) to degrees (0-180)
    return (sentiment / 100) * 180;
  };

  if (isLoading) {
    return (
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="bg-gray-200 h-6 w-48 rounded animate-pulse">
            Loading...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[120px]">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full bg-sidebar overflow-hidden">
      <CardHeader className="border-b border-border p-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Confidence Index
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[180px] h-[90px] overflow-hidden mb-2">
            {/* Gauge Background */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-transparent">
              <div className="relative w-full h-full">
                {/* Semi-circle gradient background */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-full rounded-t-full overflow-hidden" 
                  style={{
                    background: "linear-gradient(to right, #ef4444, #f97316, #f59e0b, #10b981)",
                    opacity: 0.3
                  }}
                />
                
                {/* Needle */}
                <div 
                  className="absolute bottom-0 left-1/2 h-[85px] w-1 bg-primary z-10 origin-bottom transform -translate-x-1/2"
                  style={{ transform: `translateX(-50%) rotate(${getNeedleRotation() - 90}deg)` }}
                >
                  <div className="w-3 h-3 rounded-full bg-primary absolute -left-1 -top-1.5" />
                </div>
                
                {/* Center point */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full z-20" />
              </div>
            </div>
          </div>
          
          {/* Sentiment Value */}
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold" style={{ color: getColor() }}>
              {sentiment}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Confidence
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
