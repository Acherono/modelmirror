
import { useState, useEffect, useRef } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import debounce from "lodash/debounce";

// Sample data for the global search
const searchItems = [
  { id: 1, type: "model", name: "GPT-4", category: "Large Language Model", accuracy: 86.4 },
  { id: 2, type: "model", name: "Claude 3", category: "Large Language Model", accuracy: 84.5 },
  { id: 3, type: "model", name: "Gemini", category: "Large Language Model", accuracy: 83.1 },
  { id: 4, type: "model", name: "Llama 3", category: "Large Language Model", accuracy: 78.2 },
  { id: 5, type: "model", name: "Mistral", category: "Large Language Model", accuracy: 75.8 },
  { id: 6, type: "model", name: "Falcon", category: "Large Language Model", accuracy: 72.3 },
  { id: 7, type: "metric", name: "MMLU", category: "Benchmark", score: "Multiple-choice" },
  { id: 8, type: "metric", name: "GSM8K", category: "Benchmark", score: "Mathematics" },
  { id: 9, type: "metric", name: "HumanEval", category: "Benchmark", score: "Coding" },
  { id: 10, type: "category", name: "Accuracy Rankings", category: "Dashboard", path: "/accuracy" },
  { id: 11, type: "category", name: "User Statistics", category: "Dashboard", path: "/users" },
  { id: 12, type: "category", name: "Math Excellence", category: "Dashboard", path: "/math" },
];

interface GlobalSearchProps {
  onSearchResult?: (result: any) => void;
}

export function GlobalSearch({ onSearchResult }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    models: true,
    metrics: true,
    categories: true,
  });

  const [results, setResults] = useState(searchItems);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounced search handler
  const debouncedSearch = useRef(
    debounce((query: string) => {
      if (!query) {
        setResults(searchItems);
        return;
      }

      const filtered = searchItems.filter((item) => {
        if (
          !filters.models && item.type === "model" ||
          !filters.metrics && item.type === "metric" ||
          !filters.categories && item.type === "category"
        ) {
          return false;
        }

        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );
      });

      setResults(filtered);
    }, 300)
  ).current;

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, filters, debouncedSearch]);

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Keyboard shortcut to open search (Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleSelect = (item: any) => {
    setOpen(false);
    if (onSearchResult) {
      onSearchResult(item);
    }
    // Reset search query after selection
    setSearchQuery("");
  };

  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full md:w-64 justify-start text-sm text-muted-foreground pl-8"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2" />
        <span>Search models & metrics...</span>
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-50">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            ref={searchInputRef}
            value={searchQuery}
            onValueChange={setSearchQuery}
            placeholder="Type to search..."
            className="flex-1 border-0 outline-none focus:ring-0"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-4" align="end">
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Filter Results</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="filter-models" 
                      checked={filters.models}
                      onCheckedChange={() => toggleFilter("models")}
                    />
                    <Label htmlFor="filter-models">Models</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="filter-metrics" 
                      checked={filters.metrics}
                      onCheckedChange={() => toggleFilter("metrics")}
                    />
                    <Label htmlFor="filter-metrics">Metrics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="filter-categories" 
                      checked={filters.categories}
                      onCheckedChange={() => toggleFilter("categories")}
                    />
                    <Label htmlFor="filter-categories">Categories</Label>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <CommandList>
          {results.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          <CommandGroup heading="Models" hidden={!filters.models}>
            {results
              .filter((item) => item.type === "model")
              .map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item)}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {item.accuracy}% accuracy
                  </span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Metrics" hidden={!filters.metrics}>
            {results
              .filter((item) => item.type === "metric")
              .map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item)}
                >
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.score}</span>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Categories" hidden={!filters.categories}>
            {results
              .filter((item) => item.type === "category")
              .map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item)}
                >
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
