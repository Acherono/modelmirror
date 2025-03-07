import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronRight, Code, PenTool, Video, BookOpen, FlaskConical, Music, Star, ArrowRight, ArrowLeft, ExternalLink, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModelDetailsCard } from "@/components/store/ModelDetailsCard";

interface ModelItem {
  id: string;
  title: string;
  description: string;
  creator: string;
  releaseDate: string;
  rating: number;
  category: string;
  imageUrl?: string;
  fullDescription?: string;
  userActivity24h?: number;
  userActivity7d?: number;
  website?: string;
  metrics?: {
    codingScore?: number;
    mathScore?: number;
    researchScore?: number;
    apiCalls24h?: number;
    accuracy?: number;
    hallucinationRate?: number;
    parameters?: string;
    trainingTokens?: string;
  };
}

interface CategorySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  models: ModelItem[];
}

const ModelCard = ({ model, onViewDetails }: { model: ModelItem; onViewDetails: (model: ModelItem) => void }) => {
  return (
    <Card className="h-[280px] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-80 z-0" />
      
      <CardHeader className="relative z-10 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">{model.title}</CardTitle>
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 rounded-full">
            {model.creator}
          </span>
        </div>
        <CardDescription>{model.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Released: {model.releaseDate}</span>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className={i < model.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"} />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="relative z-10 pt-0">
        <Button variant="outline" className="mt-2 w-full" onClick={() => onViewDetails(model)}>
          View Details <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const CategoryCarousel = ({ section, onViewDetails }: { section: CategorySection; onViewDetails: (model: ModelItem) => void }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const updateScrollInfo = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
      setMaxScroll(carouselRef.current.scrollWidth - carouselRef.current.clientWidth);
    }
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      updateScrollInfo();
      
      // Add resize observer
      const resizeObserver = new ResizeObserver(() => {
        updateScrollInfo();
      });
      
      resizeObserver.observe(container);
      
      // Add scroll listener
      container.addEventListener('scroll', updateScrollInfo);
      
      return () => {
        resizeObserver.disconnect();
        container.removeEventListener('scroll', updateScrollInfo);
      };
    }
  }, []);
  
  const handleScroll = (direction: 'left' | 'right') => {
    const container = carouselRef.current;
    if (container) {
      const cardWidth = 320; // Card width + gap
      const scrollAmount = Math.floor(container.offsetWidth / cardWidth) * cardWidth;
      
      const currentPosition = container.scrollLeft;
      const newPosition = direction === 'left' 
        ? Math.max(currentPosition - scrollAmount, 0)
        : Math.min(currentPosition + scrollAmount, container.scrollWidth - container.clientWidth);
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-12 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            {section.icon}
          </div>
          <h2 className="text-2xl font-bold">{section.title}</h2>
        </div>
      </div>
      
      {/* Navigation buttons positioned on top of the carousel */}
      {maxScroll > 0 && (
        <div className="absolute top-1/2 left-0 right-0 flex justify-between pointer-events-none z-10 px-2 transform -translate-y-8">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleScroll('left')}
            disabled={scrollPosition <= 0}
            className={cn(
              "h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-md pointer-events-auto",
              scrollPosition <= 0 ? "opacity-0" : "opacity-100"
            )}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleScroll('right')}
            disabled={scrollPosition >= maxScroll}
            className={cn(
              "h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-md pointer-events-auto",
              scrollPosition >= maxScroll ? "opacity-0" : "opacity-100"
            )}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      )}
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto gap-5 pb-4 hide-scrollbar scroll-smooth"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {section.models.map((model) => (
          <div key={model.id} className="flex-none w-[300px] md:w-[320px] lg:w-[340px]">
            <ModelCard model={model} onViewDetails={onViewDetails} />
          </div>
        ))}
      </div>
    </div>
  );
};

