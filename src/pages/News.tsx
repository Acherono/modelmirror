
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, ExternalLink } from "lucide-react";

// Define news data types
interface NewsItem {
  id: string;
  title: string;
  author: string;
  time: string;
  category: string;
  subcategory?: string;
  image: string;
}

// Sample news data
const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "SXSW 2025 live coverage: AI takes center stage",
    author: "4 Stories",
    time: "12 hours ago",
    category: "IN BRIEF",
    subcategory: "AI",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Microsoft reportedly ramps up AI efforts to compete with OpenAI",
    author: "Kyle Wiggers",
    time: "12 hours ago",
    category: "IN BRIEF",
    subcategory: "AI",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    title: "SXSW 2025: What we're paying attention to",
    author: "Kirsten Korosec",
    time: "13 hours ago",
    category: "AI",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Signal President Meredith Whittaker calls out agentic AI as having 'profound' security and privacy issues",
    author: "Sarah Perez",
    time: "13 hours ago",
    category: "AI",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    title: "US lawmakers have already introduced hundreds of AI bills in 2025",
    author: "Kyle Wiggers",
    time: "14 hours ago",
    category: "GOVERNMENT & POLICY",
    image: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Scale AI is being investigated by the US Department of Labor",
    author: "Taylor Hatmaker",
    time: "15 hours ago",
    category: "AI",
    image: "/placeholder.svg"
  },
  {
    id: "7",
    title: "Hugging Face's chief science officer worries AI is becoming 'yes-men on servers'",
    author: "Devin Coldewey",
    time: "16 hours ago",
    category: "AI",
    image: "/placeholder.svg"
  }
];

// Popular news items
const popularNews = [
  "Signal President Meredith Whittaker calls out agentic AI as having 'profound' security and privacy issues",
  "Google co-founder Larry Page reportedly has a new AI startup",
  "Scale AI is being investigated by the US Department of Labor",
  "Hugging Face's chief science officer worries AI is becoming 'yes-men on servers'",
  "ChatGPT on macOS can now directly edit code",
  "Mistral adds a new API that turns any PDF document into an AI-ready Markdown file"
];

// Category tabs
const categories = ["Startups", "Venture", "Apple", "Security", "AI", "Apps"];

export default function News() {
  const [activeCategory, setActiveCategory] = useState("AI");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">News</h1>
      
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className="px-4 py-1.5 text-sm cursor-pointer"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News items - takes up 2/3 of the grid on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {newsItems.map((item) => (
            <div key={item.id}>
              <NewsCard item={item} />
              <Separator className="mt-6" />
            </div>
          ))}
        </div>
        
        {/* Most Popular section - takes up 1/3 of the grid on large screens */}
        <div className="lg:col-span-1">
          <Card className="bg-primary/90 text-primary-foreground p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Most Popular</h2>
              <ExternalLink className="h-5 w-5" />
            </div>
            
            <ul className="space-y-4">
              {popularNews.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-lg font-bold mr-2">•</span>
                  <p className="text-sm">{item}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface NewsCardProps {
  item: NewsItem;
}

function NewsCard({ item }: NewsCardProps) {
  return (
    <div className="flex gap-4">
      <div className="w-24 h-24 shrink-0 bg-muted rounded overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1">
        {item.subcategory && (
          <Badge variant="outline" className="mb-2 bg-green-500 text-white">
            {item.subcategory}
          </Badge>
        )}
        
        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{item.author}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{item.time}</span>
          </div>
        </div>
        
        {item.category && (
          <div className="mt-1">
            <Badge variant="secondary" className="text-xs">
              {item.category}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
