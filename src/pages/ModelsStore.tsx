import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Code, PenTool, Video, BookOpen, FlaskConical, Music } from "lucide-react";
import { ModelDetailsCard } from "@/components/store/ModelDetailsCard";
import { AIModel } from "@/types/research";
import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import LLMsComponent from "@/components/store/LLMsComponent";

// Define category sections
interface CategorySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  models: AIModel[];
}

const ModelsStore = () => {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '';
  
  const handleModelSelect = (model: AIModel) => {
    setSelectedModel(model);
  };
  
  const closeModal = () => {
    setSelectedModel(null);
  };
  
  // If category is llms, show the LLMs component
  if (category === 'llms') {
    return (
      <div className="w-full p-4 md:p-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Models Store - LLMs</h1>
          <p className="text-muted-foreground mt-2">
            Explore the latest Language Models, their capabilities, and developing organizations.
          </p>
        </div>
        
        <LLMsComponent onModelSelect={handleModelSelect} />
        
        <Dialog open={!!selectedModel} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="p-0 border-0 bg-transparent max-w-4xl">
            {selectedModel && (
              <ModelDetailsCard 
                model={selectedModel}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  
  return (
    <div className="w-full p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Models Store</h1>
        <p className="text-muted-foreground mt-2">
          Discover and explore the latest AI models across various categories.
        </p>
      </div>
      
      {/* Featured Models section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredModels.map((model) => (
            <div 
              key={model.id} 
              className="cursor-pointer hover:scale-102 transition-transform"
              onClick={() => handleModelSelect(model)}
            >
              <div 
                className="relative h-[120px] rounded-lg overflow-hidden"
                style={{
                  background: model.id === "gpt-4_5" 
                    ? "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)" 
                    : model.id === "o3-mini" 
                      ? "linear-gradient(135deg, #ffd34f 0%, #ffb74d 100%)" 
                      : "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{model.title}</h3>
                </div>
              </div>
              <div className="mt-2">
                <h4 className="font-medium">{model.title}</h4>
                <p className="text-sm text-muted-foreground">{model.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reasoning Models section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Reasoning models</h2>
        <p className="text-sm text-muted-foreground mb-4">Models that excel at complex, multi-step tasks.</p>
        
        <div className="space-y-3">
          {reasoningModels.map((model) => (
            <div 
              key={model.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => handleModelSelect(model)}
            >
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: model.id === "o3-mini" 
                    ? "#FFB74D" 
                    : model.id === "o1" 
                      ? "#FF9800" 
                      : "#FFC107"
                }}
              >
                <span className="text-white font-medium">{model.title.substring(0, 2)}</span>
              </div>
              <div>
                <h4 className="font-medium">{model.title}</h4>
                <p className="text-sm text-muted-foreground">{model.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Flagship Chat Models section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Flagship chat models</h2>
        <p className="text-sm text-muted-foreground mb-4">Our versatile, high-intelligence flagship models.</p>
        
        <div className="space-y-3">
          {flagshipModels.map((model) => (
            <div 
              key={model.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => handleModelSelect(model)}
            >
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: model.id.includes("gpt-4") 
                    ? "#4CAF50" 
                    : "#2196F3"
                }}
              >
                <span className="text-white font-medium">{model.title.substring(0, 4)}</span>
              </div>
              <div>
                <h4 className="font-medium">{model.title}</h4>
                <p className="text-sm text-muted-foreground">{model.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Dialog open={!!selectedModel} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="p-0 border-0 bg-transparent max-w-4xl">
          {selectedModel && (
            <ModelDetailsCard 
              model={selectedModel}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Define featured models
const featuredModels: AIModel[] = [
  {
    id: "gpt-4_5",
    title: "GPT-4.5 Preview",
    description: "GPT-4.5 represents the pinnacle of language generation AI, capable of understanding complex contexts, maintaining consistency across long documents, and implementing best practices automatically.",
    shortDescription: "Largest and most capable GPT model",
    creator: "OpenAI",
    releaseDate: "2024-01",
    rating: 5,
    category: "flagship",
    tags: ["Language Generation", "AI Assistant", "Multi-modal"],
    logoColor: "bg-green-400",
    userActivity24h: 876543,
    userActivity7d: 5432198,
    website: "https://openai.com/models/gpt-4.5",
    metrics: {
      codingScore: 98,
      mathScore: 95,
      researchScore: 96,
      apiCalls24h: 7500000,
      accuracy: 0.97,
      hallucinationRate: 0.01,
      parameters: "1.8T",
      trainingTokens: "20T"
    }
  },
  {
    id: "o3-mini",
    title: "o3-mini",
    description: "A fast, flexible model optimized for intelligent reasoning and problem-solving with excellent performance on a variety of tasks.",
    shortDescription: "Fast, flexible, intelligent reasoning model",
    creator: "Anthropic",
    releaseDate: "2024-02",
    rating: 4,
    category: "reasoning",
    tags: ["Fast", "Reasoning", "Problem-solving"],
    logoColor: "bg-yellow-400",
    metrics: {
      codingScore: 90,
      mathScore: 92,
      researchScore: 89,
      accuracy: 0.95
    }
  },
  {
    id: "gpt-4o",
    title: "GPT-4o",
    description: "Fast, intelligent, and flexible GPT model designed for general-purpose use with enhanced capabilities for creative and analytical tasks.",
    shortDescription: "Fast, intelligent, flexible GPT model",
    creator: "OpenAI",
    releaseDate: "2024-03",
    rating: 5,
    category: "flagship",
    tags: ["Fast", "Versatile", "Multi-modal"],
    logoColor: "bg-blue-400",
    metrics: {
      codingScore: 96,
      mathScore: 93,
      researchScore: 94,
      accuracy: 0.96
    }
  }
];

// Define reasoning models
const reasoningModels: AIModel[] = [
  {
    id: "o3-mini",
    title: "o3-mini",
    description: "A fast, flexible model optimized for intelligent reasoning and problem-solving with excellent performance on a variety of tasks.",
    shortDescription: "Fast, flexible, intelligent reasoning model",
    creator: "Anthropic",
    releaseDate: "2024-02",
    rating: 4,
    category: "reasoning",
    tags: ["Fast", "Reasoning", "Problem-solving"],
    logoColor: "bg-yellow-400",
    metrics: {
      codingScore: 90,
      mathScore: 92,
      researchScore: 89,
      accuracy: 0.95
    }
  },
  {
    id: "o1",
    title: "o1",
    description: "High-intelligence model specialized in complex reasoning tasks with exceptional performance on academic and scientific problems.",
    shortDescription: "High-intelligence reasoning model",
    creator: "Anthropic",
    releaseDate: "2024-01",
    rating: 5,
    category: "reasoning",
    logoColor: "bg-orange-400",
    metrics: {
      codingScore: 88,
      mathScore: 96,
      researchScore: 95,
      accuracy: 0.97
    }
  },
  {
    id: "a7-mini",
    title: "a7-mini",
    description: "A faster, more affordable reasoning model that provides excellent value while maintaining high performance on complex tasks.",
    shortDescription: "A faster, more affordable reasoning model than o1",
    creator: "Anthropic",
    releaseDate: "2024-03",
    rating: 4,
    category: "reasoning",
    logoColor: "bg-amber-400",
    metrics: {
      codingScore: 85,
      mathScore: 89,
      researchScore: 87,
      accuracy: 0.93
    }
  }
];

// Define flagship models
const flagshipModels: AIModel[] = [
  {
    id: "gpt-4_5-preview",
    title: "GPT-4.5 Preview",
    description: "GPT-4.5 represents the pinnacle of language generation AI, capable of understanding complex contexts, maintaining consistency across long documents, and implementing best practices automatically.",
    shortDescription: "Largest and most capable GPT model",
    creator: "OpenAI",
    releaseDate: "2024-01",
    rating: 5,
    category: "flagship",
    logoColor: "bg-green-400",
    metrics: {
      codingScore: 98,
      mathScore: 95,
      researchScore: 96,
      accuracy: 0.97
    }
  },
  {
    id: "gpt-4o",
    title: "GPT-4o",
    description: "Fast, intelligent, and flexible GPT model designed for general-purpose use with enhanced capabilities for creative and analytical tasks.",
    shortDescription: "Fast, intelligent, flexible GPT model",
    creator: "OpenAI",
    releaseDate: "2024-03",
    rating: 5,
    category: "flagship",
    logoColor: "bg-blue-400",
    metrics: {
      codingScore: 96,
      mathScore: 93,
      researchScore: 94,
      accuracy: 0.96
    }
  },
  {
    id: "gpt-4o-audio",
    title: "GPT-4o Audio",
    description: "An extension of GPT-4o with specialized capabilities for audio processing, voice recognition, and audio content generation.",
    shortDescription: "GPT-4o models capable of audio inputs and outputs",
    creator: "OpenAI",
    releaseDate: "2024-03",
    rating: 4,
    category: "flagship",
    logoColor: "bg-emerald-400",
    metrics: {
      codingScore: 92,
      mathScore: 90,
      researchScore: 91,
      accuracy: 0.94
    }
  }
];

export default ModelsStore;
