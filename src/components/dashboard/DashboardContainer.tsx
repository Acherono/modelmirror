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
  
  // Common component styling class for consistent appearance
  const componentClass = "w-full h-full rounded-lg overflow-hidden transition-colors duration-200 dark:bg-[#343541] bg-[#EEEFFC]"; // Dark: ChatGPT gray, Light: Claude light color
  
  return (
    <div className="space-y-2 animate-fade-in"> {/* Reduced from space-y-4 to space-y-2 for consistent 2px margins */}
      {/* Top row layout with fixed positions */}
      <div className="grid grid-cols-12 gap-2"> {/* Changed from gap-3 to gap-2 for consistent 2px margins */}
        {/* Position 1: AI Confidence Index */}
        {aiConfidenceWidget && visibleWidgets[aiConfidenceWidget.i] !== false && (
          <div className="col-span-3 h-[180px]">
            <div className={componentClass}>
              {aiConfidenceWidget.component}
            </div>
          </div>
        )}
        
        {/* Position 3: Trending Models */}
        {trendingModelsWidget && visibleWidgets[trendingModelsWidget.i] !== false && (
          <div className="col-span-3 h-[180px]">
            <div className={componentClass}>
              {trendingModelsWidget.component}
            </div>
          </div>
        )}
        
        {/* Position 4: AGI Index */}
        {agiIndexWidget && visibleWidgets[agiIndexWidget.i] !== false && (
          <div className="col-span-3 h-[180px]">
            <div className={componentClass}>
              {agiIndexWidget.component}
            </div>
          </div>
        )}
        
        {/* Position 7: Chat Component */}
        {chatComponentWidget && visibleWidgets[chatComponentWidget.i] !== false && (
          <div className="col-span-3 h-[180px]">
            <div className={componentClass}>
              {chatComponentWidget.component}
            </div>
          </div>
        )}
      </div>
      
      {/* Second row with small components */}
      <div className="grid grid-cols-12 gap-2"> {/* Changed from gap-3 to gap-2 for consistent 2px margins */}
        {/* Position 2: GPU Cluster Burning Index */}
        {gpuClusterWidget && visibleWidgets[gpuClusterWidget.i] !== false && (
          <div className="col-span-3 h-[80px]">
            <div className={componentClass}>
              {gpuClusterWidget.component}
            </div>
          </div>
        )}
        
        {/* Position 5 & 6: GPT and Claude Dominance */}
        <div className="col-span-3 grid grid-cols-2 gap-2"> {/* Changed from gap-3 to gap-2 for consistent 2px margins */}
          {gptDominanceItem && visibleWidgets[gptDominanceItem.i] !== false && (
            <div className="col-span-1 h-[180px]">
              <div className={componentClass}>
                {gptDominanceItem.component}
              </div>
            </div>
          )}
          
          {claudeDominanceItem && visibleWidgets[claudeDominanceItem.i] !== false && (
            <div className="col-span-1 h-[180px]">
              <div className={componentClass}>
                {claudeDominanceItem.component}
              </div>
            </div>
          )}
        </div>
        
        {/* Position 8: AGI Doomsday Clock */}
        {doomsdayClockWidget && visibleWidgets[doomsdayClockWidget.i] !== false && (
          <div className="col-span-3 h-[180px]">
            <div className={componentClass}>
              {doomsdayClockWidget.component}
            </div>
          </div>
        )}
      </div>
      
      {/* AI Models Table */}
      {aiModelsTable && visibleWidgets[aiModelsTable.i] !== false && (
        <div className="mt-2"> {/* Changed from mt-6 to mt-2 for consistent 2px margins */}
          <div className="flex justify-between items-center mb-2"> {/* Changed from mb-3 to mb-2 for consistent 2px */}
            <h2 className="text-xl font-semibold">Top AI Models</h2>
            <CategorySection />
          </div>
          <div className={`${componentClass} border border-border shadow`}>
            {aiModelsTable.component}
          </div>
        </div>
      )}
      
      {/* Additional widgets */}
      <div className="grid grid-cols-12 gap-2 mt-2"> {/* Added missing widgets with consistent 2px margins */}
        {widgets.filter(widget => 
          ["market-share", "company-valuation", "gpu-clusters", "math-excellence", 
           "users-overview", "accuracy-rankings", "industry-citations", "model-scale"].includes(widget.i) && 
          visibleWidgets[widget.i] !== false
        ).map(widget => (
          <div key={widget.i} className={`col-span-${widget.w} h-[180px]`}>
            <div className={componentClass}>
              {widget.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
