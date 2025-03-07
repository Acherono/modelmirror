
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Brain, BrainCircuit, Bot, ServerCog, Network } from "lucide-react";

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
  { id: 4, name: "Llama 3", type: "Meta", score: 94.2, change: 7.38, icon: ServerCog },
  { id: 5, name: "Mistral", type: "Mistral AI", score: 92.1, change: 6.26, icon: Network },
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
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="bg-gray-200 h-6 w-48 rounded animate-pulse">
            Loading...
          </CardTitle>
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
    <Card className="w-full h-full bg-sidebar">
      <CardHeader className="border-b border-border p-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Brain className="h-4 w-4" />
          Trending AI Models
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {data.map((model) => {
            const Icon = model.icon;
            const isPositive = model.change > 0;
            
            return (
              <div key={model.id} className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 text-sm font-medium text-muted-foreground">
                    {model.id}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm flex items-center gap-1">
                        {model.name} 
                        <span className="text-[10px] text-muted-foreground font-normal">
                          {model.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <div className="text-sm font-medium">
                    {model.score}
                  </div>
                  <div className={`text-[10px] font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '+' : ''}{model.change}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
