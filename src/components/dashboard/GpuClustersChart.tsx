
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Cluster A", gpus: 1200, utilization: 75 },
  { name: "Cluster B", gpus: 800, utilization: 60 },
  { name: "Cluster C", gpus: 1500, utilization: 80 },
  { name: "Cluster D", gpus: 900, utilization: 70 },
  { name: "Cluster E", gpus: 1100, utilization: 65 },
];

export function GpuClustersChart() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

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
      <div className="text-lg font-semibold mb-4 border-b pb-2">GPU Clusters Utilization</div>
      <div className="h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" label={{ value: 'GPUs', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Utilization (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="gpus" name="Number of GPUs" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="utilization" name="Utilization (%)" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
