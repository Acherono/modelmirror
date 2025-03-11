
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Brain } from "lucide-react";

interface AGIItem {
  name: string;
  value: number;
  maxValue: number;
}

export function AGIIndex() {
  const [agiData, setAgiData] = useState<AGIItem[]>([
    {
      name: "GPT Dominance",
      value: 40,
      maxValue: 100
    },
    {
      name: "Claude Dominance",
      value: 11,
      maxValue: 100
    }
  ]);
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
        <CardTitle className="text-sm font-medium text-center">
          AGI Index
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-full max-w-[300px] h-[16px] bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${overallIndex}%` }}
            />
            <div className="absolute top-0 inset-x-0 flex justify-between px-2">
              <span className="text-[10px] text-white">0</span>
              <span className="text-[10px] text-white">50</span>
              <span className="text-[10px] text-white">100</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          {agiData.map((item, index) => (
            <div key={index} className="bg-gray-900 p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">{item.name}</div>
              <div className="text-xl font-bold">
                {item.value} <span className="text-sm text-muted-foreground">/ {item.maxValue}</span>
              </div>
              <div className="mt-2 relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-orange-500 rounded-full"
                  style={{ width: `${(item.value / item.maxValue) * 100}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
