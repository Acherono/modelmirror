
import { useState, useMemo } from "react";
import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PaperCard } from "@/components/research/PaperCard";
import { ResearchFilters, FilterState } from "@/components/research/ResearchFilters";
import { researchPapers } from "@/data/researchPapers";
import { ResearchPaper, ViewMode } from "@/types/research";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink 
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 8;

const ResearchPapers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    researchFields: []
  });

  // Filter papers based on search query and filter selections
  const filteredPapers = useMemo(() => {
    return researchPapers.filter(paper => {
      const matchesSearch = 
        searchQuery === "" ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.researchField.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        filters.categories.length === 0 || 
        filters.categories.includes(paper.category);

      const matchesResearchField = 
        filters.researchFields.length === 0 || 
        filters.researchFields.includes(paper.researchField);

      return matchesSearch && matchesCategory && matchesResearchField;
    });
  }, [searchQuery, filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPapers.length / ITEMS_PER_PAGE);
  const paginatedPapers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPapers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPapers, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate pagination items
  const paginationItems = useMemo(() => {
    const items = [];
    
    for (let i = 1; i <= totalPages; i++) {
      // Only show a limited number of pages to avoid clutter
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => handlePageChange(i)} 
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) || 
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        items.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <span className="flex h-9 w-9 items-center justify-center">...</span>
          </PaginationItem>
        );
      }
    }
    
    return items;
  }, [currentPage, totalPages]);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">AI Researches & Papers</h1>
      
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <ResearchFilters 
          papers={researchPapers} 
          onFilterChange={setFilters} 
        />
        
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search titles, research fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 py-2 h-9 no-focus-border"
            />
          </div>
        </div>
        
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {filteredPapers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No papers match your search criteria.</p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSearchQuery("");
            setFilters({ categories: [], researchFields: [] });
          }}>
            Clear all filters
          </Button>
        </div>
      ) : (
        <>
          <div className={`
            grid gap-4 mb-6
            ${viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
            }
          `}>
            {paginatedPapers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} viewMode={viewMode} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination className="my-6">
              <PaginationContent>
                {paginationItems}
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default ResearchPapers;
