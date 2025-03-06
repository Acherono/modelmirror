
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState, useEffect, useRef } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  TooltipProps, 
  ReferenceArea,
  Brush
} from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { Button } from "../ui/button";
import { ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

// Sample data
const initialData = [
  { name: "GPT-4", users: 4200 },
  { name: "Claude 3", users: 3800 },
  { name: "Gemini", users: 3500 },
  { name: "Llama 3", users: 2800 },
  { name: "Mistral", users: 1900 },
  { name: "Falcon", users: 1200 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="font-medium">{label}</p>
        <p className="text-primary">
          {`${payload[0].name}: ${payload[0].value?.toLocaleString()}`}
        </p>
      </div>
    );
  }

  return null;
};

export function UsersOverviewChart() {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");
  const [zoomMode, setZoomMode] = useState(false);
  
  // Track original data domain for zoom reset
  const [originalDomain, setOriginalDomain] = useState<[number, number]>([0, 5000]);
  const [currentDomain, setCurrentDomain] = useState<[number, number]>([0, 5000]);
  
  const chartRef = useRef<any>(null);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Set the original domain based on the max value
      const maxValue = Math.max(...data.map(item => item.users));
      const roundedMax = Math.ceil(maxValue / 1000) * 1000; // Round up to nearest thousand
      setOriginalDomain([0, roundedMax]);
      setCurrentDomain([0, roundedMax]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Start zooming
  const handleMouseDown = (e: any) => {
    if (!zoomMode) return;
    if (e && e.activeLabel) {
      setRefAreaLeft(e.activeLabel);
    }
  };

  // Continue zooming
  const handleMouseMove = (e: any) => {
    if (!zoomMode || !refAreaLeft) return;
    if (e && e.activeLabel) {
      setRefAreaRight(e.activeLabel);
    }
  };

  // End zooming
  const handleMouseUp = () => {
    if (!zoomMode || !refAreaLeft || !refAreaRight) {
      setRefAreaLeft("");
      setRefAreaRight("");
      return;
    }
    
    // Get data bounds for the selected area
    const leftIndex = data.findIndex(d => d.name === refAreaLeft);
    const rightIndex = data.findIndex(d => d.name === refAreaRight);
    
    const startIndex = Math.min(leftIndex, rightIndex);
    const endIndex = Math.max(leftIndex, rightIndex);
    
    // Find the min and max values in the selected range
    const selectedData = data.slice(startIndex, endIndex + 1);
    const minValue = Math.min(...selectedData.map(d => d.users));
    const maxValue = Math.max(...selectedData.map(d => d.users));
    
    const padding = (maxValue - minValue) * 0.1; // 10% padding
    
    setCurrentDomain([
      Math.max(0, minValue - padding),
      maxValue + padding
    ]);
    
    // Reset reference area
    setRefAreaLeft("");
    setRefAreaRight("");
  };

  // Reset zoom
  const resetZoom = () => {
    setCurrentDomain(originalDomain);
  };

  // Toggle zoom mode
  const toggleZoomMode = () => {
    setZoomMode(!zoomMode);
    if (refAreaLeft || refAreaRight) {
      setRefAreaLeft("");
      setRefAreaRight("");
    }
  };

  // Color gradient for bars
  const barFill = "url(#colorGradient)";

  if (isLoading) {
    return (
      <Card className="w-full h-[380px]">
        <CardHeader>
          <CardTitle className="bg-gray-200 h-6 w-48 rounded" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[380px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Users Overview</CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            variant={zoomMode ? "default" : "outline"} 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={toggleZoomMode}
            title={zoomMode ? "Exit zoom mode" : "Enter zoom mode"}
          >
            {zoomMode ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={resetZoom}
            title="Reset view"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              ref={chartRef}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              barSize={36}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                domain={currentDomain}
                tickFormatter={(value) => value.toLocaleString()}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Brush 
                dataKey="name" 
                height={20} 
                stroke="hsl(var(--primary))"
                fill="hsl(var(--background))"
              />
              <Bar 
                dataKey="users" 
                fill={barFill} 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              {refAreaLeft && refAreaRight && (
                <ReferenceArea
                  x1={refAreaLeft}
                  x2={refAreaRight}
                  strokeOpacity={0.3}
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
