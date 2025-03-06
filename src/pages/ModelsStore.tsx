
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Code, PenTool, Video, BookOpen, FlaskConical, Music, Star, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModelItem {
  id: string;
  title: string;
  description: string;
  creator: string;
  releaseDate: string;
  rating: number;
  category: string;
  imageUrl?: string; // Add optional imageUrl property
}

interface CategorySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  models: ModelItem[];
}

const ModelCard = ({ model, index }: { model: ModelItem; index: number }) => {
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
        <Button variant="outline" className="mt-2 w-full">
          View Details <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const CategoryCarousel = ({ section }: { section: CategorySection }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollAmount = 300;
  
  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`carousel-${section.id}`);
    if (container) {
      const currentPosition = container.scrollLeft;
      const newPosition = direction === 'left' 
        ? Math.max(currentPosition - scrollAmount, 0)
        : Math.min(currentPosition + scrollAmount, container.scrollWidth - container.clientWidth);
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
      setMaxScroll(container.scrollWidth - container.clientWidth);
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            {section.icon}
          </div>
          <h2 className="text-2xl font-bold">{section.title}</h2>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleScroll('left')}
            disabled={scrollPosition <= 0}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleScroll('right')}
            disabled={scrollPosition >= maxScroll && maxScroll > 0}
            className="h-8 w-8"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div 
        id={`carousel-${section.id}`}
        className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {section.models.map((model, index) => (
          <div key={model.id} className="flex-none w-[300px]">
            <ModelCard model={model} index={index} />
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
      },
      {
        id: "code-llama",
        title: "Code Llama",
        description: "Open-source coding assistant with strong performance for long context",
        creator: "Meta",
        releaseDate: "2023-08",
        rating: 4,
        category: "coding",
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
  return (
    <div className="w-full p-4 md:p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          AI Models Marketplace
        </h1>
        <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
          Discover and explore the latest AI models across various categories. From coding to creative content generation, find the perfect AI tools for your projects.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {modelsData.map(section => (
          <CategoryCarousel key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};

export default ModelsStore;
