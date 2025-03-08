
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Code, PenTool, Video, BookOpen, FlaskConical, Music } from "lucide-react";
import { ModelGroup } from "@/components/store/ModelGroup";
import { ModelDetailsCard } from "@/components/store/ModelDetailsCard";
import { AIModel } from "@/types/research";

// Define category sections
interface CategorySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  models: AIModel[];
}

const ModelsStore = () => {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [visibleModels, setVisibleModels] = useState<Record<string, AIModel[]>>({});
  
  // Initialize visible models on component mount
  useEffect(() => {
    const initialVisibleModels: Record<string, AIModel[]> = {};
    modelsData.forEach(category => {
      // Show first 3 models for each category
      initialVisibleModels[category.id] = category.models.slice(0, 3);
    });
    setVisibleModels(initialVisibleModels);
  }, []);
  
  const handleModelSelect = (model: AIModel) => {
    setSelectedModel(model);
  };
  
  const closeModal = () => {
    setSelectedModel(null);
  };
  
  const handleNavigate = (categoryId: string, direction: 'prev' | 'next') => {
    const category = modelsData.find(c => c.id === categoryId);
    if (!category) return;
    
    const currentModels = visibleModels[categoryId];
    const allModels = category.models;
    
    if (!currentModels) return;
    
    const firstModelIndex = allModels.indexOf(currentModels[0]);
    const lastModelIndex = allModels.indexOf(currentModels[currentModels.length - 1]);
    
    if (direction === 'next' && lastModelIndex < allModels.length - 1) {
      const newStartIndex = Math.min(firstModelIndex + 3, allModels.length - 3);
      setVisibleModels({
        ...visibleModels,
        [categoryId]: allModels.slice(newStartIndex, newStartIndex + 3)
      });
    } else if (direction === 'prev' && firstModelIndex > 0) {
      const newStartIndex = Math.max(firstModelIndex - 3, 0);
      setVisibleModels({
        ...visibleModels,
        [categoryId]: allModels.slice(newStartIndex, newStartIndex + 3)
      });
    }
  };
  
  const handleModalNavigate = (direction: 'prev' | 'next') => {
    if (!selectedModel) return;
    
    // Find the category of the selected model
    const category = modelsData.find(c => 
      c.models.some(m => m.id === selectedModel.id)
    );
    
    if (!category) return;
    
    const allModels = category.models;
    const currentIndex = allModels.findIndex(m => m.id === selectedModel.id);
    
    if (direction === 'next' && currentIndex < allModels.length - 1) {
      setSelectedModel(allModels[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      setSelectedModel(allModels[currentIndex - 1]);
    }
  };
  
  return (
    <div className="w-full p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          AI Models Marketplace
        </h1>
        <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
          Discover and explore the latest AI models across various categories. From coding to creative content generation, find the perfect AI tools for your projects.
        </p>
      </div>
      
      <div className="space-y-16">
        {modelsData.map(section => (
          visibleModels[section.id] && (
            <ModelGroup 
              key={section.id} 
              category={section.title}
              models={section.models}
              visibleModels={visibleModels[section.id]}
              activeModelId={selectedModel?.id}
              onModelSelect={handleModelSelect}
              onNavigate={(direction) => handleNavigate(section.id, direction)}
            />
          )
        ))}
      </div>
      
      <Dialog open={!!selectedModel} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="p-0 border-0 bg-transparent max-w-4xl">
          {selectedModel && (
            <ModelDetailsCard 
              model={selectedModel} 
              onNavigate={handleModalNavigate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Define models data with enhanced properties
const modelsData: CategorySection[] = [
  {
    id: "coding",
    title: "Coding",
    icon: <Code className="h-5 w-5" />,
    models: [
      {
        id: "code-gpt4",
        title: "CodeGPT 4.0",
        description: "CodeGPT 4.0 represents the pinnacle of code generation AI, capable of understanding complex programming contexts, maintaining code consistency across files, and implementing best practices automatically. It excels in over 40 programming languages with specialized knowledge of modern frameworks and libraries.",
        shortDescription: "Fast, accurate, good at reasoning",
        creator: "OpenAI",
        releaseDate: "2023-05",
        rating: 5,
        category: "coding",
        tags: ["Code Generation", "AI Assistant", "Multi-language"],
        logoColor: "bg-green-400",
        userActivity24h: 876543,
        userActivity7d: 5432198,
        website: "https://openai.com/models/code-gpt4",
        metrics: {
          codingScore: 98,
          mathScore: 85,
          researchScore: 78,
          apiCalls24h: 3500000,
          accuracy: 0.97,
          hallucinationRate: 0.02,
          parameters: "19.5T",
          trainingTokens: "1.2T"
        }
      },
      {
        id: "code-llama",
        title: "Code Llama",
        description: "Code Llama is Meta's open-source coding specialist model, fine-tuned from Llama 2 on code-specific datasets. It supports longer context windows (up to 100k tokens), making it ideal for understanding and modifying large, complex codebases.",
        shortDescription: "Open-source with long context",
        creator: "Meta",
        releaseDate: "2023-08",
        rating: 4,
        category: "coding",
        tags: ["Open Source", "Long Context", "Fine-tuned"],
        logoColor: "bg-blue-400",
        userActivity24h: 567890,
        userActivity7d: 3214567,
        website: "https://meta.com/llama/code",
        metrics: {
          codingScore: 92,
          mathScore: 79,
          researchScore: 65,
          apiCalls24h: 2100000,
          accuracy: 0.94,
          hallucinationRate: 0.05,
          parameters: "7B",
          trainingTokens: "500B"
        }
      },
      {
        id: "copilot-pro",
        title: "Copilot Pro",
        description: "AI pair programmer that helps you write better code faster with real-time suggestions and code completion. Deeply integrated with popular IDEs and understanding your coding patterns over time.",
        shortDescription: "Real-time pair programming",
        creator: "GitHub",
        releaseDate: "2023-03",
        rating: 5,
        category: "coding",
        tags: ["IDE Integration", "Pair Programming", "Enterprise"],
        logoColor: "bg-purple-400",
        userActivity24h: 1243567,
        userActivity7d: 7654321,
        metrics: {
          codingScore: 96,
          mathScore: 72,
          researchScore: 68,
          apiCalls24h: 4200000,
          accuracy: 0.95,
          hallucinationRate: 0.03,
          parameters: "12T",
          trainingTokens: "800B"
        }
      },
      {
        id: "codewhisperer",
        title: "CodeWhisperer",
        description: "Amazon's code assistant with specialized cloud infrastructure expertise and deep AWS integration. Optimized for building scalable cloud applications.",
        shortDescription: "AWS cloud expertise",
        creator: "Amazon",
        releaseDate: "2023-06",
        rating: 4,
        category: "coding",
        logoColor: "bg-orange-400"
      },
      {
        id: "replit-ghostwriter",
        title: "Replit Ghostwriter",
        description: "Code completion and generation optimized for educational contexts with special focus on helping beginners learn programming concepts.",
        shortDescription: "Educational focus",
        creator: "Replit",
        releaseDate: "2023-04",
        rating: 3,
        category: "coding",
        logoColor: "bg-indigo-400"
      }
    ]
  },
  {
    id: "design",
    title: "Graphic Design",
    icon: <PenTool className="h-5 w-5" />,
    models: [
      {
        id: "dall-e3",
        title: "DALL-E 3",
        description: "Generate highly detailed and accurate images from text prompts with improved accuracy and understanding of spatial relationships and complex scenes.",
        shortDescription: "Precise text-to-image generation",
        creator: "OpenAI",
        releaseDate: "2023-10",
        rating: 4,
        category: "design",
        tags: ["Text-to-Image", "Creative AI", "Photorealistic"],
        logoColor: "bg-pink-400",
        userActivity24h: 1245678,
        userActivity7d: 8765432,
        website: "https://openai.com/dall-e-3",
        metrics: {
          codingScore: 55,
          mathScore: 87,
          researchScore: 82,
          apiCalls24h: 7800000,
          accuracy: 0.96,
          hallucinationRate: 0.03,
          parameters: "18.7B",
          trainingTokens: "980B"
        }
      },
      {
        id: "midjourney-v6",
        title: "Midjourney v6",
        description: "Create stunning artwork with improved coherence and photorealism. Exceptional at generating creative, artistic imagery with strong aesthetic qualities.",
        shortDescription: "Artistic quality and realism",
        creator: "Midjourney",
        releaseDate: "2023-12",
        rating: 5,
        category: "design",
        tags: ["Art Generation", "Photorealism", "Discord"],
        logoColor: "bg-indigo-400"
      },
      {
        id: "stable-diffusion-xl",
        title: "Stable Diffusion XL",
        description: "Open-source image generation with incredible detail and control. Highly customizable with a strong community of developers creating tools and extensions.",
        shortDescription: "Open-source customization",
        creator: "Stability AI",
        releaseDate: "2023-07",
        rating: 4,
        category: "design",
        tags: ["Open Source", "Community", "Customizable"],
        logoColor: "bg-blue-400"
      },
      {
        id: "firefly",
        title: "Adobe Firefly",
        description: "Image generation and editing with Adobe Creative Cloud integration. Designed for professional workflows with strong ethical content policies.",
        shortDescription: "Professional creative suite",
        creator: "Adobe",
        releaseDate: "2023-09",
        rating: 4,
        category: "design",
        logoColor: "bg-red-400"
      },
      {
        id: "ideogram",
        title: "Ideogram",
        description: "Specialized in generating text-heavy graphics and designs with excellent typography handling and layout understanding.",
        shortDescription: "Typography specialist",
        creator: "Ideogram AI",
        releaseDate: "2023-11",
        rating: 3,
        category: "design",
        logoColor: "bg-yellow-400"
      }
    ]
  },
  {
    id: "video",
    title: "Video Generation",
    icon: <Video className="h-5 w-5" />,
    models: [
      {
        id: "sora",
        title: "Sora",
        description: "Text-to-video model that generates high-quality videos up to 60 seconds long with realistic motion, complex scenes, and multiple characters with consistent identity.",
        shortDescription: "Cinematic quality videos",
        creator: "OpenAI",
        releaseDate: "2024-02",
        rating: 5,
        category: "video",
        tags: ["Text-to-Video", "Cinematic", "Long-form"],
        logoColor: "bg-green-400"
      },
      {
        id: "runwayml-gen2",
        title: "RunwayML Gen-2",
        description: "Create and edit videos from text prompts with incredible flexibility and strong editing capabilities for existing footage.",
        shortDescription: "Professional video editing",
        creator: "Runway",
        releaseDate: "2023-11",
        rating: 4,
        category: "video",
        tags: ["Video Editing", "Professional", "Creative Tools"],
        logoColor: "bg-purple-400"
      },
      {
        id: "pika-labs",
        title: "Pika 1.0",
        description: "Generate short-form video content with precise control over style and movement, ideal for social media and advertising.",
        shortDescription: "Social media focused",
        creator: "Pika Labs",
        releaseDate: "2023-09",
        rating: 4,
        category: "video",
        tags: ["Short-form", "Social Media", "Style Control"],
        logoColor: "bg-blue-400"
      }
    ]
  },
  {
    id: "research",
    title: "Scientific Research",
    icon: <FlaskConical className="h-5 w-5" />,
    models: [
      {
        id: "alpha-fold-3",
        title: "AlphaFold 3",
        description: "Predict protein structures and interactions with unprecedented accuracy, helping accelerate drug discovery and fundamental biological research.",
        shortDescription: "Protein structure prediction",
        creator: "DeepMind",
        releaseDate: "2023-09",
        rating: 5,
        category: "research",
        tags: ["Biology", "Medicine", "Protein Folding"],
        logoColor: "bg-teal-400",
        metrics: {
          codingScore: 68,
          mathScore: 96,
          researchScore: 99,
          apiCalls24h: 980000,
          accuracy: 0.98,
          hallucinationRate: 0.01,
          parameters: "23B",
          trainingTokens: "1.8T"
        }
      },
      {
        id: "galactica",
        title: "Galactica",
        description: "Specialized AI for scientific knowledge retrieval and synthesis, trained on scientific papers, reference materials, and encyclopedias.",
        shortDescription: "Scientific literature expert",
        creator: "Meta",
        releaseDate: "2023-06",
        rating: 4,
        category: "research",
        tags: ["Scientific Literature", "Research", "Knowledge Base"],
        logoColor: "bg-blue-400"
      },
      {
        id: "research-assistant",
        title: "Claude Research Assistant",
        description: "AI designed to help with literature reviews and research synthesis with careful citation and source tracking.",
        shortDescription: "Literature review specialist",
        creator: "Anthropic",
        releaseDate: "2023-10",
        rating: 4,
        category: "research",
        tags: ["Literature Review", "Academic", "Citations"],
        logoColor: "bg-purple-400"
      }
    ]
  },
  {
    id: "music",
    title: "Music Generation",
    icon: <Music className="h-5 w-5" />,
    models: [
      {
        id: "jukebox-2",
        title: "Jukebox 2",
        description: "Generate complex musical compositions in various styles with vocals that sound increasingly human-like and natural.",
        shortDescription: "Versatile music generation",
        creator: "OpenAI",
        releaseDate: "2023-07",
        rating: 4,
        category: "music",
        tags: ["Vocal Synthesis", "Composition", "Multi-genre"],
        logoColor: "bg-green-400"
      },
      {
        id: "suno-v2",
        title: "Suno v2",
        description: "Create complete songs with vocals from simple text prompts with exceptional quality and production value.",
        shortDescription: "Complete song production",
        creator: "Suno",
        releaseDate: "2024-01",
        rating: 5,
        category: "music",
        tags: ["Song Production", "Vocals", "Text-to-Music"],
        logoColor: "bg-amber-400"
      },
      {
        id: "mubert-ai",
        title: "Mubert AI",
        description: "Generate royalty-free music tracks for any mood or project with strong control over genre, tempo, and emotional qualities.",
        shortDescription: "Royalty-free soundtrack creation",
        creator: "Mubert",
        releaseDate: "2023-08",
        rating: 3,
        category: "music",
        tags: ["Royalty-free", "Mood-based", "Commercial Use"],
        logoColor: "bg-indigo-400"
      }
    ]
  }
];

export default ModelsStore;
