import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Sample data for the area chart
const initialData = [
  { name: "Jan", users: 4000, activeUsers: 2400, newUsers: 1200 },
  { name: "Feb", users: 5000, activeUsers: 3000, newUsers: 1500 },
  { name: "Mar", users: 6000, activeUsers: 3600, newUsers: 1800 },
  { name: "Apr", users: 7000, activeUsers: 4200, newUsers: 2100 },
  { name: "May", users: 8000, activeUsers: 4800, newUsers: 2400 },
  { name: "Jun", users: 9000, activeUsers: 5400, newUsers: 2700 },
  { name: "Jul", users: 10000, activeUsers: 6000, newUsers: 3000 },
  { name: "Aug", users: 11000, activeUsers: 6600, newUsers: 3300 },
  { name: "Sep", users: 12000, activeUsers: 7200, newUsers: 3600 },
  { name: "Oct", users: 13000, activeUsers: 7800, newUsers: 3900 },
  { name: "Nov", users: 14000, activeUsers: 8400, newUsers: 4200 },
  { name: "Dec", users: 15000, activeUsers: 9000, newUsers: 4500 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

interface LoadingCardProps {
  className?: string;
  children: ReactNode;
}

export function LoadingCard({ className, children }: LoadingCardProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function UsersOverviewChart() {
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
        <CardTitle>Users Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
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
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Area
                type="monotone"
                dataKey="users"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.5}
                animationDuration={1500}
                name="Total Users"
              />
              <Area
                type="monotone"
                dataKey="activeUsers"
                stackId="2"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.5}
                animationDuration={1700}
                name="Active Users"
              />
              <Area
                type="monotone"
                dataKey="newUsers"
                stackId="3"
                stroke="#ffc658"
                fill="#ffc658"
                fillOpacity={0.5}
                animationDuration={1900}
                name="New Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
