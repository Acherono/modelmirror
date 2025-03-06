import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for the stacked bar chart
const initialData = [
  {
    name: "GPT-4",
    MMLU: 86.4,
    GSM8K: 92.0,
    HumanEval: 88.5,
  },
  {
    name: "Claude 3",
    MMLU: 84.5,
    GSM8K: 88.2,
    HumanEval: 85.0,
  },
  {
    name: "Gemini",
    MMLU: 83.1,
    GSM8K: 87.5,
    HumanEval: 82.3,
  },
  {
    name: "Llama 3",
    MMLU: 78.2,
    GSM8K: 82.4,
    HumanEval: 79.7,
  },
  {
    name: "Mistral",
    MMLU: 75.8,
    GSM8K: 79.5,
    HumanEval: 76.2,
  },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toFixed(1)}%`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function AccuracyRankings() {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="bg-gray-200 h-6 w-52 rounded"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-72">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[380px]">
      <CardHeader>
        <CardTitle>Accuracy Rankings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 30, left: 60, bottom: 20 }}
              barGap={3}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.2} />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Bar 
                dataKey="MMLU" 
                stackId="benchmarks" 
                fill="#4338ca" 
                radius={[0, 0, 0, 0]}
                animationDuration={1400}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="GSM8K" 
                stackId="benchmarks" 
                fill="#7c3aed" 
                radius={[0, 0, 0, 0]}
                animationDuration={1600}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="HumanEval" 
                stackId="benchmarks" 
                fill="#a855f7" 
                radius={[0, 0, 0, 0]}
                animationDuration={1800}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
