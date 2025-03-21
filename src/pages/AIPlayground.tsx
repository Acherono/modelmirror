
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SendHorizontal, Paperclip, Loader2, Brain, BrainCog, Search, Sparkles } from "lucide-react";
import { Button } from '@/components/ui/button';
import { ModelSelector } from '@/components/ai-playground/ModelSelector';

// Define types
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ModelCategory = 'LLMs' | 'Photo Generator' | 'Video Generator' | 'Music Generator' | 'Code Generator' | 'Chart & Mindmaps';
type ModelCreator = 'OpenAI' | 'Anthropic' | 'Google' | 'Meta';
type ModelVersion = 'ChatGPT-4' | 'Claude Sonnet 3.7' | 'Gemini Flash 2' | 'Llama3';

// Combined AIPlayground component
const AIPlayground = () => {
  // State variables
  const [message, setMessage] = useState("");
  const [modelCategory, setModelCategory] = useState<ModelCategory>('LLMs');
  const [modelCreator, setModelCreator] = useState<ModelCreator>('OpenAI');
  const [modelVersion, setModelVersion] = useState<ModelVersion>('ChatGPT-4');
  const [deepSearch, setDeepSearch] = useState(false);
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

  // Toggle deep search
  const toggleDeepSearch = () => {
    setDeepSearch(!deepSearch);
  };

  // Toggle deep think
  const toggleDeepThink = () => {
    setDeepThink(!deepThink);
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
        {/* Model selection with collapsible component */}
        <ModelSelector 
          modelCategory={modelCategory}
          setModelCategory={setModelCategory}
          modelCreator={modelCreator}
          setModelCreator={setModelCreator}
          modelVersion={modelVersion}
          setModelVersion={setModelVersion}
        />
        
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
              className="flex-1 resize-none rounded-lg bg-background/50 backdrop-blur-sm px-3 py-2 focus:outline-none text-foreground border-none no-focus-border"
              disabled={isLoading}
              style={{ minHeight: '40px', maxHeight: '40px' }}
            />
            <div className="flex items-center gap-1 pl-2">
              <button
                onClick={toggleDeepSearch}
                className={`p-1.5 rounded-full transition-colors ${
                  deepSearch 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                aria-label="Deep Search"
                title="Deep Search"
              >
                <Search className="h-4 w-4" />
              </button>
              
              <button
                onClick={toggleDeepThink}
                className={`p-1.5 rounded-full transition-colors ${
                  deepThink 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                aria-label="Deep Thinking"
                title="Deep Thinking"
              >
                <BrainCog className="h-4 w-4" />
              </button>
              
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
