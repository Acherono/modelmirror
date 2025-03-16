import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AIModel } from "@/types/research";
import { Check, ChevronRight } from "lucide-react";
import { ModelDetailsCard } from "@/components/store/ModelDetailsCard";
import { cn } from "@/lib/utils";

// Component for model cards
const ModelCard: React.FC<{
  model: AIModel;
  variant?: 'orange' | 'blue';
  className?: string;
  onClick?: () => void;
}> = ({ model, variant = 'orange', className, onClick }) => {
  return (
    <div 
      className={cn(
        "flex flex-col justify-center items-center p-4 rounded-lg transition-all duration-200 cursor-pointer relative",
        variant === 'orange' 
          ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white" 
          : "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
        "hover:shadow-lg hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <div className="font-semibold text-center">{model.title}</div>
      <div className="text-xs mt-1 opacity-80 text-center">{model.creator}</div>
    </div>
  );
};

// Component for lab cards
const LabCard: React.FC<{
  name: string;
  className?: string;
  onClick?: () => void;
}> = ({ name, className, onClick }) => {
  return (
    <div 
      className={cn(
        "flex justify-center items-center p-3 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white cursor-pointer relative",
        "hover:shadow-lg hover:scale-105 transition-all duration-200",
        className
      )}
      onClick={onClick}
    >
      <div className="font-semibold text-center">{name}</div>
    </div>
  );
};

// Section title component
const SectionTitle: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className }) => {
  return (
    <h3 className={cn("text-white text-lg font-semibold mb-3", className)}>
      {title}
    </h3>
  );
};

