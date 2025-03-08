
import { ResearchPaper } from "@/types/research";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface PaperCardProps {
  paper: ResearchPaper;
  viewMode: 'grid' | 'list';
}

export function PaperCard({ paper, viewMode }: PaperCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd.MM.yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <>
      <div 
        className={`
          bg-card rounded-lg border border-border p-4 transition-all duration-200 hover:shadow-md
          ${viewMode === 'grid' ? 'h-full' : 'flex gap-4'}
        `}
      >
        <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary" className="px-2 py-0.5">{paper.category}</Badge>
            <Badge variant="outline" className="px-2 py-0.5">{paper.researchField}</Badge>
          </div>

          <h3 className={`font-semibold ${viewMode === 'grid' ? 'text-xl' : 'text-lg'} mb-1`}>
            {paper.title}
          </h3>

          <div className="mb-3 text-sm text-muted-foreground">
            <div>{formatDate(paper.date)}</div>
            <div>{paper.publisher}</div>
            <div>{paper.author}</div>
          </div>

          <p className="text-sm line-clamp-3 mb-3 text-muted-foreground">
            {paper.summary}
          </p>
        </div>
        
        <div className={`${viewMode === 'list' ? 'flex items-center' : 'text-right mt-2'}`}>
          <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)} aria-label="View details">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] w-1/5 min-w-[300px]">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{paper.title}</h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{paper.category}</Badge>
                <Badge variant="outline">{paper.researchField}</Badge>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <div>Published: {formatDate(paper.date)}</div>
              <div>Publisher: {paper.publisher}</div>
              <div>Author: {paper.author}</div>
            </div>
            
            <div>
              <p className="text-sm">{paper.summary}</p>
            </div>
            
            <div className="pt-4 border-t border-border">
              <a 
                href={paper.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm inline-flex items-center gap-1"
              >
                View on {paper.publisher} <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
