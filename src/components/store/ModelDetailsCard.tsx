
import { Star, ExternalLink, Users, Clock, BarChart3, Brain, PieChart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ModelMetrics {
  codingScore?: number;
  mathScore?: number;
  researchScore?: number;
  apiCalls24h?: number;
  accuracy?: number;
  hallucinationRate?: number;
  parameters?: string;
  trainingTokens?: string;
}

interface ModelItemProps {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  creator: string;
  releaseDate: string;
  rating: number;
  category: string;
  imageUrl?: string;
  userActivity24h?: number;
  userActivity7d?: number;
  website?: string;
  metrics?: ModelMetrics;
}

export function ModelDetailsCard({ model }: { model: ModelItemProps }) {
  return (
    <div className="max-h-[80vh] overflow-y-auto hide-scrollbar p-1 space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary/10 rounded-full">
            {model.creator}
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className={i < model.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"} />
            ))}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold">{model.title}</h2>
        
        <div className="text-muted-foreground">
          <span>Released: {model.releaseDate}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">About</h3>
        <p className="text-muted-foreground">{model.fullDescription || model.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 border border-border/40 bg-muted/10">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Users size={18} />
            <h3 className="font-semibold">User Activity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock size={14} /> Last 24 hours
              </span>
              <span className="font-medium">
                {model.userActivity24h?.toLocaleString() || "N/A"} users
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock size={14} /> Last 7 days
              </span>
              <span className="font-medium">
                {model.userActivity7d?.toLocaleString() || "N/A"} users
              </span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border border-border/40 bg-muted/10">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Brain size={18} />
            <h3 className="font-semibold">Model Specs</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Parameters</span>
              <span className="font-medium">{model.metrics?.parameters || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Training Tokens</span>
              <span className="font-medium">{model.metrics?.trainingTokens || "N/A"}</span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 size={18} /> Performance Metrics
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {model.metrics?.codingScore !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Coding Score</span>
                <span className="font-medium">{model.metrics.codingScore}/100</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${model.metrics.codingScore}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {model.metrics?.mathScore !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Math Score</span>
                <span className="font-medium">{model.metrics.mathScore}/100</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${model.metrics.mathScore}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {model.metrics?.researchScore !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Research Score</span>
                <span className="font-medium">{model.metrics.researchScore}/100</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${model.metrics.researchScore}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {model.metrics?.apiCalls24h !== undefined && (
            <div className="bg-muted/10 p-3 rounded-lg border border-border/40">
              <div className="text-xs text-muted-foreground mb-1">API Calls (24h)</div>
              <div className="text-lg font-semibold">
                {(model.metrics.apiCalls24h / 1000000).toFixed(1)}M
              </div>
            </div>
          )}
          
          {model.metrics?.accuracy !== undefined && (
            <div className="bg-muted/10 p-3 rounded-lg border border-border/40">
              <div className="text-xs text-muted-foreground mb-1">Accuracy</div>
              <div className="text-lg font-semibold">
                {(model.metrics.accuracy * 100).toFixed(1)}%
              </div>
            </div>
          )}
          
          {model.metrics?.hallucinationRate !== undefined && (
            <div className="bg-muted/10 p-3 rounded-lg border border-border/40">
              <div className="text-xs text-muted-foreground mb-1">Hallucination Rate</div>
              <div className="text-lg font-semibold">
                {(model.metrics.hallucinationRate * 100).toFixed(1)}%
              </div>
            </div>
          )}
        </div>
      </div>
      
      {model.website && (
        <div className="pt-2">
          <Button variant="outline" className="w-full" onClick={() => window.open(model.website, '_blank')}>
            Visit Official Website <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
