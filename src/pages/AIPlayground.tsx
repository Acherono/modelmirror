import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SendHorizontal, Paperclip, Loader2, Brain, Search, Code, Image, Video, Music, ChartPie, Star } from "lucide-react";

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
  'Photo Generator': <Image className="h-5 w-5" />,
  'Video Generator': <Video className="h-5 w-5" />,
  'Music Generator': <Music className="h-5 w-5" />,
  'Code Generator': <Code className="h-5 w-5" />,
  'Chart & Mindmaps': <ChartPie className="h-5 w-5" />
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
  
  // Dropdown visibility states
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showCreatorOptions, setShowCreatorOptions] = useState(false);
  const [showVersionOptions, setShowVersionOptions] = useState(false);
  
  // Refs for dropdown click-outside detection
  const categoryRef = useRef<HTMLDivElement>(null);
  const creatorRef = useRef<HTMLDivElement>(null);
  const versionRef = useRef<HTMLDivElement>(null);

  // Effect to handle clicks outside dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryOptions(false);
      }
      if (creatorRef.current && !creatorRef.current.contains(event.target as Node)) {
        setShowCreatorOptions(false);
      }
      if (versionRef.current && !versionRef.current.contains(event.target as Node)) {
        setShowVersionOptions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="flex flex-col w-full h-full bg-black p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
        Playaround with everything...
      </h1>
      
      <div className="flex flex-col w-full max-w-6xl mx-auto">
        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Input and options section */}
          <div className="lg:w-1/2 space-y-4">
            {/* Model selection options */}
            <div className="flex items-center justify-between px-2 mb-2">
              {/* Model Category Dropdown */}
              <div className="relative" ref={categoryRef}>
                <button 
                  onClick={() => setShowCategoryOptions(!showCategoryOptions)}
                  className="p-2 rounded-md hover:bg-gray-800/40 transition-colors"
                  aria-label="Select model category"
                >
                  {ModelCategoryIcons[modelCategory]}
                </button>
                {showCategoryOptions && (
                  <div className="absolute top-full left-0 mt-1 bg-gray-900 rounded-md shadow-lg z-10 options-list">
                    {Object.entries(ModelCategoryIcons).map(([category, icon]) => (
                      <div 
                        key={category}
                        onClick={() => {
                          setModelCategory(category as ModelCategory);
                          setShowCategoryOptions(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 cursor-pointer"
                      >
                        {icon}
                        <span>{category}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Model Creator Dropdown */}
              <div className="relative" ref={creatorRef}>
                <button 
                  onClick={() => setShowCreatorOptions(!showCreatorOptions)}
                  className={`p-2 rounded-md hover:bg-gray-800/40 transition-colors font-bold ${ModelCreatorIcons[modelCreator].color}`}
                  aria-label="Select model creator"
                >
                  {ModelCreatorIcons[modelCreator].icon}
                </button>
                {showCreatorOptions && (
                  <div className="absolute top-full left-0 mt-1 bg-gray-900 rounded-md shadow-lg z-10 options-list">
                    {Object.entries(ModelCreatorIcons).map(([creator, { icon, color }]) => (
                      <div 
                        key={creator}
                        onClick={() => {
                          setModelCreator(creator as ModelCreator);
                          setShowCreatorOptions(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 cursor-pointer"
                      >
                        <span className={`font-bold ${color}`}>{icon}</span>
                        <span>{creator}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Model Version Dropdown */}
              <div className="relative" ref={versionRef}>
                <button 
                  onClick={() => setShowVersionOptions(!showVersionOptions)}
                  className="p-2 rounded-md hover:bg-gray-800/40 transition-colors"
                  aria-label="Select model version"
                >
                  <Star className="h-5 w-5" />
                </button>
                {showVersionOptions && (
                  <div className="absolute top-full left-0 mt-1 bg-gray-900 rounded-md shadow-lg z-10 options-list">
                    {['ChatGPT-4', 'Claude Sonnet 3.7', 'Gemini Flash 2', 'Llama3'].map((version) => (
                      <div 
                        key={version}
                        onClick={() => {
                          setModelVersion(version as ModelVersion);
                          setShowVersionOptions(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 cursor-pointer"
                      >
                        <span>{version}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Input Area */}
            <div className="animated-neon-border-input">
              <div className="flex items-end bg-black/90 rounded-lg p-2">
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your prompt here..."
                  className="flex-1 resize-none rounded-lg bg-black/60 px-4 py-3 focus:outline-none text-white"
                  disabled={isLoading}
                />
                <div className="flex items-center gap-2 pl-2">
                  <button
                    onClick={handleFileClick}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Attach document"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    aria-label="Upload file"
                  />
                  <button 
                    onClick={() => setDeepResearch(!deepResearch)}
                    className={`p-2 rounded-md transition-colors ${deepResearch ? 'bg-neon-purple/30 text-white' : 'text-gray-400 hover:text-white'}`}
                    aria-label="Deep Research"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setDeepThink(!deepThink)}
                    className={`p-2 rounded-md transition-colors ${deepThink ? 'bg-neon-pink/30 text-white' : 'text-gray-400 hover:text-white'}`}
                    aria-label="Deep Think"
                  >
                    <Brain className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={isLoading || !message.trim()}
                    className="p-2.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 text-white animate-spin" />
                    ) : (
                      <SendHorizontal className="h-5 w-5 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Output Area */}
          <div className="lg:w-1/2">
            <div className="animated-neon-border-output h-full min-h-[220px]">
              <div className="bg-black/80 rounded-lg p-6 h-full overflow-auto text-white">
                {outputContent ? (
                  <div>{outputContent}</div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 italic">
                    Your results will appear here...
                  </div>
                )}
              </div>
            </div>
            <div className="disclaimer-text">AI can make mistakes, DYOR</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlayground;