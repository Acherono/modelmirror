
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Cpu } from "lucide-react";

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
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="bg-gray-200 h-6 w-48 rounded animate-pulse">
            Loading...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[80px]">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full bg-sidebar overflow-hidden">
      <CardHeader className="border-b border-border p-3 flex items-center gap-2">
        <Cpu className="h-4 w-4" />
        <CardTitle className="text-sm font-medium">GPU Cluster Burning Index</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full h-full">
          {/* GPU Burning Index Gradient Bar */}
          <div className="relative w-full h-6 mb-2 rounded-md overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500" 
            />
            
            {/* Indicator Marker */}
            <div 
              className="absolute top-0 h-full w-1 bg-white"
              style={{ left: `${burningIndex}%` }}
            />
            
            {/* Value Labels */}
            <div className="absolute inset-0 flex justify-between px-2 text-xs text-white font-medium">
              <span>33</span>
              <span>66</span>
              <span>99</span>
            </div>
          </div>
          
          {/* Current Value */}
          <div className="text-center text-2xl font-bold text-white">
            {burningIndex}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
