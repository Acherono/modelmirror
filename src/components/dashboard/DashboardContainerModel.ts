
import { ReactNode } from "react";
import { UsersOverviewChart } from "./UsersOverviewChart";
import { AccuracyRankings } from "./AccuracyRankings";
import { MathExcellenceChart } from "./MathExcellenceChart";
import { IndustryCitations } from "./IndustryCitations";
import { ModelScaleVisualization } from "./ModelScaleVisualization";

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
      i: "users-overview",
      x: 0,
      y: 0,
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
      y: 0,
      w: 6,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Model Accuracy Rankings",
      component: <AccuracyRankings />,
    },
    {
      i: "math-excellence",
      x: 0,
      y: 2,
      w: 4,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Math Excellence",
      component: <MathExcellenceChart />,
    },
    {
      i: "industry-citations",
      x: 4,
      y: 2,
      w: 4,
      h: 2,
      minW: 3,
      minH: 2,
      visible: true,
      title: "Industry Citations",
      component: <IndustryCitations />,
    },
    {
      i: "model-scale",
      x: 8,
      y: 2,
      w: 4,
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
