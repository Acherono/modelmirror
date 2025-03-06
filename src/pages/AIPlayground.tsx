
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SendHorizontal, Paperclip, Loader2, Brain, Search, Star } from "lucide-react";

// Define types
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ModelCategory = 'LLMs' | 'Photo Generator' | 'Video Generator' | 'Music Generator' | 'Code Generator' | 'Chart & Mindmaps';
type ModelCreator = 'OpenAI' | 'Anthropic' | 'Google' | 'Meta';
type ModelVersion = 'ChatGPT-4' | 'Claude Sonnet 3.7' | 'Gemini Flash 2' | 'Llama3';

// Model category icons
const ModelCategoryIcons = {
  'LLMs': <Brain className="h-5 w-5" />,
  'Photo Generator': <Search className="h-5 w-5" />,
  'Video Generator': <Search className="h-5 w-5" />,
  'Music Generator': <Search className="h-5 w-5" />,
  'Code Generator': <Search className="h-5 w-5" />,
  'Chart & Mindmaps': <Search className="h-5 w-5" />
};

// Model creator icons with colors
const ModelCreatorIcons = {
  'OpenAI': { icon: "O", color: "text-neon-purple" },
  'Anthropic': { icon: "A", color: "text-neon-pink" },
  'Google': { icon: "G", color: "text-neon-blue" },
  'Meta': { icon: "M", color: "text-neon-orange" }
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
        {/* Output Area */}
        <div className="w-full">
          <div className="bg-card/80 shadow-md rounded-lg p-6 min-h-[300px] no-scrollbar">
            {outputContent ? (
              <div>{outputContent}</div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground italic">
                Your results will appear here...
              </div>
            )}
          </div>
          <div className="text-xs text-muted-foreground text-center mt-2">AI can make mistakes, DYOR</div>
        </div>
        
        {/* Input Area - Compact */}
        <div className="w-full glass-morphism rounded-lg border border-border/50 shadow-sm">
          <div className="flex items-center bg-background/80 rounded-lg p-2">
            <textarea
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your prompt here..."
              className="flex-1 resize-none rounded-lg bg-transparent px-3 py-1.5 focus:outline-none text-foreground"
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
                onClick={() => setDeepResearch(!deepResearch)}
                className={`p-1.5 rounded-full transition-colors hover:bg-muted/50 ${deepResearch ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`}
                aria-label="Deep Research"
              >
                <Search className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setDeepThink(!deepThink)}
                className={`p-1.5 rounded-full transition-colors hover:bg-muted/50 ${deepThink ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`}
                aria-label="Deep Think"
              >
                <Brain className="h-4 w-4" />
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isLoading || !message.trim()}
                className="p-1.5 bg-primary rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground"
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
        
        {/* Model selection options - shown as small badges */}
        <div className="flex flex-wrap gap-2 mt-2 justify-center">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="font-medium">Model:</span>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className={`font-bold ${ModelCreatorIcons[modelCreator].color}`}>{ModelCreatorIcons[modelCreator].icon}</span>
              {modelVersion}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlayground;
