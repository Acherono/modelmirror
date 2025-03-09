
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample model data
const models = [
  { id: 1, name: "GPT-4", company: "OpenAI" },
  { id: 2, name: "Claude 3", company: "Anthropic" },
  { id: 3, name: "Gemini", company: "Google" },
  { id: 4, name: "Llama 3", company: "Meta" },
  { id: 5, name: "Mistral", company: "Mistral AI" },
  { id: 6, name: "Falcon", company: "Technology Innovation Institute" },
  { id: 7, name: "PaLM", company: "Google" },
  { id: 8, name: "BLOOM", company: "BigScience" },
];

// Sample model performance data for comparison
const performanceData = [
  { metric: 'MMLU', GPT4: 86.4, Claude3: 84.2, Gemini: 83.1, Llama3: 78.5 },
  { metric: 'HumanEval', GPT4: 67.0, Claude3: 71.2, Gemini: 63.0, Llama3: 56.0 },
  { metric: 'GSM8K', GPT4: 92.0, Claude3: 88.0, Gemini: 85.0, Llama3: 77.0 },
  { metric: 'TruthfulQA', GPT4: 58.0, Claude3: 62.0, Gemini: 53.0, Llama3: 48.0 },
  { metric: 'BigBench', GPT4: 81.0, Claude3: 76.0, Gemini: 78.0, Llama3: 69.0 },
];

export default function Battleground() {
  const [inputText, setInputText] = useState("");
  const [model1, setModel1] = useState("");
  const [model2, setModel2] = useState("");
  const [showResults, setShowResults] = useState(false);
  
  const handleCompare = () => {
    if (model1 && model2) {
      setShowResults(true);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">AI Battleground</h1>
      
      {/* Input Container */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Input Test Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Input
              placeholder="Enter a prompt to test both models..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Model Selection Containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Model 1 Selection */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Select Model 1</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={model1} onValueChange={setModel1}>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.name}>
                    {model.name} ({model.company})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        {/* Model 2 Selection */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Select Model 2</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={model2} onValueChange={setModel2}>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.name}>
                    {model.name} ({model.company})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
      
      {/* Compare Button */}
      <div className="flex justify-center mb-8">
        <Button 
          size="lg" 
          onClick={handleCompare}
          disabled={!model1 || !model2 || !inputText}
        >
          Compare Models
        </Button>
      </div>
      
      {/* Results Card */}
      {showResults && (
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader className="border-b">
            <div className="flex flex-col space-y-2">
              <CardTitle className="text-2xl">Comparison Results</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{model1}</Badge>
                <span>vs</span>
                <Badge variant="outline">{model2}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-8">
              {/* Performance Comparison */}
              <div>
                <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="GPT4" name="GPT-4" fill="#8884d8" />
                      <Bar dataKey="Claude3" name="Claude 3" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <Separator />
              
              {/* Generated Output Comparison */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Generated Outputs</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Model 1 Output */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">{model1}</Badge>
                    </div>
                    <div className="p-4 rounded-md bg-muted/50">
                      <p className="text-sm">
                        {inputText ? `Generated response for "${inputText}" using ${model1}...` : "No input provided."}
                      </p>
                    </div>
                  </div>
                  
                  {/* Model 2 Output */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">{model2}</Badge>
                    </div>
                    <div className="p-4 rounded-md bg-muted/50">
                      <p className="text-sm">
                        {inputText ? `Generated response for "${inputText}" using ${model2}...` : "No input provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Conclusion */}
              <div>
                <h3 className="text-lg font-medium mb-2">Conclusion</h3>
                <div className="p-4 rounded-md bg-secondary/50">
                  <p>
                    Based on the performance metrics and generated outputs, {model1} performs better in some areas while {model2} excels in others. The choice between these models would depend on your specific use case and requirements.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
