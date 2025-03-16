
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { 
  UserCircle, 
  Send, 
  Bot, 
  X, 
  Search, 
  BrainCircuit, 
  Mic 
} from "lucide-react";

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatOverlay({ isOpen, onClose }: ChatOverlayProps) {
  const [messages, setMessages] = useState<{sender: 'user' | 'ai', text: string}[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedLab, setSelectedLab] = useState("openai");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { sender: 'user', text: inputText }]);
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'ai', 
          text: "This is a simulated response from the AI. In a real application, this would be an actual response from the selected model." 
        }]);
      }, 1000);
      
      setInputText("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chat Card */}
      <Card className="w-[40%] h-[80vh] bg-sidebar border-border relative z-10 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span className="font-medium">AI Assistant</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Model Selection */}
        <div className="flex items-center gap-2 p-3 bg-background/10">
          <div className="flex-1">
            <Select value={selectedLab} onValueChange={setSelectedLab}>
              <SelectTrigger className="bg-sidebar border-border h-9">
                <SelectValue placeholder="Choose AI Lab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="meta">Meta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="bg-sidebar border-border h-9">
                <SelectValue placeholder="Choose Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="claude-3">Claude 3 Opus</SelectItem>
                <SelectItem value="gemini">Gemini Pro</SelectItem>
                <SelectItem value="llama">Llama 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Chat Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Bot className="h-12 w-12 mb-2 opacity-40" />
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {msg.sender === 'ai' && (
                      <Bot className="h-5 w-5 mt-1" />
                    )}
                    <div>{msg.text}</div>
                    {msg.sender === 'user' && (
                      <UserCircle className="h-5 w-5 mt-1" />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
        
        {/* Input Area */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="pr-24 bg-sidebar border-border"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                >
                  <BrainCircuit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button 
              size="icon"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
