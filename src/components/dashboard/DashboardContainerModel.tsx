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
import { GPTDominance } from "./GPTDominance";
import { ClaudeDominance } from "./ClaudeDominance";

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
    // Position 1: AI Confidence
    {
      i: "ai-sentiment",
      x: 0,
      y: 0,
      w: 3,
      h: 1.5,
      minW: 2,
      minH: 1.5,
      visible: true,
      title: "AI Confidence",
      component: <AIModelSentiment />,
    },
    // Position 2: GPU Cluster Burning Index
    {
      i: "gpu-cluster-burning",
      x: 0,
      y: 1.5,
      w: 3,
      h: 0.8,
      minW: 3,
      minH: 0.8,
      visible: true,
      title: "GPU Cluster Burning Index",
      component: <GPUClusterBurningIndex />,
    },
    // Position 3: Trending Models
    {
      i: "trending-models",
      x: 3,
      y: 0,
      w: 3,
      h: 1.5,
      minW: 2,
      minH: 1.5,
      visible: true,
      title: "Trending Models",
      component: <ModelRankings />,
    },
    // Position 4: AGI Index
    {
      i: "agi-index",
      x: 6,
      y: 0,
      w: 3,
      h: 1.5,
      minW: 2,
      minH: 1.5,
      visible: true,
      title: "AGI Index",
      component: <AGIIndex />,
    },
    // Position 5: GPT Dominance
    {
      i: "gpt-dominance",
      x: 3,
      y: 1.5,
      w: 1.5,
      h: 1.5,
      minW: 1.5,
      minH: 1.5,
      visible: true,
      title: "GPT Dominance",
      component: <GPTDominance />,
    },
    // Position 6: Claude Dominance
    {
      i: "claude-dominance",
      x: 4.5,
      y: 1.5,
      w: 1.5,
      h: 1.5,
      minW: 1.5,
      minH: 1.5,
      visible: true,
      title: "Claude Dominance",
      component: <ClaudeDominance />,
    },
    // Position 7: Chat Component
    {
      i: "chat-component",
      x: 9,
      y: 0,
      w: 3,
      h: 1.5,
      minW: 2,
      minH: 1.5,
      visible: true,
      title: "Chat",
      component: <ChatComponent />,
    },
    // Position 8: AGI Dooms Day Clock
    {
      i: "agi-doomsday-clock",
      x: 9,
      y: 1.5,
      w: 3,
      h: 1.5,
      minW: 2,
      minH: 1.5,
      visible: true,
      title: "AGI Dooms Day Clock",
      component: <AGIDoomsDayClock />,
    },
    
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
