
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Nvidia", value: 3.2, color: "#16a34a" },
  { name: "Microsoft", value: 2.8, color: "#2563eb" },
  { name: "Google", value: 1.9, color: "#9333ea" },
  { name: "Amazon", value: 1.7, color: "#f97316" },
  { name: "Meta", value: 1.2, color: "#0284c7" },
  { name: "Apple", value: 1.0, color: "#ef4444" },
  { name: "Tesla", value: 0.8, color: "#6b7280" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border border-border rounded shadow-sm">
        <p className="font-medium">{payload[0].payload.name}</p>
        <p className="text-sm">{`Market Cap: $${payload[0].value} Trillion`}</p>
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
    }, 1700);

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
        <CardTitle>Most Valued AI Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
              <XAxis 
                type="number" 
                unit="T" 
                domain={[0, 'dataMax']}
                tickFormatter={(value) => `$${value}`}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={{ stroke: "hsl(var(--border))" }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                barSize={30} 
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
