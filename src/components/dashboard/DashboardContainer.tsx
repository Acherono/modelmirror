
import { useState, useEffect } from "react";
import { Widget } from "./DashboardContainerModel";
import { CategorySection } from "./CategorySection";

interface DashboardContainerProps {
  visibleWidgets?: Record<string, boolean>;
}

export function DashboardContainer({ visibleWidgets = {} }: DashboardContainerProps) {
  // Import all widgets components
  const [widgets, setWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    // Dynamically import the model to avoid circular dependencies
    const loadWidgets = async () => {
      const { DashboardContainerModel } = await import("./DashboardContainerModel");
      const model = new DashboardContainerModel();
      setWidgets(model.getWidgets());
    };
    
    loadWidgets();
  }, []);

  if (widgets.length === 0) return null;
  
  // Get specific widgets based on the fixed positions
  const aiConfidenceWidget = widgets.find(widget => widget.i === "ai-sentiment"); // Position 1
  const gpuClusterWidget = widgets.find(widget => widget.i === "gpu-cluster-burning"); // Position 2
  const trendingModelsWidget = widgets.find(widget => widget.i === "trending-models"); // Position 3
  const agiIndexWidget = widgets.find(widget => widget.i === "agi-index"); // Position 4
  const gptDominanceItem = widgets.find(widget => widget.i === "gpt-dominance"); // Position 5
  const claudeDominanceItem = widgets.find(widget => widget.i === "claude-dominance"); // Position 6
  const chatComponentWidget = widgets.find(widget => widget.i === "chat-component"); // Position 7
  const doomsdayClockWidget = widgets.find(widget => widget.i === "agi-doomsday-clock"); // Position 8
  
  // Filter AI Models Table for later
  const aiModelsTable = widgets.find(widget => widget.i === "ai-models-table");
  
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Top row layout with fixed positions */}
      <div className="grid grid-cols-12 gap-3">
        {/* Position 1: AI Confidence Index */}
        {aiConfidenceWidget && visibleWidgets[aiConfidenceWidget.i] !== false && (
          <div className="col-span-3 h-[180px] bg-black rounded-lg overflow-hidden">
            {aiConfidenceWidget.component}
          </div>
        )}
        
        {/* Position 3: Trending Models */}
        {trendingModelsWidget && visibleWidgets[trendingModelsWidget.i] !== false && (
          <div className="col-span-3 h-[180px] bg-black rounded-lg overflow-hidden">
            {trendingModelsWidget.component}
          </div>
        )}
        
        {/* Position 4: AGI Index */}
        {agiIndexWidget && visibleWidgets[agiIndexWidget.i] !== false && (
          <div className="col-span-3 h-[180px] bg-black rounded-lg overflow-hidden">
            {agiIndexWidget.component}
          </div>
        )}
        
        {/* Position 7: Chat Component */}
        {chatComponentWidget && visibleWidgets[chatComponentWidget.i] !== false && (
          <div className="col-span-3 h-[180px] bg-black rounded-lg overflow-hidden">
            {chatComponentWidget.component}
          </div>
        )}
      </div>
      
      {/* Second row with small components */}
      <div className="grid grid-cols-12 gap-3">
        {/* Position 2: GPU Cluster Burning Index */}
        {gpuClusterWidget && visibleWidgets[gpuClusterWidget.i] !== false && (
          <div className="col-span-3 h-[80px] bg-black rounded-lg overflow-hidden border-0">
            {gpuClusterWidget.component}
          </div>
        )}
        
        {/* Position 5 & 6: GPT and Claude Dominance */}
        <div className="col-span-3 grid grid-cols-2 gap-3">
          {gptDominanceItem && visibleWidgets[gptDominanceItem.i] !== false && (
            <div className="col-span-1 h-[180px] bg-black rounded-lg overflow-hidden">
              {gptDominanceItem.component}
            </div>
          )}
          
          {claudeDominanceItem && visibleWidgets[claudeDominanceItem.i] !== false && (
            <div className="col-span-1 h-[180px] bg-black rounded-lg overflow-hidden">
              {claudeDominanceItem.component}
            </div>
          )}
        </div>
        
        {/* Position 8: AGI Doomsday Clock */}
        {doomsdayClockWidget && visibleWidgets[doomsdayClockWidget.i] !== false && (
          <div className="col-span-3 h-[180px] bg-black rounded-lg overflow-hidden">
            {doomsdayClockWidget.component}
          </div>
        )}
      </div>
      
      {/* AI Models Table */}
      {aiModelsTable && visibleWidgets[aiModelsTable.i] !== false && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Top AI Models</h2>
            <CategorySection />
          </div>
          <div className="border border-border rounded-lg shadow overflow-hidden bg-sidebar">
            {aiModelsTable.component}
          </div>
        </div>
      )}
    </div>
  );
}
