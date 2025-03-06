
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { year: '2018', OpenAI: 5, Google: 8, Meta: 3, Anthropic: 0 },
  { year: '2019', OpenAI: 7, Google: 10, Meta: 4, Anthropic: 1 },
  { year: '2020', OpenAI: 12, Google: 15, Meta: 8, Anthropic: 3 },
  { year: '2021', OpenAI: 20, Google: 25, Meta: 12, Anthropic: 5 },
  { year: '2022', OpenAI: 35, Google: 32, Meta: 18, Anthropic: 12 },
  { year: '2023', OpenAI: 70, Google: 45, Meta: 25, Anthropic: 30 },
  { year: '2024', OpenAI: 120, Google: 75, Meta: 40, Anthropic: 55 },
];

export function GpuClustersChart() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Card className="w-full h-[400px]">
        <CardHeader>
          <CardTitle className="bg-gray-200 h-6 w-48 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-80">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle>GPU Clusters for AI Training</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="year" 
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                label={{ 
                  value: 'GPU Clusters (thousands)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' } 
                }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip 
                formatter={(value) => [`${value}k GPUs`, undefined]}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))" 
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="OpenAI" 
                stroke="#10b981" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
                animationDuration={1500}
              />
              <Line 
                type="monotone" 
                dataKey="Google" 
                stroke="#3b82f6" 
                strokeWidth={2}
                animationDuration={1700}
              />
              <Line 
                type="monotone" 
                dataKey="Meta" 
                stroke="#ec4899" 
                strokeWidth={2}
                animationDuration={1900}
              />
              <Line 
                type="monotone" 
                dataKey="Anthropic" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                animationDuration={2100}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
