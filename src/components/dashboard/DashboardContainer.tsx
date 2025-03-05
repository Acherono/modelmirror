
import { MetricCard } from "../ui/MetricCard";
import { Users, BarChart2, Brain, Award } from "lucide-react";
import { UsersOverviewChart } from "./UsersOverviewChart";
import { AccuracyRankings } from "./AccuracyRankings";
import { MathExcellenceChart } from "./MathExcellenceChart";
import { IndustryCitations } from "./IndustryCitations";
import { ModelScaleVisualization } from "./ModelScaleVisualization";
import { DashboardWidgetContainer } from "./DashboardWidgetContainer";

export function DashboardContainer() {
  // Define widgets for the dashboard
  const widgets = [
    {
      i: "metrics",
      x: 0,
      y: 0,
      w: 12,
      h: 1,
      minW: 6,
      minH: 1,
      visible: true,
      title: "Key Metrics",
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Models"
            value="128"
            icon={<Brain size={24} />}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Active Users"
            value="4.2M"
            icon={<Users size={24} />}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Accuracy Avg."
            value="89.4%"
            icon={<BarChart2 size={24} />}
            trend={{ value: 2.5, isPositive: true }}
          />
          <MetricCard
            title="Top Citations"
            value="47.3K"
            icon={<Award size={24} />}
            trend={{ value: 15, isPositive: true }}
          />
        </div>
      )
    },
    {
      i: "users-overview",
      x: 0,
      y: 1,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Users Overview",
      component: <UsersOverviewChart />
    },
    {
      i: "accuracy-rankings",
      x: 6,
      y: 1,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Accuracy Rankings",
      component: <AccuracyRankings />
    },
    {
      i: "math-excellence",
      x: 0,
      y: 3,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Math Excellence",
      component: <MathExcellenceChart />
    },
    {
      i: "industry-citations",
      x: 6,
      y: 3,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Industry Citations",
      component: <IndustryCitations />
    },
    {
      i: "model-scale",
      x: 0,
      y: 5,
      w: 12,
      h: 2,
      minW: 6,
      minH: 2,
      visible: true,
      title: "Model Scale",
      component: <ModelScaleVisualization />
    },
  ];

  return <DashboardWidgetContainer widgets={widgets} />;
}
