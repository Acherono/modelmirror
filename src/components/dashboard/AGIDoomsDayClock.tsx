
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock } from "lucide-react";

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
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="bg-gray-200 h-6 w-48 rounded animate-pulse">
            Loading...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[100px]">
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
          AGI Dooms Day Clock
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          {/* Clock Display */}
          <div className="relative w-24 h-24 rounded-full border-4 border-white flex items-center justify-center">
            {/* Clock Face */}
            <div className="absolute inset-0 rounded-full">
              {/* Clock Numbers */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const x = 38 * Math.sin(angle);
                const y = -38 * Math.cos(angle);
                return (
                  <div
                    key={i}
                    className="absolute text-[10px] font-bold text-white"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {i === 0 ? 12 : i}
                  </div>
                );
              })}
              
              {/* Hour Hand - Fixed at 11 */}
              <div
                className="absolute w-1 h-4 bg-white rounded-full origin-bottom"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translateX(-50%) rotate(330deg)`, // 330 degrees for 11 o'clock
                  transformOrigin: 'bottom center'
                }}
              />
              
              {/* Minute Hand - Fixed at 10 mins (11:10) */}
              <div
                className="absolute w-0.5 h-6 bg-white rounded-full origin-bottom"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translateX(-50%) rotate(60deg)`, // 60 degrees for 10 minutes
                  transformOrigin: 'bottom center'
                }}
              />
              
              {/* Second Hand - Removed as it needs to be static */}
              
              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          {/* Message */}
          <div className="text-center mt-2">
            <div className="text-xs text-white">It's</div>
            <div className="text-lg font-bold text-red-400">{minutes} Minutes</div>
            <div className="text-xs text-white">to Midnight...</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
