
import { MetricCard } from "../ui/MetricCard";
import { Users, BarChart2, Brain, Award } from "lucide-react";
import { UsersOverviewChart } from "./UsersOverviewChart";
import { AccuracyRankings } from "./AccuracyRankings";
import { MathExcellenceChart } from "./MathExcellenceChart";
import { IndustryCitations } from "./IndustryCitations";
import { ModelScaleVisualization } from "./ModelScaleVisualization";

export function DashboardContainer() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsersOverviewChart />
        <AccuracyRankings />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MathExcellenceChart />
        <IndustryCitations />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ModelScaleVisualization />
      </div>
    </div>
  );
}
