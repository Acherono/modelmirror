import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ModelsStore from "./pages/ModelsStore";
import ResearchPapers from "./pages/ResearchPapers";
import News from "./pages/News";
import Statistics from "./pages/Statistics";
import TestCenter from "./pages/TestCenter";
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
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/testcenter" element={<Layout><TestCenter /></Layout>} />
                <Route path="/store" element={<Layout><ModelsStore /></Layout>} />
                <Route path="/research" element={<Layout><ResearchPapers /></Layout>} />
                <Route path="/news" element={<Layout><News /></Layout>} />
                <Route path="/statistics" element={<Layout><Statistics /></Layout>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
