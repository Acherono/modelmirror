
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Brain, BrainCircuit, Bot } from "lucide-react";

interface ModelItem {
  id: number;
  name: string;
  type: string;
  score: number;
  change: number;
  icon: React.ElementType;
}

const initialData: ModelItem[] = [
  { id: 1, name: "GPT-4o", type: "OpenAI", score: 98.7, change: 10.47, icon: Brain },
  { id: 2, name: "Claude 3", type: "Anthropic", score: 97.2, change: 9.94, icon: BrainCircuit },
  { id: 3, name: "Gemini", type: "Google", score: 95.8, change: 8.15, icon: Bot },
];

export function ModelRankings() {
  const [data, setData] = useState<ModelItem[]>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black p-2">
      <div className="mb-2 text-center">
        <div className="text-xs font-semibold text-white">Trending AI Models</div>
      </div>
      
      <div className="space-y-3">
        {data.map((model) => {
          const Icon = model.icon;
          
          return (
            <div key={model.id} className="flex items-center justify-between py-0.5">
              <div className="flex items-center gap-2">
                <div className="w-4 text-xs font-medium text-gray-400">
                  {model.id}
                </div>
                <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
                  <Icon className="h-3 w-3 text-white" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">
                    {model.name}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {model.type}
                  </div>
                </div>
              </div>
              <div className="text-xs font-medium text-green-500">
                +{model.change.toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-3 flex items-center justify-center gap-2">
        <button className="bg-black border border-white/20 text-white text-[10px] rounded-full px-3 py-0.5">
          LLMs
        </button>
        <button className="bg-black border border-white/20 text-white text-[10px] rounded-full px-3 py-0.5">
          Image
        </button>
        <button className="bg-black border border-white/20 text-white text-[10px] rounded-full px-3 py-0.5">
          Video
        </button>
      </div>
    </div>
  );
}
