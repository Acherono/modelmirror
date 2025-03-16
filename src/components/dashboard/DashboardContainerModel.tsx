
import { ReactNode } from "react";
import { UsersOverviewChart } from "./UsersOverviewChart";
import { AccuracyRankings } from "./AccuracyRankings";
import { MathExcellenceChart } from "./MathExcellenceChart";
import { IndustryCitations } from "./IndustryCitations";
import { ModelScaleVisualization } from "./ModelScaleVisualization";
import { MarketShareChart } from "./MarketShareChart";
import { CompanyValuationChart } from "./CompanyValuationChart";
import { GpuClustersChart } from "./GpuClustersChart";
import { ModelRankings } from "./ModelRankings";
import { AIModelSentiment } from "./AIModelSentiment";
import { AIModelsTable } from "./AIModelsTable";
import { GPUClusterBurningIndex } from "./GPUClusterBurningIndex";
import { AGIIndex } from "./AGIIndex";
import { AGIDoomsDayClock } from "./AGIDoomsDayClock";
import { ChatComponent } from "./ChatComponent";

export interface Widget {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW: number;
  minH: number;
  visible: boolean;
  title: string;
  component: ReactNode;
}

export class DashboardContainerModel {
  private widgets: Widget[] = [
    // First row - 5 components in one row
    // Chat Component
    {
      i: "chat-component",
      x: 0,
      y: 0,
      w: 2.4,
      h: 1.5,
      minW: 2,
      minH: 1.5,
      visible: true,
      title: "Chat",
      component: <ChatComponent />,
    },
    // AI Confidence Index
    {
      i: "ai-sentiment",
      x: 2.4,
      y: 0,
      w: 2.4,
      h: 1.5,
      minW: 2,
      minH: 1.5,
      visible: true,
      title: "AI Confidence",
      component: <AIModelSentiment />,
    },
    // Trending Models
    {
      i: "trending-models",
      x: 4.8,
      y: 0,
      w: 2.4,
      h: 1.5,
      minW: 2,
      minH: 1.5,
      visible: true,
      title: "Trending Models",
      component: <ModelRankings />,
    },
    // AGI Index
    {
      i: "agi-index",
      x: 7.2,
      y: 0,
      w: 2.4,
      h: 1.5,
      minW: 2,
      minH: 1.5,
      visible: true,
      title: "AGI Index",
      component: <AGIIndex />,
    },
    // AGI Dooms Day Clock
    {
      i: "agi-doomsday-clock",
      x: 9.6,
      y: 0,
      w: 2.4,
      h: 1.5,
      minW: 2,
      minH: 1.5,
      visible: true,
      title: "AGI Dooms Day Clock",
      component: <AGIDoomsDayClock />,
    },
    
    // Second row - 3 components
    // GPU Cluster Burning Index
    {
      i: "gpu-cluster-burning",
      x: 0,
      y: 1.5,
      w: 4,
      h: 1.5,
      minW: 3,
      minH: 1.5,
      visible: true,
      title: "GPU Cluster Burning Index",
      component: <GPUClusterBurningIndex />,
    },
    // Remove GPT Dominance and Claude Dominance widgets since they used AIModelDominance
    
    // Main AI Models Table
    {
      i: "ai-models-table",
      x: 0,
      y: 3,
      w: 12,
      h: 3,
      minW: 6,
      minH: 3,
      visible: true,
      title: "AI Models Table",
      component: <AIModelsTable />,
    },
    {
      i: "market-share",
      x: 0,
      y: 6,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "AI Market Share",
      component: <MarketShareChart />,
    },
    {
      i: "company-valuation",
      x: 6,
      y: 6,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Company Valuations",
      component: <CompanyValuationChart />,
    },
    {
      i: "gpu-clusters",
      x: 0,
      y: 8,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "GPU Clusters",
      component: <GpuClustersChart />,
    },
    {
      i: "math-excellence",
      x: 6,
      y: 8,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Math Excellence",
      component: <MathExcellenceChart />,
    },
    {
      i: "users-overview",
      x: 0,
      y: 10,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Users Overview",
      component: <UsersOverviewChart />,
    },
    {
      i: "accuracy-rankings",
      x: 6,
      y: 10,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Model Accuracy Rankings",
      component: <AccuracyRankings />,
    },
    {
      i: "industry-citations",
      x: 0,
      y: 12,
      w: 3,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Industry Citations",
      component: <IndustryCitations />,
    },
    {
      i: "model-scale",
      x: 3,
      y: 12,
      w: 3,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Model Scale Visualization",
      component: <ModelScaleVisualization />,
    },
  ];

  getWidgets(): Widget[] {
    return this.widgets;
  }
}
