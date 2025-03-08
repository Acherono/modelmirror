
import { useState, useEffect } from "react";
import { Brain, Star, TrendingUp, TrendingDown, HelpCircle, ArrowUpRight, ArrowDownRight, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ModelData {
  id: number;
  name: string;
  creator: string;
  icon: React.ReactNode;
  change24h: number;
  change7d: number;
  volume24h: string;
  volumeDetail: string;
  parameters: string;
  sparkline: string;
}

export function AIModelsTable() {
  const [data, setData] = useState<ModelData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ModelData | null; direction: 'ascending' | 'descending' | null }>({
    key: null,
    direction: null
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setData([
        {
          id: 1,
          name: "ChatGPT-4o",
          creator: "OpenAI",
          icon: <Brain className="h-5 w-5 text-green-500" />,
          change24h: -3.70,
          change7d: 11.64,
          volume24h: "$58,985,564,610",
          volumeDetail: "666.86K API calls",
          parameters: "19.83B",
          sparkline: "M3,12 L5,10 L7,11 L9,9 L11,12 L13,7 L15,13 L17,11 L19,14 L21,11"
        },
        {
          id: 2,
          name: "Claude 3 Opus",
          creator: "Anthropic",
          icon: <Brain className="h-5 w-5 text-purple-500" />,
          change24h: -4.78,
          change7d: 3.76,
          volume24h: "$21,780,482,144",
          volumeDetail: "9.96M API calls",
          parameters: "120.59B",
          sparkline: "M3,14 L5,12 L7,13 L9,10 L11,12 L13,8 L15,11 L17,9 L19,13 L21,10"
        },
        {
          id: 3,
          name: "Gemini 1.5 Pro",
          creator: "Google",
          icon: <Brain className="h-5 w-5 text-blue-500" />,
          change24h: -0.61,
          change7d: 23.77,
          volume24h: "$8,828,671,041",
          volumeDetail: "3.53B API calls",
          parameters: "57.94B",
          sparkline: "M3,13 L5,12 L7,14 L9,11 L11,8 L13,12 L15,10 L17,7 L19,9 L21,8"
        },
        {
          id: 4,
          name: "Llama 3",
          creator: "Meta",
          icon: <Brain className="h-5 w-5 text-orange-500" />,
          change24h: 0.00,
          change7d: 0.12,
          volume24h: "$99,785,644,971",
          volumeDetail: "99.78B API calls",
          parameters: "142.71B",
          sparkline: "M3,12 L5,12 L7,13 L9,12 L11,12 L13,12 L15,11 L17,12 L19,12 L21,10"
        },
        {
          id: 5,
          name: "Mistral Large",
          creator: "Mistral AI",
          icon: <Brain className="h-5 w-5 text-amber-500" />,
          change24h: -0.99,
          change7d: 5.29,
          volume24h: "$1,666,444,535",
          volumeDetail: "2.77M API calls",
          parameters: "142.47B",
          sparkline: "M3,10 L5,12 L7,11 L9,13 L11,9 L13,14 L15,10 L17,13 L19,11 L21,13"
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Sorting function
  const requestSort = (key: keyof ModelData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted data
  const getSortedData = () => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Render sorting indicator
  const renderSortIcon = (key: keyof ModelData) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? <ArrowUp className="h-3 w-3 inline ml-1" /> : <ArrowDown className="h-3 w-3 inline ml-1" />;
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-80">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="w-full shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <div className="text-lg font-semibold">Top AI Models</div>
        </div>
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground w-[40px] cursor-pointer"
                    onClick={() => requestSort('id')}
                  >
                    # {renderSortIcon('id')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground cursor-pointer"
                    onClick={() => requestSort('name')}
                  >
                    Name {renderSortIcon('name')}
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-muted-foreground cursor-pointer"
                    onClick={() => requestSort('change24h')}
                  >
                    24h % {renderSortIcon('change24h')}
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-muted-foreground cursor-pointer"
                    onClick={() => requestSort('change7d')}
                  >
                    7d % {renderSortIcon('change7d')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">
                    Volume(24h) 
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="inline h-3 w-3 ml-1" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64 text-xs">
                          The total value of all API calls made with this model in the last 24 hours.
                          This indicates the model's usage and popularity.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">
                    Parameters 
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="inline h-3 w-3 ml-1" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64 text-xs">
                          The total number of parameters in the AI model. More parameters generally 
                          indicate a more complex model with potentially higher capabilities.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">Last 7 Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {getSortedData().map((model) => (
                  <tr key={model.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{model.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                          {model.icon}
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-1">
                            {model.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{model.creator}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className={cn(
                        "flex items-center justify-end gap-1 font-medium",
                        model.change24h >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {model.change24h >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(model.change24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className={cn(
                        "flex items-center justify-end gap-1 font-medium",
                        model.change7d >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {model.change7d >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(model.change7d).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm">{model.volume24h}</div>
                      <div className="text-xs text-muted-foreground">{model.volumeDetail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                      {model.parameters}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <svg
                        width="120"
                        height="40"
                        viewBox="0 0 24 16"
                        fill="none"
                        stroke={model.change7d >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-10"
                      >
                        <path d={model.sparkline} />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
