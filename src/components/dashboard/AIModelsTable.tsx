
import { useState, useEffect } from "react";
import { Brain, Star, TrendingUp, TrendingDown, HelpCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelData {
  id: number;
  name: string;
  creator: string;
  shortName: string;
  icon: React.ReactNode;
  price: string;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: string;
  volume24h: string;
  volumeDetail: string;
  parameters: string;
  sparkline: string;
}

export function AIModelsTable() {
  const [data, setData] = useState<ModelData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setData([
        {
          id: 1,
          name: "ChatGPT-4o",
          creator: "OpenAI",
          shortName: "GPT",
          icon: <Brain className="h-5 w-5 text-green-500" />,
          price: "$19.99",
          change1h: 0.38,
          change24h: -3.70,
          change7d: 11.64,
          marketCap: "$1,752,500,090,425",
          volume24h: "$58,985,564,610",
          volumeDetail: "666.86K API calls",
          parameters: "19.83B",
          sparkline: "M3,12 L5,10 L7,11 L9,9 L11,12 L13,7 L15,13 L17,11 L19,14 L21,11"
        },
        {
          id: 2,
          name: "Claude 3 Opus",
          creator: "Anthropic",
          shortName: "CLD",
          icon: <Brain className="h-5 w-5 text-purple-500" />,
          price: "$21.87",
          change1h: 0.53,
          change24h: -4.78,
          change7d: 3.76,
          marketCap: "$263,766,424,676",
          volume24h: "$21,780,482,144",
          volumeDetail: "9.96M API calls",
          parameters: "120.59B",
          sparkline: "M3,14 L5,12 L7,13 L9,10 L11,12 L13,8 L15,11 L17,9 L19,13 L21,10"
        },
        {
          id: 3,
          name: "Gemini 1.5 Pro",
          creator: "Google",
          shortName: "GEM",
          icon: <Brain className="h-5 w-5 text-blue-500" />,
          price: "$2.49",
          change1h: 0.21,
          change24h: -0.61,
          change7d: 23.77,
          marketCap: "$144,408,738,354",
          volume24h: "$8,828,671,041",
          volumeDetail: "3.53B API calls",
          parameters: "57.94B",
          sparkline: "M3,13 L5,12 L7,14 L9,11 L11,8 L13,12 L15,10 L17,7 L19,9 L21,8"
        },
        {
          id: 4,
          name: "Llama 3",
          creator: "Meta",
          shortName: "LLM",
          icon: <Brain className="h-5 w-5 text-orange-500" />,
          price: "$0.9999",
          change1h: 0.01,
          change24h: 0.00,
          change7d: 0.12,
          marketCap: "$142,799,155,360",
          volume24h: "$99,785,644,971",
          volumeDetail: "99.78B API calls",
          parameters: "142.71B",
          sparkline: "M3,12 L5,12 L7,13 L9,12 L11,12 L13,12 L15,11 L17,12 L19,12 L21,10"
        },
        {
          id: 5,
          name: "Mistral Large",
          creator: "Mistral AI",
          shortName: "MST",
          icon: <Brain className="h-5 w-5 text-amber-500" />,
          price: "$599.87",
          change1h: -0.29,
          change24h: -0.99,
          change7d: 5.29,
          marketCap: "$85,467,848,278",
          volume24h: "$1,666,444,535",
          volumeDetail: "2.77M API calls",
          parameters: "142.47B",
          sparkline: "M3,10 L5,12 L7,11 L9,13 L11,9 L13,14 L15,10 L17,13 L19,11 L21,13"
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-80">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex flex-row items-center justify-between">
        <div className="text-lg font-semibold">Top AI Models</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last updated: 5min ago</span>
        </div>
      </div>
      <div className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground w-[40px]">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">1h %</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">24h %</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">7d %</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">
                  Market Cap <HelpCircle className="inline h-3 w-3 ml-1" />
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">
                  Volume(24h) <HelpCircle className="inline h-3 w-3 ml-1" />
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">
                  Parameters <HelpCircle className="inline h-3 w-3 ml-1" />
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">Last 7 Days</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((model) => (
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
                          <span className="text-xs text-muted-foreground">{model.shortName}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{model.creator}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    {model.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className={cn(
                      "flex items-center justify-end gap-1 font-medium",
                      model.change1h >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {model.change1h >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {Math.abs(model.change1h).toFixed(2)}%
                    </span>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {model.marketCap}
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
  );
}
