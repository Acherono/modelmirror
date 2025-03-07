import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Sample data for company valuations
const data = [
  { name: "OpenAI", valuation: 86, previousValuation: 65 },
  { name: "Anthropic", valuation: 35, previousValuation: 18 },
  { name: "Cohere", valuation: 12, previousValuation: 6 },
  { name: "Mistral", valuation: 7, previousValuation: 2 },
  { name: "Inflection", valuation: 4, previousValuation: 1.5 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-primary">
          Current: ${payload[0].value}B
        </p>
        <p className="text-sm text-muted-foreground">
          Previous: ${payload[1].value}B
        </p>
        <p className="text-xs text-green-500 font-medium">
          +{((payload[0].value / payload[1].value - 1) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }

  return null;
};

export function CompanyValuationChart() {
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
        <CardTitle>AI Company Valuations (Billions USD)</CardTitle>
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
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `$${value}B`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="valuation" 
                name="Current Valuation" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar 
                dataKey="previousValuation" 
                name="Previous Valuation" 
                fill="hsl(var(--muted))" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationDelay={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
