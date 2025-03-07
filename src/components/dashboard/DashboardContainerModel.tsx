
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
import { AIModelDominance } from "./AIModelDominance";
import { AIModelsTable } from "./AIModelsTable";

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
    {
      i: "ai-models-table",
      x: 0,
      y: 0,
      w: 12,
      h: 3,
      minW: 6,
      minH: 3,
      visible: true,
      title: "AI Models Table",
      component: <AIModelsTable />,
    },
    {
      i: "users-overview",
      x: 0,
      y: 3,
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
      y: 3,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Model Accuracy Rankings",
      component: <AccuracyRankings />,
    },
    {
      i: "market-share",
      x: 0,
      y: 5,
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
      y: 5,
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
      y: 7,
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
      y: 7,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Math Excellence",
      component: <MathExcellenceChart />,
    },
    {
      i: "industry-citations",
      x: 0,
      y: 9,
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
      y: 9,
      w: 3,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Model Scale Visualization",
      component: <ModelScaleVisualization />,
    },
    {
      i: "trending-models",
      x: 6,
      y: 9,
      w: 3,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Trending Models",
      component: <ModelRankings />,
    },
    {
      i: "ai-sentiment",
      x: 9,
      y: 9,
      w: 1.5,
      h: 2,
      minW: 1.5,
      minH: 2,
      visible: true,
      title: "AI Confidence",
      component: <AIModelSentiment />,
    },
    {
      i: "ai-dominance",
      x: 10.5,
      y: 9,
      w: 1.5,
      h: 2,
      minW: 1.5,
      minH: 2,
      visible: true,
      title: "Market Dominance",
      component: <AIModelDominance />,
    },
  ];

  getWidgets(): Widget[] {
    return this.widgets;
  }
}
