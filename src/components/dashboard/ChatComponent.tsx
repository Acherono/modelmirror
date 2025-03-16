
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { 
  Search, 
  BrainCircuit, 
  Mic, 
  Send,
  ChevronUp
} from "lucide-react";
import { ChatOverlay } from "./ChatOverlay";

export function ChatComponent() {
  const [prompt, setPrompt] = useState("");
  const [selectedLab, setSelectedLab] = useState("AI Lab");
  const [selectedModel, setSelectedModel] = useState("Model");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  
  return (
    <>
      <Card className="w-full h-full bg-sidebar border-border overflow-hidden">
        <CardContent className="p-3 space-y-3 relative">
          {/* Arrow Button centered at top */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 h-6 w-6 rounded-b-md rounded-t-none bg-primary/10 hover:bg-primary/20 z-10"
            onClick={() => setIsOverlayOpen(true)}
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          
          <div className="flex justify-between items-center">
            <Button
              variant="ghost" 
              size="sm"
              className="text-xs"
              onClick={() => setIsOverlayOpen(true)}
            >
              Chat Assistant
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedLab} onValueChange={setSelectedLab}>
              <SelectTrigger className="bg-sidebar border-border h-8">
                <SelectValue placeholder="Choose AI Lab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="meta">Meta</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="bg-sidebar border-border h-8">
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
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your prompt here..."
                className="pr-24 bg-sidebar border-border h-8"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                  <BrainCircuit className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                  <Mic className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Button
              size="icon"
              className="h-8 w-8"
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Chat Overlay */}
      <ChatOverlay 
        isOpen={isOverlayOpen} 
        onClose={() => setIsOverlayOpen(false)} 
      />
    </>
  );
}
