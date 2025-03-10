
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AtSign, Circle, Plus, Search, Send, HelpCircle, CircleX } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const testCategories = [
  { id: "math", name: "Mathematical Reasoning" },
  { id: "coding", name: "Coding & Software Engineering" },
  { id: "general", name: "General Accuracy & Reasoning" }
];

const tests = [
  { id: "smb", name: "SMB", category: "math" },
  { id: "math500", name: "MATH-500", category: "math" },
  { id: "mmlu", name: "MMLU", category: "math" },
  { id: "gsm8k", name: "GSM8K", category: "math" },
  { id: "smb-coding", name: "SMB", category: "coding" },
  { id: "human-eval", name: "MATH-500", category: "coding" },
  { id: "mmlu-coding", name: "MMLU", category: "coding" },
  { id: "gsm8k-coding", name: "GSM8K", category: "coding" },
  { id: "smb-general", name: "SMB", category: "general" },
  { id: "math500-general", name: "MATH-500", category: "general" },
  { id: "mmlu-general", name: "MMLU", category: "general" },
  { id: "gsm8k-general", name: "GSM8K", category: "general" }
];

const models = [
  { id: "gpt4", name: "GPT-4o" },
  { id: "claude3", name: "Claude 3" },
  { id: "gemini", name: "Gemini" },
  { id: "llama3", name: "Llama 3" },
  { id: "mistral", name: "Mistral" }
];

export default function TestCenter() {
  const [selectedTest, setSelectedTest] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [addModelMode, setAddModelMode] = useState(false);
  
  const handleRunTest = () => {
    setShowResults(true);
  };
  
  const handleAddModel = () => {
    setAddModelMode(true);
  };
  
  const handleCancelAddModel = () => {
    setAddModelMode(false);
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Test Center</h1>
      
      {/* Main container with dark background */}
      <div className="bg-black rounded-3xl p-8 text-white shadow-xl">
        {!showResults ? (
          <div className="flex flex-col items-center space-y-8">
            {/* Test selection controls */}
            <div className="flex gap-4 items-center">
              <Select onValueChange={setSelectedTest}>
                <SelectTrigger className="w-[200px] bg-black border-white">
                  <SelectValue placeholder="Choose a test" />
                </SelectTrigger>
                <SelectContent>
                  {tests.map((test) => (
                    <SelectItem key={test.id} value={test.id}>
                      {test.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select onValueChange={setSelectedVersion}>
                <SelectTrigger className="w-[200px] bg-black border-white">
                  <SelectValue placeholder="test's version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v1">Version 1</SelectItem>
                  <SelectItem value="v2">Version 2</SelectItem>
                  <SelectItem value="v3">Version 3</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="icon" variant="outline" className="rounded-full border-white bg-transparent h-8 w-8">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">About Tests</h4>
                    <p className="text-sm text-muted-foreground">
                      Tests evaluate model capabilities across different domains. Select a test and version to assess model performance.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Prompt input */}
            <div className="w-full max-w-xl">
              <div className="relative">
                <Input
                  className="bg-black border-white rounded-full py-6 pr-24 pl-4"
                  placeholder="Type your prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white">
                    <AtSign className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white">
                    <Circle className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Model selection */}
            <div className="flex w-full justify-center gap-6">
              <Button
                onClick={handleAddModel}
                className="bg-transparent border border-white hover:bg-white/10 rounded-full text-white gap-2"
              >
                <Plus className="h-4 w-4" />
                add a Model
              </Button>
              
              <Button
                className="bg-transparent border border-white hover:bg-white/10 rounded-full text-white"
              >
                Choose a Model
              </Button>
            </div>
            
            {/* Model preview box */}
            {addModelMode && (
              <div className="relative w-full max-w-xs h-[400px] border border-white rounded-3xl flex flex-col items-center justify-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 text-white h-6 w-6"
                  onClick={handleCancelAddModel}
                >
                  <CircleX className="h-4 w-4" />
                </Button>
                
                <Select onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-[180px] bg-black border-white">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Action button */}
            <Button
              onClick={handleRunTest}
              className="bg-transparent border border-white hover:bg-white/10 rounded-full text-white px-8"
            >
              Show Results
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-8">
            <h2 className="text-3xl font-bold">Test Results</h2>
            
            {testCategories.map((category) => (
              <div key={category.id} className="w-full">
                <h3 className="text-xl font-medium mb-4">{category.name}</h3>
                <div className="overflow-hidden rounded-2xl border border-white">
                  <Table>
                    <TableHeader className="bg-black">
                      <TableRow className="border-b border-white">
                        <TableHead className="text-white font-bold w-1/3 text-center border-r border-white">Test</TableHead>
                        <TableHead className="text-white font-bold w-1/3 text-center border-r border-white">Model 1</TableHead>
                        <TableHead className="text-white font-bold w-1/3 text-center">Model 2</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tests.filter(test => test.category === category.id).map((test) => (
                        <TableRow key={test.id} className="border-b border-white last:border-b-0">
                          <TableCell className="text-white font-bold text-center border-r border-white">{test.name} :</TableCell>
                          <TableCell className="text-white text-center border-r border-white">96,2</TableCell>
                          <TableCell className="text-white text-center">90,2</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
            
            <Button
              onClick={() => setShowResults(false)}
              className="bg-transparent border border-white hover:bg-white/10 rounded-full text-white px-8"
            >
              Back to Test
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
