import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Sample data for industry citations
const initialData = [
  { name: "OpenAI", papers: 120, citations: 4500 },
  { name: "Google DeepMind", papers: 95, citations: 3800 },
  { name: "Anthropic", papers: 45, citations: 1200 },
  { name: "Meta AI", papers: 75, citations: 2100 },
  { name: "Microsoft", papers: 60, citations: 1800 },
  { name: "Cohere", papers: 25, citations: 600 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-blue-500">{`Papers: ${payload[0].value}`}</p>
        <p className="text-sm text-purple-500">{`Citations: ${payload[1].value}`}</p>
      </div>
    );
  }

  return null;
};

export function IndustryCitations() {
  const [data, setData] = useState(initialData);
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
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="bg-gray-200 h-6 w-48 rounded animate-pulse">
            Loading...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-80">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle>Industry Citations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                label={{ 
                  value: "Papers Published", 
                  angle: -90, 
                  position: "insideLeft",
                  style: { textAnchor: 'middle', fontSize: 12 } 
                }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                label={{ 
                  value: "Citations", 
                  angle: 90, 
                  position: "insideRight",
                  style: { textAnchor: 'middle', fontSize: 12 } 
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Bar 
                yAxisId="left" 
                dataKey="papers" 
                fill="#3b82f6" 
                name="Papers Published"
                animationDuration={1500}
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right" 
                dataKey="citations" 
                fill="#8b5cf6" 
                name="Citations"
                animationDuration={1700}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
