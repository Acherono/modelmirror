import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, StrictMode, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIPlayground from "./pages/AIPlayground";
import ModelsStore from "./pages/ModelsStore";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="modelmirror-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/playaround" element={<AIPlayground />} />
                <Route path="/store" element={<ModelsStore />} />
                <Route path="/agentic" element={<NotFound />} />
                <Route path="/blog" element={<NotFound />} />
                <Route path="/users" element={<NotFound />} />
                <Route path="/accuracy" element={<NotFound />} />
                <Route path="/math" element={<NotFound />} />
                <Route path="/citations" element={<NotFound />} />
                <Route path="/models" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
