
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SendHorizontal, Paperclip, Loader2, Brain, Search, Star, Sparkles, Code, PenTool, Video, Music, BookOpen, FlaskConical } from "lucide-react";
import { Button } from '@/components/ui/button';

// Define types
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

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

// Combined AIPlayground component
const AIPlayground = () => {
  // State variables
  const [message, setMessage] = useState("");
  const [modelCategory, setModelCategory] = useState<ModelCategory>('LLMs');
  const [modelCreator, setModelCreator] = useState<ModelCreator>('OpenAI');
  const [modelVersion, setModelVersion] = useState<ModelVersion>('ChatGPT-4');
  const [deepResearch, setDeepResearch] = useState(false);
  const [deepThink, setDeepThink] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [outputContent, setOutputContent] = useState("");
  
  // Hooks
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Function to handle sending messages
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const newMessages = [...messages, { role: 'user', content } as const];
      setMessages(newMessages);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const assistantMessage: Message = {
        role: 'assistant',
        content: "I am a hardcoded response. The database connection has been removed for testing purposes. You can modify this response here."
      };

      setMessages([...newMessages, assistantMessage]);
      setOutputContent(assistantMessage.content);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Submit handler for sending the message
  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      handleSendMessage(message);
      setMessage("");
    }
  };

  // Handle Enter key press in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Trigger file input click
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  // Render the component
  return (
    <div className="flex flex-col w-full h-full bg-background p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
        Playaround with everything...
      </h1>
      
      <div className="flex flex-col w-full max-w-4xl mx-auto space-y-4">
        {/* Model selection before input */}
        <div className="w-full backdrop-blur-md bg-card/30 rounded-lg border border-border/50 shadow-md p-4 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Choose your AI model</h3>
          
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
          
          {/* Additional options */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={deepResearch ? "default" : "outline"}
              size="sm"
              onClick={() => setDeepResearch(!deepResearch)}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Deep Research
            </Button>
            <Button 
              variant={deepThink ? "default" : "outline"}
              size="sm"
              onClick={() => setDeepThink(!deepThink)}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              Deep Thinking
            </Button>
          </div>
        </div>
        
        {/* Input Area - Modern & Artistic */}
        <div className="w-full backdrop-blur-md bg-card/30 rounded-lg border border-border/50 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent"></div>
          <div className="flex items-center p-3">
            <textarea
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your prompt here..."
              className="flex-1 resize-none rounded-lg bg-background/50 backdrop-blur-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground border-none"
              disabled={isLoading}
              style={{ minHeight: '40px', maxHeight: '40px' }}
            />
            <div className="flex items-center gap-1 pl-2">
              <button
                onClick={handleFileClick}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50"
                aria-label="Attach document"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                aria-label="Upload file"
              />
              <button 
                onClick={handleSubmit}
                disabled={isLoading || !message.trim()}
                className="p-2 bg-primary rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground shadow-md"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <SendHorizontal className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Artistic Output Area */}
        <div className="w-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 rounded-lg blur-lg opacity-70"></div>
          <div className="relative bg-card/80 backdrop-blur-md shadow-xl rounded-lg border border-white/10 overflow-hidden transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-purple-500/40 to-blue-500/40"></div>
            
            <div className="p-6 min-h-[300px]">
              {outputContent ? (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-sm font-medium">AI Assistant</div>
                  </div>
                  <div className="pl-10">{outputContent}</div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                  <Sparkles className="h-10 w-10 mb-3 text-primary/30 animate-pulse" />
                  <p className="text-center italic">Your results will appear here...</p>
                  <div className="mt-3 text-xs opacity-70">Try asking a question to get started</div>
                </div>
              )}
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center mt-2">AI can make mistakes, DYOR</div>
        </div>
      </div>
    </div>
  );
};

export default AIPlayground;
