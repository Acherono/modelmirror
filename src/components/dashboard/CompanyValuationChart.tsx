
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "OpenAI", value: 175 },
  { name: "Google", value: 160 },
  { name: "Microsoft", value: 200 },
  { name: "NVIDIA", value: 150 },
  { name: "Meta", value: 130 },
  { name: "Amazon", value: 140 },
];

export function CompanyValuationChart() {
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
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] p-4">
      <div className="text-lg font-semibold mb-4 border-b pb-2">AI Company Valuations (Billions $)</div>
      <div className="h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            
            <Bar
              dataKey="value"
              name="Market Cap"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
