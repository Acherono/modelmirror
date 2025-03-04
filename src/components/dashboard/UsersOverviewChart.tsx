
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

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

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Color gradient for bars
  const barFill = "url(#colorGradient)";

  if (isLoading) {
    return (
      <Card className="w-full h-[350px] animate-pulse">
        <CardHeader>
          <CardTitle className="bg-gray-200 h-6 w-48 rounded"></CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[350px]">
      <CardHeader>
        <CardTitle>Users Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            barSize={36}
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
              tickFormatter={(value) => value.toLocaleString()}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="users" 
              fill={barFill} 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