// Define category section component
const CategorySection: React.FC<{
  title: string;
  description?: string;
  models: AIModel[];
  onModelSelect: (model: AIModel) => void;
  layout?: 'grid' | 'list';
  variant?: 'orange' | 'blue';
}> = ({ 
  title, 
  description, 
  models, 
  onModelSelect, 
  layout = 'grid',
  variant = 'orange'
}) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      
      {layout === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {models.map((model) => (
            <ModelCard 
              key={model.id} 
              model={model}
              variant={variant}
              onClick={() => onModelSelect(model)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {models.map((model) => (
            <div 
              key={model.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => onModelSelect(model)}
            >
              <div 
                className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  variant === 'orange' 
                    ? "bg-gradient-to-br from-orange-500 to-orange-600" 
                    : "bg-gradient-to-br from-blue-500 to-blue-600"
                )}
              >
                <span className="text-white font-medium">{model.title.substring(0, 2)}</span>
              </div>
              <div>
                <h4 className="font-medium">{model.title}</h4>
                <p className="text-sm text-muted-foreground">{model.shortDescription}</p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface LLMsComponentProps {
  onModelSelect: (model: AIModel) => void;
}

export default function LLMsComponent({ onModelSelect }: LLMsComponentProps) {
  // Data for all models
  const topModels: AIModel[] = [
    { 
      id: "o3-mini-openai", 
      title: "o3-mini", 
      description: "A fast, flexible model optimized for intelligent reasoning and problem-solving with excellent performance on a variety of tasks.",
      shortDescription: "Fast, flexible, intelligent reasoning model", 
      creator: "OpenAI", 
      releaseDate: "2024-02",
      rating: 4.5,
      category: "top",
      tags: ["Fast", "Reasoning", "Problem-solving"],
      metrics: {
        codingScore: 90,
        mathScore: 92,
        researchScore: 89,
        accuracy: 0.95
      }
    },
    { 
      id: "claude-sonnet", 
      title: "Claude sonnet 3.7", 
      description: "Claude Sonnet is Anthropic's most intelligent model, capable of sophisticated reasoning and creative problem-solving across a wide range of tasks.",
      shortDescription: "Anthropic's most intelligent model", 
      creator: "Anthropic", 
      releaseDate: "2024-03",
      rating: 4.8,
      category: "top",
      tags: ["Intelligence", "Reasoning", "Context"],
      metrics: {
        codingScore: 92,
        mathScore: 94,
        researchScore: 95,
        accuracy: 0.96
      }
    },
    { 
      id: "grok-3", 
      title: "Grok 3", 
      description: "xAI's latest model focused on conversational intelligence with real-time information access and unique personality traits.",
      shortDescription: "Conversational AI with personality", 
      creator: "xAI", 
      releaseDate: "2024-02",
      rating: 4.2,
      category: "top",
      tags: ["Conversational", "Real-time", "Personality"],
      metrics: {
        codingScore: 85,
        mathScore: 88,
        researchScore: 82,
        accuracy: 0.92
      }
    },
    { 
      id: "r1-deepseek", 
      title: "R1", 
      description: "DeepSeek's specialized reasoning model with enhanced capabilities for scientific and technical reasoning tasks.",
      shortDescription: "Scientific reasoning specialist", 
      creator: "DeepSeek", 
      releaseDate: "2024-01",
      rating: 4.3,
      category: "top",
      tags: ["Scientific", "Technical", "Reasoning"],
      metrics: {
        codingScore: 87,
        mathScore: 95,
        researchScore: 91,
        accuracy: 0.94
      }
    },
    { 
      id: "max-qwenml", 
      title: "Max", 
      description: "QwenML's flagship model with balanced performance across various domains and tasks.",
      shortDescription: "Balanced performance across domains", 
      creator: "QwenML", 
      releaseDate: "2024-03",
      rating: 4.1,
      category: "top",
      tags: ["Versatile", "Balanced", "Efficient"],
      metrics: {
        codingScore: 84,
        mathScore: 86,
        researchScore: 85,
        accuracy: 0.91
      }
    },
    { 
      id: "llama-3", 
      title: "Llama 3", 
      description: "Meta AI's open model with strong performance and full customization capabilities.",
      shortDescription: "Strong open model with customization", 
      creator: "Meta AI", 
      releaseDate: "2024-01",
      rating: 4.4,
      category: "top",
      tags: ["Open", "Customizable", "Versatile"],
      metrics: {
        codingScore: 88,
        mathScore: 87,
        researchScore: 86,
        accuracy: 0.93
      }
    },
  ];

  const reasoningModels: AIModel[] = [
    { 
      id: "o3-mini-reasoning", 
      title: "o3-mini", 
      description: "A fast, flexible model optimized for intelligent reasoning and problem-solving with excellent performance on a variety of tasks.",
      shortDescription: "Fast, flexible, intelligent reasoning model", 
      creator: "OpenAI", 
      releaseDate: "2024-02",
      rating: 4.5,
      category: "reasoning",
      tags: ["Fast", "Reasoning", "Problem-solving"],
      metrics: {
        codingScore: 90,
        mathScore: 92,
        researchScore: 89,
        accuracy: 0.95
      }
    },
    { 
      id: "claude-sonnet-reasoning", 
      title: "Claude sonnet 3.7", 
      description: "Claude Sonnet is Anthropic's most intelligent model, capable of sophisticated reasoning and creative problem-solving across a wide range of tasks.",
      shortDescription: "Anthropic's most intelligent model", 
      creator: "Anthropic", 
      releaseDate: "2024-03",
      rating: 4.8,
      category: "reasoning",
      tags: ["Intelligence", "Reasoning", "Context"],
      metrics: {
        codingScore: 92,
        mathScore: 94,
        researchScore: 95,
        accuracy: 0.96
      }
    },
    { 
      id: "grok-3-reasoning", 
      title: "Grok 3", 
      description: "xAI's latest model focused on conversational intelligence with real-time information access and unique personality traits.",
      shortDescription: "Conversational AI with personality", 
      creator: "xAI", 
      releaseDate: "2024-02",
      rating: 4.2,
      category: "reasoning",
      tags: ["Conversational", "Real-time", "Personality"],
      metrics: {
        codingScore: 85,
        mathScore: 88,
        researchScore: 82,
        accuracy: 0.92
      }
    }
  ];

  const codingModels: AIModel[] = [
    { 
      id: "deepseek-r1-coding", 
      title: "DeepSeek R1", 
      description: "DeepSeek's specialized coding model with enhanced capabilities for software development and problem-solving.",
      shortDescription: "Specialized coding model", 
      creator: "DeepSeek", 
      releaseDate: "2024-01",
      rating: 4.6,
      category: "coding",
      tags: ["Coding", "Software", "Development"],
      metrics: {
        codingScore: 96,
        mathScore: 87,
        researchScore: 84,
        accuracy: 0.94
      }
    },
    { 
      id: "grok-3-coding", 
      title: "Grok 3", 
      description: "xAI's latest model with strong coding capabilities and ability to understand complex programming concepts.",
      shortDescription: "Strong coding and programming understanding", 
      creator: "xAI", 
      releaseDate: "2024-02",
      rating: 4.5,
      category: "coding",
      tags: ["Coding", "Programming", "Development"],
      metrics: {
        codingScore: 94,
        mathScore: 88,
        researchScore: 82,
        accuracy: 0.93
      }
    },
  ];

  const flagshipChatModels: AIModel[] = [
    { 
      id: "gpt-4-5-preview", 
      title: "GPT-4.5 Preview", 
      description: "OpenAI's most advanced model with exceptional performance across all domains and tasks.",
      shortDescription: "OpenAI's most advanced model", 
      creator: "OpenAI", 
      releaseDate: "2024-03",
      rating: 4.9,
      category: "flagship",
      tags: ["Advanced", "Multi-domain", "High-performance"],
      metrics: {
        codingScore: 98,
        mathScore: 97,
        researchScore: 98,
        accuracy: 0.98,
        parameters: "1.8T",
        trainingTokens: "20T"
      }
    },
    { 
      id: "gpt-4o", 
      title: "GPT-4o", 
      description: "OpenAI's optimized model balancing performance and efficiency for most general use cases.",
      shortDescription: "Balanced performance and efficiency", 
      creator: "OpenAI", 
      releaseDate: "2024-02",
      rating: 4.7,
      category: "flagship",
      tags: ["Balanced", "Efficient", "General-purpose"],
      metrics: {
        codingScore: 95,
        mathScore: 94,
        researchScore: 93,
        accuracy: 0.96
      }
    },
  ];

  const generalPurposeModels: AIModel[] = [
    { 
      id: "llama-3-general", 
      title: "Llama 3", 
      description: "Meta AI's open model with strong performance and full customization capabilities.",
      shortDescription: "Strong open model with customization", 
      creator: "Meta AI", 
      releaseDate: "2024-01",
      rating: 4.4,
      category: "general",
      tags: ["Open", "Customizable", "Versatile"],
      metrics: {
        codingScore: 88,
        mathScore: 87,
        researchScore: 86,
        accuracy: 0.93
      }
    },
    { 
      id: "la-chat", 
      title: "La Chat", 
      description: "A versatile chat model with strong conversational capabilities and personality traits.",
      shortDescription: "Versatile chat with personality", 
      creator: "", 
      releaseDate: "2024-02",
      rating: 4.0,
      category: "general",
      tags: ["Chat", "Conversational", "Personality"],
      metrics: {
        codingScore: 80,
        mathScore: 82,
        researchScore: 78,
        accuracy: 0.89
      }
    },
  ];

  const topAILabs: string[] = [
    "OpenAI", "Anthropic", "xAI", "DeepSeek",
    "QwenML", "Meta AI", "Mistral AI", "DeepMind",
    "Inflection", "Cohere", "Perplexity", "AI2"
  ];

  const trendingModels: AIModel[] = [
    { 
      id: "o3-mini-trending", 
      title: "o3-mini", 
      description: "A fast, flexible model optimized for intelligent reasoning and problem-solving with excellent performance on a variety of tasks.",
      shortDescription: "Fast, flexible, intelligent reasoning model", 
      creator: "OpenAI", 
      releaseDate: "2024-02",
      rating: 4.5,
      category: "trending",
      tags: ["Fast", "Reasoning", "Problem-solving"],
      metrics: {
        codingScore: 90,
        mathScore: 92,
        researchScore: 89,
        accuracy: 0.95
      }
    },
    { 
      id: "claude-sonnet-trending", 
      title: "Claude sonnet 3.7", 
      description: "Claude Sonnet is Anthropic's most intelligent model, capable of sophisticated reasoning and creative problem-solving across a wide range of tasks.",
      shortDescription: "Anthropic's most intelligent model", 
      creator: "Anthropic", 
      releaseDate: "2024-03",
      rating: 4.8,
      category: "trending",
      tags: ["Intelligence", "Reasoning", "Context"],
      metrics: {
        codingScore: 92,
        mathScore: 94,
        researchScore: 95,
        accuracy: 0.96
      }
    },
    { 
      id: "grok-3-trending", 
      title: "Grok 3", 
      description: "xAI's latest model focused on conversational intelligence with real-time information access and unique personality traits.",
      shortDescription: "Conversational AI with personality", 
      creator: "xAI", 
      releaseDate: "2024-02",
      rating: 4.2,
      category: "trending",
      tags: ["Conversational", "Real-time", "Personality"],
      metrics: {
        codingScore: 85,
        mathScore: 88,
        researchScore: 82,
        accuracy: 0.92
      }
    }
  ];

  const underratedModels: AIModel[] = [
    { 
      id: "o3-mini-underrated", 
      title: "o3-mini", 
      description: "A fast, flexible model optimized for intelligent reasoning and problem-solving with excellent performance on a variety of tasks.",
      shortDescription: "Fast, flexible, intelligent reasoning model", 
      creator: "OpenAI", 
      releaseDate: "2024-02",
      rating: 4.5,
      category: "underrated",
      tags: ["Fast", "Reasoning", "Problem-solving"],
      metrics: {
        codingScore: 90,
        mathScore: 92,
        researchScore: 89,
        accuracy: 0.95
      }
    },
    { 
      id: "claude-sonnet-underrated", 
      title: "Claude sonnet 3.7", 
      description: "Claude Sonnet is Anthropic's most intelligent model, capable of sophisticated reasoning and creative problem-solving across a wide range of tasks.",
      shortDescription: "Anthropic's most intelligent model", 
      creator: "Anthropic", 
      releaseDate: "2024-03",
      rating: 4.8,
      category: "underrated",
      tags: ["Intelligence", "Reasoning", "Context"],
      metrics: {
        codingScore: 92,
        mathScore: 94,
        researchScore: 95,
        accuracy: 0.96
      }
    },
    { 
      id: "grok-3-underrated", 
      title: "Grok 3", 
      description: "xAI's latest model focused on conversational intelligence with real-time information access and unique personality traits.",
      shortDescription: "Conversational AI with personality", 
      creator: "xAI", 
      releaseDate: "2024-02",
      rating: 4.2,
      category: "underrated",
      tags: ["Conversational", "Real-time", "Personality"],
      metrics: {
        codingScore: 85,
        mathScore: 88,
        researchScore: 82,
        accuracy: 0.92
      }
    }
  ];

  // Handler for lab cards
  const handleLabCardClick = (labName: string) => {
    // Create a placeholder model for the lab
    const labModel: AIModel = {
      id: `lab-${labName.toLowerCase().replace(/\s+/g, '-')}`,
      title: labName,
      description: `${labName} is a leading AI research lab focused on developing advanced language models and AI systems.`,
      shortDescription: "Leading AI research lab",
      creator: labName,
      releaseDate: "2024",
      rating: 4.5,
      category: "lab",
      tags: ["Research", "AI", "Language Models"]
    };
    
    onModelSelect(labModel);
  };

  return (
    <div className="w-full bg-black p-6 rounded-xl">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-white text-center mb-8">LLMs</h1>
      
      {/* Top Models Section */}
      <CategorySection 
        title="Top Models" 
        models={topModels} 
        onModelSelect={onModelSelect}
        layout="grid"
      />
      
      {/* Reasoning Models and Coding Models Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Reasoning Models */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Reasoning Models</h2>
          <p className="text-sm text-white/70 mb-4">Models that excel at complex, multi-step tasks.</p>
          <div className="space-y-4">
            {reasoningModels.map((model) => (
              <div 
                key={model.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                onClick={() => onModelSelect(model)}
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">{model.title.substring(0, 2)}</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">{model.title}</h4>
                  <p className="text-sm text-white/70">{model.creator}</p>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-white/50" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Coding Models */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Coding Models</h2>
          <p className="text-sm text-white/70 mb-4">Models specialized in software development.</p>
          <div className="grid grid-cols-2 gap-4">
            {/* Left Sub-Column */}
            <div className="space-y-4">
              {codingModels.map((model) => (
                <div 
                  key={`left-${model.id}`}
                  className="p-4 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                  onClick={() => onModelSelect(model)}
                >
                  <div className="font-semibold text-center">{model.title}</div>
                  <div className="text-xs mt-1 opacity-80 text-center">{model.creator}</div>
                </div>
              ))}
            </div>
            
            {/* Right Sub-Column */}
            <div className="space-y-4">
              {codingModels.map((model) => (
                <div 
                  key={`right-${model.id}`}
                  className="p-4 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                  onClick={() => onModelSelect(model)}
                >
                  <div className="font-semibold text-center">{model.title}</div>
                  <div className="text-xs mt-1 opacity-80 text-center">{model.creator}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Flagship Chat Models and General Purpose Models Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Flagship Chat Models */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Flagship Chat Models</h2>
          <div className="space-y-4">
            {flagshipChatModels.map((model) => (
              <div 
                key={model.id}
                className="p-4 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => onModelSelect(model)}
              >
                <div className="font-semibold text-center">{model.title}</div>
                <div className="text-xs mt-1 opacity-80 text-center">{model.creator}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* General Purpose Models - Middle Column */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">General Purpose Models</h2>
          <div className="space-y-4">
            {generalPurposeModels.map((model) => (
              <div 
                key={`mid-${model.id}`}
                className="p-4 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => onModelSelect(model)}
              >
                <div className="font-semibold text-center">{model.title}</div>
                <div className="text-xs mt-1 opacity-80 text-center">{model.creator}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* General Purpose Models - Right Column */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">General Purpose Models</h2>
          <div className="space-y-4">
            {generalPurposeModels.map((model) => (
              <div 
                key={`right-${model.id}`}
                className="p-4 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => onModelSelect(model)}
              >
                <div className="font-semibold text-center">{model.title}</div>
                <div className="text-xs mt-1 opacity-80 text-center">{model.creator}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Top AI Labs in LLMs Models Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Top AI Labs in LLMs Models</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {topAILabs.map((lab, index) => (
            <div 
              key={`lab-${index}`}
              className="flex justify-center items-center p-3 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
              onClick={() => handleLabCardClick(lab)}
            >
              <div className="font-semibold text-center">{lab}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Trending LLM Models and Best Underrated LLM Models Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Trending LLM Models */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Trending LLM Models</h2>
          <div className="space-y-4">
            {trendingModels.map((model) => (
              <div 
                key={model.id}
                className="p-4 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => onModelSelect(model)}
              >
                <div className="font-semibold text-center">{model.title}</div>
                <div className="text-xs mt-1 opacity-80 text-center">{model.creator}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Best Underrated LLM Models */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Best Underrated LLM Models</h2>
          <div className="space-y-4">
            {underratedModels.map((model) => (
              <div 
                key={model.id}
                className="p-4 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => onModelSelect(model)}
              >
                <div className="font-semibold text-center">{model.title}</div>
                <div className="text-xs mt-1 opacity-80 text-center">{model.creator}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 