const modelsData: CategorySection[] = [
  {
    id: "coding",
    title: "AI Models for Coding",
    icon: <Code className="h-5 w-5" />,
    models: [
      {
        id: "code-gpt4",
        title: "CodeGPT 4.0",
        description: "Advanced code generation with context understanding across multiple languages",
        creator: "OpenAI",
        releaseDate: "2023-05",
        rating: 5,
        category: "coding",
        fullDescription: "CodeGPT 4.0 represents the pinnacle of code generation AI, capable of understanding complex programming contexts, maintaining code consistency across files, and implementing best practices automatically. It excels in over 40 programming languages with specialized knowledge of modern frameworks and libraries.",
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
        description: "Open-source coding assistant with strong performance for long context",
        creator: "Meta",
        releaseDate: "2023-08",
        rating: 4,
        category: "coding",
        fullDescription: "Code Llama is Meta's open-source coding specialist model, fine-tuned from Llama 2 on code-specific datasets. It supports longer context windows (up to 100k tokens), making it ideal for understanding and modifying large, complex codebases.",
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
        description: "AI pair programmer that helps you write better code faster with real-time suggestions",
        creator: "GitHub",
        releaseDate: "2023-03",
        rating: 5,
        category: "coding",
      },
      {
        id: "codewhisperer",
        title: "CodeWhisperer",
        description: "Amazon's code assistant with specialized cloud infrastructure expertise",
        creator: "Amazon",
        releaseDate: "2023-06",
        rating: 4,
        category: "coding",
      },
      {
        id: "replit-ghostwriter",
        title: "Replit Ghostwriter",
        description: "Code completion and generation optimized for educational contexts",
        creator: "Replit",
        releaseDate: "2023-04",
        rating: 3,
        category: "coding",
      }
    ]
  },
  {
    id: "design",
    title: "AI Models for Graphic Design",
    icon: <PenTool className="h-5 w-5" />,
    models: [
      {
        id: "dall-e3",
        title: "DALL-E 3",
        description: "Generate highly detailed and accurate images from text prompts with improved accuracy",
        creator: "OpenAI",
        releaseDate: "2023-10",
        rating: 4,
        category: "design",
        fullDescription: "DALL-E 3 sets a new standard for text-to-image generation, with unprecedented accuracy in rendering complex scenes, specific objects, and text within images. Its enhanced understanding of spatial relationships allows for more coherent compositions that precisely match user prompts.",
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
        description: "Create stunning artwork with improved coherence and photorealism",
        creator: "Midjourney",
        releaseDate: "2023-12",
        rating: 5,
        category: "design",
      },
      {
        id: "stable-diffusion-xl",
        title: "Stable Diffusion XL",
        description: "Open-source image generation with incredible detail and control",
        creator: "Stability AI",
        releaseDate: "2023-07",
        rating: 4,
        category: "design",
      },
      {
        id: "firefly",
        title: "Adobe Firefly",
        description: "Image generation and editing with Adobe Creative Cloud integration",
        creator: "Adobe",
        releaseDate: "2023-09",
        rating: 4,
        category: "design",
      },
      {
        id: "ideogram",
        title: "Ideogram",
        description: "Specialized in generating text-heavy graphics and designs",
        creator: "Ideogram AI",
        releaseDate: "2023-11",
        rating: 3,
        category: "design",
      }
    ]
  },
  {
    id: "video",
    title: "AI Models for Video Generation",
    icon: <Video className="h-5 w-5" />,
    models: [
      {
        id: "sora",
        title: "Sora",
        description: "Text-to-video model that generates high-quality videos up to 60 seconds long",
        creator: "OpenAI",
        releaseDate: "2024-02",
        rating: 5,
        category: "video",
        imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=500&auto=format&fit=crop"
      },
      {
        id: "runwayml-gen2",
        title: "RunwayML Gen-2",
        description: "Create and edit videos from text prompts with incredible flexibility",
        creator: "Runway",
        releaseDate: "2023-11",
        rating: 4,
        category: "video",
      },
      {
        id: "pika-labs",
        title: "Pika 1.0",
        description: "Generate short-form video content with precise control over style and movement",
        creator: "Pika Labs",
        releaseDate: "2023-09",
        rating: 4,
        category: "video",
      }
    ]
  },
  {
    id: "writing",
    title: "AI Models for Writing",
    icon: <BookOpen className="h-5 w-5" />,
    models: [
      {
        id: "claude-3-opus",
        title: "Claude 3 Opus",
        description: "Long-form content generation with exceptional coherence and creative capabilities",
        creator: "Anthropic",
        releaseDate: "2024-03",
        rating: 5,
        category: "writing",
        imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop"
      },
      {
        id: "gpt4-turbo",
        title: "GPT-4 Turbo",
        description: "Advanced language model with improved reasoning and writing capabilities",
        creator: "OpenAI",
        releaseDate: "2023-11",
        rating: 5,
        category: "writing",
      },
      {
        id: "gemini-pro",
        title: "Gemini Pro",
        description: "Google's multimodal AI with excellent content generation abilities",
        creator: "Google",
        releaseDate: "2023-12",
        rating: 4,
        category: "writing",
      }
    ]
  },
  {
    id: "research",
    title: "AI Models for Scientific Research",
    icon: <FlaskConical className="h-5 w-5" />,
    models: [
      {
        id: "alpha-fold-3",
        title: "AlphaFold 3",
        description: "Predict protein structures and interactions with unprecedented accuracy",
        creator: "DeepMind",
        releaseDate: "2023-09",
        rating: 5,
        category: "research",
        imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format&fit=crop"
      },
      {
        id: "galactica",
        title: "Galactica",
        description: "Specialized AI for scientific knowledge retrieval and synthesis",
        creator: "Meta",
        releaseDate: "2023-06",
        rating: 4,
        category: "research",
      },
      {
        id: "research-assistant",
        title: "Claude Research Assistant",
        description: "AI designed to help with literature reviews and research synthesis",
        creator: "Anthropic",
        releaseDate: "2023-10",
        rating: 4,
        category: "research",
      }
    ]
  },
  {
    id: "music",
    title: "AI Models for Music Generation",
    icon: <Music className="h-5 w-5" />,
    models: [
      {
        id: "jukebox-2",
        title: "Jukebox 2",
        description: "Generate complex musical compositions in various styles with vocals",
        creator: "OpenAI",
        releaseDate: "2023-07",
        rating: 4,
        category: "music",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop"
      },
      {
        id: "suno-v2",
        title: "Suno v2",
        description: "Create complete songs with vocals from simple text prompts",
        creator: "Suno",
        releaseDate: "2024-01",
        rating: 5,
        category: "music",
      },
      {
        id: "mubert-ai",
        title: "Mubert AI",
        description: "Generate royalty-free music tracks for any mood or project",
        creator: "Mubert",
        releaseDate: "2023-08",
        rating: 3,
        category: "music",
      }
    ]
  }
];

const ModelsStore = () => {
  const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null);
  
  const handleViewDetails = (model: ModelItem) => {
    setSelectedModel(model);
  };
  
  const closeModal = () => {
    setSelectedModel(null);
  };
  
  return (
    <div className="w-full p-4 md:p-8 max-w-full overflow-x-hidden">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          AI Models Marketplace
        </h1>
        <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
          Discover and explore the latest AI models across various categories. From coding to creative content generation, find the perfect AI tools for your projects.
        </p>
      </div>
      
      <div className="mx-auto w-full px-2 sm:px-4">
        {modelsData.map(section => (
          <CategoryCarousel key={section.id} section={section} onViewDetails={handleViewDetails} />
        ))}
      </div>
      
      <Dialog open={!!selectedModel} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[40%] max-w-full max-h-[90vh] overflow-y-auto">
          {selectedModel && (
            <ModelDetailsCard model={selectedModel} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModelsStore;
