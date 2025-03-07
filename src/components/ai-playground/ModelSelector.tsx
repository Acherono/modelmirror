
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Brain, PenTool, Video, Music, Code, BookOpen } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Define types
type ModelCategory = 'LLMs' | 'Photo Generator' | 'Video Generator' | 'Music Generator' | 'Code Generator' | 'Chart & Mindmaps';
type ModelCreator = 'OpenAI' | 'Anthropic' | 'Google' | 'Meta';
type ModelVersion = 'ChatGPT-4' | 'Claude Sonnet 3.7' | 'Gemini Flash 2' | 'Llama3';

// Model category data with icons
const modelCategories = [
  { id: 'LLMs' as ModelCategory, name: 'Language Models', icon: <Brain className="h-5 w-5" /> },
  { id: 'Photo Generator' as ModelCategory, name: 'Photo Generation', icon: <PenTool className="h-5 w-5" /> },
  { id: 'Video Generator' as ModelCategory, name: 'Video Creation', icon: <Video className="h-5 w-5" /> },
  { id: 'Music Generator' as ModelCategory, name: 'Music Production', icon: <Music className="h-5 w-5" /> },
  { id: 'Code Generator' as ModelCategory, name: 'Code Generation', icon: <Code className="h-5 w-5" /> },
  { id: 'Chart & Mindmaps' as ModelCategory, name: 'Visual Mapping', icon: <BookOpen className="h-5 w-5" /> },
];

// Model creator data
const modelCreators = [
  { id: 'OpenAI' as ModelCreator, name: 'OpenAI', color: "text-neon-purple", bgColor: "bg-purple-500/10" },
  { id: 'Anthropic' as ModelCreator, name: 'Anthropic', color: "text-neon-pink", bgColor: "bg-pink-500/10" },
  { id: 'Google' as ModelCreator, name: 'Google', color: "text-neon-blue", bgColor: "bg-blue-500/10" },
  { id: 'Meta' as ModelCreator, name: 'Meta', color: "text-neon-orange", bgColor: "bg-orange-500/10" },
];

// Model versions by creator
const modelVersionsByCreator = {
  'OpenAI': [
    { id: 'ChatGPT-4' as ModelVersion, name: 'ChatGPT-4', rating: 5 }
  ],
  'Anthropic': [
    { id: 'Claude Sonnet 3.7' as ModelVersion, name: 'Claude Sonnet 3.7', rating: 5 }
  ],
  'Google': [
    { id: 'Gemini Flash 2' as ModelVersion, name: 'Gemini Flash 2', rating: 4 }
  ],
  'Meta': [
    { id: 'Llama3' as ModelVersion, name: 'Llama3', rating: 4 }
  ]
};

interface ModelSelectorProps {
  modelCategory: ModelCategory;
  setModelCategory: (category: ModelCategory) => void;
  modelCreator: ModelCreator;
  setModelCreator: (creator: ModelCreator) => void;
  modelVersion: ModelVersion;
  setModelVersion: (version: ModelVersion) => void;
}

export const ModelSelector = ({
  modelCategory,
  setModelCategory,
  modelCreator,
  setModelCreator,
  modelVersion,
  setModelVersion
}: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen} 
      className="w-full backdrop-blur-md bg-card/30 rounded-lg border border-border/50 shadow-md transition-all duration-300"
    >
      <CollapsibleTrigger asChild>
        <div className="w-full cursor-pointer p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span>Choose your AI model</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {modelCreator} • {modelVersion}
            </span>
          </h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="p-4 pt-0 space-y-4 animate-slide-down">
        {/* Category selection */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {modelCategories.map((category) => (
            <Button
              key={category.id}
              variant={modelCategory === category.id ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-20 p-2 gap-1 w-full"
              onClick={() => setModelCategory(category.id)}
            >
              <div className="text-current">{category.icon}</div>
              <span className="text-xs text-center">{category.name}</span>
            </Button>
          ))}
        </div>
        
        {/* Creator selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {modelCreators.map((creator) => (
            <Button
              key={creator.id}
              variant={modelCreator === creator.id ? "default" : "outline"}
              className={`flex items-center justify-center gap-2 ${modelCreator === creator.id ? "" : creator.bgColor}`}
              onClick={() => {
                setModelCreator(creator.id);
                // Set first model version for this creator as default
                const versions = modelVersionsByCreator[creator.id];
                if (versions && versions.length > 0) {
                  setModelVersion(versions[0].id);
                }
              }}
            >
              <span className={`font-bold text-lg ${creator.color}`}>
                {creator.name.charAt(0)}
              </span>
              <span>{creator.name}</span>
            </Button>
          ))}
        </div>
        
        {/* Model version selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {modelVersionsByCreator[modelCreator]?.map((version) => (
            <Button
              key={version.id}
              variant={modelVersion === version.id ? "default" : "outline"}
              className="flex items-center justify-between"
              onClick={() => setModelVersion(version.id)}
            >
              <span>{version.name}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    className={i < version.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"} 
                  />
                ))}
              </div>
            </Button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

import { Star } from "lucide-react";
