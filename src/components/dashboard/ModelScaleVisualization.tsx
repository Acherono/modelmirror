import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Sample data for the bubble chart
const initialData = [
  { name: "GPT-4", parameters: 1000, trainingData: 13, age: 1.5, x: 1000, y: 13, z: 200 },
  { name: "Claude 3", parameters: 800, trainingData: 11, age: 1.2, x: 800, y: 11, z: 180 },
  { name: "PaLM 2", parameters: 540, trainingData: 8, age: 1.8, x: 540, y: 8, z: 150 },
  { name: "Gemini", parameters: 700, trainingData: 10, age: 1.0, x: 700, y: 10, z: 170 },
  { name: "Llama 3", parameters: 400, trainingData: 7, age: 0.8, x: 400, y: 7, z: 140 },
  { name: "Falcon", parameters: 250, trainingData: 4, age: 1.4, x: 250, y: 4, z: 120 },
  { name: "Mistral", parameters: 150, trainingData: 3, age: 0.6, x: 150, y: 3, z: 100 },
  { name: "Phi-3", parameters: 100, trainingData: 2, age: 0.4, x: 100, y: 2, z: 80 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="chart-tooltip">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm">{`Parameters: ${data.parameters.toLocaleString()}B`}</p>
        <p className="text-sm">{`Training Data: ${data.trainingData.toLocaleString()}T tokens`}</p>
        <p className="text-sm">{`Age: ${data.age} years`}</p>
      </div>
    );
  }

  return null;
};

export function ModelScaleVisualization() {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="bg-gray-200 h-6 w-48 rounded"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-80">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const parseDomain = () => {
    return [
      0,
      Math.max.apply(null, data.map((entry) => entry.parameters)),
    ];
  };

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle>Model Scale Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                type="number"
                dataKey="parameters"
                name="Parameters"
                unit="B"
                domain={[0, 'dataMax']}
                label={{ 
                  value: "Parameters (billions)", 
                  position: "bottom", 
                  offset: 5,
                  style: { textAnchor: 'middle', fontSize: 12 } 
                }}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                type="number"
                dataKey="trainingData"
                name="Training Data"
                unit="T"
                domain={[0, 'dataMax']}
                label={{ 
                  value: "Training Data (trillion tokens)", 
                  angle: -90, 
                  position: "left", 
                  offset: -5,
                  style: { textAnchor: 'middle', fontSize: 12 } 
                }}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <ZAxis
                type="number"
                dataKey="z"
                range={[60, 400]}
                domain={parseDomain()}
                scale="linear"
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                name="Models"
                data={data}
                fill="hsl(var(--primary))"
                animationDuration={2000}
                animationEasing="ease-out"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
