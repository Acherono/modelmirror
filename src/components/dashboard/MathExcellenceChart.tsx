
import { useState, useEffect } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts";

// Sample data for radar chart
const initialData = [
  { subject: "Algebra", "GPT-4": 90, "Claude 3": 87, "Gemini": 84 },
  { subject: "Calculus", "GPT-4": 85, "Claude 3": 80, "Gemini": 78 },
  { subject: "Statistics", "GPT-4": 88, "Claude 3": 90, "Gemini": 82 },
  { subject: "Geometry", "GPT-4": 80, "Claude 3": 75, "Gemini": 74 },
  { subject: "Number Theory", "GPT-4": 93, "Claude 3": 89, "Gemini": 86 },
  { subject: "Logic", "GPT-4": 92, "Claude 3": 88, "Gemini": 90 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toFixed(1)}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function MathExcellenceChart() {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] p-4">
      <div className="text-lg font-semibold mb-4 border-b pb-2">Math Excellence</div>
      <div className="h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="75%" data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="subject"
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <Radar
              name="GPT-4"
              dataKey="GPT-4"
              stroke="#0ea5e9"
              fill="#0ea5e9"
              fillOpacity={0.3}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Radar
              name="Claude 3"
              dataKey="Claude 3"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.3}
              animationDuration={1700}
              animationEasing="ease-out"
            />
            <Radar
              name="Gemini"
              dataKey="Gemini"
              stroke="#f97316"
              fill="#f97316"
              fillOpacity={0.3}
              animationDuration={1900}
              animationEasing="ease-out"
            />
            <Legend wrapperStyle={{ paddingTop: 20 }} />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
