import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileText, Award, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

const initialCitations = [
  {
    id: 1,
    title: "Attention Is All You Need",
    citations: 47350,
    year: 2017,
    authors: "Vaswani et al.",
    journal: "NeurIPS",
    isHighImpact: true,
  },
  {
    id: 2,
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    citations: 38720,
    year: 2019,
    authors: "Devlin et al.",
    journal: "NAACL",
    isHighImpact: true,
  },
  {
    id: 3,
    title: "GPT-3: Language Models are Few-Shot Learners",
    citations: 29140,
    year: 2020,
    authors: "Brown et al.",
    journal: "NeurIPS",
    isHighImpact: true,
  },
  {
    id: 4,
    title: "Deep Residual Learning for Image Recognition",
    citations: 22680,
    year: 2016,
    authors: "He et al.",
    journal: "CVPR",
    isHighImpact: false,
  },
  {
    id: 5,
    title: "Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context",
    citations: 18450,
    year: 2019,
    authors: "Dai et al.",
    journal: "ACL",
    isHighImpact: false,
  },
  {
    id: 6,
    title: "ELECTRA: Pre-training Text Encoders as Discriminators",
    citations: 15780,
    year: 2020,
    authors: "Clark et al.",
    journal: "ICLR",
    isHighImpact: false,
  },
];

export function IndustryCitations() {
  const [citations, setCitations] = useState(initialCitations);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="bg-gray-200 h-6 w-52 rounded"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-72">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[400px] overflow-hidden">
      <CardHeader>
        <CardTitle>Industry Citations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[325px] overflow-y-auto pr-2">
          <div className="space-y-4">
            {citations.map((citation) => (
              <div
                key={citation.id}
                className="flex p-3 rounded-lg border border-border hover:bg-accent transition-colors duration-200 cursor-pointer animate-slide-in-bottom"
                style={{ animationDelay: `${citation.id * 100}ms` }}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FileText size={20} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{citation.title}</h4>
                    {citation.isHighImpact && (
                      <span className="text-amber-500">
                        <Award size={16} />
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {citation.authors} • {citation.journal} {citation.year}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold">
                      {citation.citations.toLocaleString()} citations
                    </span>
                    <button className="text-primary hover:text-primary/80 transition-colors">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
