
import { ResearchPaper } from "@/types/research";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Filter, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ResearchFiltersProps {
  papers: ResearchPaper[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  researchFields: string[];
}

export function ResearchFilters({ papers, onFilterChange }: ResearchFiltersProps) {
  // Extract unique categories and research fields
  const uniqueCategories = Array.from(new Set(papers.map(paper => paper.category)));
  const uniqueResearchFields = Array.from(new Set(papers.map(paper => paper.researchField)));
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    researchFields: []
  });
  
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      const newFilters = {
        ...prev,
        categories: newCategories
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleResearchFieldChange = (field: string) => {
    setFilters(prev => {
      const newFields = prev.researchFields.includes(field)
        ? prev.researchFields.filter(f => f !== field)
        : [...prev.researchFields, field];
      
      const newFilters = {
        ...prev,
        researchFields: newFields
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      researchFields: []
    });
    onFilterChange({
      categories: [],
      researchFields: []
    });
  };

  const isFiltersApplied = filters.categories.length > 0 || filters.researchFields.length > 0;
  const activeFilterCount = filters.categories.length + filters.researchFields.length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Filter Papers</h3>
          {isFiltersApplied && (
            <Button variant="ghost" size="sm" className="h-8 px-2" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Categories</h4>
            <div className="space-y-2">
              {uniqueCategories.map(category => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="ml-2 text-sm font-normal"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Research Fields</h4>
            <div className="space-y-2">
              {uniqueResearchFields.map(field => (
                <div key={field} className="flex items-center">
                  <Checkbox
                    id={`field-${field}`}
                    checked={filters.researchFields.includes(field)}
                    onCheckedChange={() => handleResearchFieldChange(field)}
                  />
                  <Label
                    htmlFor={`field-${field}`}
                    className="ml-2 text-sm font-normal"
                  >
                    {field}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
