
import { Star, ExternalLink, Users, Clock, BarChart3, Brain, PieChart, Activity, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIModel } from "@/types/research";
import { Badge } from "../ui/badge";

interface ModelDetailCardProps {
  model: AIModel;
  onNavigate?: (direction: 'prev' | 'next') => void;
}

export function ModelDetailsCard({ model, onNavigate }: ModelDetailCardProps) {
  return (
    <div className="max-w-5xl mx-auto bg-black/90 text-white rounded-3xl p-6 overflow-hidden">
      {/* Header with creator and tags */}
      <div className="mb-6 flex justify-between items-start">
        <div className="bg-white/10 px-4 py-1 rounded-full text-sm inline-block">
          {model.creator}
        </div>
        
        <div className="flex gap-2 flex-wrap justify-end">
          {model.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-white/5 border-white/10 text-white/80">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Title and rating */}
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-4xl font-bold">{model.title}</h2>
        <div className="flex items-center">
          <div className="mr-2 text-amber-400 text-lg font-bold">{model.rating.toFixed(1)}</div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={20} 
                className={i < model.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"} 
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* About section */}
      <div className="text-xl font-semibold mb-2">About</div>
      <p className="text-white/80 mb-8 font-handwriting leading-relaxed">
        {model.description}
      </p>
      
      {/* Stats columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* User Activity */}
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4 text-white/90">
            <Users size={18} />
            <h3 className="font-semibold">User Activity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70 flex items-center gap-1">
                <Clock size={14} /> Last 24 hours
              </span>
              <span className="font-medium">
                {model.userActivity24h?.toLocaleString() || "N/A"} users
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70 flex items-center gap-1">
                <Clock size={14} /> Last 7 days
              </span>
              <span className="font-medium">
                {model.userActivity7d?.toLocaleString() || "N/A"} users
              </span>
            </div>
          </div>
        </div>
        
        {/* Model Specs */}
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4 text-white/90">
            <Brain size={18} />
            <h3 className="font-semibold">Model Specs</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Parameters</span>
              <span className="font-medium">{model.metrics?.parameters || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Training Tokens</span>
              <span className="font-medium">{model.metrics?.trainingTokens || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Performance metrics */}
      <div className="mb-8">
        <div className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 size={20} /> Performance Metrics
        </div>
        
        {/* Scores */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {model.metrics?.codingScore !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Coding Score</span>
                <span className="font-medium">{model.metrics.codingScore}/100</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${model.metrics.codingScore}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {model.metrics?.mathScore !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Math Score</span>
                <span className="font-medium">{model.metrics.mathScore}/100</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${model.metrics.mathScore}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {model.metrics?.researchScore !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Research Score</span>
                <span className="font-medium">{model.metrics.researchScore}/100</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${model.metrics.researchScore}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Additional metrics */}
        <div className="grid grid-cols-3 gap-4">
          {model.metrics?.apiCalls24h !== undefined && (
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-xs text-white/70 mb-1">API Calls (24h)</div>
              <div className="text-lg font-semibold">
                {(model.metrics.apiCalls24h / 1000000).toFixed(1)}M
              </div>
            </div>
          )}
          
          {model.metrics?.accuracy !== undefined && (
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-xs text-white/70 mb-1">Accuracy</div>
              <div className="text-lg font-semibold">
                {(model.metrics.accuracy * 100).toFixed(1)}%
              </div>
            </div>
          )}
          
          {model.metrics?.hallucinationRate !== undefined && (
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-xs text-white/70 mb-1">Hallucination Rate</div>
              <div className="text-lg font-semibold">
                {(model.metrics.hallucinationRate * 100).toFixed(1)}%
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold rounded-lg"
          onClick={() => window.location.href = "/playaround"}
        >
          Playground with it...
        </Button>
        <Button 
          variant="outline" 
          className="border-blue-500 text-blue-400 hover:bg-blue-900/20 py-3 font-semibold rounded-lg"
          onClick={() => window.location.href = "/battleground"}
        >
          Battleground...
        </Button>
      </div>
      
      {/* Website link */}
      {model.website && (
        <div className="text-center">
          <Button variant="link" className="text-blue-400" onClick={() => window.open(model.website, '_blank')}>
            Visit Official Website <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
      
      {/* Navigation arrows */}
      {onNavigate && (
        <div className="flex justify-between mt-8">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-12 w-12 bg-white/5 hover:bg-white/10"
            onClick={() => onNavigate('prev')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-12 w-12 bg-white/5 hover:bg-white/10"
            onClick={() => onNavigate('next')}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
}
