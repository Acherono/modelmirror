
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
      <div className="w-full h-full bg-black p-3 flex flex-col relative">
        {/* Arrow Button centered at top */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-1 left-1/2 transform -translate-x-1/2 h-5 w-5 rounded-b-md rounded-t-none bg-primary/10 hover:bg-primary/20 z-10"
          onClick={() => setIsOverlayOpen(true)}
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
        
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex flex-row gap-2">
            <Select value={selectedLab} onValueChange={setSelectedLab}>
              <SelectTrigger className="bg-black border-gray-700 text-white h-7 text-xs">
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
              <SelectTrigger className="bg-black border-gray-700 text-white h-7 text-xs">
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
          
          <div className="relative flex-1 mt-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt here..."
              className="pr-24 bg-black border-gray-700 text-white h-7 text-xs"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-5 w-5 text-gray-400 hover:text-white"
              >
                <Search className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-5 w-5 text-gray-400 hover:text-white"
              >
                <BrainCircuit className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-5 w-5 text-gray-400 hover:text-white"
              >
                <Mic className="h-3 w-3" />
              </Button>
              <Button
                size="icon"
                className="h-5 w-5 rounded-full bg-primary"
              >
                <Send className="h-2.5 w-2.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Overlay */}
      <ChatOverlay 
        isOpen={isOverlayOpen} 
        onClose={() => setIsOverlayOpen(false)} 
      />
    </>
  );
}
